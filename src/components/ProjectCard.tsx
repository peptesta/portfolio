import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tags, githubUrl, liveUrl, slug } = project;

  return (
    <div className="group glass rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <div className="flex space-x-2">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <Link 
          href={`/projects/${slug}`}
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Read case study →
        </Link>
      </div>
    </div>
  );
}