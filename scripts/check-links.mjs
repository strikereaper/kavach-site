// Fails the build if any internal link or asset in dist/ points to a file that doesn't exist.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith('.html') && files.push(join(d, f))));
walk(dist);

let bad = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    if (/^(https?:|mailto:|data:|\/\/)/.test(url) || !url.startsWith('/')) continue;
    const rel = base && url.startsWith(base) ? url.slice(base.length) : url;
    const target = join(dist, rel);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) { bad++; console.error(`Broken link in ${file.replace(dist, '')}: ${url}`); }
  }
}
console.log(`Checked ${files.length} pages, ${bad} broken links.`);
process.exit(bad ? 1 : 0);
