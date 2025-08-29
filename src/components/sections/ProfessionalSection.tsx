/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'
import { useTerminalAnimation } from '@/hooks/useTerminalAnimation'
import { TerminalHeader } from '@/components/ui/TerminalHeader'
import { openSecureLink } from '@/lib/secure-link-util'
import { 
  SiPython, 
  SiDjango, 
  SiRubyonrails, 
  SiJavascript, 
  SiPostgresql, 
  SiAmazon,
  SiNodedotjs,
  SiReact,
  SiVuedotjs
} from 'react-icons/si'

// Typing animation content
const typingContent = [
  { greeting: "Let me welcome you to the Professional section of my website!", color: "text-primary-yellow" },
  { intro: "This is my favorite section of the site!", color: "text-primary-blue" },
      { body: "It is where you'll learn all about my experience as a Full Stack Web Developer,", color: "text-primary-magenta"},
  { body: "a Project Manager,", color: "text-primary-magenta"},
  { body: "an IT Projessional,", color: "text-primary-magenta"},
  { body: "and a life long learner.", color: "text-primary-magenta"},
  { body: "Use the navigation menu appearing shortly to learn all about my professional journey, skills, experience, education, and certifications.", color: "text-primary-blue" },
  { narrative: "For a PDF copy of my resume, click on the paper icon at the top right of the page.", color: "text-primary-sunset-orange" },
  { narrative: "Cheers!", color: "text-primary-blue" }
];

// Professional content from your resume
const professionalContent = {
  title: "Professional Experience",
  resumeSummary: "Resilient by experience. Driven by purpose. Building for what's next. I am a full-stack developer and cloud/cybersecurity technologist with 10+ years of cross-industry experience—from healthcare IT leadership and EMR implementation to modern web application delivery. I architect and deploy secure, scalable systems using Python, Django, Ruby on Rails, JavaScript, and PostgreSQL, and I've led teams through complex cloud, infrastructure, and compliance challenges. I am driven by a strong sense of purpose, combining technical expertise with empathy, adaptability, and a commitment to addressing meaningful challenges. Whether optimizing patient care workflows or developing secure digital platforms, I'm committed to building technology that empowers people and moves us forward.",
  
  experience: [
    {
      title: "IT Manager (Part-Time)",
      company: "Lucky D's Hostel",
      period: "Sept 2019 – Sept 2024",
      location: "San Diego, CA",
      description: "Managed IT infrastructure and security for a hospitality business.",
      achievements: [
        "Oversaw all IT infrastructure upgrades using Cisco Meraki, improving system reliability and network performance",
        "Implemented security protocols and firewall configurations to ensure GDPR and PCI compliance",
        "Migrated operations to a cloud-based platform, reducing downtime and improving remote management",
        "Trained staff on cybersecurity best practices, reducing security incidents by 60%"
      ],
      technologies: ["Cisco Meraki", "Network Security", "Cloud Migration", "Cybersecurity"]
    },
    {
      title: "Full Stack Web Developer",
      company: "Notch8",
      period: "Jun 2016 – Aug 2018",
      location: "San Diego, CA",
      description: "Developed web applications and infrastructure for various clients.",
      achievements: [
        "Developed web apps using Ruby, Rails, JavaScript, PostgreSQL, MySQL, and JavaScript frameworks like React and Angular",
        "Built infrastructure with Docker Containers, Rancher, and Ansible, deploying to AWS and Google Cloud for scalability",
        "Led QA cycles, managed plugin integration, and handled staging-to-production deployment pipelines",
        "Delivered custom software for clients including Broadband Forum, TCTrac, UCSD S.U.R.F., Moishe House, La Jolla Kayak, StartupSD.com"
      ],
      technologies: ["Ruby", "Rails", "JavaScript", "React", "Angular", "PostgreSQL", "MySQL", "Docker", "AWS", "Google Cloud"]
    },
    {
      title: "Software Engineer Intern",
      company: "Q-Centrix",
      period: "Apr 2016 – Jun 2016",
      location: "San Diego, CA",
      description: "Enhanced HIPAA-compliant web applications for healthcare clients.",
      achievements: [
        "Enhanced HIPAA-compliant web application using Ruby on Rails, Angular, Ember, and PostgreSQL",
        "Collaborated in Agile teams, focusing on feature development, testing, and bug resolution",
        "Developed and validated form logic aligned with NCDR standards for clinical registry compliance",
        "Applied Behavior-Driven Development (BDD) principles while pair-programming with senior engineers"
      ],
      technologies: ["Ruby", "Ruby on Rails", "Angular", "Ember", "PostgreSQL", "HIPAA", "BDD"]
    },
    {
      title: "Project Manager – Implementation",
      company: "XIFIN, Inc.",
      period: "Nov 2012 – Mar 2013",
      location: "San Diego, CA",
      description: "Managed SaaS-based RCM system implementations for enterprise reference and diagnostic laboratories.",
      achievements: [
        "Directed rollout of SaaS-based RCM system for large national reference labs handling 20k+ nightly accesions",
        "Mapped operational workflows to system functionality, reducing claim errors by 30%",
        "Ensured on-time, within-budget delivery through tight coordination across client and internal teams",
        "Conducted hands-on training, achieving strong provider adoption and minimal post-launch issues"
      ],
      technologies: ["SaaS Implementation", "RCM Systems", "Project Management", "Healthcare IT"]
    },
    {
      title: "Project Manager – Implementations & Special Projects",
      company: "Healthcare Data Solutions",
      period: "2010 – 2012",
      location: "Miami, FL",
      description: "Led SaaS implementations of Allscripts PM/EHR systems for healthcare providers.",
      achievements: [
        "Led SaaS implementations of Allscripts PM/EHR systems for 50+ small to mid-sized clinics",
        "Created custom training guides that improved provider Meaningful Use attestation success rates",
        "Maintained 100% go-live success rate and 98% customer satisfaction over three years",
        "Reduced post-go-live support by 50% by introducing self-service resources and process optimizations"
      ],
      technologies: ["Allscripts", "PM/EHR Systems", "SaaS Implementation", "Healthcare IT", "Meaningful Use", "Project Management", "HITECH", "Meaningful Use", "RCM Optimization", "SaaS Implementation"]
    },
    {
      title: "Senior Application Specialist",
      company: "gMed",
      period: "2007 – 2010",
      location: "Weston, FL",
      description: "Delivered EHR implementation and training for multi-provider GI practices.",
      achievements: [
        "Delivered EHR implementation and training for multi-provider GI practices using gCare2 and gGastro",
        "Managed system rollouts across 26-provider networks, consistently meeting time and budget goals",
        "Drove workflow improvements that cut post-go-live support tickets by over 50%",
        "Earned 4.96/5.00 satisfaction score four years running; selected for Product and Enhancement Development Committees"
      ],
      technologies: ["gCare2", "gGastro", "EMR/EHR Implementation", "Healthcare IT", "Training", "Project Management", "HITECH", "Meaningful Use", "RCM Optimization", "SaaS Implementation"]
    }
  ],
  
  skills: {
          "Languages & Frameworks": [
      "Ruby", "Python", "JavaScript (ES6+)", "Rails", "Django", "Node.js", 
      "Vue3.js", "React.js", "HTML5", "CSS", "Sass", "Bootstrap", "Tailwind CSS", "Next.js"
    ],
    "Databases": [
      "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "SQL Server"
    ],
    "Cloud & Infrastructure": [
      "AWS", "GCP", "Microsoft Azure", "Docker", "VMware", "VirtualBox"
    ],
    "Cybersecurity": [
      "Ethical Hacking", "Network Security", "Kali Linux", "Metasploit", 
      "Nmap", "Nessus", "Wireshark", "Burp Suite", "Hashcat", "John the Ripper"
    ],
    "Development & DevOps": [
      "Git", "GitHub", "GitLab", "Heroku", "CI/CD", "Jira", "Bitbucket", "Trello"
    ],
    "Healthcare IT": [
      "HIPAA", "HITECH", "FHIR", "EMR/EHR Implementation", "RCM Optimization"
    ]
  },
  
  education: [
    {
      institution: "San Diego College of Continuing Education / AWS Academy",
      degrees: [
        "Python Programming (2025)",
        "Data Management with Python (2025)",
        "Cybersecurity Analyst Certification Program (2025 - 2026)",
        "AWS Cloud Architect Associate (2024)"
      ]
    },
    {
      institution: "Udacity",
      degrees: [
        "Generative AI with AWS (2025)",
        "Frontend Development Nanodegree (2025)",
        "Certificate in Cloud Computing (2024)",
        "Ethical Hacking Nanodegree (2025)",
        "Mobile and Web Application Development (2018)"
      ]
    },
    {
      institution: "LEARN Academy – San Diego, CA",
      degrees: [
        "Full-stack web development bootcamp (Ruby on Rails, JavaScript, PostgreSQL)"
      ],
      description: "Immersive, full-stack web development bootcamp focused on Ruby on Rails. Gained hands-on experience in building dynamic web applications, collaborating with a team, and deploying projects to production."
    },
    {
      institution: "Western Governors University",
      degrees: [
        "Bachelor of Science in Network Operations & Security (Started in 2020, on hold)"
      ],
              description: "Program started in 2020, on hold due to COVID-19 & financial reasons"
    },
    {
      institution: "University of Nebraska - Lincoln",
      degrees: [
        "Bachelor of Science in Economics (Pending, 6 credits remaining)",
        "Bachelor of Business Administration in Finance (Pending, 6 credits remaining)"
      ]
    },
    {
      institution: "Vanderbilt University - Nashville, TN",
      degrees: [
        "Bachelor of Arts in Economics and Political Science (withdrew due to prolonged illness)"
      ]
    }
  ],
  
  certifications: [
    {
      name: "AWS Cloud Architect Associate",
      issuer: "AWS Academy",
      date: "2024",
      credentialId: "https://www.credly.com/badges/426b9400-8734-438d-92b2-c7f3ee7774d6/public_url"
    },
    {
      name: "AWS Cloud Foundations",
      issuer: "AWS Academy",
      date: "2024",
      credentialId: "https://www.credly.com/badges/5e69d2c9-bc00-4f80-8b8e-72387269ac66/public_url"
    },
    {
      name: "Generative A.I. with AWS",
      issuer: "Udacity",
      date: "2025",
      credentialId: "https://www.udacity.com/certificate/e/0a2a54fe-3f3d-11f0-b7ed-2f564c258ac0"
    },
    {
      name: "Ethical Hacking Nanodegree",
      issuer: "Udacity",
      date: "2025",
      credentialId: "https://www.udacity.com/certificate/e/26fd9880-b7ba-11ef-9024-e3d1df8b0307"
    },
    {
      name: "Frontend Development Nanodegree",
      issuer: "Udacity",
      date: "2025",
      credentialId: "https://www.udacity.com/certificate/e/9d575e64-3616-11f0-af65-47dc0a68d4da"
    }
  ]
};

// Tab configuration with colors
const tabConfig = {
  'summary': { 
    color: 'bg-primary-blue',
    textColor: 'text-primary-blue',
    borderColor: 'border-primary-blue',
    bgColor: 'bg-primary-blue/10'
  },
  'experience': { 
    color: 'bg-primary-magenta',
    textColor: 'text-primary-magenta',
    borderColor: 'border-primary-magenta',
    bgColor: 'bg-primary-magenta/10'
  },
  'skills': { 
    color: 'bg-primary-sunset-orange',
    textColor: 'text-primary-sunset-orange',
    borderColor: 'border-primary-sunset-orange',
    bgColor: 'bg-primary-sunset-orange/10'
  },
  'certifications': { 
    color: 'bg-primary-yellow',
    textColor: 'text-primary-yellow',
    borderColor: 'border-primary-yellow',
    bgColor: 'bg-primary-yellow/10'
  }
};

// Skill category icons and colors
const skillCategoryConfig: Record<string, { icon: string; color: string }> = {
  "Languages & Frameworks": { icon: "💻", color: "text-primary-blue" },
  "Databases": { icon: "🗄️", color: "text-primary-magenta" },
  "Cloud & Infrastructure": { icon: "☁️", color: "text-primary-sunset-orange" },
  "Cybersecurity": { icon: "🔒", color: "text-primary-yellow" },
  "Development & DevOps": { icon: "🔄", color: "text-primary-blue" },
  "Healthcare IT": { icon: "🏥", color: "text-primary-magenta" }
};

export default function ProfessionalSection() {
  const pathname = usePathname()
  const terminalPath = getTerminalPath(pathname)
  
  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'skills' | 'certifications'>('summary');
  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  
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

  // State to control navigation animation
  const [showNavigation, setShowNavigation] = useState(false);
  
  // Show navigation when terminal animation is complete
  useEffect(() => {
    if (isAnimationComplete) {
      const timer = setTimeout(() => {
        setShowNavigation(true);
      }, 500); // Small delay after terminal completes
      
      return () => clearTimeout(timer);
    }
    return undefined; // Explicit return for when condition is false
  }, [isAnimationComplete]);
  
  return (
    <section id="professional" className="py-20 bg-primary-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,73,153,0.03),transparent_40%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Terminal Typing Animation */}
        {!showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
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
        )}

        {/* Navigation and Content Layout - Show when terminal is complete */}
        {currentLineIndex >= typingContent.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Navigation Sidebar */}
                         <motion.div
               initial={{ x: -100, opacity: 0 }}
               animate={showNavigation ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
               transition={{ 
                 duration: 1.2, 
                 type: "spring", 
                 stiffness: 80,
                 delay: 0.3
               }}
               className="lg:w-80 flex-shrink-0"
             >
              <div className="bg-primary-navy/40 backdrop-blur-sm p-6 rounded-lg border border-primary-blue/20 shadow-lg">
                <h3 className="text-xl font-bold text-primary-blue mb-6">Navigation</h3>
                <div className="space-y-4">
                                     <motion.button
                     initial={{ x: -50, opacity: 0 }}
                     animate={showNavigation ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                     transition={{ delay: 0.6, duration: 0.8 }}
                     whileHover={{ scale: 1.05, x: 5 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setActiveTab('summary')}
                     className={`w-full text-left p-4 rounded-lg transition-all ${
                       activeTab === 'summary' 
                         ? 'bg-primary-blue text-white shadow-lg' 
                         : 'bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70'
                     }`}
                   >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📋</span>
                      <span className="font-medium">Summary</span>
                    </div>
                  </motion.button>
                  
                                     <motion.button
                     initial={{ x: -50, opacity: 0 }}
                     animate={showNavigation ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                     transition={{ delay: 0.7, duration: 0.8 }}
                     whileHover={{ scale: 1.05, x: 5 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setActiveTab('experience')}
                     className={`w-full text-left p-4 rounded-lg transition-all ${
                       activeTab === 'experience' 
                         ? 'bg-primary-magenta text-white shadow-lg' 
                         : 'bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70'
                     }`}
                   >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💼</span>
                      <span className="font-medium">Experience</span>
                    </div>
                  </motion.button>
                  
                                     <motion.button
                     initial={{ x: -50, opacity: 0 }}
                     animate={showNavigation ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                     transition={{ delay: 0.8, duration: 0.8 }}
                     whileHover={{ scale: 1.05, x: 5 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setActiveTab('skills')}
                     className={`w-full text-left p-4 rounded-lg transition-all ${
                       activeTab === 'skills' 
                         ? 'bg-primary-sunset-orange text-white shadow-lg' 
                         : 'bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70'
                     }`}
                   >
                                         <div className="flex items-center">
                       <span className="text-2xl mr-3">🛠️</span>
                       <span className="font-medium">Skills</span>
                     </div>
                  </motion.button>
                  
                                     <motion.button
                     initial={{ x: -50, opacity: 0 }}
                     animate={showNavigation ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                     transition={{ delay: 0.9, duration: 0.8 }}
                     whileHover={{ scale: 1.05, x: 5 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setActiveTab('certifications')}
                     className={`w-full text-left p-4 rounded-lg transition-all ${
                       activeTab === 'certifications' 
                         ? 'bg-primary-yellow text-primary-navy shadow-lg' 
                         : 'bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70'
                     }`}
                   >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🏆</span>
                      <span className="font-medium">Education/Certifications</span>
                    </div>
                  </motion.button>
                  
                  {/* Resume Download Button - Moved to last */}
                  <motion.button
                    initial={{ x: -50, opacity: 0 }}
                    animate={showNavigation ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openSecureLink('/DavidPDonohue_Resume2025.pdf')}
                    className="w-full text-left p-4 rounded-lg transition-all bg-primary-navy/50 text-slate-300 hover:bg-primary-navy/70 border border-primary-blue/30 hover:border-primary-blue/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📄</span>
                        <span className="font-medium">Download Resume</span>
                      </div>
                      <span className="text-sm text-primary-blue">PDF</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
                         <motion.div
               initial={{ x: 100, opacity: 0 }}
               animate={showNavigation ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
               transition={{ 
                 duration: 1.2, 
                 type: "spring", 
                 stiffness: 80,
                 delay: 0.5
               }}
               className="flex-1"
             >
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* Summary Tab */}
                {activeTab === 'summary' && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-6xl"
                  >
                                         {/* Hero Statement */}
                     <motion.div
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.6 }}
                       className="text-center mb-12"
                     >
                       <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                         <span className="text-primary-blue">Resilient</span> by experience.
                         <br />
                         <span className="text-primary-magenta">Driven</span> by purpose.
                         <br />
                         <span className="text-primary-sunset-orange">Building</span> for what's next.
                       </h2>
                       
                       {/* Mission Statement */}
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="text-center"
                       >
                         <div className="bg-gradient-to-r from-primary-blue/10 via-primary-magenta/10 to-primary-sunset-orange/10 backdrop-blur-sm p-8 rounded-xl border border-primary-blue/20">
                           <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
                           <p className="text-xl text-slate-200 leading-relaxed max-w-4xl mx-auto">
                             Whether optimizing patient care workflows or developing secure digital platforms, 
                             I'm committed to building technology that <span className="text-primary-yellow font-semibold">empowers people</span> and 
                             <span className="text-primary-yellow font-semibold"> moves us forward</span>.
                           </p>
                         </div>
                       </motion.div>
                     </motion.div>

                    {/* Professional Identity Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {/* Experience Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-primary-blue/20 to-primary-blue/5 backdrop-blur-sm p-6 rounded-xl border border-primary-blue/30 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center mr-4">
                              <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-blue">10+ Years</h3>
                          </div>
                          <p className="text-slate-200 leading-relaxed">
                            Cross-industry experience from business IT management to healthcare IT leadership and EMR implementation to modern web application delivery.
                          </p>
                        </div>
                      </motion.div>

                      {/* Role Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-primary-magenta/20 to-primary-magenta/5 backdrop-blur-sm p-6 rounded-xl border border-primary-blue/30 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary-magenta/20 rounded-lg flex items-center justify-center mr-4">
                              <span className="text-2xl">💻</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-magenta">Full-Stack Developer</h3>
                          </div>
                          <p className="text-slate-200 leading-relaxed">
                            Cloud/cybersecurity technologist architecting and deploying secure, scalable systems.
                          </p>
                        </div>
                      </motion.div>

                      {/* Purpose Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-primary-sunset-orange/20 to-primary-sunset-orange/5 backdrop-blur-sm p-6 rounded-xl border border-primary-blue/30 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary-sunset-orange/20 rounded-lg flex items-center justify-center mr-4">
                              <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-sunset-orange">Purpose-Driven</h3>
                          </div>
                          <p className="text-slate-200 leading-relaxed">
                            Combining technical expertise with empathy, adaptability, and commitment to meaningful challenges.
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Technology Stack */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Core Technologies</h3>
                                             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                   {[
                            { name: "Python", icon: SiPython, color: "text-blue-400" },
                            { name: "Django", icon: SiDjango, color: "text-green-400" },
                            { name: "Ruby on Rails", icon: SiRubyonrails, color: "text-red-400" },
                            { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
                            { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
                            { name: "React.js", icon: SiReact, color: "text-blue-500" },
                            { name: "Vue.js", icon: SiVuedotjs, color: "text-green-400" },
                            { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300" },
                            { name: "AWS", icon: SiAmazon, color: "text-orange-400" }
                          ].map((tech, index) => (
                           <motion.div
                             key={tech.name}
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                             whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                             className="bg-primary-navy/50 backdrop-blur-sm p-4 rounded-lg border border-primary-blue/20 text-center hover:border-primary-blue/40 transition-colors"
                           >
                             <div className="text-2xl mb-2">
                               <tech.icon className="w-8 h-8 mx-auto" />
                             </div>
                             <div className={`text-sm font-medium ${tech.color}`}>{tech.name}</div>
                           </motion.div>
                         ))}
                       </div>
                    </motion.div>

                    
                  </motion.div>
                )}
                
                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Experience Navigation */}
                      <div className="md:col-span-1">
                        <div className={`${tabConfig.experience.bgColor} backdrop-blur-sm p-4 rounded-lg shadow-lg`}>
                          <h3 className={`text-xl font-bold ${tabConfig.experience.textColor} mb-4`}>Career Timeline</h3>
                          <div className="space-y-2">
                            {professionalContent.experience.map((exp, index) => (
                              <motion.button
                                key={index}
                                onClick={() => setSelectedExperience(index)}
                                whileHover={{ x: 5 }}
                                className={`w-full text-left p-3 rounded-lg transition-all ${
                                  selectedExperience === index
                                    ? `bg-primary-magenta/20 border-l-4 ${tabConfig.experience.borderColor}`
                                    : 'bg-primary-navy/50 hover:bg-primary-navy/70'
                                }`}
                              >
                                <div className="font-medium text-white">{exp.company}</div>
                                <div className="text-sm text-slate-300">{exp.title}</div>
                                <div className={`text-xs ${tabConfig.experience.textColor} mt-1`}>{exp.period}</div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Experience Details */}
                      <div className="md:col-span-2">
                        <AnimatePresence mode="wait">
                          {professionalContent.experience.map((exp, index) => (
                            selectedExperience === index && (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                                                 <Card className={`relative border border-primary-magenta/40`}>
                                   <CardHeader className={`border-b border-primary-magenta/30`}>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                      <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                                        <p className={`${tabConfig.experience.textColor} text-lg font-semibold`}>{exp.company}</p>
                                      </div>
                                      <div className="text-right mt-2 md:mt-0">
                                        <p className="text-slate-200 font-medium">{exp.period}</p>
                                        <p className="text-slate-300">{exp.location}</p>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-slate-200 mb-6 leading-relaxed">{exp.description}</p>
                                    
                                    <div className="mb-6">
                                      <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                      <ul className="space-y-2">
                                        {exp.achievements.map((achievement, i) => (
                                          <motion.li 
                                            key={i} 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-slate-200 flex items-start"
                                          >
                                            <span className={`${tabConfig.experience.textColor} mr-2`}>•</span>
                                            {achievement}
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                          <Badge key={i} variant="outline">{tech}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            )
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                                 {/* Skills Tab */}
                 {activeTab === 'skills' && (
                   <motion.div
                     key="skills"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                   >
                     {/* Quote above Skills cards */}
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.2 }}
                       className="mb-8 text-center"
                     >
                       <p className="text-slate-300 italic text-lg">
                         "I'm constantly learning and expanding my technical toolkit to stay on top of my game."
                       </p>
                     </motion.div>
                     
                     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                       {Object.entries(professionalContent.skills).map(([category, skillList], index) => (
                         <motion.div
                           key={category}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.4, delay: index * 0.1 }}
                         >
                                                       <Card className="h-full border border-[#FD5E53]/40">
                              <CardHeader className="border-b border-[#FD5E53]/30">
                               <div className="flex items-center">
                                 <span className="text-2xl mr-3">{skillCategoryConfig[category]?.icon || '🔧'}</span>
                                 <h3 className={`text-xl font-bold ${tabConfig.skills.textColor}`}>
                                   {category}
                                 </h3>
                               </div>
                             </CardHeader>
                             <CardContent>
                               <div className="flex flex-wrap gap-2">
                                 {skillList.map((skill, i) => (
                                   <motion.div
                                     key={i}
                                     initial={{ opacity: 0, scale: 0.8 }}
                                     animate={{ opacity: 1, scale: 1 }}
                                     transition={{ delay: i * 0.05 + index * 0.1 }}
                                   >
                                     <Badge variant="primary">{skill}</Badge>
                                   </motion.div>
                                 ))}
                               </div>
                             </CardContent>
                           </Card>
                         </motion.div>
                       ))}
                     </div>
                   </motion.div>
                 )}
                
                {/* Certifications & Education Tab */}
                {activeTab === 'certifications' && (
                  <motion.div
                    key="certifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Certifications */}
                      <div>
                        <h3 className={`text-2xl font-bold ${tabConfig.certifications.textColor} mb-6 flex items-center`}>
                          <span className="mr-2">🏆</span>
                          Certifications
                        </h3>
                        
                        <div className="space-y-6">
                          {professionalContent.certifications.map((cert, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                                             <Card className={`h-full border border-primary-yellow/40 hover:border-primary-yellow/60 transition-colors`}>
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                                    {cert.credentialId.startsWith('http') ? (
                                      <Badge variant="success">Completed</Badge>
                                    ) : (
                                      <Badge variant="success">In Progress</Badge>
                                    )}
                                  </div>
                                  <p className={`${tabConfig.certifications.textColor} font-semibold mb-2`}>{cert.issuer}</p>
                                  {cert.credentialId.startsWith('http') ? (
                                    <div className="space-y-2">
                                      <p className="text-slate-300">Completed: {cert.date}</p>
                                      <a 
                                        href={cert.credentialId}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-yellow hover:underline text-sm inline-flex items-center"
                                      >
                                        View Credential →
                                      </a>
                                    </div>
                                  ) : (
                                    <p className="text-slate-300">Expected: {cert.date}</p>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Education */}
                      <div>
                        <h3 className={`text-2xl font-bold ${tabConfig.certifications.textColor} mb-6 flex items-center`}>
                          <span className="mr-2">🎓</span>
                          Education
                        </h3>
                        
                        <div className="space-y-6">
                          {professionalContent.education.map((edu, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                                             <Card className={`h-full border border-primary-yellow/40`}>
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-bold text-white mb-3">{edu.institution}</h3>
                                  <div className="space-y-2 mb-3">
                                    {edu.degrees.map((degree, i) => (
                                      <p key={i} className="text-slate-300">{degree}</p>
                                    ))}
                                  </div>
                                  {edu.description && (
                                    <p className="text-slate-400 text-sm mt-2 italic">{edu.description}</p>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-12 text-center"
                    >
                      <p className="text-slate-300">
                        Want to see my complete credentials? Check out my{" "}
                        <a 
                          href="https://www.linkedin.com/in/davidpatrickdonohue" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`${tabConfig.certifications.textColor} hover:underline`}
                        >
                          LinkedIn profile
                        </a>.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
