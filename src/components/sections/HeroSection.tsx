'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Content to be typed
const typingContent = {
  welcome: "Hi! Welcome to DavidPDonohue.com!!",
  intro: "I'll be your host for todays visit. Please call me David.",
  roles: [
    "Full Stack Web Developer,",
    "a Project Manager,",
    "an IT Professional,",
    "and a human being."
  ],
  description: "I'm passionate about Healthcare, FinTech, Cybersecurity, Artificial Intelligence and creating elegant, functional solutions that solve real-world problems. Feel free to explore the projects I've worked on, learn about my personal and professional journey, and discover my thoughts on technology and the world beyond tech!"
}

export default function HeroSection() {
  // State for each line of text
  const [welcomeText, setWelcomeText] = useState("");
  const [introText, setIntroText] = useState("");
  const [rolesText, setRolesText] = useState<string[]>(["", "", "", ""]); // Initialize with 4 empty strings
  const [descriptionText, setDescriptionText] = useState("");
  
  // State to track which element is currently being typed
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  
  // Typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Type welcome text
    if (currentTypingIndex === 0) {
      if (welcomeText.length < typingContent.welcome.length) {
        timeout = setTimeout(() => {
          setWelcomeText(typingContent.welcome.slice(0, welcomeText.length + 1));
        }, 50); // Adjust speed as needed
      } else {
        // Move to next text after a pause
        timeout = setTimeout(() => {
          setCurrentTypingIndex(1);
        }, 500);
      }
    }
    
    // Type intro text
    else if (currentTypingIndex === 1) {
      if (introText.length < typingContent.intro.length) {
        timeout = setTimeout(() => {
          setIntroText(typingContent.intro.slice(0, introText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setCurrentTypingIndex(2);
        }, 500);
      }
    }
    
    // Type roles text (one by one)
    else if (currentTypingIndex >= 2 && currentTypingIndex <= 5) { // Changed to 5 to include the 4th role
      const roleIndex = currentTypingIndex - 2;
      
      // Check if this role exists
      if (roleIndex < typingContent.roles.length) {
        const currentRole = typingContent.roles[roleIndex];
        const currentTypedRole = rolesText[roleIndex];
        
        if (currentTypedRole.length < currentRole.length) {
          timeout = setTimeout(() => {
            const newRolesText = [...rolesText];
            newRolesText[roleIndex] = currentRole.slice(0, currentTypedRole.length + 1);
            setRolesText(newRolesText);
          }, 50);
        } else {
          timeout = setTimeout(() => {
            setCurrentTypingIndex(currentTypingIndex + 1);
          }, 500);
        }
      } else {
        // Move to description if we've finished all roles
        setCurrentTypingIndex(6); // Changed to 6 since we now have 4 roles
      }
    }
    
    // Type description text
    else if (currentTypingIndex === 6) { // Changed to 6
      if (descriptionText.length < typingContent.description.length) {
        timeout = setTimeout(() => {
          setDescriptionText(typingContent.description.slice(0, descriptionText.length + 1));
        }, 20); // Faster typing for longer text
      }
    }
    
    return () => clearTimeout(timeout);
  }, [welcomeText, introText, rolesText, descriptionText, currentTypingIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-navy">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy/90 to-primary-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-primary-navy/70 backdrop-blur-sm p-8 rounded-lg border border-primary-blue/20 shadow-xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
            <div className="text-primary-blue/70 font-mono text-sm">terminal@davidpdonohue.com</div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-primary-sunset-orange"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="font-mono text-left space-y-4">
            {/* Welcome Text */}
            <div className="text-2xl md:text-3xl lg:text-4xl text-primary-sunset-orange font-bold">
              {welcomeText}
              {welcomeText.length < typingContent.welcome.length && (
                <span className="animate-pulse">▌</span>
              )}
            </div>
            
            {/* Intro Text */}
            {welcomeText === typingContent.welcome && (
              <div className="text-xl text-primary-blue">
                {introText}
                {introText.length < typingContent.intro.length && currentTypingIndex === 1 && (
                  <span className="animate-pulse">▌</span>
                )}
              </div>
            )}
            
            {/* Roles */}
            {introText === typingContent.intro && (
              <div className="text-xl">
                <span className="text-primary-magenta">I am a:</span>
                <div className="ml-4 space-y-1">
                  {rolesText.map((role, index) => (
                    <div key={index} className="text-primary-magenta">
                      {role}
                      {role.length < (typingContent.roles[index] || '').length && currentTypingIndex === index + 2 && (
                        <span className="animate-pulse">▌</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Description */}
            {rolesText[3] === typingContent.roles[3] && ( // Changed to check the 4th role
              <div className="text-lg text-primary-blue">
                {descriptionText}
                {descriptionText.length < typingContent.description.length && (
                  <span className="animate-pulse">▌</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: rolesText[3] === typingContent.roles[3] ? 1 : 0 }} // Changed to check the 4th role
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-6 mt-12"
        >
          <a 
            href="https://github.com/sdirishguy"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">GitHub</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/davidpatrickdonohue"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="mailto:david@opfynder.com"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">Email</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
