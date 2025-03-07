import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Terminal, Server, Shield, Brain, Database, Code2, MessageSquare, X, Download, ExternalLink } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ChatBot from './components/ChatBot';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const projects = [
    {
      title: "TeachPlanner",
      description: "Système intelligent de gestion des emplois du temps utilisant des algorithmes d'optimisation avancés. Développé avec Python et React, ce projet utilise des algorithmes génétiques pour optimiser automatiquement les emplois du temps en tenant compte de multiples contraintes.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Algorithmes Génétiques"],
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?fit=crop&w=800&h=400",
      links: {
        github: "https://github.com/ali-sougui/teachplanner",
        
      }
    },
    {
      title: "DreamPark",
      description: "Solution automatisée de gestion de parking avec interface en temps réel. Système complet incluant la détection automatique des véhicules, le paiement en ligne et la gestion des places en temps réel.",
      tech: ["Python"],
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?fit=crop&w=800&h=400",
      links: {
        github: "https://github.com/ali-sougui/dreampark",
        
      }
    }
    // },
    // {
    //   title: "CodeConnect",
    //   description: "Plateforme collaborative pour développeurs avec partage de code en temps réel. Les développeurs peuvent collaborer sur des projets, partager du code et communiquer en temps réel.",
    //   tech: ["Node.js", "Socket.io", "React", "MongoDB"],
    //   image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&h=400",
    //   links: {
    //     github: "https://github.com/ali-sougui/codeconnect",
    //     live: "https://codeconnect.demo.com"
    //   }
    // },
    // {
    //   title: "VideoCours",
    //   description: "Plateforme d'apprentissage en ligne avec système de streaming vidéo optimisé et suivi de progression personnalisé.",
    //   tech: ["Next.js", "AWS", "Node.js", "PostgreSQL"],
    //   image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?fit=crop&w=800&h=400",
    //   links: {
    //     github: "https://github.com/ali-sougui/videocours",
    //     live: "https://videocours.demo.com"
    //   }
    // }
  ];

  const skills = [
    {
      category: "Langages",
      items: ["Java", "Python", "JavaScript/TypeScript", "Go", "C++", "HTML","CSS"]
    },
    {
      category: "Frontend",
      items: ["React", "Next.js","Angular"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Spring Boot"]
    },
    {
      category: "Base de données",
      items: ["PostgreSQL",  "MySQL"]
    },
    {
      category: "DevOps & Cloud",
      items: ["Linux"]
    },
    {
      category: "Sécurité",
      items: ["Cryptographie"]
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?fit=crop&w=200&h=200"
    },
    {
      title: "Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2023",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?fit=crop&w=200&h=200"
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?fit=crop&w=200&h=200"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechStart Inc.",
      content: "Ali a transformé notre infrastructure cloud, améliorant significativement nos performances et réduisant nos coûts de 40%.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100"
    },
    {
      name: "Marc Dubois",
      role: "Lead Developer, InnoTech",
      content: "Un développeur exceptionnel avec une vraie vision technique. Sa contribution à notre projet a été déterminante.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100"
    },
    {
      name: "Emma Thompson",
      role: "Product Manager, DataFlow",
      content: "La capacité d'Ali à traduire des besoins complexes en solutions élégantes est impressionnante.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-300">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed w-full bg-[#0a192f]/90 backdrop-blur-sm z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-blue-400"
          >
            AS
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-x-8"
          >
            {["À propos", "Compétences", "Projets", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center px-6 pt-20 relative">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity
          }}
        />
        <div className="container mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-blue-400 mb-4">Bonjour, je suis</h1>
            <TypeAnimation
              sequence={[
                'Ali Sougui Ousmane',
                1000,
                'Ingénieur en Informatique',
                1000,
                'Développeur Full-Stack',
                1000,
              ]}
              wrapper="h2"
              speed={50}
              className="text-6xl font-bold text-slate-200 mb-4"
              repeat={Infinity}
            />
            <h3 className="text-4xl text-slate-400 mb-6">Je crée des solutions innovantes pour le web</h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Je suis un ingénieur en informatique spécialisé dans la création d'applications web modernes
              et sécurisées. Actuellement, je me concentre sur le développement de solutions full-stack
              et l'intégration de fonctionnalités d'intelligence artificielle.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 p-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-400/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Télécharger mon CV
              </motion.a>
              <motion.a
                href="mailto:ousmane.alisougui@gmail.com"
                className="flex items-center gap-2 p-2 bg-blue-400 text-[#0a192f] rounded hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Me contacter
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="compétences" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-200 mb-12"
          >
            Mes Compétences
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 p-6 rounded-lg hover:bg-slate-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-blue-400">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="py-20 px-6 bg-slate-900/30">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-200 mb-12"
          >
            Mes Projets
          </motion.h2>
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/2">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded-lg w-full"
                    />
                    <div className="absolute inset-0 bg-blue-400/20 group-hover:bg-transparent transition-colors rounded-lg" />
                  </motion.div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-slate-200 mb-4">{project.title}</h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg mb-4">
                    <p className="text-slate-300">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-blue-400 text-sm bg-blue-400/10 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      {/* <section id="certifications" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-200 mb-12"
          >
            Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 p-6 rounded-lg hover:bg-slate-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-400 mb-2">{cert.title}</h3>
                <p className="text-slate-400">{cert.issuer}</p>
                <p className="text-sm text-slate-500">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/*<section id="témoignages" className="py-20 px-6 bg-slate-900/30">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-200 mb-12"
          >
            Témoignages
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 p-6 rounded-lg hover:bg-slate-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-blue-400">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-200 mb-6">
              Me Contacter
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Je suis actuellement à la recherche de nouvelles opportunités. Que vous ayez une question
              ou simplement envie de dire bonjour, je ferai de mon mieux pour vous répondre !
            </p>
            <div className="flex justify-center gap-6">
              <motion.a
                href="mailto:ousmane.alisougui@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-blue-400 text-blue-400 rounded hover:bg-blue-400/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Me contacter par email
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ali-sougui-ousmane-75a59b2b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-blue-400 text-blue-400 rounded hover:bg-blue-400/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                Me contacter sur LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-400">
        <p>© 2024 Ali Sougui Ousmane. Tous droits réservés.</p>
      </footer>

      {/* Chatbot Toggle Button */}
      <motion.button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 p-4 bg-blue-400 text-[#0a192f] rounded-full shadow-lg hover:bg-blue-500 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showChat ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chatbot Component */}
      {showChat && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-800 rounded-lg shadow-xl z-50"
        >
          <ChatBot />
        </motion.div>
      )}
    </div>
  );
}

export default App;