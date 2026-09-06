#!/usr/bin/env node
/**
 * Vérifie les conventions éditoriales des articles (voir CONTRIBUTING.md).
 * Usage : node scripts/check-content.mjs
 * Sort avec le code 1 si une erreur est trouvée. Les avertissements n'arrêtent pas le build.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'src', 'content');
const LANGS = ['en', 'fr'];
const CATEGORIES = new Set(['hermeneutics', 'philosophy', 'cultural', 'etymology']);
const DESC_MIN = 100;
const DESC_MAX = 180;

const errors = [];
const warnings = [];

function parse(file) {
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  return { fm, body: m[2] };
}

function checkBody(label, body) {
  const lines = body.split(/\r?\n/);
  let inFence = false;
  const h2 = [];
  lines.forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence;
    if (inFence) return;
    const n = i + 1;
    if (/^# /.test(line)) errors.push(`${label}:${n} titre H1 dans le corps (le gabarit affiche déjà le titre)`);
    if (/^#{4,} /.test(line)) errors.push(`${label}:${n} titre H4 ou plus profond (utiliser un paragraphe en gras)`);
    if (/^#{1,3} .*(\*\*|__)/.test(line)) errors.push(`${label}:${n} gras ou italique dans un titre`);
    if (/^## /.test(line)) {
      h2.push(line);
      if (!/^## \d+\. .+ \{#[\w-]+\}\s*$/.test(line)) {
        errors.push(`${label}:${n} section H2 non conforme (attendu « ## N. Titre {#sN} ») : ${line.slice(0, 60)}`);
      }
    }
    if (/^## .*Table (des mati|of Contents)/i.test(line)) errors.push(`${label}:${n} table des matières manuelle (générée automatiquement)`);
    if (/^<a id=/.test(line)) errors.push(`${label}:${n} ancre HTML manuelle (utiliser {#id} sur le titre)`);
  });
  return h2;
}

const files = {};
for (const lang of LANGS) {
  files[lang] = new Set(readdirSync(join(CONTENT, lang)).filter(f => f.endsWith('.md')));
}
for (const f of files.en) if (!files.fr.has(f)) errors.push(`fr/${f} manquant (paire incomplète)`);
for (const f of files.fr) if (!files.en.has(f)) errors.push(`en/${f} manquant (paire incomplète)`);

const byDossier = {};
for (const f of files.en) {
  if (!files.fr.has(f)) continue;
  const en = parse(join(CONTENT, 'en', f));
  const fr = parse(join(CONTENT, 'fr', f));
  if (!en || !fr) { errors.push(`${f} : frontmatter illisible`); continue; }
  const slug = f.replace(/\.md$/, '');

  for (const [lang, a] of [['en', en], ['fr', fr]]) {
    const label = `${lang}/${f}`;
    if (!a.fm.title) errors.push(`${label} : title manquant`);
    if (a.fm.lang !== lang) errors.push(`${label} : lang="${a.fm.lang}" (attendu ${lang})`);
    if (a.fm.pair !== slug) errors.push(`${label} : pair="${a.fm.pair}" ne correspond pas au nom du fichier`);
    if (!CATEGORIES.has(a.fm.category)) errors.push(`${label} : category inconnue "${a.fm.category}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a.fm.date || '')) errors.push(`${label} : date manquante ou invalide (AAAA-MM-JJ)`);
    if (!a.fm.description) errors.push(`${label} : description manquante`);
    else if (a.fm.description.length < DESC_MIN || a.fm.description.length > DESC_MAX) {
      warnings.push(`${label} : description de ${a.fm.description.length} caractères (recommandé ${DESC_MIN}-${DESC_MAX})`);
    }
  }
  for (const key of ['category', 'dossier', 'order', 'date']) {
    if ((en.fm[key] || '') !== (fr.fm[key] || '')) errors.push(`${f} : ${key} différent entre EN (${en.fm[key]}) et FR (${fr.fm[key]})`);
  }

  const h2en = checkBody(`en/${f}`, en.body);
  const h2fr = checkBody(`fr/${f}`, fr.body);
  if (h2en.length !== h2fr.length) errors.push(`${f} : ${h2en.length} sections H2 en EN contre ${h2fr.length} en FR`);

  if (en.fm.dossier) {
    byDossier[en.fm.dossier] = byDossier[en.fm.dossier] || [];
    byDossier[en.fm.dossier].push({ slug, order: Number(en.fm.order) });
  }
}

for (const [d, parts] of Object.entries(byDossier)) {
  const seen = new Map();
  for (const p of parts) {
    if (!Number.isFinite(p.order)) errors.push(`${p.slug} : order manquant dans le dossier ${d}`);
    else if (seen.has(p.order)) errors.push(`dossier ${d} : order ${p.order} en double (${seen.get(p.order)}, ${p.slug})`);
    else seen.set(p.order, p.slug);
  }
}

for (const w of warnings) console.warn('AVERTISSEMENT ' + w);
for (const e of errors) console.error('ERREUR ' + e);
console.log(`\n${files.en.size} paires vérifiées : ${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
process.exit(errors.length ? 1 : 0);
