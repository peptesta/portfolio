export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  /** dimensioni reali dell'immagine (px) */
  imageWidth: number;
  imageHeight: number;
  liveUrl: string;
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
    imageWidth: 1822,
    imageHeight: 921,
    liveUrl: "https://ladespensadeeva.es",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "MONEI", "Brevo", "Vercel"],
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
    imageWidth: 1827,
    imageHeight: 930,
    liveUrl: "https://tanitterron.vercel.app",
    tags: ["Next.js", "React", "TypeScript", "CSS Modules", "Canvas 2D"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "ophryslens",
    title: "OphrysLens",
    description: "Orchid species identification platform",
    longDescription:
      "Full-stack platform that identifies six Ophrys orchid species from a photo, using ResNet-18 classifiers, an ensemble of one-vs-all models that rejects out-of-distribution images, and optional flower detection and cropping with Faster R-CNN. Explainability maps (Integrated Gradients, occlusion) show which parts of the image drive each prediction. Also includes a dataset-building tool with automatic bounding boxes, a manual box editor and ZIP export. Dockerized frontend and backend with 8 REST endpoints, benchmarked with accuracy, F1 and confusion matrices on four test sets (up to 99.2% accuracy).",
    image: "/projects/ophryslens.png",
    imageWidth: 1855,
    imageHeight: 889,
    liveUrl: "https://github.com/your-repo",
    tags: ["Next.js", "Flask", "PyTorch", "Captum", "Docker"],
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
    imageWidth: 1844,
    imageHeight: 956,
    liveUrl: "https://fisioabadia.vercel.app/",
    tags: ["Vue", "Supabase", "PostgreSQL", "Full-stack"],
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
    imageWidth: 400,
    imageHeight: 632,
    liveUrl: "https://github.com/peptesta/dontforgetyourfood",
    tags: ["FastAPI", "React", "TypeScript", "PostgreSQL", "PaddleOCR", "OpenCV", "Docker"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "brewmate",
    title: "BrewMate",
    description: "Craft beer analytics Progressive Web App",
    longDescription:
      "Progressive Web App processing 1.5M+ crowdsourced reviews. Built ETL pipelines for data cleaning and normalization, and geospatial analytics for localized pricing and availability insights.",
    image: "/projects/brewmate.png",
    imageWidth: 539,
    imageHeight: 774,
    liveUrl: "https://github.com/your-repo",
    tags: ["Vue", "PWA", "Python", "ETL", "Geospatial Analytics"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "keys-to-predict-divorce",
    title: "Keys to Predict Divorce",
    description: "Predictive analysis on behavioral survey data",
    longDescription:
      "Predictive and statistical analysis on behavioral survey datasets derived from the Gottman questionnaire: data cleaning, exploratory analysis, correlation studies and a machine learning model (Python, Scikit-learn) estimating divorce likelihood.",
    image: "/projects/gottmanspreview.png",
    imageWidth: 1577,
    imageHeight: 805,
    liveUrl: "https://github.com/your-repo",
    tags: ["Python", "Machine Learning", "Data Analysis", "Scikit-learn"],
    hasPDF: true,
    pdfUrl: "/projects/keystopredictdivorce.pdf",
  },
  {
    id: "big-five-analysis",
    title: "Big Five Personality Analysis",
    description: "Clustering analysis of personality survey data",
    longDescription:
      "Clustering analysis (K-means, hierarchical) on large-scale Big Five personality survey data, with data cleaning, exploratory analysis and statistical profiling of personality traits to identify behavioral patterns across groups.",
    image: "/projects/bigfive_preview.png",
    imageWidth: 1096,
    imageHeight: 613,
    liveUrl: "https://github.com/your-repo",
    tags: ["Python", "Data Analysis", "Clustering", "Pandas", "Scikit-learn"],
    hasPDF: true,
    pdfUrl: "/projects/Big_Five_presentation.pdf",
  },
];
