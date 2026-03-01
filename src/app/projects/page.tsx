'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";
import { 
  Database, 
  Globe, 
  X, 
  ChevronDown, 
  Code2, 
  Settings2, 
  Layers,
  LayoutGrid
} from "lucide-react";

// Configurazione delle categorie principali e dei sottomenu "logici"
const SUBMENU_CONFIG = [
  { id: 'frameworks', label: 'Frameworks', icon: Layers },
  { id: 'languages', label: 'Tech Stack', icon: Code2 },
  { id: 'methods', label: 'Methods', icon: Settings2 },
];

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const [activeCategory, setActiveCategory] = useState<'web' | 'data' | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. FILTRO MACRO (WEB / DATA / ALL)
  const categoryProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (activeCategory === 'all') return true;
      const webTags = ['Next.js', 'React', 'TypeScript', 'Flask', 'PostgreSQL', 'Prisma', 'Tailwind CSS'];
      const dataTags = ['Python', 'Pandas', 'Machine Learning', 'PyTorch', 'Scikit-Learn', 'AI', 'Statistics'];
      
      if (activeCategory === 'web') return project.tags.some(t => webTags.includes(t));
      if (activeCategory === 'data') return project.tags.some(t => dataTags.includes(t));
      return true;
    });
  }, [allProjects, activeCategory]);

  // 2. FILTRO TAG ATTIVI (Applicato sui progetti della categoria selezionata)
  const filteredProjects = useMemo(() => {
    return categoryProjects.filter(project => 
      selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag))
    );
  }, [categoryProjects, selectedTags]);

  // 3. ESTRAZIONE DINAMICA DEI TAG DISPONIBILI
  // Mostriamo solo i tag che appartengono ai progetti attualmente visualizzati
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    filteredProjects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [filteredProjects]);

  // Gestione cambi macro-categoria
  const handleCategoryChange = (category: 'web' | 'data' | 'all') => {
    setActiveCategory(category);
    setSelectedTags([]);
    setOpenSubmenu(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0f172a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">projects</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Feel free to take a look to all my projects, and to filter them by category or technology used.
          </p>
        </header>

        {/* Macro Categorie */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <button onClick={() => handleCategoryChange('all')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border ${activeCategory === 'all' ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
            <LayoutGrid className="w-4 h-4" /> All
          </button>
          <button onClick={() => handleCategoryChange('web')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border ${activeCategory === 'web' ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
            <Globe className="w-4 h-4" /> Web
          </button>
          <button onClick={() => handleCategoryChange('data')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border ${activeCategory === 'data' ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
            <Database className="w-4 h-4" /> Data
          </button>
        </div>

        {/* Dropdown Dinamico */}
        <div className="mb-12" ref={dropdownRef}>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative">
              <button
                onClick={() => setOpenSubmenu(openSubmenu === 'tags' ? null : 'tags')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
                  openSubmenu === 'tags' ? 'bg-white/10 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Filter by Tag</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSubmenu === 'tags' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openSubmenu === 'tags' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute z-50 mt-3 p-3 w-72 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 px-2">Tags</p>
                    <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-1">
                      {availableTags.length > 0 ? (
                        availableTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                              selectedTags.includes(tag) 
                              ? 'bg-blue-600 border-blue-500 text-white' 
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {tag}
                          </button>
                        ))
                      ) : (
                        <span className="text-gray-600 text-xs px-2 italic">No more filters possible</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(selectedTags.length > 0 || activeCategory !== 'all') && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all font-medium"
              >
                <X className="w-4 h-4" /> Reset
              </button>
            )}
          </div>

          {/* Badge Tag Attivi */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 min-h-[32px]">
            {selectedTags.map(tag => (
              <motion.span 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key={tag} 
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium"
              >
                {tag}
                <X className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => toggleTag(tag)} />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Griglia */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          key={activeCategory + selectedTags.join('')}
        >
          {filteredProjects.map((project) => (
            <motion.div layout key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}