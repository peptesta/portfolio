import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/content/projects";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { KaggleIcon } from "@/components/Icons/KaggleIcon";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to projects
        </Link>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-blue-400 text-lg">{project.tags.join(" • ")}</p>
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5" /> Code
                </a>
              )}
              {project.kaggleUrl && (
                <a 
                  href={project.kaggleUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <KaggleIcon className="w-5 h-5" />
                  Kaggle
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {project.longDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gradient">Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start text-gray-400">
                    <span className="text-red-400 mr-2">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-gradient">Solutions</h2>
              <ul className="space-y-2">
                {project.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start text-gray-400">
                    <span className="text-green-400 mr-2">•</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gradient">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 glass rounded-full text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}