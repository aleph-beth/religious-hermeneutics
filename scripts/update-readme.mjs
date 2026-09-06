#!/usr/bin/env node
/**
 * Régénère le tableau des articles du README à partir du frontmatter.
 * Usage : node scripts/update-readme.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE = 'https://aleph-beth.github.io/religious-hermeneutics/';

function frontmatter(file) {
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  for (const line of (m ? m[1] : '').split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  return fm;
}

const { dossiers, categories } = await import(new URL('../src/data/dossiers.ts', import.meta.url).href).catch(() => ({}));

// dossiers.ts is TypeScript; fall back to a light parse if the runtime cannot import it
let dossierTitles = {};
let categoryTitles = {};
if (dossiers && categories) {
  for (const [id, m] of Object.entries(dossiers)) dossierTitles[id] = m.titleFr;
  for (const c of categories) categoryTitles[c.id] = c.titleFr;
} else {
  const src = readFileSync(join(ROOT, 'src', 'data', 'dossiers.ts'), 'utf8');
  for (const m of src.matchAll(/'([\w-]+)':\s*\{\s*titleEn:[^\n]*\n\s*titleFr:\s*'((?:[^'\\]|\\.)*)'/g)) dossierTitles[m[1]] = m[2].replace(/\\'/g, "'");
  for (const m of src.matchAll(/id:\s*'(\w+)',\s*\n\s*titleEn:[^\n]*\n\s*titleFr:\s*'([^']*)'/g)) categoryTitles[m[1]] = m[2];
}

const enDir = join(ROOT, 'src', 'content', 'en');
const frDir = join(ROOT, 'src', 'content', 'fr');
const rows = [];
for (const f of readdirSync(enDir).filter(f => f.endsWith('.md')).sort()) {
  const en = frontmatter(join(enDir, f));
  const fr = frontmatter(join(frDir, f));
  const slug = f.replace(/\.md$/, '');
  rows.push({ slug, en, fr });
}

const lines = [];
const standalone = rows.filter(r => !r.en.dossier).sort((a, b) => (b.en.date || '').localeCompare(a.en.date || ''));
lines.push('### Essais / Essays', '', '| Date | FR | EN | Catégorie |', '|---|---|---|---|');
for (const r of standalone) {
  lines.push(`| ${r.en.date || ''} | [${r.fr.title}](${SITE}articles/${r.slug}/) | [${r.en.title}](${SITE}articles/${r.slug}/) | ${categoryTitles[r.en.category] || r.en.category} |`);
}
for (const [id, title] of Object.entries(dossierTitles)) {
  const parts = rows.filter(r => r.en.dossier === id).sort((a, b) => Number(a.en.order) - Number(b.en.order));
  if (parts.length === 0) continue;
  lines.push('', `### Dossier — ${title}`, '', `[${SITE}dossiers/${id}/](${SITE}dossiers/${id}/)`, '', '| Volet | FR | EN |', '|---|---|---|');
  for (const r of parts) {
    lines.push(`| ${r.en.order} | [${r.fr.title}](${SITE}articles/${r.slug}/) | [${r.en.title}](${SITE}articles/${r.slug}/) |`);
  }
}

const readmePath = join(ROOT, 'README.md');
const readme = readFileSync(readmePath, 'utf8');
const start = '<!-- ARTICLES:START -->';
const end = '<!-- ARTICLES:END -->';
const i = readme.indexOf(start), j = readme.indexOf(end);
if (i < 0 || j < 0) { console.error('Marqueurs ARTICLES:START / ARTICLES:END absents du README'); process.exit(1); }
const updated = readme.slice(0, i + start.length) + '\n' + lines.join('\n') + '\n' + readme.slice(j);
writeFileSync(readmePath, updated);
console.log(`README mis à jour : ${rows.length} articles.`);
