'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function ContentPlaceholder() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Generate captcha
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaAnswer((num1 + num2).toString());
    setCaptchaValue(`${num1} + ${num2} = ?`);
  }, []);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else if (value.length > 100) {
      setEmailError('Email must be less than 100 characters');
    } else {
      setEmailError('');
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCaptchaValue(value);
    if (value !== captchaAnswer) {
      setCaptchaError('Incorrect answer');
    } else {
      setCaptchaError('');
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email and captcha
    if (!email.trim() || isSubmitting || emailError || captchaValue !== captchaAnswer) {
      if (captchaValue !== captchaAnswer) {
        setCaptchaError('Please solve the captcha correctly');
      }
      return;
    }
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      setCaptchaValue('');
      setCaptchaError('');
      
      // Generate new captcha
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaAnswer((num1 + num2).toString());
      setCaptchaValue(`${num1} + ${num2} = ?`);
    } catch (error) {
      console.error('Signup error:', error);
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
        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto bg-primary-navy/40 backdrop-blur-sm p-8 rounded-lg border border-primary-blue/20 shadow-lg">
            <h2 className="text-4xl font-bold text-white mb-6">Content Library 📚</h2>
            <p className="text-xl text-slate-300 mb-8">
              I'm currently building an amazing collection of articles, tutorials, and resources. 
              This section is under active development - check back often for updates!
            </p>
            
            {/* Email Signup */}
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Stay Updated! 📧</h3>
              <p className="text-slate-300 mb-6">
                Be the first to know when new content is published.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none ${
                        emailError ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="text-red-400 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  
                  {/* Captcha */}
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-navy/60 px-4 py-2 rounded-lg border border-primary-blue/30 text-primary-blue font-mono">
                        {captchaValue}
                      </div>
                      <input
                        type="text"
                        value={captchaValue}
                        onChange={handleCaptchaChange}
                        placeholder="Answer"
                        className={`w-32 px-4 py-2 bg-primary-navy/60 border rounded-lg text-white placeholder-slate-400 focus:outline-none ${
                          captchaError ? 'border-red-500' : 'border-primary-blue/30 focus:border-primary-blue'
                        }`}
                        required
                      />
                    </div>
                    {captchaError && (
                      <p className="text-red-400 text-sm mt-1">{captchaError}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !!emailError || !!captchaError}
                    className="w-full"
                  >
                    {isSubmitting ? 'Signing Up...' : 'Notify Me'}
                  </Button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-semibold">✅ You're all set!</p>
                  <p className="text-slate-300 text-sm mt-1">
                    You'll receive updates when new content is published.
                  </p>
                </div>
              )}
              
              <p className="text-slate-400 text-sm mt-4">
                No spam, just quality content updates. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 