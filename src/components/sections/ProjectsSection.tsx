'use client'

import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

// Projects content from JSON
const projectsContent = {
  title: "Feature Projects",
  items: [
    {
      title: "MCP Server",
      description: "MCP Server is a programmable agent server for automating workflows via the Model Context Protocol (MCP).",
      link: "https://github.com/sdirishguy/mcp_server_project",
      extraLinks: {
        "Docs": "https://modelcontextprotocol.io/introduction"
      },
      technologies: ["Python", "API", "AI", "Automation"]
    },
    {
      title: "ShellRosetta",
      description: "ShellRosetta is a cross-platform command translator for instantly converting CLI commands between Linux, macOS, and Windows PowerShell.",
      link: "https://github.com/sdirishguy/shellrosetta",
      extraLinks: {
        "PyPI": "https://pypi.org/project/shellrosetta"
      },
      technologies: ["Python", "CLI", "Cross-platform"]
    },
    {
      title: "MCPHelper Sublime Plugin",
      description: "MCPHelper is a Sublime Text plugin that connects to your MCP Server for on-demand code generation, translation, and refactoring—powered by OpenAI or Gemini.",
      link: "https://github.com/sdirishguy/MCPHelperSublimePlugin",
      technologies: ["Python", "Sublime Text", "Plugin", "AI"]
    },
    {
      title: "Opfynder",
      description: "Opfynder is your personal job search and application tracker, simplifying your journey to career success.",
      link: "https://opfynder.com",
      technologies: ["React", "Node.js", "MongoDB", "Express"]
    }
  ]
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {projectsContent.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-20">
          {projectsContent.items.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image/Placeholder */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="w-full h-64 md:h-80 bg-primary-navy/80 rounded-lg shadow-2xl flex items-center justify-center">
                    <span className="text-5xl">{project.title.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary-navy/20 rounded-lg" />
                </div>
              </div>

              {/* Project Info */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>

                  {/* Extra Links */}
                  {project.extraLinks && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {Object.entries(project.extraLinks).map(([name, url]) => (
                        <a 
                          key={name} 
                          href={url as string} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:text-primary-blue transition-colors flex items-center"
                        >
                          <span className="mr-1">{name}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="primary"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Other Projects
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsContent.items.slice(2).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-primary-navy/80 rounded-t-lg flex items-center justify-center">
                      <span className="text-5xl">{project.title.charAt(0)}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-t-lg" />
                  </div>
                  
                  <CardHeader>
                    <h4 className="text-xl font-semibold text-white">
                      {project.title}
                    </h4>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <p className="text-slate-200 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      View Project
                    </Button>
                    {project.extraLinks && Object.entries(project.extraLinks)[0] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(Object.entries(project.extraLinks!)[0][1] as string, '_blank')}
                      >
                        {Object.entries(project.extraLinks)[0][0]}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

