'use client';

import { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";
import { Search, Database, Globe, X } from "lucide-react";

const CATEGORIES = [
  { id: 'all', label: 'All', icon: null },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'web', label: 'Web', icon: Globe },
];

// Stagger animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = 
        searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCategory = true;
      if (selectedCategory === 'data') {
        matchesCategory = project.tags.some(tag => 
          ['python', 'pandas', 'machine learning', 'scikit-learn', 'data', 'analytics', 'ai', 'tensorflow', 'jupyter'].some(t => 
            tag.toLowerCase().includes(t)
          )
        );
      } else if (selectedCategory === 'web') {
        matchesCategory = project.tags.some(tag => 
          ['next.js', 'react', 'typescript', 'web', 'flask', 'node.js', 'frontend', 'backend', 'full-stack'].some(t => 
            tag.toLowerCase().includes(t)
          )
        );
      }

      return matchesSearch && matchesCategory;
    });
  }, [allProjects, searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all';

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A complete collection of my work, from production applications to experimental side projects.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }
                  `}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-400 text-sm">
            Showing {filteredProjects.length} of {allProjects.length} projects
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
          </div>
        </div>

        {/* Projects Grid with Stagger Animation */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl font-medium text-gray-300">No projects found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}