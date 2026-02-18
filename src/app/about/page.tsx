import { KaggleIcon } from "@/components/Icons/KaggleIcon";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { getAllExperiences } from "@/content/experiences";

export default function AboutPage() {
  const experiences = getAllExperiences();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold overflow-hidden">
              <Image
                src="/profile.png"
                alt="Profile Picture"
                width={512}
                height={512}
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Giuseppe Testa</h1>
              <p className="text-blue-400 text-lg mb-4">Full-Stack Developer & Data Analyst</p>
              
              <div className="flex items-center gap-4 text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Napoli, Italy / Barcelona, Spain
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                I am a versatile developer with a strong foundation in web development and a growing expertise in data analytics. 
                I thrive on the excitement of mastering new technologies and uncovering hidden insights within datasets. 
                Currently, I am further specializing in Cybersecurity at UPC, blending my passion for building robust applications 
                with a commitment to digital security.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/peptesta" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a href="https://www.kaggle.com/peppetesta" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
                  <KaggleIcon className="w-5 h-5" /> Kaggle
                </a>
                <a href="https://linkedin.com/in/giuseppe-testa-09445b326/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a href="mailto:sonsycomb@gmail.com"
                   className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" /> Email
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="glass rounded-xl p-6 hover:bg-white/5 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-400">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-500 text-sm">{exp.location}</p>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm mt-2 sm:mt-0">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start text-gray-400 text-sm">
                          <span className="text-green-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}