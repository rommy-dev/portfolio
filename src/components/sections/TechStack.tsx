'use client';

import { motion } from 'framer-motion';

const techCategories = [
  {
    title: "Frontend",
    technologies: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "TailwindCSS", level: 88 },
      { name: "Framer Motion", level: 75 }
    ]
  },
  {
    title: "Backend", 
    technologies: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "REST APIs", level: 88 }
    ]
  },
  {
    title: "Tools & Others",
    technologies: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 95 }
    ]
  }
];

export function TechStack() {
  return (
    <section className="py-20 bg-surface">
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
              Stack <span className="text-primary">Technique</span>
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Les technologies et outils que je maîtrise pour créer 
              des applications web modernes
            </p>
          </div>

          {/* Grille des catégories */}
          <div className="grid md:grid-cols-3 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-6 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: categoryIndex * 0.1 + techIndex * 0.05 
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {tech.name}
                        </span>
                        <span className="text-xs text-foreground-muted">
                          {tech.level}%
                        </span>
                      </div>
                      
                      {/* Barre de progression */}
                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1, 
                            delay: categoryIndex * 0.1 + techIndex * 0.05 + 0.2,
                            ease: "easeOut"
                          }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Icônes technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-foreground-muted mb-6">
              Et bien d'autres technologies que j'explore constamment
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['JavaScript', 'HTML5', 'CSS3', 'Redux', 'GraphQL', 'Jest', 'Webpack', 'NPM'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
