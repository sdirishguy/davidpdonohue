'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'
import { useTerminalAnimation } from '@/hooks/useTerminalAnimation'
import { TerminalHeader } from '@/components/ui/TerminalHeader'
import { openSecureLink } from '@/lib/secure-link-util'

// Typing animation content
const typingContent = [
  { greeting: "Still can't get enough, huh?", color: "text-primary-sunset-orange" },
  { intro: " Let's connect! 🤝", color: "text-primary-blue"},
  { intro: "I'm always interested in new opportunities, collaborations, and interesting conversations.", color: "text-primary-magenta" },
  { body: "I've got several options for you get in touch with me, scroll down and pick your preferred method!", color: "text-primary-yellow" },
  { narrative: "I can't wait to hear from you! Cheers!", color: "text-primary-blue" }
];

// Contact methods
const contactMethods = [
  {
    id: "email",
    title: "Email",
    description: "The most reliable way to reach me. I typically respond within 24 hours.",
    icon: "📧",
    value: "david@davidpdonohue.com",
    action: "Copy Email",
    type: "copy"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect professionally and see my work experience and recommendations.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    value: "linkedin.com/in/davidpatrickdonohue",
    action: "View Profile",
    type: "link",
    url: "https://www.linkedin.com/in/davidpatrickdonohue"
  },
  {
    id: "github",
    title: "GitHub",
    description: "Check out my open source projects and code contributions.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    value: "github.com/sdirishguy",
    action: "View Profile",
    type: "link",
    url: "https://www.github.com/sdirishguy"
  }
];

export default function ContactSection() {
  const pathname = usePathname()
  const terminalPath = getTerminalPath(pathname)
  
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
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  

  
  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle verification checkbox
  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsHumanVerified(checked);
    if (checked) {
      setVerificationError('');
    } else {
      setVerificationError('Please verify that you are human');
    }
  };

  // Input validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateInput = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (value.length > 50) {
          newErrors.name = 'Name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = 'Name can only contain letters and spaces';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else if (value.length > 100) {
          newErrors.email = 'Email must be less than 100 characters';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          newErrors.subject = 'Subject is required';
        } else if (value.length < 5) {
          newErrors.subject = 'Subject must be at least 5 characters';
        } else if (value.length > 100) {
          newErrors.subject = 'Subject must be less than 100 characters';
        } else {
          delete newErrors.subject;
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else if (value.length > 1000) {
          newErrors.message = 'Message must be less than 1000 characters';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateInput('name', formData.name);
    const isEmailValid = validateInput('email', formData.email);
    const isSubjectValid = validateInput('subject', formData.subject);
    const isMessageValid = validateInput('message', formData.message);
    
    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid || !isHumanVerified) {
      if (!isHumanVerified) {
        setVerificationError('Please verify that you are human');
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setIsHumanVerified(false); // Reset verification state
      setVerificationError(''); // Clear verification error
      
      // You could add a success notification here
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  


  return (
    <section className="py-20 bg-primary-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,73,153,0.03),transparent_40%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Terminal Typing Animation */}
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

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:border-primary-blue/30 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-3xl">
                        {typeof method.icon === 'string' ? method.icon : method.icon}
                      </div>
                      <Badge variant="outline">{method.title}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary-navy/40 p-3 rounded-lg border border-primary-blue/20">
                      <p className="text-primary-blue font-mono text-sm break-all">{method.value}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        if (method.type === 'copy') {
                          copyToClipboard(method.value);
                        } else if (method.type === 'link' && method.url) {
                          openSecureLink(method.url);
                        }
                      }}
                    >
                      {method.action}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Send a Message 💬</h2>
              <p className="text-slate-300">
                Prefer a direct message? Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>
            
            <Card className="bg-primary-navy/40 backdrop-blur-sm border border-primary-blue/20">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none ${
                          errors.name ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none ${
                        errors.subject ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none resize-none ${
                        errors.message ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                      }`}
                      placeholder="Tell me about your project, opportunity, or just say hello!"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Captcha */}
                  <div>
                    <label htmlFor="captcha" className="block text-sm font-medium text-white mb-2">
                      Security Check *
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="captcha"
                        name="captcha"
                        checked={isHumanVerified}
                        onChange={handleVerificationChange}
                        required
                        className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                      />
                      <label htmlFor="captcha" className="text-sm text-white">
                        I am a human.
                      </label>
                    </div>
                    {verificationError && (
                      <p className="text-red-400 text-sm mt-1">{verificationError}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary-blue/10 via-primary-magenta/10 to-primary-sunset-orange/10 p-8 rounded-lg backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Build Something Amazing! 🚀</h3>
            <p className="text-slate-300 mb-6">
              Whether you have a project in mind, want to collaborate, or just want to chat about technology, 
                              I&apos;m always excited to connect with fellow developers and creators.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => copyToClipboard('david@davidpdonohue.com')}
              >
                Copy Email
              </Button>
              <Button
                variant="outline"
                onClick={() => openSecureLink('https://www.linkedin.com/in/davidpatrickdonohue')}
              >
                Connect on LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={() => openSecureLink('/DavidPDonohue_Resume2025.pdf')}
                className="border-primary-yellow/30 text-primary-yellow hover:bg-primary-yellow/10"
              >
                📄 Download Resume
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


