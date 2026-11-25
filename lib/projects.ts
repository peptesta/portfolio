export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  /** dimensioni reali dell'immagine (px) */
  imageWidth: number;
  imageHeight: number;
  /** sito, demo o codice; "" = nessun pulsante */
  liveUrl: string;
  role: string;
  client?: string;
  period?: string;
  status?: string;
  tags: string[];
  hasPDF: boolean;
  pdfUrl: string;
};

export const projects: Project[] = [
  {
    id: "la-despensa-de-eva",
    title: "La Despensa de Eva",
    description: "E-commerce & admin platform for a bakery",
    longDescription:
      "Production e-commerce and management platform for a bakery, built as sole developer: product catalog, custom-cake configurator, persistent cart, multi-step checkout with online payments and webhooks, extra payments and refunds, discount codes, delivery calendar and shipping zones, event/catering quotes with installment plans, brunch booking, blog and newsletter. Business rules live at database level (PostgreSQL triggers, RPCs and row-level security), with 11 scheduled jobs and a GitHub Actions to Vercel deploy pipeline. Includes a role-based admin area (27 sections) and an analytics dashboard with hand-made d3 charts. Over 100k lines of TypeScript, 64 pages and 81 SQL migrations. Also handled technical SEO (Search Console audit, JSON-LD, sitemap, product feed) and tracking tools (server-side GA4, Meta Pixel, Clarity, Brevo newsletters).",
    image: "/projects/ladespensadeeva.png",
    imageAlt:
      "La Despensa de Eva home page in Spanish: the baker plating a dish, the headline “Tartas que enamoran” and a Google review card",
    imageWidth: 1822,
    imageHeight: 921,
    liveUrl: "https://ladespensadeeva.es",
    role: "Solo developer",
    client: "La Despensa de Eva, Sant Feliu de Llobregat",
    period: "Feb 2026 — Present",
    status: "In production",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "MONEI", "Brevo", "Vercel", "PostgreSQL", "d3", "GitHub Actions", "GA4"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "tanit-terron",
    title: "Tanit Terron",
    description: "Landing website for an online emotional-support service",
    longDescription:
      "Single-page Spanish-language website for an online emotional-support service (in progress), with hand-built animations and no animation libraries: a canvas-drawn pastel line that turns into a scroll-driven paper plane, spring-physics text that reacts to the cursor, and a scroll-synced horizontal storytelling section. Responsive and respects reduced-motion preferences.",
    image: "/projects/tanitterron.png",
    imageAlt:
      "Tanit Terron landing page in Spanish: headline, hand-drawn illustration and a card with three steps to book a free call",
    imageWidth: 1827,
    imageHeight: 930,
    liveUrl: "https://tanitterron.vercel.app",
    role: "Solo design and development",
    status: "In progress",
    tags: ["Next.js", "React", "TypeScript", "CSS Modules", "Canvas 2D"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "ophryslens",
    title: "OphrysLens",
    description: "Orchid species identification platform",
    longDescription:
      "Bachelor's thesis project: a web platform that identifies six Ophrys taxa (exaltata, garganica, incubacea, majellensis, sphegodes and sphegodes Palena) with ResNet-18 classifiers, either a single six-class model or a one-vs-all ensemble, with optional Faster R-CNN cropping and explainability maps (Integrated Gradients, occlusion). The hybrid-trained model reached 87.8% accuracy; with automatic cropping its F1 rose from 88.2% to 91.9%. Also includes a dataset-building tool with automatic bounding boxes, a manual box editor and ZIP export. Dockerized frontend and backend with 8 REST endpoints.",
    image: "/projects/ophryslens.png",
    imageAlt:
      "OphrysLens welcome screen with a collage of close-up photos of Ophrys orchids",
    imageWidth: 1855,
    imageHeight: 889,
    liveUrl: "https://github.com/peptesta/OphrysLens",
    role: "Solo developer",
    tags: ["Next.js", "Flask", "PyTorch", "Captum", "Docker", "ResNet-18", "Faster R-CNN"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "fisioabadia",
    title: "FisioAbadia",
    description: "Physiotherapy clinic management web app",
    longDescription:
      "Full-stack web app for physiotherapy clinic management built with Vue and Supabase (Auth, PostgreSQL), including authentication, user management and automated appointment booking.",
    image: "/projects/fisioabadia.png",
    imageAlt:
      "FisioAbadia home page in Italian: physiotherapy and neurological rehabilitation in Naples, over a photo of a treatment session",
    imageWidth: 1844,
    imageHeight: 956,
    liveUrl: "https://fisioabadia.vercel.app/",
    role: "Solo developer",
    status: "Demo",
    tags: ["Vue", "Supabase", "PostgreSQL"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "dont-forget-your-food",
    title: "Don't Forget Your Food",
    description: "Food expiry tracker with OCR photo and receipt scanning",
    longDescription:
      "Mobile-first web app that helps households avoid food waste by tracking product expiry dates. Users photograph a product's name and expiry date, or upload a grocery receipt, and a self-hosted OCR pipeline (PaddleOCR with OpenCV preprocessing) extracts the data for review before saving. The receipt flow parses product lines, merges overlapping photos and fuzzy-matches items against an Open Food Facts catalog while filtering out non-food lines. OCR runs in a pool of worker processes with the model preloaded, with batch progress streamed to the UI via Server-Sent Events. A daily scheduled job emails users about products expiring in 1 or 3 days. FastAPI backend with async SQLAlchemy on PostgreSQL, JWT access/refresh tokens, 91 backend tests, Alembic migrations, and Docker images published by GitHub Actions.",
    image: "/projects/dontforgetyourfood.png",
    imageAlt:
      "Mobile view of an empty pantry, in Spanish, with buttons to add photos or upload a receipt",
    imageWidth: 400,
    imageHeight: 632,
    liveUrl: "https://github.com/peptesta/dontforgetyourfood",
    role: "Solo developer",
    status: "In progress",
    tags: ["FastAPI", "React", "TypeScript", "PostgreSQL", "PaddleOCR", "OpenCV", "Docker", "SQLAlchemy", "Alembic", "GitHub Actions"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "keys-to-predict-divorce",
    title: "Keys to Predict Divorce",
    description: "Predictive analysis on behavioral survey data",
    longDescription:
      "Analysis of the Divorce Predictors Scale: 54 questions answered by 150 couples in Turkey. Questions about shared values, roles and sudden escalation correlate most with divorce. Includes a linear regression model in scikit-learn (R² 0.89 on test data). Limits: small single-country sample, self-reported answers, correlation is not causation.",
    image: "/projects/gottmanspreview.png",
    imageAlt:
      "Title slide “The keys to predict a divorce” over a snowy mountain landscape",
    imageWidth: 1577,
    imageHeight: 805,
    liveUrl: "https://www.kaggle.com/code/peppetesta/divorce-analysis",
    role: "Solo project",
    tags: ["Python", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib", "Data Analytics"],
    hasPDF: true,
    pdfUrl: "/projects/keystopredictdivorce.pdf",
  },
  {
    id: "w1seguy-thm-writeup",
    title: "W1seGuy – TryHackMe CTF Write-up",
    description: "Cryptography CTF write-up: breaking a repeating-key XOR",
    longDescription:
      "Write-up of W1seGuy, an Easy cryptography challenge on TryHackMe. A Python network service encodes the flag with a short repeating XOR key; since the flag format is known, a known-plaintext attack recovers the key, which I automated with a Python script. Main takeaways: keys need a cryptographically secure generator, and encoding, encryption and hashing are different things. Part of my hands-on practice while studying for CompTIA Security+; the full details are in the repository.",
    image: "/projects/w1seguy.png",
    imageAlt:
      "Terminal showing an Nmap scan, a Netcat session and a Python script recovering the XOR key, with key and flag masked",
    imageWidth: 1600,
    imageHeight: 820,
    liveUrl: "https://github.com/peptesta/thm-writeups/tree/main/W1seGuy",
    role: "Solo project",
    period: "November 2026",
    tags: ["CTF", "TryHackMe", "Cryptography", "XOR", "Python", "Write-up"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "big-five-analysis",
    title: "Big Five Personality Analysis",
    description: "Statistical analysis of personality survey data",
    longDescription:
      "Analysis of Big Five (IPIP) questionnaire responses collected online in 2016–2018: correlations between traits, differences across world regions, comparison with Hofstede's cultural dimensions (individualism vs openness, r = 0.50) and variation by time of day.",
    image: "/projects/bigfive_preview.png",
    imageAlt:
      "Title slide “Big Five Insight” with a line drawing of a head in profile and watercolour shapes",
    imageWidth: 1096,
    imageHeight: 613,
    liveUrl: "",
    role: "Solo project",
    tags: ["Python", "Data Analysis", "Pandas"],
    hasPDF: true,
    pdfUrl: "/projects/Big_Five_presentation.pdf",
  },
];
