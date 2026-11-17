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
    description: "Full-stack web development & data management",
    longDescription:
      "Full-stack development and data engineering for an internationally distributed e-commerce platform. Managed the migration and structured handling of over 5,000 user profiles, architecting highly optimized relational tables and writing ultra-fast SQL queries (on Supabase/PostgreSQL) to ensure sub-second response times globally. Designed and maintained complex internal data structures within a custom admin panel, enabling centralized real-time management of user profiles, shopping carts, delivery addresses, and business performance analytics. Implemented optimistic update strategies across the UI, delivering a highly fluid and responsive user experience even under high concurrent load. Developed and enhanced a booking management system, streamlining operational workflows and improving the overall user journey. Built interactive analytics dashboards to track website performance, user behavior, and key business metrics, driving data-informed decision-making. Implemented organic SEO strategies (leveraging IBM SEO certification) and web performance optimizations, significantly improving online visibility and page load times.",
    image: "/projects/ladespensadeeva.png",
    imageWidth: 1822,
    imageHeight: 921,
    liveUrl: "https://ladespensadeeva.vercel.app/",
    tags: [
      "Vue",
      "Supabase",
      "PostgreSQL",
      "Data Engineering",
      "Admin Panel",
      "Performance Optimization",
    ],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "fisioabadia",
    title: "FisioAbadia",
    description: "Physiotherapy clinic management web app",
    longDescription:
      "A full-stack web application developed for physiotherapy clinic management using Vue and Supabase. The platform includes authentication, user management, appointment booking with automated confirmations and reminders, and comprehensive data management. Implemented complex relational database schemas and managed thousands of user profiles directly on the database layer. The interface was designed to be fully responsive and optimized for both desktop and mobile devices, providing a smooth experience for patients and staff.",
    image: "/projects/fisioabadia.png",
    imageWidth: 1844,
    imageHeight: 956,
    liveUrl: "https://fisioabadia.vercel.app/",
    tags: ["Vue", "Supabase", "PostgreSQL", "Full-stack"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "ophryslens",
    title: "OphrysLens",
    description: "Botanical image classification platform",
    longDescription:
      "Designed and developed a full-stack web platform for interactive botanical image classification using Next.js and Flask. Integrated computer vision models for object detection and image classification via backend APIs. Implemented real-time user feedback loops with smart image cropping and correction systems, showcasing robust API design and backend engineering skills.",
    image: "/projects/ophryslens.png",
    imageWidth: 1855,
    imageHeight: 889,
    liveUrl: "https://github.com/your-repo",
    tags: ["Next.js", "Flask", "PyTorch", "Docker", "Computer Vision"],
    hasPDF: false,
    pdfUrl: "",
  },
  {
    id: "keys-to-predict-divorce",
    title: "Keys to Predict Divorce",
    description: "Machine learning project for divorce prediction",
    longDescription:
      "A machine learning and data analysis project based on behavioral survey datasets derived from the Gottman questionnaire. The project involved data cleaning, exploratory analysis, and statistical correlation studies to identify behavioral patterns. A predictive model was developed to estimate divorce likelihood using machine learning techniques (Python, Scikit-learn).",
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
    description: "Personality dataset analysis project",
    longDescription:
      "A data analysis project focused on large-scale personality survey datasets based on the Big Five psychological model. The work included data cleaning, exploratory analysis, and statistical profiling of personality traits. Clustering techniques (K-means, hierarchical) were applied to identify behavioral patterns and demographic trends across groups.",
    image: "/projects/bigfive_preview.png",
    imageWidth: 1096,
    imageHeight: 613,
    liveUrl: "https://github.com/your-repo",
    tags: ["Python", "Data Analysis", "Clustering", "Pandas", "Scikit-learn"],
    hasPDF: true,
    pdfUrl: "/projects/Big_Five_presentation.pdf",
  },
  {
    id: "tanit-terron",
    title: "Tanit Terron",
    description: "Psychologist website with a hand-drawn identity",
    longDescription:
      "Website for a psychologist, built to present her practice and her new way of making commitments with patients. Designed a playful hand-drawn aesthetic (custom SVG filters) while keeping the interface accessible for patients of all ages, and modelled the 'commitment' logic that tracks progress and milestone rewards across sessions.",
    image: "/projects/tanitterron.png",
    imageWidth: 1827,
    imageHeight: 930,
    liveUrl: "https://tanit-terron.vercel.app/",
    tags: ["Next.js", "TypeScript", "CSS", "Lucide React"],
    hasPDF: false,
    pdfUrl: "",
  },
];
