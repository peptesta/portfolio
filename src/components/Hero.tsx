import Link from "next/link";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { KaggleIcon } from "./Icons/KaggleIcon";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative">
      <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <div className="animate-slide-up">
          <p className="text-blue-400 font-medium mb-4">Hi, I'm</p>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="text-gradient">Giuseppe Testa</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl text-gray-300 mb-8">
            Full-Stack Developer & Data Analyst
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I build scalable web applications and ensure data analytics works effectively, 
            regardless of the tech stack. I adapt rapidly to new tools to deliver the most efficient, 
            high-impact solutions for any project.            
            Passionate about clean code, user experience, and open source.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 glass hover:bg-white/20 text-white rounded-full font-medium transition-all"
            >
              About Me
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <a href="https://github.com/peptesta " target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://kaggle.com/peppetesta" target="_blank" rel="noopener noreferrer" >
              <KaggleIcon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="https://linkedin.com/in/giuseppe-testa-09445b326/ " target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:sonsycomb@gmail.com"
               className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  );
}