/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'
import { useTerminalAnimation } from '@/hooks/useTerminalAnimation'
import { TerminalHeader } from '@/components/ui/TerminalHeader'

// Define types for our content
interface FavoriteItem {
  label: string;
  value: string;
}

interface StoryHighlight {
  id: string;
  icon: string;
  title: string;
  content: string;
  tags: string[];
}

interface AboutContent {
  title: string;
  storyHighlights: StoryHighlight[];
  favorites: {
    title: string;
    categories: Record<string, FavoriteItem[]>;
  };
}

// Typing animation content
const typingContent = [
  { greeting: "Welcome to my digital living room!", color: "text-primary-blue" },
  { intro: "Thanks for taking a look around!", color: "text-green-400"},
  { intro: "Here you'll find fun facts and  stories that shaped me and the quirks that make me... well, me!", color: "text-primary-sunset-orange" },
  { body: "Click the buttons below and get to know me!", color: "text-primary-yellow" },
  { narrative: "Go on then! Enjoy!", color: "text-primary-magenta" }
];

// About content - restructured for better engagement
const aboutContent: AboutContent = {
  title: "About Me",
  storyHighlights: [
    {
      id: "tech-passion",
      icon: "💡",
      title: "Tech Passion",
      content: "I'm a technologist driven by a passion for transforming ideas into elegant, functional solutions. My portfolio showcases projects that reflect my commitment to innovation and problem-solving.",
      tags: ["Innovation", "Problem Solving", "Creativity"]
    },
    {
      id: "healthcare",
      icon: "🏥",
      title: "Healthcare Connection",
      content: "My passion for healthcare innovation is deeply personal. As a cancer survivor and COVID-19 long-hauler, and with parents who were both clinicians, I've experienced firsthand the importance of compassionate care.",
      tags: ["Healthcare", "Patient Experience", "Medical Innovation"]
    },
    {
      id: "coding",
      icon: "💻",
      title: "Code Crafting",
      content: "I thrive on turning complex concepts into clean, efficient code. When I'm not immersed in Python, JavaScript, or Ruby, I'm exploring the ever-evolving landscape of cybersecurity and Artificial Intelligence.",
      tags: ["Python", "JavaScript", "Ruby", "Cybersecurity, A.I."]
    },
    {
      id: "outdoor",
      icon: "🌊",
      title: "Outdoor Adventures",
      content: "You might find me chasing the thrill of a good thunderstorm, serving up more than just webpages on the tennis court, enjoying a sandy beach, or exploring the underwater world.",
      tags: ["Tennis", "Beach", "Diving", "Storms"]
    },
    {
      id: "activities",
      icon: "🚣",
      title: "Active Pursuits",
      content: "I enjoy the rush of whitewater rafting and the tranquility of horseback riding. Travel is another passion, especially when it involves trying new cuisines as a true foodie at heart.",
      tags: ["Rafting", "Horseback Riding", "Travel", "Food"]
    },
    {
      id: "quirks",
      icon: "🎃",
      title: "Personal Quirks",
      content: "While the idea of Halloween is endlessly fascinating, I prefer to admire the spooky creativity from a safe distance. And though I love exploring flavors from around the world, some spicy dishes test my limits!",
      tags: ["Foodie", "Halloween", "Curious Mind"]
    }
  ],
  favorites: {
    // Your existing favorites content
    title: "My Favorites",
    categories: {
      "Personal": [
        { "label": "Colors", "value": "Blue, Green, Red, Black" },
        { "label": "Scents", "value": "Mediterranean Lavender, Allure by Chanel, " },
        { "label": "Quotes", "value": "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it. -Maurice Switzer|Those who can make you believe absurdities can make you commit atrocities.-Voltaire" },
        { "label": "Beverages", "value": "Original Coke, Sweet Tea, Starbucks Chai Latte" },
        { "label": "Foods", "value": "Japanese, Seafood, Italian, Mexican/South American" },
        { "label": "Ice Cream", "value": "Hagen Daz Banana Split, Ben & Jerry's Chocolate Therapy" }
      ],
      "Entertainment": [
        { "label": "Movies", "value": "Stand By Me, Gladiator, Silence of the Lambs, Misery, Fried Green Tomatoes, The Shawshank Redemption, Clueless, Lord of the Rinds Trilogy, Star Wars 4-9 " },
        { "label": "TV/Streaming Shows", "value": "Family Ties, Murderbot, Reacher, MobLand, Halo, The Sandman, The Boys, Foundations, The Morning Show, Ted Lasso, The Guilded Age, The Last of Us, " },
        { "label": "Video Games", "value": "Baldur's Gate, Halo series, Diablo series" },
        { "label": "Books", "value": "Lord of The Rings triology, The Chronicles of Narnia, The Phoenix Project, The Rise and Fall of the Third Reich, The Let Me Theory, The Next Conversation, Into The Magic Shop, Spare, The Subtle Art of Not Giving a F*ck, " },
        { "label": "Authors", "value": "C.S. Lewis, T.S. Eliott, Stephen King" },
        { "label": "Songs", "value": "All Too Well, Mayonaise, Beautiful Disaster, " },
        { "label": "Musicians/Bands", "value": "Taylor Swift, Smashing Pumpkins, U2, Celine Dion, Kendrick Lamar, Pink, Kelly Clarkson, Morgan Wallen, Chappell Roan, Lady Gaga, " }
      ],
      "Nature": [
        { "label": "Animals", "value": "Killer Whale, Octopi, Red Tibetan Mastiff, Staffordshite Terrier, Bengal Tiger" },
        { "label": "Season", "value": "Spring, Autumn" },
        { "label": "Flowers", "value": "Gardenia, Jasmine, Lavender" },
        { "label": "Birds", "value": "Harpy Eagly, Common Raven, Cassowary" }
      ],
      "Tech": [
        { "label": "Programming Language", "value": "Python, Ruby, Javascript" },
        { "label": "Frameworks", "value": "Django, Vue, Next.js, React" },
        { "label": "Code Editors", "value": "Cursor, Windsurf, Sublime, VSCode" },
        { "label": "Line of Code", "value": "x = (lambda f: f(f))(lambda f: lambda n: 1 if n < 2 else n * f(f)(n - 1))" }
      ]
    }
  }
};

// Category icons and theme colors
const categoryConfig: Record<string, { icon: string; color: string; bgColor: string; cardBg: string; emoji: string }> = {
  "Personal": { 
    icon: "👤", 
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/20",
    cardBg: "bg-cyan-400/30",
    emoji: "💙"
  },
  "Entertainment": { 
    icon: "🎬", 
    color: "text-pink-500",
    bgColor: "bg-pink-500/20", // increased from /10 to /20
    cardBg: "bg-pink-500/30",  // increased from /20 to /30
    emoji: "🎭"
  },
  "Nature": { 
    icon: "🌿", 
    color: "text-green-400",
    bgColor: "bg-green-400/20", // was already vibrant
    cardBg: "bg-green-400/30",
    emoji: "🌎"
  },
  "Tech": { 
    icon: "💻", 
    color: "text-primary-yellow",
    bgColor: "bg-primary-yellow/20", // using custom yellow
    cardBg: "bg-primary-yellow/30",  // using custom yellow
    emoji: "⚙️"
  }
};

export default function AboutSection() {
  const pathname = usePathname()
  const terminalPath = getTerminalPath(pathname)
  
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Personal");
  
    // Use the terminal animation hook
  const {
    currentLineIndex,
    completedLines,
    isAnimationComplete,
    skipAnimation,
    replayAnimation,
    getCurrentTypedText,
  } = useTerminalAnimation({
    typingContent,
    getLineText,
  });

  // Helper function to split comma-separated values into arrays
  const splitValues = (value: string, label?: string): string[] => {
    // For quotes, split by | instead of comma
    if (label === "Quotes") {
      return value.split('|').filter(item => item.trim() !== '');
    }
    // For other items, use comma
    return value.split(/,\s*/).filter(item => item.trim() !== '');
  };

  return (
    <section id="about" className="py-20 bg-primary-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,73,153,0.03),transparent_40%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Typing Animation Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto bg-primary-navy/40 backdrop-blur-sm p-6 rounded-lg border border-primary-blue/20 shadow-lg">
            <TerminalHeader
              terminalPath={terminalPath}
              isAnimationComplete={isAnimationComplete}
              onSkip={skipAnimation}
              onReplay={replayAnimation}
            />
            
            <div className="font-mono text-left space-y-4">
              {/* Display completed lines */}
              {completedLines.map((lineText, index) => {
                const lineConfig = typingContent[index];
                if (!lineConfig) return null;
                
                const lineType = Object.keys(lineConfig).find(key => key !== 'color') || '';
                const fontSize = getTypingFontSize(lineType);
                const color = getLineColor(lineConfig);
                
                return (
                  <div key={index} className={`${fontSize} ${color}`}>
                    {lineText}
                  </div>
                );
              })}
              
              {/* Current typing line */}
              {currentLineIndex < typingContent.length && (
                <div className={`${(() => {
                  const currentLine = typingContent[currentLineIndex];
                  const lineType = Object.keys(currentLine).find(key => key !== 'color') || '';
                  return getTypingFontSize(lineType);
                })()} ${getLineColor(typingContent[currentLineIndex])}`}>
                  {getCurrentTypedText()}
                  <span className="animate-pulse">▌</span>
                </div>
              )}
              
              {/* Show cursor at the end when all lines are typed */}
              {currentLineIndex >= typingContent.length && (
                <div className="text-lg text-primary-blue">
                  <span className="animate-pulse">▌</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Story Section - No border */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary-navy/30 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            {/* My Story Heading */}
            <h3 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
              <span className="mr-2">✨</span>
              My Story
            </h3>
            
            {/* Quote moved directly below heading */}
            <div className="mb-8 text-center">
              <p className="text-slate-300 italic">
                "This website serves as a window into my technological journey, a portfolio of my projects, and a glimpse into who I am."
              </p>
            </div>
            
            {/* Click instruction moved above buttons with finger on left */}
            <div className="flex items-center justify-center mb-6 text-center">
              <div className="text-2xl mr-2">👇</div>
              <p className="text-slate-300">Click on any topic below to learn more about me!</p>
            </div>
            
            {/* Story Navigation */}
            <div className="flex flex-wrap gap-3 mb-8">
              {aboutContent.storyHighlights.map((highlight) => (
                <motion.button
                  key={highlight.id}
                  onClick={() => setActiveStory(activeStory === highlight.id ? null : highlight.id)}
                  className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                    activeStory === highlight.id 
                      ? 'bg-primary-blue/20 border-primary-blue text-white' 
                      : 'border-primary-blue/30 text-slate-300 hover:bg-primary-blue/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2 text-xl">{highlight.icon}</span>
                  <span>{highlight.title}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Story Content */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                {activeStory ? (
                  <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-primary-navy/60 p-5 rounded-lg border border-primary-blue/20"
                  >
                    {aboutContent.storyHighlights.map((highlight) => 
                      highlight.id === activeStory ? (
                        <div key={highlight.id}>
                          <div className="flex items-center mb-3">
                            <span className="text-3xl mr-3">{highlight.icon}</span>
                            <h4 className="text-xl font-bold text-primary-blue">{highlight.title}</h4>
                          </div>
                          <p className="text-slate-200 mb-4 leading-relaxed">{highlight.content}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {highlight.tags.map((tag) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center p-8"
                  >
                    <p className="text-slate-300">Select a topic to see details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Favorites - Redesigned with consistent colored cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary-navy/30 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-primary-blue mb-6 flex items-center">
              <span className="mr-2">❤️</span>
              {aboutContent.favorites.title}
            </h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(aboutContent.favorites.categories).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category 
                      ? `${categoryConfig[category].bgColor} ${categoryConfig[category].color} border border-${categoryConfig[category].color}/50` 
                      : 'bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{categoryConfig[category].icon}</span>
                    {category}
                  </span>
                </motion.button>
              ))}
            </div>
            
            {/* Favorites Content */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {Object.entries(aboutContent.favorites.categories).map(([category, items]) => (
                  activeCategory === category && (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg ${categoryConfig[category].bgColor}`}
                    >
                      {/* Category Header */}
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{categoryConfig[category].emoji}</span>
                        <h4 className={`text-xl font-bold ${categoryConfig[category].color}`}>
                          My Favorite {category} Things
                        </h4>
                      </div>
                      
                      {/* Items */}
                      <div className="space-y-6">
                        {items.map((item: FavoriteItem, index: number) => {
                          const values = splitValues(item.value, item.label);
                          return (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`${categoryConfig[category].cardBg} backdrop-blur-sm p-4 rounded-lg border border-white/5`}
                            >
                              <h5 className={`text-lg font-medium ${categoryConfig[category].color} mb-2`}>
                                {item.label}
                              </h5>
                              
                              {values.length > 1 ? (
                                <div className="flex flex-wrap gap-2">
                                  {values.map((value, i) => (
                                    <span 
                                      key={i} 
                                      className="bg-primary-navy/70 text-slate-200 px-3 py-1 rounded-full text-sm"
                                    >
                                      {value.trim()}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-200">{item.value}</p>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
