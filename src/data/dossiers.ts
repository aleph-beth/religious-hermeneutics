export interface DossierMeta {
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  icon: string;
}

export const dossiers: Record<string, DossierMeta> = {
  'kafir-kippour': {
    titleEn: 'Kafir / Kippur: the root of recovering',
    titleFr: 'Kafir / Kippour : la racine du recouvrement',
    descEn: 'A common Semitic root (K-P-R / K-F-R), seven poles, three traditions, one modern rupture.',
    descFr: 'Une racine sémitique commune (K-P-R / K-F-R), sept pôles, trois traditions, une rupture moderne.',
    icon: '🌱',
  },
  'charte-medine': {
    titleEn: 'The Charter of Medina: the plural pact',
    titleFr: 'La Charte de Médine : le pacte pluriel',
    descEn: 'One pact, a plural umma including the Jewish tribes, and the mechanism of conflict resolution.',
    descFr: 'Un pacte, une umma plurielle incluant les tribus juives, et les mécanismes de résolution des conflits.',
    icon: '📜',
  },
  'cordoue-lumieres': {
    titleEn: 'Cordoba and the Enlightenment: what Europe owes the Arab world',
    titleFr: 'Cordoue et les Lumières : ce que l\'Europe doit au monde arabe',
    descEn: 'Reception, expulsion, conquest: how al-Andalus built European modernity (philosophy, optics, medicine, paper, music) and was erased from its account.',
    descFr: 'Réception, expulsion, conquête : comment al-Andalus a bâti la modernité européenne (philosophie, optique, médecine, papier, musique) avant d\'être effacée de son récit.',
    icon: '🕌',
  },
};

export const categories = [
  {
    id: 'hermeneutics',
    titleEn: 'Hermeneutics',
    titleFr: 'Herméneutique',
    descEn: 'Structural and text-critical readings of foundational scriptures.',
    descFr: 'Lectures structurelles et critiques des écrits fondateurs.',
    badgeClass: 'badge-hermeneutics',
  },
  {
    id: 'etymology',
    titleEn: 'Etymology',
    titleFr: 'Étymologie',
    descEn: 'Root analysis across Semitic languages and philosophical concepts.',
    descFr: 'Analyse des racines des langues sémitiques et des concepts philosophiques.',
    badgeClass: 'badge-etymology',
  },
  {
    id: 'philosophy',
    titleEn: 'Philosophy & History',
    titleFr: 'Philosophie & Histoire',
    descEn: 'Maimonides, Spinoza, Averroes, Farabi, and secularity.',
    descFr: 'Maïmonide, Spinoza, Averroès, Farabi et la laïcité.',
    badgeClass: 'badge-philosophy',
  },
  {
    id: 'cultural',
    titleEn: 'Cultural Analysis',
    titleFr: 'Analyse culturelle',
    descEn: 'Contemporary mythologies, narrative mechanics, and symbols.',
    descFr: 'Mythologies contemporaines, mécanismes narratifs et symboles.',
    badgeClass: 'badge-cultural',
  },
];

export const categoryBadges: Record<string, { labelEn: string; labelFr: string; badgeClass: string }> = Object.fromEntries(
  categories.map(c => [c.id, { labelEn: c.titleEn, labelFr: c.titleFr, badgeClass: c.badgeClass }])
);

export function readingTime(bodyText: string | undefined): number {
  if (!bodyText) return 4;
  const wordCount = bodyText.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(wordCount / 220));
}
