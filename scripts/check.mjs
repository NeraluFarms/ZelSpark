import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve('dist');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
const html=files(root).filter(p=>p.endsWith('.html'));let checked=0;const failures=[];
for(const file of html){const text=readFileSync(file,'utf8');if((text.match(/<h1[\s>]/g)||[]).length!==1)failures.push(`${file}: expected one h1`);if(!text.includes('name="description"'))failures.push(`${file}: missing description`);const ids=[...text.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)failures.push(`${file}: duplicate id`);for(const m of text.matchAll(/(?:href|src)="([^"#][^"]*)"/g)){const url=m[1];if(!url.startsWith('/'))continue;const path=url.split(/[?#]/)[0];const target=join(root,path.endsWith('/')?`${path}index.html`:path);checked++;if(!existsSync(target))failures.push(`${file}: missing ${url}`);}for(const m of text.matchAll(/<img\b[^>]*>/g))if(!/\balt=/.test(m[0]))failures.push(`${file}: missing image alt`);}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`PASS: ${html.length} pages; ${checked} local references; unique IDs, one h1 per page, descriptions, and image alt attributes.`);
