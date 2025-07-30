'use client'

import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

// Parse HTML content
function createMarkup(htmlContent: string) {
  return { __html: htmlContent };
}

// Professional content
const professionalContent = {
  title: "Professional Experience",
  resumeSummary: "<p>I'm a healthcare IT implementation leader and full-stack developer with 10+ years of experience helping providers, administrators, and health systems adopt and optimize technology that improves care delivery. My career spans EHR implementations, SaaS deployment, cloud infrastructure, and regulatory compliance, with a proven track record of leading complex projects from kickoff to go-live with 100% success.</p>\n\n<p>I've worked across startups and enterprise systems—building secure, scalable platforms, training clinical teams, and bridging the gap between technical teams and frontline healthcare providers. My background in cybersecurity, cloud architecture, and web development complements my deep understanding of healthcare workflows and patient-centered design.</p>\n\n<p>As a cancer survivor and the child of two physicians, I bring a personal passion to the work I do: creating technology that helps people—not hinders them—in their moments of care.</p>",
  // Placeholder data - to be replaced with your actual resume data
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      period: "2022 - Present",
      location: "Remote",
      description: "Led development of scalable web applications using React, Node.js, and cloud technologies.",
      achievements: [
        "Increased application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipelines"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
    },
    {
      title: "Full Stack Developer",
      company: "Previous Company",
      period: "2020 - 2022",
      location: "Hobe Sound, FL",
      description: "Developed and maintained multiple client-facing applications and internal tools.",
      achievements: [
        "Built 10+ production applications",
        "Reduced deployment time by 60%",
        "Mentored junior developers"
      ],
      technologies: ["JavaScript", "Python", "PostgreSQL", "React", "Django"]
    }
  ],
  skills: {
    "Frontend": ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    "Backend": ["Node.js", "Python", "Express.js", "Django", "REST APIs", "GraphQL"],
    "Database": ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma"],
    "DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
    "Tools": ["Git", "VS Code", "Figma", "Postman", "Jira"]
  },
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "ABC123"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      credentialId: "XYZ789"
    }
  ]
};

export default function ProfessionalSection() {
  return (
    <section className="py-20 bg-primary-navy">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {professionalContent.title}
          </h1>
          <div 
            className="text-xl text-slate-200 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={createMarkup(professionalContent.resumeSummary)}
          />
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Work Experience</h2>
          <div className="space-y-8">
            {professionalContent.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-primary-blue text-lg font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right">
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
                          <li key={i} className="text-slate-200 flex items-start">
                            <span className="text-primary-blue mr-2">•</span>
                            {achievement}
                          </li>
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
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(professionalContent.skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, i) => (
                        <Badge key={i} variant="primary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Certifications</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {professionalContent.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-primary-blue font-semibold mb-2">{cert.issuer}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-slate-300">Issued: {cert.date}</p>
                      <Badge variant="success">Verified</Badge>
                    </div>
                    {cert.credentialId && (
                      <p className="text-slate-500 text-sm mt-2">ID: {cert.credentialId}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

