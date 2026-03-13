'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Github, ExternalLink, Code, Palette } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiement et admin",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    category: "Fullstack",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    icon: <Code className="h-5 w-5" />
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de tâches avec drag & drop et temps réel",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Fullstack",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    icon: <Palette className="h-5 w-5" />
  },
  {
    id: 3,
    title: "Portfolio Designer",
    description: "Portfolio interactif pour designers avec animations avancées",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Framer Motion", "TailwindCSS"],
    category: "Frontend",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    icon: <Code className="h-5 w-5" />
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Projets en <span className="text-primary">Vedette</span>
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations les plus récentes 
              et les plus significatives
            </p>
          </div>

          {/* Grille de projets */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image du projet */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {/* Catégorie */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  {/* Titre et description */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-background border border-border px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-foreground-muted">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Liens */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-foreground-muted hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-foreground-muted hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button size="lg">
              Voir tous les projets
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
