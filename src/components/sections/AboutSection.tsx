'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Globe, Zap } from 'lucide-react';

export function AboutSection() {
  const stats = [
    {
      icon: <Code2 className="h-6 w-6" />,
      value: "3+",
      label: "Ans d'expérience"
    },
    {
      icon: <Database className="h-6 w-6" />,
      value: "20+",
      label: "Projets réalisés"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      value: "5+",
      label: "Clients satisfaits"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: "10+",
      label: "Technologies maîtrisées"
    }
  ];

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
          {/* Titre de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              À Propos de <span className="text-primary">Moi</span>
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Développeur passionné par la création d'applications web modernes 
              et performantes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte de présentation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Développeur Fullstack Créatif
              </h3>
              
              <div className="space-y-4 text-foreground-muted">
                <p>
                  Bonjour ! Je suis Jean Dupont, développeur fullstack avec une 
                  passion pour créer des expériences web exceptionnelles. 
                  Mon expertise couvre à la fois le frontend et le backend, 
                  me permettant de concevoir des solutions complètes et cohérentes.
                </p>
                
                <p>
                  J'aime relever des défis techniques complexes et transformer 
                  des idées en produits numériques élégants. Mon approche combine 
                  des pratiques de développement modernes avec une attention 
                  particulière à l'expérience utilisateur et aux performances.
                </p>

                <p>
                  Que ce soit pour développer une application from scratch, 
                  optimiser des performances existantes ou créer des APIs robustes, 
                  je m'engage à livrer du code de qualité qui répond aux besoins 
                  réels des utilisateurs.
                </p>
              </div>

              {/* Expertise */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Mes Domaines d'Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {['Frontend', 'Backend', 'UI/UX', 'Performance', 'APIs', 'Base de données'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-background border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-3 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
