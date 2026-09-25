import type { SiteLocale } from "./i18n";

interface Titled {
  title: string;
  text: string;
}

export interface HomeCopy {
  hero: {
    lines: [string, string];
    intro: string;
    primary: string;
    secondary: string;
    note: string;
    building: string;
    buildingSuffix: string;
  };
  what: {
    title: string;
    lead: string;
    cards: Array<Titled & { bubble: string }>;
    workflow: Titled[];
  };
  casus: {
    title: string;
    lead: string;
    highlights: Titled[];
    note: string;
  };
  work: {
    title: string;
    lead: string;
    wordAgent: Titled;
    harness: Titled;
    wasmspace: Titled & { flow: [string, string, string]; note: string };
    readProject: string;
    source: string;
    allProjects: string;
    writingTitle: string;
    allPosts: string;
  };
  toolkit: {
    title: string;
    lead: string;
    quote: string;
    quoteBy: string;
    alsoUsing: string;
  };
  about: {
    title: string;
    personal: string;
    facts: Array<{ label: string; value: string }>;
    note: string;
  };
  contact: {
    title: string;
    lead: string;
    emailLabel: string;
    note: string;
  };
}

const en: HomeCopy = {
  hero: {
    lines: ["AI that", "does real work."],
    intro:
      "I'm Manuel Cecchetto, AI engineer and startupper. I build harnesses, agents and tools that survive contact with real users.",
    primary: "See my work",
    secondary: "Get in touch",
    note: "hi, that's me!",
    building: "Currently building",
    buildingSuffix: "AI for lawyers, right inside Word.",
  },
  what: {
    title: "What I actually do.",
    lead: "Three things, done properly, over and over again.",
    cards: [
      {
        title: "Build AI harnesses",
        text: "Evaluation, red teaming, tracing and tooling, so a model behaves on Friday night the way it did in the demo.",
        bubble: "Is it good? Let's measure.",
      },
      {
        title: "Create AI agents",
        text: "Agents that read, reason and act inside real software: Word documents, APIs, messy inboxes.",
        bubble: "tool_call → done",
      },
      {
        title: "Ship products",
        text: "From prototype to real users. Architecture, frontend, and the unglamorous reliability work in between.",
        bubble: "Shipped. On a Friday.",
      },
    ],
    workflow: [
      { title: "Evaluate", text: "Measure before you believe." },
      { title: "Iterate", text: "Tight loops, real traces." },
      { title: "Deploy", text: "Boring, observable releases." },
      { title: "Open", text: "Share what we learn." },
    ],
  },
  casus: {
    title: "Where I spend my days.",
    lead: "At CASUS we build AI that drafts and reviews contracts without ever leaving Microsoft Word. I've led CASUS Create and CASUS Review end to end, from the parser up to the pixels.",
    highlights: [
      {
        title: "CASUS Review",
        text: "An agent that walks a contract clause by clause, flags risk and proposes tracked-change redlines.",
      },
      {
        title: "CASUS Create",
        text: "Contract drafting from templates and questionnaires, generated straight into clean .docx.",
      },
      {
        title: "Our own .docx engine",
        text: "An in-house .docx → JSON parser that replaced Aspose. Still running in production.",
      },
    ],
    note: "real product, real lawyers",
  },
  work: {
    title: "Selected work.",
    lead: "Things I built that do real work.",
    wordAgent: {
      title: "Word Agent",
      text: "An agent living in the Word task pane: it reads the document, plans the edits and applies them as tracked changes.",
    },
    harness: {
      title: "AI Harnesses",
      text: "Eval suites, trace forensics and red-teaming loops that keep prompts and models honest in production.",
    },
    wasmspace: {
      title: "wasmspace",
      text: "A zero-backend AI code interpreter: the model plans, Python runs sandboxed in the browser, and your files live in the browser, not on a server.",
      flow: ["model plans", "Python works", "OPFS keeps"],
      note: "runs in your tab!",
    },
    readProject: "Read the case study",
    source: "Source",
    allProjects: "All projects",
    writingTitle: "Writing.",
    allPosts: "All posts",
  },
  toolkit: {
    title: "The toolkit.",
    lead: "What's usually open on my screen.",
    quote: "Better tools make better thinking.",
    quoteBy: "Me, probably.",
    alsoUsing: "Also in rotation",
  },
  about: {
    title: "Always a startupper.",
    personal:
      "Based in Rome. Off the keyboard you'll find me chasing good coffee, playing video games or at the gym, usually in that order.",
    facts: [
      { label: "Based in", value: "Rome, Italy" },
      { label: "Shipping since", value: "2020" },
      { label: "Fuel", value: "Espresso" },
    ],
    note: "psst… I read every email",
  },
  contact: {
    title: "Let's build something cool.",
    lead: "Got a hard problem involving AI, documents or agents? Or just want to talk shop? My inbox is open.",
    emailLabel: "Write me an email",
    note: "coffee's on me",
  },
};

const it: HomeCopy = {
  hero: {
    lines: ["AI che", "lavora davvero."],
    intro:
      "Sono Manuel Cecchetto, AI engineer e startupper. Costruisco harness, agenti e strumenti che reggono l'incontro con utenti veri.",
    primary: "Guarda i progetti",
    secondary: "Scrivimi",
    note: "ciao, sono io!",
    building: "Ora sto costruendo",
    buildingSuffix: "AI per avvocati, direttamente dentro Word.",
  },
  what: {
    title: "Cosa faccio davvero.",
    lead: "Tre cose, fatte bene, ancora e ancora.",
    cards: [
      {
        title: "Costruisco harness AI",
        text: "Valutazione, red teaming, tracing e tooling, così un modello si comporta il venerdì sera come nella demo.",
        bubble: "Funziona? Misuriamolo.",
      },
      {
        title: "Creo agenti AI",
        text: "Agenti che leggono, ragionano e agiscono dentro software reale: documenti Word, API, inbox caotiche.",
        bubble: "tool_call → fatto",
      },
      {
        title: "Rilascio prodotti",
        text: "Dal prototipo agli utenti veri. Architettura, frontend e tutto il lavoro poco glamour sull'affidabilità.",
        bubble: "Rilasciato. Di venerdì.",
      },
    ],
    workflow: [
      { title: "Valuta", text: "Misura prima di crederci." },
      { title: "Itera", text: "Cicli stretti, trace reali." },
      { title: "Rilascia", text: "Release noiose e osservabili." },
      { title: "Condividi", text: "Racconta cosa impari." },
    ],
  },
  casus: {
    title: "Dove passo le mie giornate.",
    lead: "In CASUS costruiamo AI che redige e rivede contratti senza mai uscire da Microsoft Word. Ho guidato CASUS Create e CASUS Review dall'inizio alla fine, dal parser fino ai pixel.",
    highlights: [
      {
        title: "CASUS Review",
        text: "Un agente che attraversa il contratto clausola per clausola, segnala i rischi e propone modifiche in revisione.",
      },
      {
        title: "CASUS Create",
        text: "Redazione di contratti da template e questionari, generati direttamente in .docx puliti.",
      },
      {
        title: "Il nostro motore .docx",
        text: "Un parser .docx → JSON interno che ha sostituito Aspose. Ancora in produzione.",
      },
    ],
    note: "prodotto vero, avvocati veri",
  },
  work: {
    title: "Progetti scelti.",
    lead: "Cose che ho costruito e che lavorano davvero.",
    wordAgent: {
      title: "Word Agent",
      text: "Un agente che vive nel riquadro attività di Word: legge il documento, pianifica le modifiche e le applica come revisioni.",
    },
    harness: {
      title: "AI Harness",
      text: "Suite di eval, analisi dei trace e cicli di red teaming che tengono onesti prompt e modelli in produzione.",
    },
    wasmspace: {
      title: "wasmspace",
      text: "Un code interpreter AI senza backend: il modello pianifica, Python gira in sandbox nel browser e i file vivono nel browser, non su un server.",
      flow: ["il modello pianifica", "Python lavora", "OPFS conserva"],
      note: "gira nel browser!",
    },
    readProject: "Leggi il case study",
    source: "Codice",
    allProjects: "Tutti i progetti",
    writingTitle: "Scritti.",
    allPosts: "Tutti gli articoli",
  },
  toolkit: {
    title: "La cassetta degli attrezzi.",
    lead: "Quello che di solito è aperto sul mio schermo.",
    quote: "Strumenti migliori, pensieri migliori.",
    quoteBy: "Io, probabilmente.",
    alsoUsing: "Anche in rotazione",
  },
  about: {
    title: "Startupper, sempre.",
    personal:
      "Vivo a Roma. Lontano dalla tastiera mi trovi a caccia di un buon caffè, ai videogiochi o in palestra, di solito in quest'ordine.",
    facts: [
      { label: "Base", value: "Roma, Italia" },
      { label: "Rilascio dal", value: "2020" },
      { label: "Carburante", value: "Espresso" },
    ],
    note: "psst… leggo ogni email",
  },
  contact: {
    title: "Costruiamo qualcosa di bello.",
    lead: "Hai un problema difficile con AI, documenti o agenti? O vuoi solo fare due chiacchiere tecniche? La mia inbox è aperta.",
    emailLabel: "Scrivimi un'email",
    note: "il caffè lo offro io",
  },
};

const de: HomeCopy = {
  hero: {
    lines: ["KI, die", "echte Arbeit macht."],
    intro:
      "Ich bin Manuel Cecchetto, AI Engineer und Startupper. Ich baue Harnesses, Agenten und Tools, die den Kontakt mit echten Nutzern überstehen.",
    primary: "Meine Arbeit",
    secondary: "Kontakt aufnehmen",
    note: "hallo, das bin ich!",
    building: "Aktuell baue ich",
    buildingSuffix: "KI für Anwälte, direkt in Word.",
  },
  what: {
    title: "Was ich wirklich mache.",
    lead: "Drei Dinge, ordentlich gemacht, immer wieder.",
    cards: [
      {
        title: "KI-Harnesses bauen",
        text: "Evaluation, Red Teaming, Tracing und Tooling, damit sich ein Modell am Freitagabend so verhält wie in der Demo.",
        bubble: "Ist es gut? Messen wir's.",
      },
      {
        title: "KI-Agenten entwickeln",
        text: "Agenten, die in echter Software lesen, denken und handeln: Word-Dokumente, APIs, chaotische Postfächer.",
        bubble: "tool_call → erledigt",
      },
      {
        title: "Produkte ausliefern",
        text: "Vom Prototyp zu echten Nutzern. Architektur, Frontend und die unglamouröse Zuverlässigkeitsarbeit dazwischen.",
        bubble: "Live. An einem Freitag.",
      },
    ],
    workflow: [
      { title: "Evaluieren", text: "Erst messen, dann glauben." },
      { title: "Iterieren", text: "Kurze Schleifen, echte Traces." },
      { title: "Deployen", text: "Langweilige, beobachtbare Releases." },
      { title: "Teilen", text: "Weitergeben, was wir lernen." },
    ],
  },
  casus: {
    title: "Wo ich meine Tage verbringe.",
    lead: "Bei CASUS bauen wir KI, die Verträge entwirft und prüft, ohne Microsoft Word je zu verlassen. Ich habe CASUS Create und CASUS Review Ende-zu-Ende geleitet, vom Parser bis zu den Pixeln.",
    highlights: [
      {
        title: "CASUS Review",
        text: "Ein Agent, der den Vertrag Klausel für Klausel durchgeht, Risiken markiert und Änderungen im Überarbeitungsmodus vorschlägt.",
      },
      {
        title: "CASUS Create",
        text: "Vertragserstellung aus Vorlagen und Fragebögen, direkt als saubere .docx generiert.",
      },
      {
        title: "Eigene .docx-Engine",
        text: "Ein hauseigener .docx → JSON-Parser, der Aspose ersetzt hat. Läuft weiterhin in Produktion.",
      },
    ],
    note: "echtes Produkt, echte Anwälte",
  },
  work: {
    title: "Ausgewählte Arbeit.",
    lead: "Dinge, die ich gebaut habe und die echte Arbeit leisten.",
    wordAgent: {
      title: "Word Agent",
      text: "Ein Agent im Word-Aufgabenbereich: Er liest das Dokument, plant Änderungen und setzt sie als nachverfolgte Änderungen um.",
    },
    harness: {
      title: "KI-Harnesses",
      text: "Eval-Suites, Trace-Forensik und Red-Teaming-Schleifen, die Prompts und Modelle in Produktion ehrlich halten.",
    },
    wasmspace: {
      title: "wasmspace",
      text: "Ein KI-Code-Interpreter ohne Backend: Das Modell plant, Python läuft in einer Sandbox im Browser, und die Dateien liegen im Browser, nicht auf einem Server.",
      flow: ["Modell plant", "Python arbeitet", "OPFS bewahrt"],
      note: "läuft im Tab!",
    },
    readProject: "Zur Fallstudie",
    source: "Quellcode",
    allProjects: "Alle Projekte",
    writingTitle: "Geschrieben.",
    allPosts: "Alle Beiträge",
  },
  toolkit: {
    title: "Der Werkzeugkasten.",
    lead: "Was normalerweise auf meinem Bildschirm offen ist.",
    quote: "Bessere Werkzeuge, besseres Denken.",
    quoteBy: "Ich, vermutlich.",
    alsoUsing: "Ebenfalls im Einsatz",
  },
  about: {
    title: "Für immer Startupper.",
    personal:
      "Ich lebe in Rom. Abseits der Tastatur jage ich gutem Kaffee hinterher, spiele Videospiele oder bin im Gym, meistens in dieser Reihenfolge.",
    facts: [
      { label: "Basis", value: "Rom, Italien" },
      { label: "Liefert seit", value: "2020" },
      { label: "Treibstoff", value: "Espresso" },
    ],
    note: "psst… ich lese jede E-Mail",
  },
  contact: {
    title: "Lass uns etwas Cooles bauen.",
    lead: "Ein kniffliges Problem mit KI, Dokumenten oder Agenten? Oder einfach Lust auf Fachsimpeln? Mein Postfach ist offen.",
    emailLabel: "Schreib mir eine E-Mail",
    note: "der Kaffee geht auf mich",
  },
};

const fr: HomeCopy = {
  hero: {
    lines: ["Une IA qui", "fait du vrai travail."],
    intro:
      "Je suis Manuel Cecchetto, AI engineer et startuppeur. Je construis des harnais, des agents et des outils qui résistent aux vrais utilisateurs.",
    primary: "Voir mon travail",
    secondary: "Me contacter",
    note: "salut, c'est moi !",
    building: "En ce moment je construis",
    buildingSuffix: "l'IA pour juristes, directement dans Word.",
  },
  what: {
    title: "Ce que je fais vraiment.",
    lead: "Trois choses, bien faites, encore et encore.",
    cards: [
      {
        title: "Construire des harnais IA",
        text: "Évaluation, red teaming, tracing et outillage, pour qu'un modèle se comporte le vendredi soir comme pendant la démo.",
        bubble: "C'est bon ? Mesurons.",
      },
      {
        title: "Créer des agents IA",
        text: "Des agents qui lisent, raisonnent et agissent dans de vrais logiciels : documents Word, API, boîtes mail en désordre.",
        bubble: "tool_call → fait",
      },
      {
        title: "Livrer des produits",
        text: "Du prototype aux vrais utilisateurs. Architecture, frontend et tout le travail de fiabilité peu glamour entre les deux.",
        bubble: "Livré. Un vendredi.",
      },
    ],
    workflow: [
      { title: "Évaluer", text: "Mesurer avant de croire." },
      { title: "Itérer", text: "Boucles courtes, vraies traces." },
      { title: "Déployer", text: "Des releases ennuyeuses et observables." },
      { title: "Partager", text: "Transmettre ce qu'on apprend." },
    ],
  },
  casus: {
    title: "Là où je passe mes journées.",
    lead: "Chez CASUS, nous construisons une IA qui rédige et relit des contrats sans jamais quitter Microsoft Word. J'ai mené CASUS Create et CASUS Review de bout en bout, du parseur jusqu'aux pixels.",
    highlights: [
      {
        title: "CASUS Review",
        text: "Un agent qui parcourt le contrat clause par clause, signale les risques et propose des modifications en suivi.",
      },
      {
        title: "CASUS Create",
        text: "Rédaction de contrats à partir de modèles et de questionnaires, générés directement en .docx propres.",
      },
      {
        title: "Notre propre moteur .docx",
        text: "Un parseur .docx → JSON maison qui a remplacé Aspose. Toujours en production.",
      },
    ],
    note: "vrai produit, vrais juristes",
  },
  work: {
    title: "Travaux choisis.",
    lead: "Des choses que j'ai construites et qui font du vrai travail.",
    wordAgent: {
      title: "Word Agent",
      text: "Un agent qui vit dans le volet Word : il lit le document, planifie les modifications et les applique en suivi des modifications.",
    },
    harness: {
      title: "Harnais IA",
      text: "Suites d'évaluation, analyse de traces et boucles de red teaming qui gardent prompts et modèles honnêtes en production.",
    },
    wasmspace: {
      title: "wasmspace",
      text: "Un code interpreter IA sans backend : le modèle planifie, Python tourne en sandbox dans le navigateur, et les fichiers vivent dans le navigateur, pas sur un serveur.",
      flow: ["le modèle planifie", "Python exécute", "OPFS conserve"],
      note: "tourne dans l'onglet !",
    },
    readProject: "Lire l'étude de cas",
    source: "Code source",
    allProjects: "Tous les projets",
    writingTitle: "Écrits.",
    allPosts: "Tous les articles",
  },
  toolkit: {
    title: "La boîte à outils.",
    lead: "Ce qui est généralement ouvert sur mon écran.",
    quote: "De meilleurs outils, de meilleures idées.",
    quoteBy: "Moi, probablement.",
    alsoUsing: "Aussi dans la rotation",
  },
  about: {
    title: "Toujours startuppeur.",
    personal:
      "Je vis à Rome. Loin du clavier, je cherche un bon café, je joue aux jeux vidéo ou je suis à la salle, généralement dans cet ordre.",
    facts: [
      { label: "Basé à", value: "Rome, Italie" },
      { label: "Livre depuis", value: "2020" },
      { label: "Carburant", value: "Espresso" },
    ],
    note: "psst… je lis chaque e-mail",
  },
  contact: {
    title: "Construisons quelque chose de cool.",
    lead: "Un problème difficile avec de l'IA, des documents ou des agents ? Ou simplement envie de parler technique ? Ma boîte mail est ouverte.",
    emailLabel: "M'écrire un e-mail",
    note: "le café est pour moi",
  },
};

const zh: HomeCopy = {
  hero: {
    lines: ["让 AI", "真正干活。"],
    intro: "我是 Manuel Cecchetto，AI 工程师和创业者。我构建经得起真实用户考验的评测框架、智能体和工具。",
    primary: "看看我的作品",
    secondary: "联系我",
    note: "嗨，这就是我！",
    building: "目前在做",
    buildingSuffix: "为律师打造的 AI，直接在 Word 里。",
  },
  what: {
    title: "我真正在做的事。",
    lead: "三件事，认真做好，一遍又一遍。",
    cards: [
      {
        title: "构建 AI 评测框架",
        text: "评估、红队测试、链路追踪和工具链，让模型在周五晚上和演示时表现一致。",
        bubble: "好不好？量一下。",
      },
      {
        title: "打造 AI 智能体",
        text: "在真实软件中阅读、推理并行动的智能体：Word 文档、API、杂乱的收件箱。",
        bubble: "tool_call → 完成",
      },
      {
        title: "交付产品",
        text: "从原型到真实用户。架构、前端，以及中间所有不起眼却关键的稳定性工作。",
        bubble: "上线了。在周五。",
      },
    ],
    workflow: [
      { title: "评估", text: "先测量，再相信。" },
      { title: "迭代", text: "短循环，真链路。" },
      { title: "部署", text: "平稳、可观测的发布。" },
      { title: "开放", text: "分享我们学到的。" },
    ],
  },
  casus: {
    title: "我每天待的地方。",
    lead: "在 CASUS，我们打造无需离开 Microsoft Word 就能起草和审阅合同的 AI。我端到端主导了 CASUS Create 和 CASUS Review，从解析器一直到像素。",
    highlights: [
      { title: "CASUS Review", text: "逐条审阅合同的智能体，标记风险并以修订模式提出修改建议。" },
      { title: "CASUS Create", text: "基于模板和问卷起草合同，直接生成干净的 .docx。" },
      { title: "自研 .docx 引擎", text: "自研的 .docx → JSON 解析器，取代了 Aspose，至今仍在生产环境运行。" },
    ],
    note: "真实产品，真实律师",
  },
  work: {
    title: "精选作品。",
    lead: "我构建的、真正在干活的东西。",
    wordAgent: {
      title: "Word Agent",
      text: "住在 Word 任务窗格里的智能体：阅读文档、规划修改，并以修订形式应用。",
    },
    harness: {
      title: "AI 评测框架",
      text: "评测套件、链路取证和红队循环，让生产环境中的提示词和模型保持可靠。",
    },
    wasmspace: {
      title: "wasmspace",
      text: "零后端的 AI 代码解释器：模型负责规划，Python 在浏览器沙箱中运行，文件保存在浏览器中，而不是服务器上。",
      flow: ["模型规划", "Python 执行", "OPFS 保存"],
      note: "就在标签页里跑！",
    },
    readProject: "阅读案例",
    source: "源码",
    allProjects: "全部项目",
    writingTitle: "文章。",
    allPosts: "全部文章",
  },
  toolkit: {
    title: "工具箱。",
    lead: "我屏幕上通常开着的东西。",
    quote: "更好的工具，带来更好的思考。",
    quoteBy: "我，大概吧。",
    alsoUsing: "也常用",
  },
  about: {
    title: "永远是创业者。",
    personal: "住在罗马。离开键盘时，我通常在找好咖啡、玩电子游戏或者在健身房，大概就是这个顺序。",
    facts: [
      { label: "所在地", value: "意大利罗马" },
      { label: "交付始于", value: "2020" },
      { label: "燃料", value: "浓缩咖啡" },
    ],
    note: "悄悄说……每封邮件我都会看",
  },
  contact: {
    title: "一起做点酷的东西吧。",
    lead: "有关于 AI、文档或智能体的难题？或者只是想聊聊技术？我的收件箱随时开放。",
    emailLabel: "给我写邮件",
    note: "咖啡我请",
  },
};

const hi: HomeCopy = {
  hero: {
    lines: ["AI जो", "असली काम करे।"],
    intro:
      "मैं Manuel Cecchetto हूँ, AI इंजीनियर और स्टार्टअपर। मैं ऐसे हार्नेस, एजेंट और टूल बनाता हूँ जो असली यूज़र्स के सामने टिके रहें।",
    primary: "मेरा काम देखें",
    secondary: "संपर्क करें",
    note: "हाय, ये मैं हूँ!",
    building: "अभी बना रहा हूँ",
    buildingSuffix: "वकीलों के लिए AI, सीधे Word के अंदर।",
  },
  what: {
    title: "मैं असल में क्या करता हूँ।",
    lead: "तीन काम, सही तरीके से, बार-बार।",
    cards: [
      {
        title: "AI हार्नेस बनाना",
        text: "इवैल्यूएशन, रेड टीमिंग, ट्रेसिंग और टूलिंग, ताकि मॉडल शुक्रवार रात भी वैसा ही चले जैसा डेमो में चला।",
        bubble: "अच्छा है? नापते हैं।",
      },
      {
        title: "AI एजेंट बनाना",
        text: "ऐसे एजेंट जो असली सॉफ़्टवेयर में पढ़ें, सोचें और काम करें: Word दस्तावेज़, API, बिखरे इनबॉक्स।",
        bubble: "tool_call → हो गया",
      },
      {
        title: "प्रोडक्ट शिप करना",
        text: "प्रोटोटाइप से असली यूज़र्स तक। आर्किटेक्चर, फ्रंटएंड और बीच का सारा भरोसेमंदी वाला काम।",
        bubble: "शिप हो गया। शुक्रवार को।",
      },
    ],
    workflow: [
      { title: "मूल्यांकन", text: "मानने से पहले मापो।" },
      { title: "सुधार", text: "छोटे लूप, असली ट्रेस।" },
      { title: "डिप्लॉय", text: "शांत, ऑब्ज़र्वेबल रिलीज़।" },
      { title: "साझा", text: "जो सीखा, वो बाँटो।" },
    ],
  },
  casus: {
    title: "जहाँ मेरे दिन बीतते हैं।",
    lead: "CASUS में हम ऐसा AI बनाते हैं जो Microsoft Word छोड़े बिना कॉन्ट्रैक्ट ड्राफ़्ट और रिव्यू करता है। मैंने CASUS Create और CASUS Review को शुरू से अंत तक लीड किया है, पार्सर से पिक्सल तक।",
    highlights: [
      {
        title: "CASUS Review",
        text: "एक एजेंट जो कॉन्ट्रैक्ट को क्लॉज़-दर-क्लॉज़ पढ़ता है, जोखिम बताता है और ट्रैक्ड चेंज के रूप में सुधार सुझाता है।",
      },
      {
        title: "CASUS Create",
        text: "टेम्पलेट और प्रश्नावली से कॉन्ट्रैक्ट ड्राफ़्टिंग, सीधे साफ़ .docx में।",
      },
      {
        title: "हमारा अपना .docx इंजन",
        text: "इन-हाउस .docx → JSON पार्सर जिसने Aspose की जगह ली। आज भी प्रोडक्शन में चल रहा है।",
      },
    ],
    note: "असली प्रोडक्ट, असली वकील",
  },
  work: {
    title: "चुनिंदा काम।",
    lead: "मेरी बनाई चीज़ें जो असली काम करती हैं।",
    wordAgent: {
      title: "Word Agent",
      text: "Word टास्क पेन में रहने वाला एजेंट: दस्तावेज़ पढ़ता है, बदलाव प्लान करता है और उन्हें ट्रैक्ड चेंज के रूप में लागू करता है।",
    },
    harness: {
      title: "AI हार्नेस",
      text: "इवैल सूट, ट्रेस फ़ॉरेंसिक्स और रेड टीमिंग लूप जो प्रोडक्शन में प्रॉम्प्ट और मॉडल को ईमानदार रखते हैं।",
    },
    wasmspace: {
      title: "wasmspace",
      text: "बिना बैकएंड वाला AI कोड इंटरप्रेटर: मॉडल योजना बनाता है, Python ब्राउज़र के सैंडबॉक्स में चलता है, और फ़ाइलें सर्वर पर नहीं, ब्राउज़र में रहती हैं।",
      flow: ["मॉडल योजना बनाता है", "Python काम करता है", "OPFS सहेजता है"],
      note: "टैब में चलता है!",
    },
    readProject: "केस स्टडी पढ़ें",
    source: "सोर्स",
    allProjects: "सभी प्रोजेक्ट्स",
    writingTitle: "लेख।",
    allPosts: "सभी पोस्ट",
  },
  toolkit: {
    title: "टूलकिट।",
    lead: "जो आमतौर पर मेरी स्क्रीन पर खुला रहता है।",
    quote: "बेहतर टूल, बेहतर सोच।",
    quoteBy: "मैं, शायद।",
    alsoUsing: "ये भी इस्तेमाल में",
  },
  about: {
    title: "हमेशा स्टार्टअपर।",
    personal:
      "रोम में रहता हूँ। कीबोर्ड से दूर मैं अच्छी कॉफ़ी ढूँढता हूँ, वीडियो गेम खेलता हूँ या जिम में होता हूँ, अक्सर इसी क्रम में।",
    facts: [
      { label: "स्थान", value: "रोम, इटली" },
      { label: "शिपिंग शुरू", value: "2020" },
      { label: "ईंधन", value: "एस्प्रेसो" },
    ],
    note: "psst… मैं हर ईमेल पढ़ता हूँ",
  },
  contact: {
    title: "चलो कुछ कूल बनाते हैं।",
    lead: "AI, दस्तावेज़ों या एजेंट्स से जुड़ी कोई मुश्किल समस्या है? या बस टेक पर बात करनी है? मेरा इनबॉक्स खुला है।",
    emailLabel: "मुझे ईमेल लिखें",
    note: "कॉफ़ी मेरी तरफ़ से",
  },
};

const homeCopy: Record<SiteLocale, HomeCopy> = { en, it, de, fr, zh, hi };

export function getHomeCopy(locale: SiteLocale): HomeCopy {
  return homeCopy[locale] ?? en;
}
