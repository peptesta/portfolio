export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: "freelance-physio-web",
    title: "Freelance Full-Stack Developer",
    company: "Private Physiotherapy Clinic",
    location: "Remote",
    startDate: "Feb 2026",
    endDate: "Mar 2026",
    description: "Designed and deployed a bespoke full-stack web application to digitize patient management and appointment scheduling.",
    achievements: [
      "Built a custom booking system with real-time availability using Next.js and PostgreSQL",
      "Developed a secure administrative dashboard for managing patient inquiries and records",
      "Optimized the platform for performance and accessibility (WCAG), ensuring a seamless experience for all patients"
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"]
  },
  {
    id: "it-assistant-dft",
    title: "IT Assistant",
    company: "Studio Architettura DFT",
    location: "Naples, Italy",
    startDate: "Jan 2023",
    endDate: "Jan 2024",
    description: "Managed the architectural firm's technical infrastructure, focusing on network stability and internal data management.",
    achievements: [
      "Resolved critical hardware and network infrastructure issues to minimize studio downtime",
      "Established standardized protocols for data storage, automated backups, and disaster recovery",
      "Developed a custom database and internal application to streamline client data and project information management"
    ],
    technologies: ["Network Administration", "Database Design", "Hardware Maintenance", "Data Security"]
  }
];

// Helper functions
export const getAllExperiences = () => experiences;

export const getExperienceById = (id: string) => experiences.find(e => e.id === id);

export const getExperiencesByCompany = (company: string) => 
  experiences.filter(e => e.company.toLowerCase().includes(company.toLowerCase()));