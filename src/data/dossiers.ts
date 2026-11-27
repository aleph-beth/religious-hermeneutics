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
  'origine-litteraire-hadith': {
    titleEn: 'The literary origins of the hadith',
    titleFr: "L'origine littéraire des hadiths",
    descEn: 'The hadith read as literature: ancient materials rearranged under a new guarantor, and the migration of the guarantor of truth from verse to chain.',
    descFr: 'Le hadith lu comme littérature : des matériaux antiques réagencés sous un garant nouveau, et la migration du garant de vérité du verset à la chaîne.',
    icon: '🔗',
  },
  'ephese': {
    titleEn: 'Ephesus: the feminine and the sacred',
    titleFr: 'Éphèse : le féminin et le sacré',
    descEn: 'A valley, two mountains and one persistent feminine: from Artemis and the Amazons to Mary and the Seven Sleepers, through the emperors.',
    descFr: 'Une vallée, deux montagnes et un féminin qui demeure : d\'Artémis et des Amazones à Marie et aux Sept Dormants, en passant par les empereurs.',
    icon: '🏛️',
  },
  'eschatologie-islam': {
    titleEn: 'The Eschatology of Islam: the root S-L-M',
    titleFr: 'Eschatologie de l\'islam : la racine S-L-M',
    descEn: 'Five parts on eschatology and its mechanisms: war and peace as two hands of a single demand for wholeness, the death-by-fulfilment of a name turned empire, the mechanism by which expansion manufactured internal divisions, Sodom, Babel and the two ends of time read through blood, the gate and money, and the vocabulary of the crusade — infidel, Antichrist, end of time — read as an archive of lexical, legal and eschatological mechanisms.',
    descFr: 'Cinq volets sur l\'eschatologie et ses mécanismes : la guerre et la paix comme deux mains d\'une même exigence de totalité, la mort par accomplissement d\'un nom devenu empire, le mécanisme par lequel l\'expansion a fabriqué les divisions internes, Sodome, Babel et les deux fins des temps lus à travers le sang, la porte et l\'argent, et le vocabulaire de la croisade — infidèle, Antéchrist, fin des temps — lu comme l\'archive de mécanismes lexicaux, juridiques et eschatologiques.',
    icon: '⏳',
  },
  'evangiles-midrash-histoire': {
    titleEn: 'The Gospels: Midrash Text or Historical Account?',
    titleFr: 'Les Évangiles : texte midrash ou récit historique ?',
    descEn: 'One corpus, two regimes of truth: what happens to a text when the language that carried its genre is replaced by another.',
    descFr: 'Un même corpus, deux régimes de vérité : ce qui arrive à un texte quand la langue qui portait son genre est remplacée par une autre.',
    icon: '📖',
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
