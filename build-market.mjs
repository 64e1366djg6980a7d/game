import { readFile, writeFile } from 'node:fs/promises';
const [template, css, ai, game] = await Promise.all(['market-meadow.template.html','market-meadow.css','market-ai.js','market-meadow.js'].map(p => readFile(p,'utf8')));
if ([ai, game].some(s => /<\/script/i.test(s))) throw new Error('Inline script contains a closing script tag');
const html = template.replace('/*__STYLE__*/', () => css).replace('/*__AI__*/', () => ai).replace('/*__GAME__*/', () => game);
await writeFile('outputs/market-meadow.html', html);
console.log(`Built Market Meadow: ${(Buffer.byteLength(html)/1024).toFixed(1)} KB`);
