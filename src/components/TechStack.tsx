const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "GraphQL", category: "API" },
  { name: "Git", category: "Tools" },
];

export function TechStack() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-gray-400">
            Technologies I work with regularly
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group relative px-6 py-3 glass rounded-full hover:bg-white/20 transition-all cursor-default"
            >
              <span className="text-gray-300 group-hover:text-white font-medium">
                {tech.name}
              </span>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}