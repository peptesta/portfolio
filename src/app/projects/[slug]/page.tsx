import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/content/projects";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { KaggleIcon } from "@/components/Icons/KaggleIcon";

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

        {/* Main card - darker background for better contrast */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{project.title}</h1>
              <p className="text-blue-400 text-base md:text-lg">{project.tags.join(" • ")}</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-white/10"
                >
                  <Github className="w-5 h-5" /> Code
                </a>
              )}
              {project.kaggleUrl && (
                <a 
                  href={project.kaggleUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-white/10"
                >
                  <KaggleIcon className="w-5 h-5" /> Kaggle
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
            {project.longDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
              <h2 className="text-xl font-bold mb-4 text-blue-400">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-red-400 mr-2 mt-1">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
              <h2 className="text-xl font-bold mb-4 text-green-400">Solutions</h2>
              <ul className="space-y-3">
                {project.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-purple-400">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
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

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}