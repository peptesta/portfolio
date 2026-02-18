import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A complete collection of my work, from production applications to experimental side projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}