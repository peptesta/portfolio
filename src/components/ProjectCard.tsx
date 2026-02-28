import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tags, githubUrl, liveUrl, slug, mainTag, images } = project;

  return (
    <div className="
      group 
      rounded-2xl 
      overflow-hidden 
      transition-all duration-300 
      bg-slate-800 
      border border-transparent 
      hover:border-white 
      hover:scale-[1.02] 
      shadow-lg shadow-black/20
    ">
      
    {/* IMAGE + MAIN TAG */}
    {images && images[0] && (
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* MAIN TAG BADGE */}
        {mainTag && (
          <span className="absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold uppercase bg-blue-600 text-white rounded-full shadow-lg">
            {mainTag}
          </span>
        )}
      </div>
    )}

      {/* CARD CONTENT */}
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