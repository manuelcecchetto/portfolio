export const SUPPORTED_LOCALES = ["en", "it", "de", "fr", "zh", "hi"] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = "en";
export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE) as SiteLocale[];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  zh: "中文",
  hi: "हिन्दी",
};

export const LOCALE_INTL_MAP: Record<SiteLocale, string> = {
  en: "en-US",
  it: "it-IT",
  de: "de-DE",
  fr: "fr-FR",
  zh: "zh-CN",
  hi: "hi-IN",
};

function normalizePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

export function isSupportedLocale(value: string | undefined | null): value is SiteLocale {
  if (!value) {
    return false;
  }

  return SUPPORTED_LOCALES.includes(value as SiteLocale);
}

export function resolveLocale(value: string | undefined | null): SiteLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export function toIntlLocale(locale: SiteLocale): string {
  return LOCALE_INTL_MAP[locale];
}

export function localizePath(locale: SiteLocale, path: string): string {
  const normalizedPath = normalizePath(path);

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `/${locale}/`;
  }

  return `/${locale}${normalizedPath}`;
}

export function stripLocaleFromPath(path: string): string {
  const normalizedPath = normalizePath(path);

  for (const locale of NON_DEFAULT_LOCALES) {
    const localeRoot = `/${locale}`;
    if (normalizedPath === localeRoot) {
      return "/";
    }
    if (normalizedPath.startsWith(`${localeRoot}/`)) {
      const withoutLocale = normalizedPath.slice(localeRoot.length);
      return withoutLocale || "/";
    }
  }

  return normalizedPath;
}

export function switchLocalePath(currentPath: string, targetLocale: SiteLocale): string {
  return localizePath(targetLocale, stripLocaleFromPath(currentPath));
}

export interface SiteCopy {
  localeName: string;
  seo: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    blogTitle: string;
    blogDescription: string;
    stylePlaygroundTitle: string;
    stylePlaygroundDescription: string;
    defaultDescription: string;
    projectsDetailSuffix: string;
    blogDetailSuffix: string;
    blogTagSuffix: string;
    blogArchivePageLabel: string;
  };
  layout: {
    skipToContent: string;
    rssTitle: string;
  };
  nav: {
    primaryAria: string;
    menu: string;
    home: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
    languageAria: string;
  };
  header: {
    tagline: string;
  };
  footer: {
    craftedWith: string;
    email: string;
    github: string;
    linkedin: string;
  };
  profile: {
    headline: string;
    location: string;
    aboutShort: string;
    aboutLong: string;
    availability: string;
    focusAreas: string[];
  };
  common: {
    timezonePrefix: string;
    publishedPrefix: string;
    updatedPrefix: string;
    minReadSuffix: string;
    latestPrefix: string;
    notProvided: string;
  };
  homeHero: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    snapshotAria: string;
    ctaPrimary: string;
    ctaSecondary: string;
    highlightsAria: string;
    notebookSticker: string;
    fallbackLatestProjectMeta: string;
  };
  homeStory: {
    eyebrow: string;
    title: string;
    currentFocus: string;
  };
  homeHighlights: {
    eyebrow: string;
    title: string;
    publishedProjects: string;
    publishedArticles: string;
    openProjectsIndex: string;
    openBlogIndex: string;
    collaborationFlow: string;
    collaborationFlowValue: string;
    collaborationFlowNote: string;
    readFullApproach: string;
    fallbackLatestProjectTitle: string;
    fallbackLatestBlogTitle: string;
  };
  aboutHero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    workingContextAria: string;
  };
  aboutNarrative: {
    title: string;
    subtitle: string;
    focusAreas: string;
    operatingPrinciples: string;
    workingPrinciplesAria: string;
    principle1Title: string;
    principle1Text: string;
    principle2Title: string;
    principle2Text: string;
    principle3Title: string;
    principle3Text: string;
  };
  aboutPage: {
    ctaTitle: string;
    ctaText: string;
    ctaLink: string;
  };
  contactHero: {
    eyebrow: string;
    title: string;
  };
  contactChannels: {
    title: string;
    intro: string;
    primaryLabel: string;
    primaryTitle: string;
    primaryText: string;
    primaryCtaPrefix: string;
    secondaryLabel: string;
    secondaryTitle: string;
    secondaryLinkedin: string;
    secondaryGithub: string;
  };
  contactPage: {
    includeTitle: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
  };
  projectsPage: {
    eyebrow: string;
    heroTitle: string;
    heroText: string;
    archiveSummaryAria: string;
    publishedLabel: string;
    featuredLabel: string;
    narrativeLabel: string;
    emptyState: string;
    listTitle: string;
    listText: string;
  };
  projectCard: {
    featured: string;
    tagsAria: string;
    openDetails: string;
    repository: string;
    liveDemo: string;
    coverAltPrefix: string;
  };
  projectDetail: {
    backToAll: string;
    eyebrow: string;
    themesAria: string;
    relatedTitle: string;
    relatedText: string;
    coverAltPrefix: string;
  };
  projectDetailsPanel: {
    title: string;
    lastUpdate: string;
    route: string;
    stackAndThemes: string;
    externalLinks: string;
    viewRepository: string;
    openLiveDemo: string;
    noExternalLinks: string;
  };
  blogPage: {
    eyebrow: string;
    heroTitle: string;
    heroText: string;
    archiveSummaryAria: string;
    entriesLabel: string;
    activeTagsLabel: string;
    postsPerPageLabel: string;
    draftsVisibleLabel: string;
    emptyState: string;
    browseByTagTitle: string;
    browseByTagText: string;
    tagsAria: string;
    latestPostsTitle: string;
    latestPostsText: string;
  };
  blogCard: {
    draft: string;
    readArticle: string;
    tagsForPrefix: string;
    coverAltPrefix: string;
  };
  blogPost: {
    backToAll: string;
    eyebrow: string;
    draftEntry: string;
    tagsAria: string;
    continueReadingTitle: string;
    continueReadingText: string;
    coverAltPrefix: string;
  };
  blogTagPage: {
    backToAll: string;
    eyebrow: string;
    tagPrefix: string;
    showingPostsPrefix: string;
    showingPostsSuffixSingle: string;
    showingPostsSuffixPlural: string;
    relatedTagsAria: string;
    noPosts: string;
    postsInArchive: string;
  };
  blogArchivePage: {
    backToLatest: string;
    eyebrow: string;
    titlePrefix: string;
    subtitle: string;
    postsOnPageTitle: string;
  };
  blogPagination: {
    aria: string;
    newerPosts: string;
    olderPosts: string;
    pageLabel: string;
  };
}

const enCopy: SiteCopy = {
  localeName: "English",
  seo: {
    homeTitle: "Manuel Cecchetto | AI Orchestrator and AI Engineer",
    homeDescription:
      "Homepage for Manuel Cecchetto: AI-native product delivery, LLM orchestration, and document intelligence systems.",
    aboutTitle: "About | Manuel Cecchetto",
    aboutDescription:
      "Narrative, operating principles, and focus areas behind Manuel Cecchetto's AI and GenAI practice.",
    contactTitle: "Contact | Manuel Cecchetto",
    contactDescription: "Contact Manuel Cecchetto for AI consulting, LLM delivery, and GenAI product collaboration.",
    projectsTitle: "Projects | Manuel Cecchetto",
    projectsDescription: "Selected AI and product projects with outcomes, stack choices, and implementation notes.",
    blogTitle: "Blog | Manuel Cecchetto",
    blogDescription: "Writing about LLM systems, AI product delivery, and pragmatic implementation choices.",
    stylePlaygroundTitle: "Style Playground | manuelcecchetto.it",
    stylePlaygroundDescription: "Playground for validating global tokens, card wrappers, and motion primitives.",
    defaultDescription: "AI-native product engineering with strategy-to-production delivery.",
    projectsDetailSuffix: "Projects | Manuel Cecchetto",
    blogDetailSuffix: "Blog | Manuel Cecchetto",
    blogTagSuffix: "Blog tags | Manuel Cecchetto",
    blogArchivePageLabel: "Blog archive page",
  },
  layout: {
    skipToContent: "Skip to content",
    rssTitle: "Manuel Cecchetto Blog RSS",
  },
  nav: {
    primaryAria: "Primary",
    menu: "Menu",
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    languageAria: "Language selector",
  },
  header: {
    tagline: "AI Orchestrator and AI Engineer",
  },
  footer: {
    craftedWith: "Crafted with Astro and TypeScript.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  profile: {
    headline: "AI Orchestrator and AI Engineer",
    location: "Italy (remote-first)",
    aboutShort:
      "I build AI-native products from concept to production, with a focus on legal-tech workflows, LLM orchestration, and document intelligence.",
    aboutLong:
      "Since 2020, I have worked across startup and product teams from Qlik.me to CASUS. I started in adtech and full-stack delivery, then moved into AI-native legal products. I led work on CASUS Create and CASUS Review, including a stable in-house .docx to JSON parser that replaced Aspose dependencies and still runs in production. Today I ship fast MVPs for contract review and keep ownership from architecture through frontend and workflow reliability.",
    availability: "Open to selected consulting and build engagements for AI-native products.",
    focusAreas: [
      "AI orchestration for legal and document-heavy products",
      "LLM application architecture from concept to MVP",
      "OpenXML and .docx extraction and transformation pipelines",
      "Full-stack product delivery under high constraints",
      "Evaluation, observability, and operator-ready AI UX",
    ],
  },
  common: {
    timezonePrefix: "Timezone",
    publishedPrefix: "Published",
    updatedPrefix: "Updated",
    minReadSuffix: "min read",
    latestPrefix: "Latest",
    notProvided: "Not provided",
  },
  homeHero: {
    eyebrow: "Home",
    titlePrefix: "AI-native products",
    titleHighlight: "built end-to-end",
    titleSuffix: "for teams that need speed and production reliability.",
    snapshotAria: "Profile snapshot",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See selected work",
    highlightsAria: "Featured highlights",
    notebookSticker: "Production AI focus",
    fallbackLatestProjectMeta: "Latest shipped project",
  },
  homeStory: {
    eyebrow: "Story",
    title: "How I build AI products with teams",
    currentFocus: "Current focus",
  },
  homeHighlights: {
    eyebrow: "Highlights",
    title: "Recent delivery signals",
    publishedProjects: "Published projects",
    publishedArticles: "Published articles",
    openProjectsIndex: "Open projects index",
    openBlogIndex: "Open blog index",
    collaborationFlow: "Delivery flow",
    collaborationFlowValue: "Discovery -> MVP -> Production",
    collaborationFlowNote: "Fast execution with explicit architecture and measurable handoff quality.",
    readFullApproach: "Read full approach",
    fallbackLatestProjectTitle: "Work showcase in progress",
    fallbackLatestBlogTitle: "Writing archive in progress",
  },
  aboutHero: {
    eyebrow: "About",
    titleLine1: "Startup execution speed,",
    titleLine2: "AI-native engineering discipline.",
    workingContextAria: "Working context",
  },
  aboutNarrative: {
    title: "Narrative and practice",
    subtitle:
      "From Qlik.me (2020-2022) to CASUS (2022-2026), I moved from full-stack delivery into AI orchestration for legal-tech products and document-heavy workflows.",
    focusAreas: "Focus areas",
    operatingPrinciples: "Career milestones",
    workingPrinciplesAria: "Career milestones",
    principle1Title: "2020-2022 | Qlik.me",
    principle1Text:
      "I joined an early-stage adtech startup and helped evolve the product from link-in-bio flows into a marketplace model connecting brands and influencer video output.",
    principle2Title: "2022-2024 | CASUS Create",
    principle2Text:
      "At CASUS I grew from junior engineer to broad full-stack owner, contributing to a legal document automation product used by Swiss builders associations with thousands of members.",
    principle3Title: "2024-2026 | CASUS Review + AI orchestration",
    principle3Text:
      "I led the concept-to-MVP path for an LLM contract review product, while building stable document data foundations including an in-house .docx to JSON parser used in production for years.",
  },
  aboutPage: {
    ctaTitle: "If this approach fits your product goals",
    ctaText:
      "I partner with teams that need practical AI execution: architecture, delivery, and measurable product outcomes.",
    ctaLink: "Open contact options",
  },
  contactHero: {
    eyebrow: "Contact",
    title: "Let us scope your next AI milestone.",
  },
  contactChannels: {
    title: "Choose your preferred channel",
    intro:
      "Email is best for discovery and scoping. Share context early, and I can respond with a concrete path from first milestone to implementation.",
    primaryLabel: "Primary",
    primaryTitle: "Email inquiry",
    primaryText:
      "Share your current product stage, main document or workflow constraints, and target outcomes. I reply with scope and next steps.",
    primaryCtaPrefix: "Email",
    secondaryLabel: "Secondary",
    secondaryTitle: "Professional networks",
    secondaryLinkedin: "Message on LinkedIn",
    secondaryGithub: "Review GitHub work",
  },
  contactPage: {
    includeTitle: "What to include in your message",
    bullet1: "Product context, current stage, and decision timeline.",
    bullet2: "Constraints: legal, technical, data quality, or team capacity.",
    bullet3: "Expected outcome for this collaboration and what success looks like.",
  },
  projectsPage: {
    eyebrow: "Projects",
    heroTitle: "Selected AI and product projects with outcomes, architecture choices, and delivery notes.",
    heroText:
      "This archive is generated from collection entries so each case study keeps one source of truth and one dedicated detail page.",
    archiveSummaryAria: "Projects archive summary",
    publishedLabel: "published",
    featuredLabel: "featured",
    narrativeLabel: "Narrative-first case studies",
    emptyState:
      "There are no published projects yet. Add markdown entries in `src/data/projects/` and this page will update automatically.",
    listTitle: "Browse every published project",
    listText: "Open a project for the full narrative, then jump to repository or live demo links where available.",
  },
  projectCard: {
    featured: "Featured",
    tagsAria: "Project tags",
    openDetails: "Open project details",
    repository: "Repository",
    liveDemo: "Live demo",
    coverAltPrefix: "Cover artwork for",
  },
  projectDetail: {
    backToAll: "All projects",
    eyebrow: "Project detail",
    themesAria: "Project themes",
    relatedTitle: "More project narratives",
    relatedText: "Continue through adjacent case studies from the same collection.",
    coverAltPrefix: "Cover artwork for",
  },
  projectDetailsPanel: {
    title: "Project details",
    lastUpdate: "Last update",
    route: "Route",
    stackAndThemes: "Stack and themes",
    externalLinks: "External links",
    viewRepository: "View repository",
    openLiveDemo: "Open live demo",
    noExternalLinks: "No external links were provided for this project.",
  },
  blogPage: {
    eyebrow: "Blog",
    heroTitle: "Writing on LLM systems, GenAI product execution, and practical delivery.",
    heroText:
      "Entries are sorted by newest publish/update date and split into paginated archive views to keep scan speed high as the library grows.",
    archiveSummaryAria: "Blog archive summary",
    entriesLabel: "entries in this environment",
    activeTagsLabel: "active tags",
    postsPerPageLabel: "posts per page",
    draftsVisibleLabel: "drafts visible in non-production mode",
    emptyState: "No blog posts are available yet. Add entries in `src/data/blog/` and the archive will update automatically.",
    browseByTagTitle: "Browse by tag",
    browseByTagText: "Tags are generated from collection frontmatter and linked to dedicated archives.",
    tagsAria: "Blog tags",
    latestPostsTitle: "Latest posts",
    latestPostsText: "Archive page 1 shows the newest entries first.",
  },
  blogCard: {
    draft: "Draft",
    readArticle: "Read article",
    tagsForPrefix: "Tags for",
    coverAltPrefix: "Cover artwork for",
  },
  blogPost: {
    backToAll: "All posts",
    eyebrow: "Blog post",
    draftEntry: "Draft entry",
    tagsAria: "Post tags",
    continueReadingTitle: "Continue reading",
    continueReadingText: "Related entries from adjacent themes.",
    coverAltPrefix: "Cover artwork for",
  },
  blogTagPage: {
    backToAll: "All posts",
    eyebrow: "Tag archive",
    tagPrefix: "Tag",
    showingPostsPrefix: "Showing",
    showingPostsSuffixSingle: "post with this theme.",
    showingPostsSuffixPlural: "posts with this theme.",
    relatedTagsAria: "Related tags",
    noPosts: "No posts are published for this tag in the current build mode.",
    postsInArchive: "Posts in this archive",
  },
  blogArchivePage: {
    backToLatest: "Back to latest posts",
    eyebrow: "Blog archive",
    titlePrefix: "Archive page",
    subtitle: "Sorted newest-first with {count} posts per page.",
    postsOnPageTitle: "Posts on this page",
  },
  blogPagination: {
    aria: "Blog pagination",
    newerPosts: "Newer posts",
    olderPosts: "Older posts",
    pageLabel: "Page",
  },
};

const itCopy: SiteCopy = {
  ...enCopy,
  localeName: "Italiano",
  seo: {
    ...enCopy.seo,
    aboutTitle: "Chi sono | Manuel Cecchetto",
    contactTitle: "Contatti | Manuel Cecchetto",
    projectsTitle: "Progetti | Manuel Cecchetto",
  },
  layout: {
    ...enCopy.layout,
    skipToContent: "Vai al contenuto",
  },
  nav: {
    ...enCopy.nav,
    menu: "Menu",
    home: "Home",
    about: "Chi sono",
    projects: "Progetti",
    blog: "Blog",
    contact: "Contatti",
    languageAria: "Selettore lingua",
  },
  header: {
    tagline: "AI Orchestrator e AI Engineer",
  },
  footer: {
    ...enCopy.footer,
    craftedWith: "Realizzato con Astro e TypeScript.",
    email: "Email",
  },
  profile: {
    headline: "AI Orchestrator e AI Engineer",
    location: "Italia (remote-first)",
    aboutShort:
      "Costruisco prodotti AI-native dall'idea alla produzione, con focus su workflow legal-tech, orchestrazione LLM e document intelligence.",
    aboutLong:
      "Dal 2020 ho lavorato in startup e team prodotto, da Qlik.me a CASUS. Ho iniziato in adtech e full-stack delivery, poi mi sono spostato su prodotti legali AI-native. Ho contribuito in modo diretto a CASUS Create e CASUS Review, inclusa la realizzazione di un parser interno stabile da .docx a JSON che ha ridotto la dipendenza da Aspose ed e ancora in produzione. Oggi porto MVP veloci in ambito contract review mantenendo ownership da architettura, frontend e affidabilita del workflow.",
    availability: "Disponibile per collaborazioni selezionate su prodotti AI-native.",
    focusAreas: [
      "Orchestrazione AI per prodotti legali e document-centrici",
      "Architettura applicativa LLM dall'idea all'MVP",
      "Pipeline OpenXML e trasformazioni affidabili .docx",
      "Consegna full-stack in contesti ad alto vincolo",
      "Valutazione, osservabilita e UX AI orientata agli operatori",
    ],
  },
  common: {
    ...enCopy.common,
    timezonePrefix: "Fuso orario",
    publishedPrefix: "Pubblicato",
    updatedPrefix: "Aggiornato",
    minReadSuffix: "min di lettura",
    latestPrefix: "Ultimo",
    notProvided: "Non disponibile",
  },
  homeHero: {
    ...enCopy.homeHero,
    titlePrefix: "Prodotti AI-native",
    titleHighlight: "costruiti end-to-end",
    titleSuffix: "per team che richiedono velocita e affidabilita in produzione.",
    ctaPrimary: "Iniziamo a parlarne",
    ctaSecondary: "Vedi lavori selezionati",
    notebookSticker: "Direttamente dal mio taccuino",
    fallbackLatestProjectMeta: "Progetto più recente pubblicato",
  },
  homeStory: {
    ...enCopy.homeStory,
    title: "Come costruisco prodotti AI con i team",
    currentFocus: "Focus attuale",
  },
  homeHighlights: {
    ...enCopy.homeHighlights,
    title: "Segnali recenti di delivery",
    publishedProjects: "Progetti pubblicati",
    publishedArticles: "Articoli pubblicati",
    openProjectsIndex: "Apri indice progetti",
    openBlogIndex: "Apri indice blog",
    collaborationFlow: "Flusso di delivery",
    collaborationFlowValue: "Discovery -> MVP -> Production",
    collaborationFlowNote: "Esecuzione rapida con architettura esplicita e handoff misurabili.",
    readFullApproach: "Leggi l'approccio completo",
    fallbackLatestProjectTitle: "Vetrina lavori in aggiornamento",
    fallbackLatestBlogTitle: "Archivio articoli in aggiornamento",
  },
  aboutHero: {
    ...enCopy.aboutHero,
    eyebrow: "Chi sono",
    titleLine1: "Velocita di esecuzione startup,",
    titleLine2: "disciplina ingegneristica AI-native.",
    workingContextAria: "Contesto di lavoro",
  },
  aboutNarrative: {
    ...enCopy.aboutNarrative,
    title: "Narrazione e pratica",
    subtitle:
      "Da Qlik.me (2020-2022) a CASUS (2022-2026), sono passato da full-stack delivery a orchestrazione AI per prodotti legal-tech e workflow documentali.",
    focusAreas: "Aree di focus",
    operatingPrinciples: "Milestone di carriera",
    workingPrinciplesAria: "Milestone di carriera",
    principle1Title: "2020-2022 | Qlik.me",
    principle1Text:
      "Ho lavorato in una startup adtech contribuendo all'evoluzione del prodotto da modello link-in-bio a flusso marketplace tra brand e creator video.",
    principle2Title: "2022-2024 | CASUS Create",
    principle2Text:
      "In CASUS sono cresciuto da profilo junior a owner full-stack, contribuendo a un prodotto di automazione documentale legale usato da associazioni svizzere con migliaia di membri.",
    principle3Title: "2024-2026 | CASUS Review + AI orchestration",
    principle3Text:
      "Ho guidato il percorso concept-to-MVP per un prodotto LLM di contract review, costruendo anche fondamenta documentali stabili come il parser interno .docx -> JSON in uso da anni.",
  },
  aboutPage: {
    ...enCopy.aboutPage,
    ctaTitle: "Se questo approccio è in linea con i tuoi obiettivi prodotto",
    ctaText:
      "Collaboro con team che cercano esecuzione AI concreta: architettura, delivery e risultati misurabili.",
    ctaLink: "Apri opzioni di contatto",
  },
  contactHero: {
    ...enCopy.contactHero,
    eyebrow: "Contatti",
    title: "Definiamo insieme la tua prossima milestone AI.",
  },
  contactChannels: {
    ...enCopy.contactChannels,
    title: "Scegli il canale che preferisci",
    intro:
      "L'email e il canale migliore per discovery e scoping. Con il contesto giusto posso proporre un percorso concreto dal primo milestone all'implementazione.",
    primaryLabel: "Principale",
    primaryTitle: "Richiesta via email",
    primaryText:
      "Condividi fase attuale del prodotto, vincoli principali su documenti o workflow e risultati attesi. Rispondo con ambito e prossimi passi.",
    primaryCtaPrefix: "Email",
    secondaryLabel: "Secondario",
    secondaryTitle: "Reti professionali",
    secondaryLinkedin: "Scrivimi su LinkedIn",
    secondaryGithub: "Guarda i lavori su GitHub",
  },
  contactPage: {
    ...enCopy.contactPage,
    includeTitle: "Cosa includere nel messaggio",
    bullet1: "Contesto del prodotto, fase attuale e timeline decisionale.",
    bullet2: "Vincoli: legali, tecnici, qualita dati o capacita del team.",
    bullet3: "Risultato atteso dalla collaborazione e definizione di successo.",
  },
  projectsPage: {
    ...enCopy.projectsPage,
    eyebrow: "Progetti",
    heroTitle: "Progetti selezionati con risultati, scelte di stack e note di delivery.",
    heroText:
      "Questo archivio è generato dalle collection: ogni progetto ha una fonte unica di verità e una pagina dettaglio dedicata.",
    archiveSummaryAria: "Riepilogo archivio progetti",
    publishedLabel: "pubblicati",
    featuredLabel: "in evidenza",
    narrativeLabel: "Case study con approccio narrativo",
    emptyState:
      "Non ci sono ancora progetti pubblicati. Aggiungi file markdown in `src/data/projects/` e questa pagina si aggiornerà automaticamente.",
    listTitle: "Sfoglia tutti i progetti pubblicati",
    listText: "Apri un progetto per la narrazione completa e poi passa ai link repository o demo dove disponibili.",
  },
  projectCard: {
    ...enCopy.projectCard,
    featured: "In evidenza",
    tagsAria: "Tag del progetto",
    openDetails: "Apri dettagli progetto",
    repository: "Repository",
    liveDemo: "Demo live",
    coverAltPrefix: "Immagine di copertina per",
  },
  projectDetail: {
    ...enCopy.projectDetail,
    backToAll: "Tutti i progetti",
    eyebrow: "Dettaglio progetto",
    themesAria: "Temi del progetto",
    relatedTitle: "Altre narrazioni di progetto",
    relatedText: "Continua con case study adiacenti della stessa collection.",
    coverAltPrefix: "Immagine di copertina per",
  },
  projectDetailsPanel: {
    ...enCopy.projectDetailsPanel,
    title: "Dettagli progetto",
    lastUpdate: "Ultimo aggiornamento",
    route: "Percorso",
    stackAndThemes: "Stack e temi",
    externalLinks: "Link esterni",
    viewRepository: "Apri repository",
    openLiveDemo: "Apri demo live",
    noExternalLinks: "Nessun link esterno fornito per questo progetto.",
  },
  blogPage: {
    ...enCopy.blogPage,
    heroTitle: "Scritti su sistemi LLM, execution AI-native e delivery pragmatica.",
    heroText:
      "Gli articoli sono ordinati per data di pubblicazione/aggiornamento piu recente e suddivisi in pagine archivio per mantenere alta la velocita di scansione.",
    archiveSummaryAria: "Riepilogo archivio blog",
    entriesLabel: "articoli in questo ambiente",
    activeTagsLabel: "tag attivi",
    postsPerPageLabel: "post per pagina",
    draftsVisibleLabel: "bozze visibili in modalità non produzione",
    emptyState: "Non ci sono ancora articoli disponibili. Aggiungi file in `src/data/blog/` e l'archivio si aggiornerà automaticamente.",
    browseByTagTitle: "Sfoglia per tag",
    browseByTagText: "I tag sono generati dal frontmatter e collegati ad archivi dedicati.",
    tagsAria: "Tag del blog",
    latestPostsTitle: "Post più recenti",
    latestPostsText: "La pagina 1 dell'archivio mostra prima gli articoli più nuovi.",
  },
  blogCard: {
    ...enCopy.blogCard,
    draft: "Bozza",
    readArticle: "Leggi articolo",
    tagsForPrefix: "Tag per",
    coverAltPrefix: "Immagine di copertina per",
  },
  blogPost: {
    ...enCopy.blogPost,
    backToAll: "Tutti gli articoli",
    eyebrow: "Articolo",
    draftEntry: "Voce in bozza",
    tagsAria: "Tag dell'articolo",
    continueReadingTitle: "Continua a leggere",
    continueReadingText: "Articoli correlati da temi adiacenti.",
    coverAltPrefix: "Immagine di copertina per",
  },
  blogTagPage: {
    ...enCopy.blogTagPage,
    backToAll: "Tutti gli articoli",
    eyebrow: "Archivio tag",
    tagPrefix: "Tag",
    showingPostsPrefix: "Mostrati",
    showingPostsSuffixSingle: "articolo con questo tema.",
    showingPostsSuffixPlural: "articoli con questo tema.",
    relatedTagsAria: "Tag correlati",
    noPosts: "Nessun articolo pubblicato per questo tag nella modalità build corrente.",
    postsInArchive: "Articoli in questo archivio",
  },
  blogArchivePage: {
    ...enCopy.blogArchivePage,
    backToLatest: "Torna agli ultimi articoli",
    eyebrow: "Archivio blog",
    titlePrefix: "Pagina archivio",
    subtitle: "Ordinato dal più recente con {count} post per pagina.",
    postsOnPageTitle: "Articoli in questa pagina",
  },
  blogPagination: {
    ...enCopy.blogPagination,
    aria: "Paginazione blog",
    newerPosts: "Articoli più recenti",
    olderPosts: "Articoli meno recenti",
    pageLabel: "Pagina",
  },
};

const deCopy: SiteCopy = {
  ...enCopy,
  localeName: "Deutsch",
  seo: {
    ...enCopy.seo,
    aboutTitle: "Über mich | Manuel Cecchetto",
    contactTitle: "Kontakt | Manuel Cecchetto",
    projectsTitle: "Projekte | Manuel Cecchetto",
  },
  layout: {
    ...enCopy.layout,
    skipToContent: "Zum Inhalt springen",
  },
  nav: {
    ...enCopy.nav,
    about: "Über mich",
    projects: "Projekte",
    contact: "Kontakt",
    languageAria: "Sprachauswahl",
  },
  header: {
    tagline: "AI-, LLM- und GenAI-Engineer",
  },
  footer: {
    ...enCopy.footer,
    craftedWith: "Erstellt mit Astro und TypeScript.",
  },
  profile: {
    headline: "AI-, LLM- und GenAI-Engineer",
    location: "Italien (remote-first)",
    aboutShort:
      "Ich entwerfe und baue produktreife Erlebnisse, bei denen Typografie, Motion und Inhaltsstruktur zusammenarbeiten.",
    aboutLong:
      "Ich arbeite an der Schnittstelle von Interface-Design und Implementierung, mit Fokus auf inhaltsstarke Produkte und redaktionelle Workflows. Mein Prozess kombiniert visuelle Richtung, typisierte Content-Modelle und pragmatische Frontend-Architektur, damit Teams sicher ausliefern können, ohne die Markenpersönlichkeit zu verlieren.",
    availability: "Offen für ausgewählte Freelance- und Produkt-Kooperationen.",
    focusAreas: [
      "Designsysteme und UI-Architektur",
      "Astro- und TypeScript-Implementierung",
      "Editorial UX und Informationsarchitektur",
      "Barrierefreiheit und Motion-Governance",
    ],
  },
  common: {
    ...enCopy.common,
    timezonePrefix: "Zeitzone",
    publishedPrefix: "Veröffentlicht",
    updatedPrefix: "Aktualisiert",
    minReadSuffix: "Min. Lesezeit",
    latestPrefix: "Neueste",
    notProvided: "Nicht angegeben",
  },
  homeHero: {
    ...enCopy.homeHero,
    titlePrefix: "Editoriale Präzision für",
    titleHighlight: "moderne Produkte",
    titleSuffix: "von der Interface-Richtung bis zum ausgelieferten Frontend.",
    ctaPrimary: "Gespräch starten",
    ctaSecondary: "Ausgewählte Arbeiten ansehen",
    notebookSticker: "Frisch aus meinem Notizbuch",
    fallbackLatestProjectMeta: "Zuletzt ausgeliefertes Projekt",
  },
  homeStory: {
    ...enCopy.homeStory,
    title: "Wie ich mit Teams arbeite",
    currentFocus: "Aktueller Fokus",
  },
  homeHighlights: {
    ...enCopy.homeHighlights,
    title: "Aktuelle Signale aus dem Workspace",
    publishedProjects: "Veröffentlichte Projekte",
    publishedArticles: "Veröffentlichte Artikel",
    openProjectsIndex: "Projektindex öffnen",
    openBlogIndex: "Blogindex öffnen",
    collaborationFlow: "Zusammenarbeitsfluss",
    collaborationFlowValue: "Strategie -> Interface -> Build",
    collaborationFlowNote: "Klare Übergaben zwischen Design, Content und Frontend-Delivery.",
    readFullApproach: "Vollen Ansatz lesen",
    fallbackLatestProjectTitle: "Projektübersicht in Arbeit",
    fallbackLatestBlogTitle: "Artikelarchiv in Arbeit",
  },
  aboutHero: {
    ...enCopy.aboutHero,
    eyebrow: "Über mich",
    titleLine1: "Produktorientierte Frontend-Arbeit,",
    titleLine2: "geprägt von redaktioneller Klarheit.",
    workingContextAria: "Arbeitskontext",
  },
  aboutNarrative: {
    ...enCopy.aboutNarrative,
    title: "Narrativ und Praxis",
    subtitle: "Ich übersetze Markenpersönlichkeit in Interfaces, die unter Produktdruck wartbar bleiben.",
    focusAreas: "Fokusbereiche",
    operatingPrinciples: "Arbeitsprinzipien",
    workingPrinciplesAria: "Arbeitsprinzipien",
    principle1Title: "01. Zuerst den Content-Vertrag definieren",
    principle1Text: "Typisierte Strukturen beseitigen Mehrdeutigkeit vor der visuellen Verfeinerung.",
    principle2Title: "02. Visuelle Sprache als wiederverwendbare Primitive aufbauen",
    principle2Text: "Token und Wrapper halten das Interface unverwechselbar, ohne Delivery zu bremsen.",
    principle3Title: "03. Lesbarkeit und Accessibility in Motion schützen",
    principle3Text: "Übergänge sollen Hierarchie stärken, nicht mit Inhalten konkurrieren.",
  },
  aboutPage: {
    ...enCopy.aboutPage,
    ctaTitle: "Wenn dieser Ansatz zu deinen Produktzielen passt",
    ctaText:
      "Ich arbeite mit Teams, die klare Content-Strukturen, glaubwürdige visuelle Persönlichkeit und barrierefreie Frontend-Delivery schätzen.",
    ctaLink: "Kontaktoptionen öffnen",
  },
  contactHero: {
    ...enCopy.contactHero,
    eyebrow: "Kontakt",
    title: "Lass uns eine Produktseite gestalten, die unverwechselbar wirkt.",
  },
  contactChannels: {
    ...enCopy.contactChannels,
    title: "Wähle deinen bevorzugten Kanal",
    intro: "Die primäre CTA ist E-Mail für Projektanfragen, soziale Links sind sekundäre Wege.",
    primaryLabel: "Primär",
    primaryTitle: "E-Mail-Anfrage",
    primaryText: "Teile Produktkontext, Zeitplan und gewünschte Ergebnisse. Ich antworte mit Umfang und nächsten Schritten.",
    primaryCtaPrefix: "E-Mail",
    secondaryLabel: "Sekundär",
    secondaryTitle: "Professionelle Netzwerke",
    secondaryLinkedin: "Auf LinkedIn schreiben",
    secondaryGithub: "GitHub-Arbeit ansehen",
  },
  contactPage: {
    ...enCopy.contactPage,
    includeTitle: "Was in deiner Nachricht enthalten sein sollte",
    bullet1: "Produktkontext und aktueller Stand.",
    bullet2: "Erwartetes Ergebnis der Zusammenarbeit.",
    bullet3: "Gewünschter Zeitrahmen und Delivery-Einschränkungen.",
  },
  projectsPage: {
    ...enCopy.projectsPage,
    eyebrow: "Projekte",
    heroTitle: "Ausgewählte Projekte mit Ergebnissen, Stack-Entscheidungen und Delivery-Notizen.",
    heroText:
      "Dieses Archiv wird aus Collection-Einträgen erzeugt, sodass jedes Projekt eine kanonische Quelle und eine eigene Detailseite hat.",
    archiveSummaryAria: "Projektarchiv-Zusammenfassung",
    publishedLabel: "veröffentlicht",
    featuredLabel: "hervorgehoben",
    narrativeLabel: "Narrativ geführte Case Studies",
    emptyState:
      "Es gibt noch keine veröffentlichten Projekte. Füge Markdown-Einträge in `src/data/projects/` hinzu, dann aktualisiert sich diese Seite automatisch.",
    listTitle: "Alle veröffentlichten Projekte durchsuchen",
    listText: "Öffne ein Projekt für die vollständige Erzählung und springe zu Repository- oder Demo-Links, wenn vorhanden.",
  },
  projectCard: {
    ...enCopy.projectCard,
    featured: "Hervorgehoben",
    tagsAria: "Projekt-Tags",
    openDetails: "Projektdetails öffnen",
    repository: "Repository",
    liveDemo: "Live-Demo",
    coverAltPrefix: "Cover-Grafik für",
  },
  projectDetail: {
    ...enCopy.projectDetail,
    backToAll: "Alle Projekte",
    eyebrow: "Projektdetail",
    themesAria: "Projekt-Themen",
    relatedTitle: "Weitere Projektnarrative",
    relatedText: "Weiter mit benachbarten Case Studies aus derselben Collection.",
    coverAltPrefix: "Cover-Grafik für",
  },
  projectDetailsPanel: {
    ...enCopy.projectDetailsPanel,
    title: "Projektdetails",
    lastUpdate: "Letztes Update",
    route: "Pfad",
    stackAndThemes: "Stack und Themen",
    externalLinks: "Externe Links",
    viewRepository: "Repository ansehen",
    openLiveDemo: "Live-Demo öffnen",
    noExternalLinks: "Für dieses Projekt wurden keine externen Links angegeben.",
  },
  blogPage: {
    ...enCopy.blogPage,
    heroTitle: "Schreiben über Frontend-Handwerk, Content-Workflows und pragmatische Delivery.",
    heroText:
      "Einträge sind nach neuestem Veröffentlichungs-/Update-Datum sortiert und in paginierte Archivansichten aufgeteilt, damit die Scangeschwindigkeit hoch bleibt.",
    archiveSummaryAria: "Blogarchiv-Zusammenfassung",
    entriesLabel: "Einträge in dieser Umgebung",
    activeTagsLabel: "aktive Tags",
    postsPerPageLabel: "Beiträge pro Seite",
    draftsVisibleLabel: "Entwürfe im Nicht-Produktionsmodus sichtbar",
    emptyState: "Noch keine Blogposts verfügbar. Füge Einträge in `src/data/blog/` hinzu und das Archiv aktualisiert sich automatisch.",
    browseByTagTitle: "Nach Tag durchsuchen",
    browseByTagText: "Tags werden aus Collection-Frontmatter erzeugt und mit eigenen Archiven verknüpft.",
    tagsAria: "Blog-Tags",
    latestPostsTitle: "Neueste Beiträge",
    latestPostsText: "Archivseite 1 zeigt zuerst die neuesten Einträge.",
  },
  blogCard: {
    ...enCopy.blogCard,
    draft: "Entwurf",
    readArticle: "Artikel lesen",
    tagsForPrefix: "Tags für",
    coverAltPrefix: "Cover-Grafik für",
  },
  blogPost: {
    ...enCopy.blogPost,
    backToAll: "Alle Beiträge",
    eyebrow: "Blogbeitrag",
    draftEntry: "Entwurfseintrag",
    tagsAria: "Beitrags-Tags",
    continueReadingTitle: "Weiterlesen",
    continueReadingText: "Verwandte Beiträge aus benachbarten Themen.",
    coverAltPrefix: "Cover-Grafik für",
  },
  blogTagPage: {
    ...enCopy.blogTagPage,
    backToAll: "Alle Beiträge",
    eyebrow: "Tag-Archiv",
    tagPrefix: "Tag",
    showingPostsPrefix: "Zeigt",
    showingPostsSuffixSingle: "Beitrag zu diesem Thema.",
    showingPostsSuffixPlural: "Beiträge zu diesem Thema.",
    relatedTagsAria: "Verwandte Tags",
    noPosts: "Für diesen Tag sind im aktuellen Build-Modus keine Beiträge veröffentlicht.",
    postsInArchive: "Beiträge in diesem Archiv",
  },
  blogArchivePage: {
    ...enCopy.blogArchivePage,
    backToLatest: "Zurück zu den neuesten Beiträgen",
    eyebrow: "Blogarchiv",
    titlePrefix: "Archivseite",
    subtitle: "Neueste zuerst sortiert mit {count} Beiträgen pro Seite.",
    postsOnPageTitle: "Beiträge auf dieser Seite",
  },
  blogPagination: {
    ...enCopy.blogPagination,
    aria: "Blog-Paginierung",
    newerPosts: "Neuere Beiträge",
    olderPosts: "Ältere Beiträge",
    pageLabel: "Seite",
  },
};

const frCopy: SiteCopy = {
  ...enCopy,
  localeName: "Français",
  seo: {
    ...enCopy.seo,
    aboutTitle: "À propos | Manuel Cecchetto",
    contactTitle: "Contact | Manuel Cecchetto",
    projectsTitle: "Projets | Manuel Cecchetto",
  },
  layout: {
    ...enCopy.layout,
    skipToContent: "Aller au contenu",
  },
  nav: {
    ...enCopy.nav,
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
    languageAria: "Sélecteur de langue",
  },
  header: {
    tagline: "Ingénieur IA, LLM et GenAI",
  },
  footer: {
    ...enCopy.footer,
    craftedWith: "Conçu avec Astro et TypeScript.",
  },
  profile: {
    headline: "Ingénieur IA, LLM et GenAI",
    location: "Italie (remote-first)",
    aboutShort:
      "Je conçois et développe des expériences produit haut de gamme où typographie, motion et structure de contenu travaillent ensemble.",
    aboutLong:
      "Je travaille à l'intersection du design d'interface et de l'implémentation, avec un focus sur les produits riches en contenu et les workflows éditoriaux. Mon processus combine direction visuelle, modèles de contenu typés et architecture frontend pragmatique pour que les équipes livrent avec confiance sans aplatir la personnalité de marque.",
    availability: "Disponible pour des collaborations freelance et produit sélectionnées.",
    focusAreas: [
      "Design systems et architecture UI",
      "Implémentation Astro et TypeScript",
      "UX éditoriale et architecture de l'information",
      "Accessibilité et gouvernance du motion",
    ],
  },
  common: {
    ...enCopy.common,
    timezonePrefix: "Fuseau horaire",
    publishedPrefix: "Publié",
    updatedPrefix: "Mis à jour",
    minReadSuffix: "min de lecture",
    latestPrefix: "Dernier",
    notProvided: "Non renseigné",
  },
  homeHero: {
    ...enCopy.homeHero,
    titlePrefix: "Exigence éditoriale pour des",
    titleHighlight: "produits modernes",
    titleSuffix: "de la direction d'interface au frontend livré.",
    ctaPrimary: "Démarrer une conversation",
    ctaSecondary: "Voir les projets sélectionnés",
    notebookSticker: "Directement de mon carnet",
    fallbackLatestProjectMeta: "Projet livré le plus récent",
  },
  homeStory: {
    ...enCopy.homeStory,
    title: "Comment je travaille avec les équipes",
    currentFocus: "Focus actuel",
  },
  homeHighlights: {
    ...enCopy.homeHighlights,
    title: "Signaux récents du workspace",
    publishedProjects: "Projets publiés",
    publishedArticles: "Articles publiés",
    openProjectsIndex: "Ouvrir l'index projets",
    openBlogIndex: "Ouvrir l'index blog",
    collaborationFlow: "Flux de collaboration",
    collaborationFlowValue: "Stratégie -> Interface -> Build",
    collaborationFlowNote: "Passation claire entre design, contenu et livraison frontend.",
    readFullApproach: "Lire l'approche complète",
    fallbackLatestProjectTitle: "Vitrine projets en préparation",
    fallbackLatestBlogTitle: "Archive éditoriale en préparation",
  },
  aboutHero: {
    ...enCopy.aboutHero,
    eyebrow: "À propos",
    titleLine1: "Un frontend orienté produit,",
    titleLine2: "structuré par une clarté éditoriale.",
    workingContextAria: "Contexte de travail",
  },
  aboutNarrative: {
    ...enCopy.aboutNarrative,
    title: "Narration et pratique",
    subtitle: "Je traduis la personnalité de marque en interfaces qui restent maintenables sous pression produit.",
    focusAreas: "Axes de focus",
    operatingPrinciples: "Principes de fonctionnement",
    workingPrinciplesAria: "Principes de travail",
    principle1Title: "01. Définir d'abord le contrat de contenu",
    principle1Text: "Les structures typées retirent l'ambiguïté avant le raffinement visuel.",
    principle2Title: "02. Construire le langage visuel comme primitives réutilisables",
    principle2Text: "Tokens et wrappers gardent l'interface distinctive sans ralentir la livraison.",
    principle3Title: "03. Préserver lisibilité et accessibilité dans le motion",
    principle3Text: "Les transitions doivent renforcer la hiérarchie, jamais concurrencer le contenu.",
  },
  aboutPage: {
    ...enCopy.aboutPage,
    ctaTitle: "Si cette approche correspond à vos objectifs produit",
    ctaText:
      "Je collabore avec des équipes qui valorisent des structures de contenu claires, une personnalité visuelle crédible et une livraison frontend accessible.",
    ctaLink: "Ouvrir les options de contact",
  },
  contactHero: {
    ...enCopy.contactHero,
    eyebrow: "Contact",
    title: "Construisons une page produit immédiatement reconnaissable.",
  },
  contactChannels: {
    ...enCopy.contactChannels,
    title: "Choisissez votre canal préféré",
    intro: "Le CTA principal est l'email pour les demandes projet, avec les réseaux en chemins secondaires.",
    primaryLabel: "Principal",
    primaryTitle: "Demande par email",
    primaryText: "Partagez contexte produit, timeline et résultats attendus. Je réponds avec périmètre et prochaines étapes.",
    primaryCtaPrefix: "Email",
    secondaryLabel: "Secondaire",
    secondaryTitle: "Réseaux professionnels",
    secondaryLinkedin: "Message sur LinkedIn",
    secondaryGithub: "Voir le travail GitHub",
  },
  contactPage: {
    ...enCopy.contactPage,
    includeTitle: "Que mettre dans votre message",
    bullet1: "Contexte produit et étape actuelle.",
    bullet2: "Résultat attendu pour cette collaboration.",
    bullet3: "Calendrier souhaité et contraintes de livraison.",
  },
  projectsPage: {
    ...enCopy.projectsPage,
    eyebrow: "Projets",
    heroTitle: "Projets sélectionnés avec résultats, choix de stack et notes de livraison.",
    heroText:
      "Cette archive est générée depuis les collections : chaque projet possède une source de vérité canonique et une page détail dédiée.",
    archiveSummaryAria: "Résumé de l'archive projets",
    publishedLabel: "publiés",
    featuredLabel: "mis en avant",
    narrativeLabel: "Études de cas orientées narration",
    emptyState:
      "Aucun projet publié pour l'instant. Ajoutez des fichiers markdown dans `src/data/projects/` et cette page se mettra à jour automatiquement.",
    listTitle: "Parcourir tous les projets publiés",
    listText: "Ouvrez un projet pour la narration complète, puis accédez aux liens repository ou démo si disponibles.",
  },
  projectCard: {
    ...enCopy.projectCard,
    featured: "Mis en avant",
    tagsAria: "Tags du projet",
    openDetails: "Ouvrir les détails du projet",
    repository: "Repository",
    liveDemo: "Démo live",
    coverAltPrefix: "Illustration de couverture pour",
  },
  projectDetail: {
    ...enCopy.projectDetail,
    backToAll: "Tous les projets",
    eyebrow: "Détail projet",
    themesAria: "Thèmes du projet",
    relatedTitle: "Autres récits projet",
    relatedText: "Poursuivez avec des études de cas voisines de la même collection.",
    coverAltPrefix: "Illustration de couverture pour",
  },
  projectDetailsPanel: {
    ...enCopy.projectDetailsPanel,
    title: "Détails du projet",
    lastUpdate: "Dernière mise à jour",
    route: "Route",
    stackAndThemes: "Stack et thèmes",
    externalLinks: "Liens externes",
    viewRepository: "Voir le repository",
    openLiveDemo: "Ouvrir la démo live",
    noExternalLinks: "Aucun lien externe fourni pour ce projet.",
  },
  blogPage: {
    ...enCopy.blogPage,
    heroTitle: "Articles sur le craft frontend, les workflows de contenu et la livraison pragmatique.",
    heroText:
      "Les entrées sont triées par date de publication/mise à jour la plus récente et réparties en pages d'archive pour garder une lecture rapide.",
    archiveSummaryAria: "Résumé de l'archive blog",
    entriesLabel: "entrées dans cet environnement",
    activeTagsLabel: "tags actifs",
    postsPerPageLabel: "articles par page",
    draftsVisibleLabel: "brouillons visibles en mode non production",
    emptyState: "Aucun article disponible pour le moment. Ajoutez des entrées dans `src/data/blog/` et l'archive se mettra à jour automatiquement.",
    browseByTagTitle: "Parcourir par tag",
    browseByTagText: "Les tags sont générés depuis le frontmatter et liés à des archives dédiées.",
    tagsAria: "Tags du blog",
    latestPostsTitle: "Derniers articles",
    latestPostsText: "La page 1 de l'archive affiche les entrées les plus récentes en premier.",
  },
  blogCard: {
    ...enCopy.blogCard,
    draft: "Brouillon",
    readArticle: "Lire l'article",
    tagsForPrefix: "Tags pour",
    coverAltPrefix: "Illustration de couverture pour",
  },
  blogPost: {
    ...enCopy.blogPost,
    backToAll: "Tous les articles",
    eyebrow: "Article",
    draftEntry: "Entrée brouillon",
    tagsAria: "Tags de l'article",
    continueReadingTitle: "Continuer la lecture",
    continueReadingText: "Articles liés issus de thèmes voisins.",
    coverAltPrefix: "Illustration de couverture pour",
  },
  blogTagPage: {
    ...enCopy.blogTagPage,
    backToAll: "Tous les articles",
    eyebrow: "Archive de tag",
    tagPrefix: "Tag",
    showingPostsPrefix: "Affiche",
    showingPostsSuffixSingle: "article sur ce thème.",
    showingPostsSuffixPlural: "articles sur ce thème.",
    relatedTagsAria: "Tags associés",
    noPosts: "Aucun article publié pour ce tag dans le mode de build actuel.",
    postsInArchive: "Articles dans cette archive",
  },
  blogArchivePage: {
    ...enCopy.blogArchivePage,
    backToLatest: "Retour aux derniers articles",
    eyebrow: "Archive blog",
    titlePrefix: "Page d'archive",
    subtitle: "Trié du plus récent au plus ancien avec {count} articles par page.",
    postsOnPageTitle: "Articles de cette page",
  },
  blogPagination: {
    ...enCopy.blogPagination,
    aria: "Pagination du blog",
    newerPosts: "Articles plus récents",
    olderPosts: "Articles plus anciens",
    pageLabel: "Page",
  },
};

const zhCopy: SiteCopy = {
  ...enCopy,
  localeName: "中文",
  layout: {
    ...enCopy.layout,
    skipToContent: "跳到内容",
  },
  nav: {
    ...enCopy.nav,
    home: "首页",
    about: "关于",
    projects: "项目",
    blog: "博客",
    contact: "联系",
    languageAria: "语言选择",
  },
  header: {
    tagline: "AI、LLM 与 GenAI 工程师",
  },
  footer: {
    ...enCopy.footer,
    craftedWith: "使用 Astro 与 TypeScript 构建。",
    email: "邮箱",
  },
  profile: {
    headline: "AI、LLM 与 GenAI 工程师",
    location: "意大利（远程优先）",
    aboutShort: "我设计并实现高质量产品体验，让排版、动效与内容结构协同工作。",
    aboutLong:
      "我专注于界面设计与工程实现的交叉点，擅长内容密集型产品与编辑工作流。我的流程结合视觉方向、类型化内容模型和务实的前端架构，帮助团队在保持品牌个性的同时稳定交付。",
    availability: "目前接受有选择的自由职业与产品合作。",
    focusAreas: ["设计系统与 UI 架构", "Astro 与 TypeScript 实现", "编辑型 UX 与信息架构", "可访问性与动效治理"],
  },
  common: {
    ...enCopy.common,
    timezonePrefix: "时区",
    publishedPrefix: "发布于",
    updatedPrefix: "更新于",
    minReadSuffix: "分钟阅读",
    latestPrefix: "最新",
    notProvided: "未提供",
  },
  homeHero: {
    ...enCopy.homeHero,
    eyebrow: "首页",
    titlePrefix: "为",
    titleHighlight: "现代产品",
    titleSuffix: "提供编辑级前端实现，从界面方向到最终上线。",
    ctaPrimary: "开始沟通",
    ctaSecondary: "查看精选项目",
    notebookSticker: "来自我的笔记本",
    fallbackLatestProjectMeta: "最近上线的项目",
  },
  homeStory: {
    ...enCopy.homeStory,
    title: "我如何与团队协作",
    currentFocus: "当前重点",
  },
  homeHighlights: {
    ...enCopy.homeHighlights,
    eyebrow: "亮点",
    title: "工作区近期信号",
    publishedProjects: "已发布项目",
    publishedArticles: "已发布文章",
    openProjectsIndex: "打开项目索引",
    openBlogIndex: "打开博客索引",
    collaborationFlow: "协作流程",
    collaborationFlowValue: "策略 -> 界面 -> 构建",
    collaborationFlowNote: "在设计、内容与前端交付之间实现清晰衔接。",
    readFullApproach: "查看完整方法",
    fallbackLatestProjectTitle: "项目展示建设中",
    fallbackLatestBlogTitle: "文章归档建设中",
  },
  aboutHero: {
    ...enCopy.aboutHero,
    eyebrow: "关于",
    titleLine1: "产品导向的前端工作，",
    titleLine2: "由编辑式清晰度塑造。",
    workingContextAria: "工作背景",
  },
  aboutNarrative: {
    ...enCopy.aboutNarrative,
    title: "叙事与实践",
    subtitle: "我将品牌个性转化为在产品压力下依然可维护的界面。",
    focusAreas: "重点方向",
    operatingPrinciples: "工作原则",
    workingPrinciplesAria: "工作原则",
    principle1Title: "01. 先定义内容契约",
    principle1Text: "类型化结构能在视觉细化之前消除歧义。",
    principle2Title: "02. 将视觉语言做成可复用原语",
    principle2Text: "令牌与包装组件让界面保持辨识度且不拖慢交付。",
    principle3Title: "03. 在动效中守住可读性与可访问性",
    principle3Text: "过渡应强化层级，而不是与内容竞争。",
  },
  aboutPage: {
    ...enCopy.aboutPage,
    ctaTitle: "如果这套方法契合你的产品目标",
    ctaText: "我与重视清晰内容结构、可信视觉个性和可访问前端交付的团队合作。",
    ctaLink: "查看联系选项",
  },
  contactHero: {
    ...enCopy.contactHero,
    eyebrow: "联系",
    title: "一起打造一眼可识别的产品页面。",
  },
  contactChannels: {
    ...enCopy.contactChannels,
    title: "选择你偏好的沟通渠道",
    intro: "项目咨询以邮件为主，社交平台作为辅助渠道。",
    primaryLabel: "主要",
    primaryTitle: "邮件咨询",
    primaryText: "请提供产品背景、时间线和目标结果。我会回复范围与下一步建议。",
    primaryCtaPrefix: "邮件",
    secondaryLabel: "次要",
    secondaryTitle: "专业网络",
    secondaryLinkedin: "在 LinkedIn 联系",
    secondaryGithub: "查看 GitHub 项目",
  },
  contactPage: {
    ...enCopy.contactPage,
    includeTitle: "消息中建议包含",
    bullet1: "产品背景与当前阶段。",
    bullet2: "此次合作的预期结果。",
    bullet3: "期望时间线与交付约束。",
  },
  projectsPage: {
    ...enCopy.projectsPage,
    eyebrow: "项目",
    heroTitle: "精选项目：结果、技术栈选择与交付说明。",
    heroText: "该归档由内容集合自动生成，每个项目都有唯一内容源和独立详情页。",
    archiveSummaryAria: "项目归档摘要",
    publishedLabel: "已发布",
    featuredLabel: "精选",
    narrativeLabel: "叙事导向案例研究",
    emptyState: "暂时没有已发布项目。在 `src/data/projects/` 添加 markdown 条目后此页会自动更新。",
    listTitle: "浏览所有已发布项目",
    listText: "打开项目查看完整叙事，并在可用时跳转到仓库或在线演示。",
  },
  projectCard: {
    ...enCopy.projectCard,
    featured: "精选",
    tagsAria: "项目标签",
    openDetails: "打开项目详情",
    repository: "仓库",
    liveDemo: "在线演示",
    coverAltPrefix: "封面图：",
  },
  projectDetail: {
    ...enCopy.projectDetail,
    backToAll: "全部项目",
    eyebrow: "项目详情",
    themesAria: "项目主题",
    relatedTitle: "更多项目叙事",
    relatedText: "继续阅读同一集合中的相关案例。",
    coverAltPrefix: "封面图：",
  },
  projectDetailsPanel: {
    ...enCopy.projectDetailsPanel,
    title: "项目信息",
    lastUpdate: "最后更新",
    route: "路由",
    stackAndThemes: "技术栈与主题",
    externalLinks: "外部链接",
    viewRepository: "查看仓库",
    openLiveDemo: "打开在线演示",
    noExternalLinks: "该项目未提供外部链接。",
  },
  blogPage: {
    ...enCopy.blogPage,
    heroTitle: "关于前端实践、内容工作流与务实交付的写作。",
    heroText: "文章按最新发布时间/更新时间排序，并分页展示以保持浏览效率。",
    archiveSummaryAria: "博客归档摘要",
    entriesLabel: "篇文章（当前环境）",
    activeTagsLabel: "个活跃标签",
    postsPerPageLabel: "篇/页",
    draftsVisibleLabel: "篇草稿（非生产环境可见）",
    emptyState: "暂无博客文章。在 `src/data/blog/` 添加条目后归档会自动更新。",
    browseByTagTitle: "按标签浏览",
    browseByTagText: "标签由 frontmatter 自动生成，并链接到独立归档页。",
    tagsAria: "博客标签",
    latestPostsTitle: "最新文章",
    latestPostsText: "归档第 1 页优先显示最新条目。",
  },
  blogCard: {
    ...enCopy.blogCard,
    draft: "草稿",
    readArticle: "阅读文章",
    tagsForPrefix: "标签：",
    coverAltPrefix: "封面图：",
  },
  blogPost: {
    ...enCopy.blogPost,
    backToAll: "全部文章",
    eyebrow: "博客文章",
    draftEntry: "草稿条目",
    tagsAria: "文章标签",
    continueReadingTitle: "继续阅读",
    continueReadingText: "来自相关主题的文章。",
    coverAltPrefix: "封面图：",
  },
  blogTagPage: {
    ...enCopy.blogTagPage,
    backToAll: "全部文章",
    eyebrow: "标签归档",
    tagPrefix: "标签",
    showingPostsPrefix: "显示",
    showingPostsSuffixSingle: "篇相关文章。",
    showingPostsSuffixPlural: "篇相关文章。",
    relatedTagsAria: "相关标签",
    noPosts: "当前构建模式下该标签没有已发布文章。",
    postsInArchive: "该归档中的文章",
  },
  blogArchivePage: {
    ...enCopy.blogArchivePage,
    backToLatest: "返回最新文章",
    eyebrow: "博客归档",
    titlePrefix: "归档页",
    subtitle: "按时间从新到旧排序，每页 {count} 篇。",
    postsOnPageTitle: "本页文章",
  },
  blogPagination: {
    ...enCopy.blogPagination,
    aria: "博客分页",
    newerPosts: "较新文章",
    olderPosts: "较旧文章",
    pageLabel: "第",
  },
};

const hiCopy: SiteCopy = {
  ...enCopy,
  localeName: "हिन्दी",
  layout: {
    ...enCopy.layout,
    skipToContent: "सामग्री पर जाएँ",
  },
  nav: {
    ...enCopy.nav,
    home: "होम",
    about: "परिचय",
    projects: "प्रोजेक्ट्स",
    blog: "ब्लॉग",
    contact: "संपर्क",
    languageAria: "भाषा चयन",
  },
  header: {
    tagline: "AI, LLM और GenAI इंजीनियर",
  },
  footer: {
    ...enCopy.footer,
    craftedWith: "Astro और TypeScript से तैयार किया गया।",
    email: "ईमेल",
  },
  profile: {
    headline: "AI, LLM और GenAI इंजीनियर",
    location: "इटली (रिमोट-फर्स्ट)",
    aboutShort: "मैं ऐसे प्रोडक्ट अनुभव डिज़ाइन और बनाता हूँ जहाँ टाइपोग्राफी, मोशन और कंटेंट स्ट्रक्चर साथ काम करें।",
    aboutLong:
      "मैं इंटरफ़ेस डिज़ाइन और इम्प्लिमेंटेशन के संगम पर काम करता हूँ, खासकर कंटेंट-हैवी प्रोडक्ट्स और एडिटोरियल वर्कफ़्लो पर। मेरी प्रक्रिया विज़ुअल डायरेक्शन, टाइप्ड कंटेंट मॉडल और प्रैग्मैटिक फ्रंटएंड आर्किटेक्चर को मिलाकर टीमों को आत्मविश्वास से डिलीवर करने में मदद करती है।",
    availability: "चयनित फ्रीलांस और प्रोडक्ट सहयोग के लिए उपलब्ध।",
    focusAreas: ["डिज़ाइन सिस्टम और UI आर्किटेक्चर", "Astro और TypeScript इम्प्लिमेंटेशन", "एडिटोरियल UX और सूचना वास्तुकला", "एक्सेसिबिलिटी और मोशन गवर्नेंस"],
  },
  common: {
    ...enCopy.common,
    timezonePrefix: "समय क्षेत्र",
    publishedPrefix: "प्रकाशित",
    updatedPrefix: "अपडेट किया गया",
    minReadSuffix: "मिनट पढ़ाई",
    latestPrefix: "नवीनतम",
    notProvided: "उपलब्ध नहीं",
  },
  homeHero: {
    ...enCopy.homeHero,
    eyebrow: "होम",
    titlePrefix: "आधुनिक",
    titleHighlight: "प्रोडक्ट्स",
    titleSuffix: "के लिए एडिटोरियल क्राफ्ट, इंटरफ़ेस दिशा से लेकर शिप्ड फ्रंटएंड तक।",
    ctaPrimary: "बातचीत शुरू करें",
    ctaSecondary: "चयनित काम देखें",
    notebookSticker: "मेरी नोटबुक से",
    fallbackLatestProjectMeta: "हाल में शिप किया गया प्रोजेक्ट",
  },
  homeStory: {
    ...enCopy.homeStory,
    eyebrow: "स्टोरी",
    title: "मैं टीमों के साथ कैसे काम करता हूँ",
    currentFocus: "वर्तमान फोकस",
  },
  homeHighlights: {
    ...enCopy.homeHighlights,
    eyebrow: "हाइलाइट्स",
    title: "वर्कस्पेस से हाल के संकेत",
    publishedProjects: "प्रकाशित प्रोजेक्ट्स",
    publishedArticles: "प्रकाशित लेख",
    openProjectsIndex: "प्रोजेक्ट इंडेक्स खोलें",
    openBlogIndex: "ब्लॉग इंडेक्स खोलें",
    collaborationFlow: "सहयोग प्रवाह",
    collaborationFlowValue: "रणनीति -> इंटरफ़ेस -> बिल्ड",
    collaborationFlowNote: "डिज़ाइन, कंटेंट और फ्रंटएंड डिलीवरी के बीच स्पष्ट हैंडऑफ।",
    readFullApproach: "पूरा दृष्टिकोण पढ़ें",
    fallbackLatestProjectTitle: "वर्क शोकेस तैयार हो रहा है",
    fallbackLatestBlogTitle: "राइटिंग आर्काइव तैयार हो रहा है",
  },
  aboutHero: {
    ...enCopy.aboutHero,
    eyebrow: "परिचय",
    titleLine1: "प्रोडक्ट-केंद्रित फ्रंटएंड काम,",
    titleLine2: "एडिटोरियल स्पष्टता के साथ।",
    workingContextAria: "कार्य संदर्भ",
  },
  aboutNarrative: {
    ...enCopy.aboutNarrative,
    title: "कथा और अभ्यास",
    subtitle: "मैं ब्रांड व्यक्तित्व को ऐसे इंटरफ़ेस में बदलता हूँ जो प्रोडक्ट दबाव में भी मेंटेन करने योग्य रहें।",
    focusAreas: "फोकस क्षेत्र",
    operatingPrinciples: "कार्य सिद्धांत",
    workingPrinciplesAria: "कार्य सिद्धांत",
    principle1Title: "01. पहले कंटेंट कॉन्ट्रैक्ट तय करें",
    principle1Text: "टाइप्ड संरचनाएँ विज़ुअल रिफाइनमेंट से पहले अस्पष्टता हटाती हैं।",
    principle2Title: "02. विज़ुअल भाषा को पुन: प्रयोज्य प्रिमिटिव्स में बनाएं",
    principle2Text: "टोकन और रैपर इंटरफ़ेस को अलग बनाए रखते हैं बिना डिलीवरी धीमी किए।",
    principle3Title: "03. मोशन में पठनीयता और एक्सेसिबिलिटी सुरक्षित रखें",
    principle3Text: "ट्रांज़िशन को हाइरार्की मजबूत करनी चाहिए, कंटेंट से प्रतिस्पर्धा नहीं।",
  },
  aboutPage: {
    ...enCopy.aboutPage,
    ctaTitle: "यदि यह दृष्टिकोण आपके प्रोडक्ट लक्ष्यों से मेल खाता है",
    ctaText: "मैं उन टीमों के साथ काम करता हूँ जो स्पष्ट कंटेंट संरचना, विश्वसनीय दृश्य पहचान और सुलभ फ्रंटएंड डिलीवरी को महत्व देती हैं।",
    ctaLink: "संपर्क विकल्प खोलें",
  },
  contactHero: {
    ...enCopy.contactHero,
    eyebrow: "संपर्क",
    title: "आइए ऐसा प्रोडक्ट पेज बनाएं जो तुरंत पहचान में आए।",
  },
  contactChannels: {
    ...enCopy.contactChannels,
    title: "अपना पसंदीदा चैनल चुनें",
    intro: "प्रोजेक्ट पूछताछ के लिए प्राथमिक CTA ईमेल है, सोशल लिंक द्वितीय विकल्प हैं।",
    primaryLabel: "प्राथमिक",
    primaryTitle: "ईमेल पूछताछ",
    primaryText: "अपना प्रोडक्ट संदर्भ, टाइमलाइन और अपेक्षित परिणाम साझा करें। मैं स्कोप और अगले कदम के साथ जवाब दूँगा।",
    primaryCtaPrefix: "ईमेल",
    secondaryLabel: "द्वितीय",
    secondaryTitle: "प्रोफेशनल नेटवर्क",
    secondaryLinkedin: "LinkedIn पर संदेश भेजें",
    secondaryGithub: "GitHub कार्य देखें",
  },
  contactPage: {
    ...enCopy.contactPage,
    includeTitle: "अपने संदेश में क्या शामिल करें",
    bullet1: "प्रोडक्ट संदर्भ और वर्तमान चरण।",
    bullet2: "इस सहयोग से अपेक्षित परिणाम।",
    bullet3: "पसंदीदा टाइमलाइन और डिलीवरी सीमाएँ।",
  },
  projectsPage: {
    ...enCopy.projectsPage,
    eyebrow: "प्रोजेक्ट्स",
    heroTitle: "चयनित प्रोजेक्ट्स: परिणाम, स्टैक विकल्प और डिलीवरी नोट्स।",
    heroText: "यह आर्काइव कलेक्शन एंट्रीज़ से जनरेट होता है ताकि हर प्रोजेक्ट का एक कैनोनिकल स्रोत और समर्पित डिटेल पेज हो।",
    archiveSummaryAria: "प्रोजेक्ट आर्काइव सारांश",
    publishedLabel: "प्रकाशित",
    featuredLabel: "फीचर्ड",
    narrativeLabel: "नैरेटिव-फर्स्ट केस स्टडीज़",
    emptyState: "अभी कोई प्रकाशित प्रोजेक्ट नहीं है। `src/data/projects/` में markdown एंट्री जोड़ें, पेज स्वतः अपडेट होगा।",
    listTitle: "सभी प्रकाशित प्रोजेक्ट्स देखें",
    listText: "पूरा नैरेटिव देखने के लिए प्रोजेक्ट खोलें, फिर उपलब्ध होने पर repository या live demo पर जाएँ।",
  },
  projectCard: {
    ...enCopy.projectCard,
    featured: "फीचर्ड",
    tagsAria: "प्रोजेक्ट टैग्स",
    openDetails: "प्रोजेक्ट विवरण खोलें",
    repository: "रिपॉज़िटरी",
    liveDemo: "लाइव डेमो",
    coverAltPrefix: "कवर आर्टवर्क:",
  },
  projectDetail: {
    ...enCopy.projectDetail,
    backToAll: "सभी प्रोजेक्ट्स",
    eyebrow: "प्रोजेक्ट विवरण",
    themesAria: "प्रोजेक्ट थीम्स",
    relatedTitle: "और प्रोजेक्ट कथाएँ",
    relatedText: "उसी कलेक्शन की संबंधित केस स्टडीज़ पढ़ें।",
    coverAltPrefix: "कवर आर्टवर्क:",
  },
  projectDetailsPanel: {
    ...enCopy.projectDetailsPanel,
    title: "प्रोजेक्ट विवरण",
    lastUpdate: "अंतिम अपडेट",
    route: "रूट",
    stackAndThemes: "स्टैक और थीम्स",
    externalLinks: "बाहरी लिंक",
    viewRepository: "रिपॉज़िटरी देखें",
    openLiveDemo: "लाइव डेमो खोलें",
    noExternalLinks: "इस प्रोजेक्ट के लिए कोई बाहरी लिंक उपलब्ध नहीं है।",
  },
  blogPage: {
    ...enCopy.blogPage,
    heroTitle: "फ्रंटएंड क्राफ्ट, कंटेंट वर्कफ़्लो और व्यावहारिक डिलीवरी पर लेखन।",
    heroText: "एंट्रीज़ नवीनतम publish/update तारीख के अनुसार sorted हैं और स्कैनिंग तेज रखने के लिए pagination में विभाजित हैं।",
    archiveSummaryAria: "ब्लॉग आर्काइव सारांश",
    entriesLabel: "एंट्रीज़ (इस एनवायरनमेंट में)",
    activeTagsLabel: "सक्रिय टैग्स",
    postsPerPageLabel: "पोस्ट प्रति पेज",
    draftsVisibleLabel: "ड्राफ्ट्स (नॉन-प्रोडक्शन मोड में दृश्य)",
    emptyState: "अभी कोई ब्लॉग पोस्ट उपलब्ध नहीं है। `src/data/blog/` में एंट्री जोड़ें, आर्काइव स्वतः अपडेट होगा।",
    browseByTagTitle: "टैग से ब्राउज़ करें",
    browseByTagText: "टैग्स frontmatter से जनरेट होते हैं और समर्पित आर्काइव पेजों से जुड़े हैं।",
    tagsAria: "ब्लॉग टैग्स",
    latestPostsTitle: "नवीनतम पोस्ट",
    latestPostsText: "आर्काइव पेज 1 पर सबसे नई एंट्री पहले दिखाई जाती है।",
  },
  blogCard: {
    ...enCopy.blogCard,
    draft: "ड्राफ्ट",
    readArticle: "लेख पढ़ें",
    tagsForPrefix: "टैग्स:",
    coverAltPrefix: "कवर आर्टवर्क:",
  },
  blogPost: {
    ...enCopy.blogPost,
    backToAll: "सभी पोस्ट",
    eyebrow: "ब्लॉग पोस्ट",
    draftEntry: "ड्राफ्ट एंट्री",
    tagsAria: "पोस्ट टैग्स",
    continueReadingTitle: "पढ़ना जारी रखें",
    continueReadingText: "संबंधित थीम्स से जुड़े लेख।",
    coverAltPrefix: "कवर आर्टवर्क:",
  },
  blogTagPage: {
    ...enCopy.blogTagPage,
    backToAll: "सभी पोस्ट",
    eyebrow: "टैग आर्काइव",
    tagPrefix: "टैग",
    showingPostsPrefix: "दिखाए जा रहे हैं",
    showingPostsSuffixSingle: "पोस्ट इस थीम के साथ।",
    showingPostsSuffixPlural: "पोस्ट्स इस थीम के साथ।",
    relatedTagsAria: "संबंधित टैग्स",
    noPosts: "वर्तमान बिल्ड मोड में इस टैग के लिए कोई प्रकाशित पोस्ट नहीं है।",
    postsInArchive: "इस आर्काइव की पोस्ट्स",
  },
  blogArchivePage: {
    ...enCopy.blogArchivePage,
    backToLatest: "नवीनतम पोस्ट्स पर वापस जाएँ",
    eyebrow: "ब्लॉग आर्काइव",
    titlePrefix: "आर्काइव पेज",
    subtitle: "नवीनतम पहले, प्रति पेज {count} पोस्ट्स।",
    postsOnPageTitle: "इस पेज की पोस्ट्स",
  },
  blogPagination: {
    ...enCopy.blogPagination,
    aria: "ब्लॉग पेजिनेशन",
    newerPosts: "नई पोस्ट्स",
    olderPosts: "पुरानी पोस्ट्स",
    pageLabel: "पेज",
  },
};

export const siteCopy: Record<SiteLocale, SiteCopy> = {
  en: enCopy,
  it: itCopy,
  de: deCopy,
  fr: frCopy,
  zh: zhCopy,
  hi: hiCopy,
};

export function getCopy(locale: SiteLocale): SiteCopy {
  return siteCopy[locale] ?? siteCopy[DEFAULT_LOCALE];
}
