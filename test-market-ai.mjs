import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import nodeTest from "node:test";
import { fileURLToPath } from "node:url";
import { Script, createContext } from "node:vm";

const sourceURL = new URL("./market-ai.js", import.meta.url);
const source = await readFile(sourceURL, "utf8");
const script = new Script(source, { filename: fileURLToPath(sourceURL) });
const test = (name, run) => nodeTest(name, { timeout: 3000 }, run);
const KEY = "sk-meadow-test-only-ABC123";
const STORAGE = "meadow-ai-v1";
const KEY_STORAGE = STORAGE + ":key";
const encoder = new TextEncoder();
const plain = value => JSON.parse(JSON.stringify(value));
const tick = () => new Promise(resolve => setImmediate(resolve));
const abortError = () => new DOMException("Mock operation cancelled", "AbortError");
const openAI = content => ({ choices: [{ message: { content } }] });
const plan = actions => JSON.stringify({ reply: "I'll ask the helper to do that.", actions });

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function response(data, status = 200, contentType = "application/json") {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status, headers: { "content-type": contentType }
  });
}

function streamed(chunks, { signal, stats = {}, contentType = "application/json" } = {}) {
  let index = 0;
  let closed = false;
  let onAbort;
  stats.reads = 0;
  stats.bytes = 0;
  const detach = () => signal?.removeEventListener("abort", onAbort);
  const body = new ReadableStream({
    start(controller) {
      onAbort = () => {
        stats.aborted = true;
        if (!closed) { closed = true; controller.error(abortError()); }
        detach();
      };
      if (signal?.aborted) onAbort();
      else signal?.addEventListener("abort", onAbort, { once: true });
    },
    pull(controller) {
      if (index === chunks.length) {
        closed = true;
        detach();
        controller.close();
        return;
      }
      const chunk = chunks[index++];
      stats.reads++;
      stats.bytes += chunk.byteLength;
      controller.enqueue(chunk);
    },
    cancel() { closed = true; stats.cancelled = true; detach(); }
  }, { highWaterMark: 0 });
  return new Response(body, { headers: { "content-type": contentType } });
}

// This fixture tests DOM wiring only, not browser layout or native focus trapping.
class Element {
  constructor(tagName, document) {
    Object.assign(this, {
      tagName, document, attributes: {}, listeners: {}, children: [], nodes: [],
      value: "", textContent: "", checked: false, disabled: false, open: false, isConnected: true
    });
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === "id") this.id = String(value);
  }
  getAttribute(name) { return this.attributes[name] ?? null; }
  removeAttribute(name) { delete this.attributes[name]; }
  appendChild(child) { this.children.push(child); this.document.elements.push(child); return child; }
  set innerHTML(html) {
    this.markup = html;
    this.nodes = [...html.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)].map(match => {
      const element = new Element(match[1], this.document);
      for (const attribute of match[2].matchAll(/([\w-]+)="([^"]*)"/g)) {
        element.setAttribute(attribute[1], attribute[2]);
      }
      this.document.elements.push(element);
      return element;
    });
  }
  querySelectorAll(selector) {
    const match = selector.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/);
    assert.ok(match, "Unsupported fixture selector: " + selector);
    return this.nodes.filter(node => node.getAttribute(match[1]) !== null &&
      (match[2] === undefined || node.getAttribute(match[1]) === match[2]));
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
  fire(type, extra = {}) {
    return Promise.all((this.listeners[type] || []).map(callback => callback({
      preventDefault() {}, stopPropagation() {}, ...extra
    })));
  }
  click() { return this.disabled ? Promise.resolve() : this.fire("click"); }
  focus() { this.document.activeElement = this; }
  showModal() { this.open = true; }
  close() { this.open = false; return this.fire("close"); }
}

function setup(t, { storage = new Map() } = {}) {
  const document = {
    elements: [],
    createElement(tagName) { return new Element(tagName, this); },
    getElementById(id) { return this.elements.find(element => element.id === id) || null; }
  };
  document.head = document.createElement("head");
  document.body = document.createElement("body");
  document.activeElement = document.body;
  const env = {
    document, storage, messages: [], statuses: [], actions: [], requests: [], logs: [],
    stateCalls: [], timers: new Map(),
    state: { inventory: { grass: 4, wood: 2, stone: 1 }, costs: { egg: { grass: 1 } } },
    fetcher: async () => response(openAI("A peaceful meadow.")),
    execute: async action => "Completed " + action.type
  };
  let nextTimer = 0;
  const context = createContext({
    window: {}, document, URL, Headers, AbortController, TextDecoder,
    console: Object.fromEntries(["log", "info", "warn", "error", "debug"].map(name => [name, (...args) => env.logs.push(args)])),
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    setTimeout(callback, ms) { const id = ++nextTimer; env.timers.set(id, { callback, ms }); return id; },
    clearTimeout(id) { env.timers.delete(id); },
    fetch(url, init) {
      env.requests.push({ url, init });
      return env.fetcher(url, init);
    }
  });
  script.runInContext(context);
  env.ai = context.window.createMeadowAI({
    getState(...args) { env.stateCalls.push(args); return env.state; },
    async executeAction(action) { env.actions.push(plain(action)); return env.execute(action); },
    onMessage(role, text) { env.messages.push({ role, text }); },
    onStatus(label, connected) { env.statuses.push({ label, connected }); }
  });
  env.open = () => {
    env.ai.openSettings();
    env.dialog = document.body.children.find(element => element.tagName === "dialog");
    env.field = name => {
      const field = env.dialog.querySelector('[data-mai="' + name + '"]');
      assert.ok(field, "Missing dialog field: " + name);
      return field;
    };
    env.tabs = env.dialog.querySelectorAll("[data-mai-provider]");
  };
  env.configure = async ({ provider = "openai", key = KEY, url, model, request, remember = false } = {}) => {
    env.open();
    await env.tabs.find(tab => tab.getAttribute("data-mai-provider") === provider).click();
    env.field("key").value = key;
    env.field("remember").checked = remember;
    if (url !== undefined) env.field("url").value = url;
    if (model !== undefined) env.field("model").value = model;
    if (request !== undefined) env.field("request").value = typeof request === "string" ? request : JSON.stringify(request);
  };
  env.save = () => env.field("form").fire("submit");
  env.connect = async options => {
    await env.configure(options);
    await env.save();
    assert.equal(env.dialog.open, false, env.field("feedback").textContent);
    assert.equal(env.ai.getMode(), options?.provider || "openai");
  };
  env.expireRequest = () => {
    const timer = [...env.timers.values()].find(timer => timer.ms === 25000);
    assert.ok(timer, "Missing 25-second timeout");
    timer.callback();
  };
  t.after(() => {
    env.ai.cancel();
    env.timers.clear();
    assert.deepEqual(env.logs, [], "The module must not log credentials or provider data");
  });
  return env;
}

function pendingFetch(env, { ignoreAbort = false } = {}) {
  const result = deferred();
  env.fetcher = (_, { signal }) => {
    if (!ignoreAbort) signal.addEventListener("abort", () => result.reject(abortError()), { once: true });
    return result.promise;
  };
  return result;
}

test("real source parsing rejects duplicate declarations and exposes the complete API", t => {
  assert.throws(() => new Script("const duplicate = 1; const duplicate = 2;"), SyntaxError);
  const env = setup(t);
  assert.deepEqual(Object.keys(env.ai).sort(), ["cancel", "getMode", "isBusy", "openSettings", "send"]);
  assert.deepEqual(env.statuses, [{ label: "Offline helper", connected: false }]);
  assert.equal(env.ai.getMode(), "offline");
  assert.equal(env.ai.isBusy(), false);
  assert.equal(env.requests.length, 0);
  assert.equal(env.stateCalls.length, 0);
  assert.equal(env.document.body.children.length, 0);
});

test("offline commands execute only the supported actions in order", async t => {
  const env = setup(t);
  await env.ai.send("Please harvest grass 3 then fetch two eggs then checkout");
  await env.ai.send("follow me then go to pantry then stop");
  assert.deepEqual(env.actions, [
    { type: "harvest", resource: "grass", amount: 3 }, { type: "deliver", item: "egg", amount: 2 },
    { type: "checkout" }, { type: "follow" }, { type: "move", target: "pantry" }, { type: "stop" }
  ]);
  for (const text of ["harvest grass 7", "deliver milk 1.5", "follow then dance", "follow then stop then checkout then follow"]) {
    await env.ai.send(text);
    assert.equal(env.actions.length, 6, text);
  }
  await env.ai.send("hello");
  assert.match(env.messages.at(-1).text, /not an AI/);
  await env.ai.send("inventory");
  assert.match(env.messages.at(-1).text, /"grass":4/);
  assert.ok(env.messages.every(message => ["assistant", "system"].includes(message.role)));
  assert.ok(env.stateCalls.every(args => args.length === 0));
  assert.equal(env.requests.length, 0);
});

test("settings are lazy, keyboard-accessible, editable, and do not make automatic requests", async t => {
  const env = setup(t);
  env.open();
  env.ai.openSettings();
  assert.equal(env.document.body.children.length, 1);
  assert.equal(env.document.head.children.length, 1);
  assert.equal(env.field("key").getAttribute("type"), "password");
  assert.equal(env.field("remember").checked, false);
  await env.tabs[0].fire("keydown", { key: "ArrowRight" });
  assert.equal(env.tabs[1].getAttribute("aria-selected"), "true");
  assert.equal(env.field("model").value, "gemini-2.5-flash");
  env.field("model").value = "edited-model";
  await env.tabs[2].click();
  assert.equal(env.field("custom").hidden, false);
  await env.tabs[1].click();
  assert.equal(env.field("model").value, "edited-model");
  await env.field("offline").click();
  assert.equal(env.dialog.open, false);
  assert.equal(env.ai.getMode(), "offline");
  assert.equal(env.requests.length, 0);
});

test("OpenAI sends editable settings and typed context, then executes fenced JSON actions", async t => {
  const env = setup(t);
  await env.connect({ url: "https://openai.example/v1/chat/completions", model: "edited-model" });
  assert.equal(env.requests.length, 0);
  assert.equal(env.statuses.at(-1).connected, false);
  env.fetcher = async () => response(openAI("```json\n" + plan([
    { type: "harvest", resource: "wood", amount: 6 }, { type: "move", target: "checkout" }
  ]) + "\n```"));
  assert.equal(await env.ai.send("Gather wood"), true);
  const { url, init } = env.requests[0];
  const body = JSON.parse(init.body);
  assert.equal(url, "https://openai.example/v1/chat/completions");
  assert.equal(init.method, "POST");
  assert.equal(init.headers.Authorization, "Bearer " + KEY);
  assert.equal(init.credentials, "omit");
  assert.equal(init.redirect, "error");
  assert.equal(body.model, "edited-model");
  assert.ok(Array.isArray(body.messages));
  assert.equal(body.messages[0].role, "system");
  assert.match(body.messages[0].content, /Inventory/);
  assert.match(body.messages[0].content, /"grass":4/);
  assert.equal(body.messages.at(-1).content, "Gather wood");
  assert.ok(!init.body.includes(KEY));
  assert.deepEqual(env.actions, [{ type: "harvest", resource: "wood", amount: 6 }, { type: "move", target: "checkout" }]);
  assert.equal(env.statuses.at(-1).connected, true);
  assert.equal(env.timers.size, 0);
});

test("Gemini uses its REST URL, key header, system instruction, and user/model turns", async t => {
  const env = setup(t);
  await env.connect({ provider: "gemini" });
  env.fetcher = async () => response({ candidates: [{ content: { parts: [{ text: plan([{ type: "move", target: "dairy" }]) }] } }] });
  await env.ai.send("Go to dairy");
  await env.ai.send("What next?");
  const { url, init } = env.requests.at(-1);
  const body = JSON.parse(init.body);
  assert.equal(url, "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent");
  assert.equal(init.headers["x-goog-api-key"], KEY);
  assert.ok(!url.includes(KEY));
  assert.match(body.system_instruction.parts[0].text, /Market Meadow/);
  assert.deepEqual(body.contents.map(turn => turn.role), ["user", "model", "user"]);
  assert.equal(body.contents.at(-1).parts[0].text, "What next?");
  assert.deepEqual(env.actions[0], { type: "move", target: "dairy" });
  assert.equal(env.statuses.at(-1).connected, true);
});

test("custom JSON recursively preserves placeholder types and supports bracket response paths", async t => {
  const env = setup(t);
  await env.connect({ provider: "custom", url: "https://custom.example/chat", model: "custom-model", request: {
    endpoint: "{{url}}", method: "POST", headers: { "x-api-key": "{{ apiKey }}" },
    body: { model: "{{model}}", nested: [{ state: "{{state}}", messages: "{{messages}}", contents: "{{geminiContents}}",
      system: "{{system}}", prompt: "{{prompt}}", embedded: "State={{state}}", bool: true, count: 4 }] },
    responsePath: "data[0].result"
  } });
  env.fetcher = async () => response({ data: [{ result: { reply: "Custom works.", actions: [{ type: "follow" }] } }] });
  await env.ai.send("Literal {{apiKey}} and {{messages}}");
  const { url, init } = env.requests[0];
  const body = JSON.parse(init.body);
  assert.equal(url, "https://custom.example/chat");
  assert.equal(init.headers["x-api-key"], KEY);
  assert.equal(body.model, "custom-model");
  assert.deepEqual(body.nested[0].state, env.state);
  assert.ok(Array.isArray(body.nested[0].messages));
  assert.ok(Array.isArray(body.nested[0].contents));
  assert.match(body.nested[0].system, /Inventory/);
  assert.equal(body.nested[0].prompt, "Literal {{apiKey}} and {{messages}}");
  assert.equal(body.nested[0].embedded, "State=" + JSON.stringify(env.state));
  assert.equal(body.nested[0].bool, true);
  assert.equal(body.nested[0].count, 4);
  assert.deepEqual(env.actions, [{ type: "follow" }]);
});

test("keyless custom GET encodes user text and reads root arrays or plain text", async t => {
  const env = setup(t);
  await env.connect({ provider: "custom", key: "", url: "http://localhost:3000/chat", request: {
    endpoint: "{{url}}?prompt={{prompt}}", method: "GET", headers: {}, responsePath: "[0].text"
  } });
  env.fetcher = async () => response([{ text: "GET works." }]);
  const prompt = "grass & wood #together? x=2 / + " + String.fromCodePoint(0x1f33f);
  await env.ai.send(prompt);
  const { url, init } = env.requests[0];
  assert.equal(new URL(url).searchParams.get("prompt"), prompt);
  assert.equal(init.method, "GET");
  assert.equal(init.body, undefined);
  assert.deepEqual(plain(init.headers), {});
  assert.equal(env.messages.at(-1).text, "GET works.");
  await env.connect({ provider: "custom", key: "", url: "http://localhost:3000/chat", request: {
    url: "{{url}}", method: "POST", headers: {}, body: { prompt: "{{prompt}}" }, responsePath: ""
  } });
  env.fetcher = async () => response("Plain custom reply", 200, "text/plain");
  assert.equal(await env.ai.send("hello"), true);
  assert.equal(env.messages.at(-1).text, "Plain custom reply");
});

test("connection testing never executes actions, reads game state, or injects chat/history", async t => {
  const env = setup(t);
  await env.configure();
  env.fetcher = async () => response(openAI(plan([{ type: "checkout" }])));
  await env.field("test").click();
  assert.deepEqual(env.actions, []);
  assert.deepEqual(env.messages, []);
  assert.deepEqual(env.stateCalls, []);
  assert.equal(env.storage.size, 0);
  assert.equal(JSON.parse(env.requests[0].init.body).messages.length, 2);
  assert.match(env.field("feedback").textContent, /Connection verified/);
  assert.equal(env.ai.getMode(), "offline");
  assert.equal(env.statuses.at(-1).connected, false);
  await env.save();
  assert.equal(env.requests.length, 1);
  assert.equal(env.statuses.at(-1).connected, true);
  env.fetcher = async () => response(openAI("First real reply"));
  await env.ai.send("First real message");
  const messages = JSON.parse(env.requests.at(-1).init.body).messages;
  assert.equal(messages.length, 2);
  assert.equal(messages.at(-1).content, "First real message");
});

test("conversation retains callback results and at most ten exchanges in API context", async t => {
  const env = setup(t);
  await env.connect();
  env.fetcher = async () => response(openAI(plan([{ type: "harvest", resource: "grass", amount: 1 }])));
  await env.ai.send("Harvest grass");
  env.fetcher = async () => response(openAI("A calm day."));
  await env.ai.send("What happened?");
  assert.match(JSON.parse(env.requests.at(-1).init.body).messages[2].content, /Game callback results:\nCompleted harvest/);
  for (let index = 0; index < 15; index++) await env.ai.send("Message " + index);
  const messages = JSON.parse(env.requests.at(-1).init.body).messages;
  assert.equal(messages.length, 20);
  assert.equal(messages.filter(message => message.role === "user").length, 10);
  assert.equal(messages.at(-1).content, "Message 14");
});

test("credentials default to memory and typing partial keys does not corrupt chat or state", async t => {
  const env = setup(t);
  await env.configure();
  for (const partial of ["s", "sk", "sk-", KEY]) {
    env.field("key").value = partial;
    await env.field("key").fire("input");
  }
  await env.save();
  assert.equal(env.storage.has(KEY_STORAGE), false);
  assert.ok(!env.storage.get(STORAGE).includes(KEY));
  await env.ai.send("Say something about grass");
  assert.equal(env.messages.at(-1).text, "A peaceful meadow.");
  assert.match(JSON.parse(env.requests[0].init.body).messages[0].content, /"grass":4/);
  env.fetcher = async () => response(openAI("Secret echo: " + KEY));
  env.state.note = 'Quotes " and a key: ' + KEY;
  await env.ai.send("hello");
  assert.equal(env.messages.at(-1).text, "Secret echo: [redacted]");
  assert.ok(!JSON.parse(env.requests.at(-1).init.body).messages[0].content.includes(KEY));
  const reloaded = setup(t, { storage: env.storage });
  reloaded.open();
  assert.equal(reloaded.field("key").value, "");
  assert.equal(reloaded.ai.getMode(), "offline");
  assert.equal(reloaded.requests.length, 0);
});

test("literal matching keys are sanitized before saving nonsecret JSON", async t => {
  const env = setup(t);
  await env.connect({ request: {
    url: "{{url}}", method: "POST", headers: { Authorization: "Bearer " + KEY },
    body: { model: "{{model}}", messages: "{{messages}}", nested: { accidental: KEY } },
    responsePath: "choices.0.message.content"
  } });
  assert.ok(!env.storage.get(STORAGE).includes(KEY));
  assert.match(env.storage.get(STORAGE), /{{apiKey}}/);
  assert.equal(env.storage.has(KEY_STORAGE), false);
});

test("remembering keys is explicit, restored without connecting, and reversible", async t => {
  const env = setup(t);
  await env.connect({ remember: true });
  assert.deepEqual(JSON.parse(env.storage.get(KEY_STORAGE)), { provider: "openai", key: KEY });
  assert.ok(!env.storage.get(STORAGE).includes(KEY));
  const reloaded = setup(t, { storage: env.storage });
  reloaded.open();
  assert.equal(reloaded.field("key").value, KEY);
  assert.equal(reloaded.field("remember").checked, true);
  assert.equal(reloaded.ai.getMode(), "offline");
  assert.equal(reloaded.requests.length, 0);
  await reloaded.field("forget").click();
  assert.equal(env.storage.has(KEY_STORAGE), false);
  assert.equal(reloaded.field("remember").checked, false);
  await env.configure({ remember: true });
  await env.save();
  assert.equal(env.storage.has(KEY_STORAGE), true);
  await env.configure({ remember: false });
  await env.save();
  assert.equal(env.storage.has(KEY_STORAGE), false);
});

test("cancel aborts an in-flight provider fetch without chat, actions, or false connection", async t => {
  const env = setup(t);
  await env.connect();
  pendingFetch(env);
  const sending = env.ai.send("Cancelled request");
  assert.equal(env.ai.isBusy(), true);
  assert.equal(env.requests.length, 1);
  env.ai.cancel();
  assert.equal(env.requests[0].init.signal.aborted, true);
  assert.equal(await sending, false);
  assert.equal(env.ai.isBusy(), false);
  assert.equal(env.statuses.at(-1).connected, false);
  assert.deepEqual(env.actions, []);
  assert.deepEqual(env.messages, []);
  assert.equal(env.timers.size, 0);
  env.fetcher = async () => response(openAI("New request succeeds."));
  assert.equal(await env.ai.send("New request"), true);
  assert.equal(JSON.parse(env.requests.at(-1).init.body).messages.length, 2);
  assert.equal(env.statuses.at(-1).connected, true);
});

test("cancel discards a late provider response even if the fetch mock ignores abort", async t => {
  const env = setup(t);
  await env.connect();
  const fetch = pendingFetch(env, { ignoreAbort: true });
  const sending = env.ai.send("Old plan");
  env.ai.cancel();
  env.ai.cancel();
  assert.equal(env.requests[0].init.signal.aborted, true);
  fetch.resolve(response(openAI(plan([{ type: "checkout" }]))));
  assert.equal(await sending, false);
  assert.deepEqual(env.actions, []);
  assert.deepEqual(env.messages, []);
  assert.equal(env.statuses.at(-1).connected, false);
  assert.equal(env.ai.isBusy(), false);
});

test("cancel also interrupts an in-progress response body stream", async t => {
  const env = setup(t);
  await env.connect();
  const started = deferred();
  let firstChunk = true;
  env.fetcher = async (_, { signal }) => new Response(new ReadableStream({
    start(controller) {
      signal.addEventListener("abort", () => controller.error(abortError()), { once: true });
    },
    pull(controller) {
      if (firstChunk) {
        firstChunk = false;
        controller.enqueue(encoder.encode('{"choices":'));
        started.resolve();
      }
    }
  }, { highWaterMark: 0 }), { headers: { "content-type": "application/json" } });
  const sending = env.ai.send("Read a slow response");
  await started.promise;
  env.ai.cancel();
  assert.equal(await sending, false);
  assert.equal(env.requests[0].init.signal.aborted, true);
  assert.deepEqual(env.messages, []);
  assert.deepEqual(env.actions, []);
  assert.equal(env.ai.isBusy(), false);
  assert.equal(env.timers.size, 0);
});

for (const mode of ["offline", "openai"]) {
  test("cancel stops queued " + mode + " actions and suppresses late action fulfillment", async t => {
    const env = setup(t);
    if (mode === "openai") await env.connect();
    const firstAction = deferred();
    env.execute = () => firstAction.promise;
    env.fetcher = async () => response(openAI(plan([
      { type: "harvest", resource: "grass", amount: 2 },
      { type: "deliver", item: "egg", amount: 1 }, { type: "checkout" }
    ])));
    const sending = env.ai.send("harvest grass 2 then fetch egg then checkout");
    await tick();
    assert.equal(env.actions.length, 1);
    const messagesBeforeCancel = env.messages.length;
    env.ai.cancel();
    assert.equal(env.ai.isBusy(), true, "An unsettled game callback must retain the one-at-a-time lock");
    firstAction.resolve("STALE action result must not reach chat");
    await sending;
    assert.deepEqual(env.actions, [{ type: "harvest", resource: "grass", amount: 2 }]);
    assert.equal(env.messages.length, messagesBeforeCancel);
    assert.equal(env.ai.isBusy(), false);
    env.fetcher = async () => response(openAI("Fresh response."));
    assert.equal(await env.ai.send("help"), true);
    assert.equal(env.actions.length, 1);
  });
}

test("cancel suppresses a late game-action rejection just like late fulfillment", async t => {
  const env = setup(t);
  await env.connect();
  const firstAction = deferred();
  env.execute = () => firstAction.promise;
  env.fetcher = async () => response(openAI(plan([{ type: "follow" }, { type: "checkout" }])));
  const sending = env.ai.send("follow then checkout");
  await tick();
  assert.equal(env.actions.length, 1);
  const messagesBeforeCancel = env.messages.length;
  env.ai.cancel();
  firstAction.reject(abortError());
  await sending;
  assert.equal(env.actions.length, 1);
  assert.equal(env.ai.isBusy(), false);
  assert.deepEqual(env.messages.slice(messagesBeforeCancel), [], "A cancelled plan must not emit a stale action-failure message");
});

test("cancelling a connection test must not claim that a 25-second timeout occurred", async t => {
  const env = setup(t);
  await env.configure();
  pendingFetch(env);
  const testing = env.field("test").click();
  assert.equal(env.requests.length, 1);
  env.ai.cancel();
  await testing;
  assert.equal(env.requests[0].init.signal.aborted, true);
  assert.equal(env.ai.isBusy(), false);
  assert.deepEqual(env.actions, []);
  assert.deepEqual(env.messages, []);
  assert.equal(env.statuses.at(-1).connected, false);
  assert.doesNotMatch(env.field("feedback").textContent, /timed out|25 seconds/i, "User cancellation is not a timeout");
});

test("streamed oversized responses abort at the byte cap without consuming the remaining body", async t => {
  const env = setup(t);
  await env.connect();
  const block = encoder.encode(String.fromCharCode(0xe9).repeat(125000));
  const chunks = [encoder.encode('{"choices":[{"message":{"content":"Never delivered"}}],"padding":"'),
    ...Array(6).fill(block), encoder.encode('"}')];
  const stats = {};
  env.fetcher = async (_, { signal }) => streamed(chunks, { signal, stats });
  assert.equal(await env.ai.send("Read a large response"), false);
  assert.ok(stats.bytes > 1000000);
  assert.ok(stats.reads < chunks.length, "Do not buffer the entire oversized response");
  assert.equal(stats.aborted, true);
  assert.equal(env.requests[0].init.signal.aborted, true);
  assert.equal(env.ai.isBusy(), false);
  assert.equal(env.statuses.at(-1).connected, false);
  assert.deepEqual(env.actions, []);
  assert.match(env.messages.at(-1).text, /1 MB limit/);
  assert.doesNotMatch(env.messages.at(-1).text, /CORS|timed out/);
  assert.equal(env.timers.size, 0);
  env.fetcher = async () => response(openAI("Recovered."));
  assert.equal(await env.ai.send("Try a small response"), true);
});

test("the inclusive one-million-byte boundary is accepted", async t => {
  const env = setup(t);
  await env.connect();
  const json = JSON.stringify(openAI("Boundary accepted."));
  const bytes = encoder.encode(json + " ".repeat(1000000 - encoder.encode(json).length));
  const stats = {};
  env.fetcher = async (_, { signal }) => streamed([bytes.subarray(0, 700000), bytes.subarray(700000)], { signal, stats });
  assert.equal(await env.ai.send("Read the exact limit"), true);
  assert.equal(stats.bytes, 1000000);
  assert.equal(env.requests[0].init.signal.aborted, false);
  assert.equal(env.messages.at(-1).text, "Boundary accepted.");
});

test("streamed decoding handles BOM and UTF-8 characters split across byte boundaries", async t => {
  const env = setup(t);
  await env.connect();
  const reply = "Hello " + String.fromCodePoint(0x1f33f) + " " + String.fromCharCode(0xe9);
  const bytes = encoder.encode("\uFEFF" + JSON.stringify(openAI(reply)));
  env.fetcher = async (_, { signal }) => streamed(Array.from(bytes, byte => Uint8Array.of(byte)), { signal });
  assert.equal(await env.ai.send("Hello"), true);
  assert.equal(env.messages.at(-1).text, reply);
});

test("an HTTP 204 null body is diagnosed as a bad response, not a CORS failure", async t => {
  const env = setup(t);
  await env.connect();
  env.fetcher = async () => new Response(null, { status: 204 });
  assert.equal(await env.ai.send("Hello"), false);
  assert.equal(env.ai.isBusy(), false);
  assert.equal(env.statuses.at(-1).connected, false);
  assert.deepEqual(env.actions, []);
  assert.doesNotMatch(env.messages.at(-1).text, /Network or CORS/i, "A received HTTP 204 response is not a network failure");
  assert.match(env.messages.at(-1).text, /empty|invalid|bad.*response/i);
});
