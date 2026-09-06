# Guide éditorial

Ce guide fixe le format commun des articles du site. Il est vérifié automatiquement par `node scripts/check-content.mjs`, exécuté avant chaque déploiement.

## Fichiers

Chaque article existe en deux langues, dans deux fichiers au même nom :

```
src/content/en/<slug>.md
src/content/fr/<slug>.md
```

Le `slug` est en minuscules, en anglais, avec des tirets. Il sert d'adresse : `/articles/<slug>/`.

## Frontmatter

```yaml
---
title: "Titre de l'article"
lang: fr                      # en | fr
pair: <slug>                  # identique au nom du fichier
category: hermeneutics        # hermeneutics | etymology | philosophy | cultural
dossier: cordoue-lumieres     # facultatif : identifiant déclaré dans src/data/dossiers.ts
order: 3                      # obligatoire dans un dossier, unique par dossier
date: 2026-09-06              # date de publication, AAAA-MM-JJ
description: "Une phrase de 100 à 180 caractères qui énonce la thèse."
---
```

`category`, `dossier`, `order` et `date` doivent être identiques dans les deux langues. La description est affichée sous le titre et sur les cartes de l'accueil : une seule phrase, la thèse, sans point d'exclamation.

## Corps de l'article

Le gabarit affiche déjà le titre, la description, la catégorie, la date et le temps de lecture. Le corps ne les répète pas.

- **Pas de titre H1** dans le corps.
- **Sections en H2, numérotées, avec une ancre** : `## 3. Titre de la section {#s3}`. Le sommaire est généré à partir de ces titres. La numérotation est continue et commence à 1 ; introduction, conclusion et bibliographie sont numérotées comme les autres.
- **Sous-parties en H3**, sans numéro : `### Titre de la sous-partie`.
- **Pas de H4**. Pour un niveau supplémentaire, ouvrir le paragraphe par un intitulé en gras : `**Intitulé.** Texte…`
- Pas de gras ni d'italique dans les titres. Pas de table des matières écrite à la main, pas d'ancre HTML `<a id>`.
- Séparer les sections par une ligne `---` si le texte est long.

Les deux versions ont le même nombre de sections, dans le même ordre.

## Conventions de citation

**Références scripturaires.** En français : `Genèse 2,7`, `Exode 20,12-17`, `Coran 90,4`. En anglais : `Genesis 2:7`, `Exodus 20:12-17`, `Qur'an 90:4`.

**Citation en langue originale** : trois lignes dans un même bloc de citation, séparées par `<br>`.

```markdown
> כַּבֵּד אֶת-אָבִיךָ וְאֶת-אִמֶּךָ<br>
> *Kabbed et avikha ve-et immekha*<br>
> « Honore ton père et ta mère » (Exode 20,12)
```

**Translittérations** en italique : *kavod*, *qibla*, *šulmu*. Les racines en capitales séparées par des tirets : K-B-D, Q-D-M.

**Tableaux de racines** : trois colonnes, dans cet ordre.

```markdown
| Langue | Forme | Sens |
|---|---|---|
| Hébreu | כָּבוֹד (*kavod*) | gloire, poids |
```

## Sections finales

Dans cet ordre, quand elles existent :

1. Conclusion.
2. `Repères bibliographiques` (FR) / `Bibliographical references` (EN) : liste à puces, auteur en gras, titre en italique, lieu et date.
3. `Pistes ouvertes` / `Threads left open` : questions laissées en suspens, facultatif.
4. Note de transcription en italique si l'article contient de l'hébreu, de l'arabe ou de l'akkadien : *Note : transcriptions simplifiées de l'hébreu et de l'arabe.*

## Figures

Les schémas sont des SVG en ligne dans une `<figure class="article-figure">` avec une `<figcaption>`. Textes et traits utilisent `currentColor` pour rester lisibles en mode sombre ; les identifiants internes (`<marker id>`) sont suffixés par la langue pour éviter les doublons entre les deux versions.

## Dossiers

Un dossier regroupe plusieurs volets. Il est déclaré une fois dans `src/data/dossiers.ts` (titres, description, icône), puis chaque volet porte `dossier:` et `order:`. Le volet 1 est l'introduction du dossier. La page `/dossiers/<id>/` et la navigation « volet précédent / suivant » sont générées automatiquement.

## Vérifier avant de publier

```bash
npm run check
```

puis

```bash
npm run build
```

Le déploiement se fait par fusion dans `main` (GitHub Pages).
