import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface Message {
  content: string;
  type: 'user' | 'bot';
}

const responses = {
  greeting: "Bonjour! Je suis l'assistant virtuel d'Ali. Je peux vous parler de ses projets, compétences, expériences ou vous aider à le contacter. Comment puis-je vous aider aujourd'hui ?",
  
  projects: {
    general: "Ali a développé plusieurs projets innovants. Voici les principaux :\n\n" +
      "- **TeachPlanner**: Optimisation des emplois du temps\n" +
      "- **DreamPark**: Gestion intelligente de parking\n" +
      "- **CodeConnect**: Plateforme collaborative de code\n" +
      "- **VideoCours**: Plateforme d'e-learning\n\n" +
      "Sur lequel souhaitez-vous plus d'informations ?",
    
    teachplanner: "**TeachPlanner** est un système intelligent d'optimisation des emplois du temps utilisant des algorithmes génétiques. Caractéristiques principales :\n\n" +
      "- Optimisation automatique des plannings\n" +
      "- Prise en compte des contraintes multiples\n" +
      "- Interface React moderne et intuitive\n" +
      "- API Python avec algorithmes avancés\n" +
      "- Base de données PostgreSQL\n\n" +
      "Souhaitez-vous voir le code source ou la démo en ligne ?",
    
    dreampark: "**DreamPark** est une solution complète de gestion de parking intelligent. Fonctionnalités :\n\n" +
      "- Détection automatique des véhicules\n" +
      "- Paiement en ligne sécurisé\n" +
      "- Tableau de bord en temps réel\n" +
      "- Application mobile pour les utilisateurs\n" +
      "- Système IoT avec capteurs\n\n" +
      "Je peux vous montrer une démo ou vous donner plus de détails techniques.",
    
    codeconnect: "**CodeConnect** est une plateforme collaborative pour développeurs. Elle permet :\n\n" +
      "- Édition de code en temps réel\n" +
      "- Chat et vidéoconférence intégrés\n" +
      "- Partage de snippets de code\n" +
      "- Gestion de versions Git\n" +
      "- Support de multiples langages\n\n" +
      "Voulez-vous voir la plateforme en action ?",
    
    videocours: "**VideoCours** est une plateforme d'apprentissage moderne. Caractéristiques :\n\n" +
      "- Streaming vidéo optimisé\n" +
      "- Suivi de progression personnalisé\n" +
      "- Quiz interactifs\n" +
      "- Système de recommandation\n" +
      "- Support mobile et desktop\n\n" +
      "Je peux vous montrer une démo ou expliquer l'architecture technique."
  },

  skills: {
    general: "Ali possède une expertise variée en développement. Ses domaines de compétence :\n\n" +
      "- **Développement Full-Stack**\n" +
      "- **DevOps & Cloud**\n" +
      "- **Sécurité Informatique**\n" +
      "- **Intelligence Artificielle**\n\n" +
      "Quel domaine vous intéresse particulièrement ?",
    
    fullstack: "**Compétences Full-Stack** :\n\n" +
      "- **Frontend**: React, Next.js, Vue.js, TailwindCSS\n" +
      "- **Backend**: Node.js, Spring Boot, Django\n" +
      "- **Langages**: JavaScript/TypeScript, Java, Python\n" +
      "- **Bases de données**: PostgreSQL, MongoDB, Redis\n\n" +
      "Souhaitez-vous des exemples de projets utilisant ces technologies ?",
    
    devops: "**Compétences DevOps & Cloud** :\n\n" +
      "- **Conteneurisation**: Docker, Kubernetes\n" +
      "- **Cloud**: AWS, GCP\n" +
      "- **CI/CD**: Jenkins, GitHub Actions\n" +
      "- **Monitoring**: Prometheus, Grafana\n\n" +
      "Je peux vous donner plus de détails sur son expérience cloud.",
    
    security: "**Expertise en Sécurité** :\n\n" +
      "- **Tests d'intrusion**\n" +
      "- **Sécurité des applications web**\n" +
      "- **Cryptographie appliquée**\n" +
      "- **Analyse de vulnérabilités**\n\n" +
      "Voulez-vous des exemples de projets sécurisés ?",
    
    ai: "**Compétences en IA** :\n\n" +
      "- **Machine Learning**: TensorFlow, PyTorch\n" +
      "- **NLP**: BERT, GPT\n" +
      "- **Computer Vision**\n" +
      "- **Optimisation algorithmique**\n\n" +
      "Je peux vous montrer des projets utilisant l'IA."
  },

  experience: "Ali a une expérience professionnelle variée :\n\n" +
    "- **Développeur Full-Stack Senior**\n" +
    "- **Expert en Sécurité Informatique**\n" +
    "- **Architecte Solutions Cloud**\n\n" +
    "Souhaitez-vous plus de détails sur un poste en particulier ?",

  contact: {
    general: "Plusieurs moyens de contacter Ali :\n\n" +
      "- **Email**: ousmane.alisougui@gmail.com\n" +
      "- **LinkedIn**: [Profil LinkedIn](https://linkedin.com)\n" +
      "- **GitHub**: [ali-sougui](https://github.com/ali-sougui)\n\n" +
      "Comment préférez-vous le contacter ?",
    
    email: "Vous pouvez envoyer un email à ousmane.alisougui@gmail.com\n\n" +
      "Pour un traitement rapide, pensez à :\n" +
      "- Présenter brièvement votre entreprise/projet\n" +
      "- Expliquer vos besoins spécifiques\n" +
      "- Indiquer vos disponibilités pour un appel\n\n" +
      "Ali répond généralement sous 24-48h.",
    
    linkedin: "Le profil LinkedIn d'Ali est régulièrement mis à jour avec :\n" +
      "- Ses dernières expériences\n" +
      "- Ses certifications\n" +
      "- Ses articles techniques\n\n" +
      "N'hésitez pas à le contacter via LinkedIn !",
    
    github: "Sur GitHub, vous trouverez :\n" +
      "- Ses projets open source\n" +
      "- Ses contributions\n" +
      "- Son code\n\n" +
      "C'est un excellent moyen de voir son style de programmation."
  },

  thanks: {
    general: "Je vous en prie ! C'était un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions !",
    followup: "Merci à vous ! Y a-t-il autre chose que je peux faire pour vous ?",
    bye: "Merci de votre visite ! Au plaisir de vous revoir bientôt !"
  },

  default: "Je n'ai pas bien compris votre demande. Je peux vous parler :\n\n" +
    "- Des projets d'Ali\n" +
    "- De ses compétences techniques\n" +
    "- De son experience\n" +
    "- Des moyens de le contacter\n\n" +
    "Que souhaitez-vous savoir ?"
};

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { content: responses.greeting, type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalizeText = (text: string): string => {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const getDetailedProjectResponse = (input: string): string => {
    const normalizedInput = normalizeText(input);
    if (normalizedInput.includes('teachplanner')) return responses.projects.teachplanner;
    if (normalizedInput.includes('dreampark')) return responses.projects.dreampark;
    if (normalizedInput.includes('codeconnect')) return responses.projects.codeconnect;
    if (normalizedInput.includes('videocours')) return responses.projects.videocours;
    return responses.projects.general;
  };

  const getDetailedSkillsResponse = (input: string): string => {
    const normalizedInput = normalizeText(input);
    if (normalizedInput.includes('full') || normalizedInput.includes('stack')) return responses.skills.fullstack;
    if (normalizedInput.includes('devops') || normalizedInput.includes('cloud')) return responses.skills.devops;
    if (normalizedInput.includes('security') || normalizedInput.includes('securite')) return responses.skills.security;
    if (normalizedInput.includes('ia') || normalizedInput.includes('intelligence')) return responses.skills.ai;
    return responses.skills.general;
  };

  const getDetailedContactResponse = (input: string): string => {
    const normalizedInput = normalizeText(input);
    if (normalizedInput.includes('email')) return responses.contact.email;
    if (normalizedInput.includes('linkedin')) return responses.contact.linkedin;
    if (normalizedInput.includes('github')) return responses.contact.github;
    return responses.contact.general;
  };

  const getResponse = (input: string): string => {
    const normalizedInput = normalizeText(input);
    
    // Remerciements
    if (normalizedInput.includes('merci')) {
      const thanksResponses = [
        responses.thanks.general,
        responses.thanks.followup,
        responses.thanks.bye
      ];
      return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }
    
    // Projets
    if (normalizedInput.includes('projet')) {
      return getDetailedProjectResponse(input);
    }
    
    // Compétences
    if (normalizedInput.includes('competence') || normalizedInput.includes('competences') || 
        normalizedInput.includes('skill') || normalizedInput.includes('technologie')) {
      return getDetailedSkillsResponse(input);
    }
    
    // Contact
    if (normalizedInput.includes('contact') || normalizedInput.includes('email') || 
        normalizedInput.includes('joindre') || normalizedInput.includes('linkedin')) {
      return getDetailedContactResponse(input);
    }
    
    // Expérience
    if (normalizedInput.includes('experience') || normalizedInput.includes('parcours') || 
        normalizedInput.includes('travail')) {
      return responses.experience;
    }
    
    // Salutations
    if (normalizedInput.includes('bonjour') || normalizedInput.includes('salut') || 
        normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
      return responses.greeting;
    }
    
    return responses.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: input, type: 'user' }]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: getResponse(input),
        type: 'bot'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-400 text-slate-900 p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-bold">Assistant Virtuel</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={index}
            className={`flex items-start gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-slate-900" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-400 text-slate-900'
                  : 'bg-slate-700 text-slate-200'
              }`}
            >
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-slate-900" />
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
              <Bot className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex gap-2 text-slate-400">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 p-2 bg-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400"
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 text-slate-900 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;