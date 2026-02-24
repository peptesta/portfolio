export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl?: string;
  kaggleUrl?: string;
  liveUrl?: string;
  featured: boolean;
  challenges: string[];
  solutions: string[];
  technologies: string[];
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "ophryslens-ai-botany",
    title: "OphrysLens",
    description: "AI-driven taxonomic classification and smart-cropping system for the Ophrys orchid genus.",
    longDescription: "OphrysLens is a professional-grade web ecosystem designed to bridge the gap between AI research and field botany. It leverages Deep Learning (Faster R-CNN & ResNet50) to automate the identification of Ophrys orchid species. The system features a 'Human-in-the-loop' interface that allows researchers to manually refine bounding boxes, compare classification strategies (6-Class vs. 1-vs-All), and visualize AI decision-making via Grad-CAM heatmaps.",
    tags: ["Next.js", "TypeScript", "Python", "PyTorch", "Flask", "Docker"],
    githubUrl: "https://github.com/peptesta/OphrysLens",
    liveUrl: "https://ophryslens.vercel.app/",
    featured: true,
    challenges: [
      "Mitigating background noise and clutter in natural environment (in-the-wild) photographs.",
      "Ensuring high precision in fine-grained classification between morphologically similar orchid species.",
      "Optimizing computational performance for batch processing large botanical datasets.",
      "Bridging the latency gap between a heavy PyTorch backend and a responsive Next.js frontend."
    ],
    solutions: [
      "Implemented a 'Smart Cropping' pipeline using Faster R-CNN to isolate the floral target from the background.",
      "Engineered an Ensemble 1-vs-All architecture to improve robustness against ambiguous samples.",
      "Developed an intelligent multi-level caching system to store intermediate tensors and reduce redundant GPU/CPU cycles.",
      "Built a containerized microservices architecture (Docker) to ensure environment reproducibility and seamless deployment."
    ],
    technologies: [
      "Next.js 14", 
      "TypeScript", 
      "Python 3.10", 
      "PyTorch", 
      "Flask", 
      "Docker", 
      "Tailwind CSS", 
      "Pillow (PIL)"
    ],
    images: ["/images/orchitech-dashboard.jpg", "/images/orchitech-cropping.jpg"]
  },
  {
    slug: "physio-web-app",
    title: "FisioAbadia",
    description: "A comprehensive digital platform for specialized physiotherapy clinics and patient management.",
    longDescription: "A full-stack web application designed for a physiotherapy practice. It features a streamlined patient booking system, service showcases, and an administrative dashboard for managing appointments and patient inquiries using a secure PostgreSQL database.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Lucide React"],
    githubUrl: "https://github.com/peptesta/fisioabadia",
    liveUrl: "https://fisioabadia.vercel.app/",
    featured: true,
    challenges: [
      "Designing a non-overlapping appointment scheduling logic",
      "Ensuring a responsive and accessible UI for patients of all ages",
      "Managing relational data between therapists, services, and time slots"
    ],
    solutions: [
      "Implemented server-side validation to prevent double-booking in PostgreSQL",
      "Utilized Tailwind CSS and Radix UI primitives for high accessibility (WCAG) compliance",
      "Leveraged Prisma ORM for type-safe database queries and efficient data fetching"
    ],
    technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Zod"],
    images: ["/images/physio-home.jpg", "/images/physio-dashboard.jpg"]
  },
  {
    slug: "divorce-prediction-analysis",
    title: "The Pulse of Marriage: Predictive Analytics & AI",
    description: "A data-driven study using machine learning to predict marital outcomes based on the Gottman Method.",
    longDescription: "An end-to-end data analysis project that explores a dataset of married couples. Using a Random Forest classifier and SHAP analysis, I developed a model that predicts divorce with 89% accuracy, while identifying the specific behavioral 'triggers' that most significantly correlate with relationship failure.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn", "Machine Learning"],
    githubUrl: "https://github.com/peptesta/divorce_analysis",
    kaggleUrl: "https://www.kaggle.com/code/peppetesta/divorce-analysis/notebook",
    liveUrl: "i have to load my pdf here", 
    featured: true,
    challenges: [
      "Identifying multicollinearity between highly correlated survey questions",
      "Balancing model interpretability with high predictive accuracy",
      "Selecting the most impactful features from a dense behavioral dataset"
    ],
    solutions: [
      "Applied Feature Importance ranking to isolate 'High-Impact' questions for the final presentation",
      "Developed a Binary Classification model achieving an 89% F1-score",
      "Created a detailed PowerPoint breakdown of 'Predictive Red Flags' versus secondary marital stressors"
    ],
    technologies: ["Python (Jupyter)", "Scikit-Learn", "Pandas", "Seaborn", "PowerPoint", "Statistics"],
    images: ["/images/correlation-matrix.jpg", "/images/ai-accuracy-report.jpg"]
  },
];

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);

export const getAllProjects = () => projects;
