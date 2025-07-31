'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

// Typing animation content
const typingContent = [
  { intro: "Welcome to my project showcase! 🚀", color: "text-primary-sunset-orange" },
  { description: "These are the tools and applications I've built to solve real-world problems.", color: "text-primary-blue" },
  { instructions: "Feel free to explore each one and check out the source code on GitHub.", color: "text-primary-magenta" },
  { action: "Let's dive in! Shall We?", color: "text-primary-yellow" }
];

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
  // Typing animation states
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  
  // Helper function to get text content from any line object
  const getLineText = (line: any) => {
    return line.intro || line.description || line.instructions || line.action || '';
  };
  
  // Typing effect using setTimeout
  useEffect(() => {
    if (currentLineIndex >= typingContent.length) return;
    
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    
    if (currentCharIndex < currentLineText.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, Math.floor(Math.random() * 40) + 40);
      
      return () => clearTimeout(timeout);
    } else {
      // Line is complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLineText]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);
  
  // Get current typed text
  const getCurrentTypedText = () => {
    if (currentLineIndex >= typingContent.length) return '';
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    return currentLineText.slice(0, currentCharIndex);
  };

  return (
    <section id="projects" className="py-20 bg-primary-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,73,153,0.03),transparent_40%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-blue/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-primary-magenta/5 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary-sunset-orange/5 rounded-full blur-xl"></div>
      
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
            <div className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
              <div className="text-primary-blue/70 font-mono text-sm">projects@opfynder.com</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="font-mono text-left space-y-4">
              {/* Display completed lines */}
              {completedLines.map((lineText, index) => {
                const lineConfig = typingContent[index];
                if (!lineConfig) return null;
                
                return (
                  <div key={index} className={`text-lg ${lineConfig.color}`}>
                    {lineText}
                  </div>
                );
              })}
              
              {/* Current typing line */}
              {currentLineIndex < typingContent.length && (
                <div className={`text-lg ${typingContent[currentLineIndex].color}`}>
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

        {/* Featured Projects */}
        <div className="space-y-16 mb-20">
          {/* MCP Server Project */}
          <motion.div
            key={projectsContent.items[0].title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Project Visual */}
            <div className="relative">
              <div className="bg-primary-navy/80 rounded-lg shadow-2xl p-6 border border-primary-blue/20">
                <div className="mb-4 flex items-center justify-between border-b border-primary-blue/20 pb-2">
                  <div className="text-primary-blue/70 font-mono text-sm">mcp-server@localhost:8000</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                {/* Terminal-like display showing MCP commands */}
                <div className="font-mono text-sm space-y-3 max-h-80 overflow-y-auto">
                  <div className="text-primary-blue">$ curl -X POST http://localhost:8000/api/mcp.json/</div>
                  <div className="text-slate-300 pl-2">-H "Content-Type: application/json"</div>
                  <div className="text-slate-300 pl-2">-d={`{"jsonrpc":"2.0","method":"tools/call","params":{"name":"file_system_read_file","arguments":{"path":"hello.txt"}},"id":1}`}</div>
                  <div className="text-primary-magenta mt-2">{'{'}</div>
                  <div className="text-primary-magenta pl-4">"jsonrpc": "2.0",</div>
                  <div className="text-primary-magenta pl-4">"result": "Hello, world!",</div>
                  <div className="text-primary-magenta pl-4">"id": 1</div>
                  <div className="text-primary-magenta">{'}'}</div>
                  
                  <div className="text-primary-blue mt-4">$ curl -X POST http://localhost:8000/api/mcp.json/</div>
                  <div className="text-slate-300 pl-2">-H "Content-Type: application/json"</div>
                  <div className="text-slate-300 pl-2">-d={`{"jsonrpc":"2.0","method":"tools/call","params":{"name":"llm_generate_code_openai","arguments":{"prompt":"Function to add numbers","language":"python"}},"id":2}`}</div>
                  <div className="text-primary-sunset-orange mt-2">{'{'}</div>
                  <div className="text-primary-sunset-orange pl-4">"jsonrpc": "2.0",</div>
                  <div className="text-primary-sunset-orange pl-4">"result": "def add_numbers(a, b):\n    return a + b",</div>
                  <div className="text-primary-sunset-orange pl-4">"id": 2</div>
                  <div className="text-primary-sunset-orange">{'}'}</div>
                </div>
              </div>
              
              {/* Animated connection lines */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <svg width="40" height="100" viewBox="0 0 40 100" fill="none">
                  <path d="M0,50 C20,20 20,80 40,50" stroke="#22D3EE" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                </svg>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {projectsContent.items[0].title}
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed">
                A Model Context Protocol (MCP) Server that connects AI agents to your tools and data. Built with Python 3.13 and FastMCP, it enables secure, programmable workflows over HTTP.
              </p>
              
              <div className="bg-primary-navy/50 p-4 rounded-lg border border-primary-blue/10 mt-4">
                <h4 className="text-primary-blue font-medium mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-blue mr-2">•</span>
                    <span className="text-slate-300">File system operations with secure sandboxing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-blue mr-2">•</span>
                    <span className="text-slate-300">Shell command execution with proper isolation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-blue mr-2">•</span>
                    <span className="text-slate-300">LLM code generation via OpenAI/Gemini APIs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-blue mr-2">•</span>
                    <span className="text-slate-300">JSON-RPC over HTTP with modern ASGI architecture</span>
                  </li>
                </ul>
              </div>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {projectsContent.items[0].technologies?.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="primary"
                  onClick={() => window.open(projectsContent.items[0].link, '_blank')}
                >
                  View on GitHub
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(projectsContent.items[0].extraLinks?.Docs, '_blank')}
                >
                  MCP Documentation
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ShellRosetta Project */}
          <motion.div
            key={projectsContent.items[1].title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center lg:grid-flow-col-dense mt-20"
          >
            {/* Project Info */}
            <div className="space-y-4 lg:col-start-1 lg:row-start-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {projectsContent.items[1].title}
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed">
                A cross-platform CLI tool that instantly translates commands between Linux/Bash and PowerShell, including flags, pipes, and complex syntax.
              </p>
              
              <div className="bg-primary-navy/50 p-4 rounded-lg border border-primary-magenta/10 mt-4">
                <h4 className="text-primary-magenta font-medium mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-magenta mr-2">•</span>
                    <span className="text-slate-300">Interactive shell mode with live translation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-magenta mr-2">•</span>
                    <span className="text-slate-300">Bi-directional translation with flag awareness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-magenta mr-2">•</span>
                    <span className="text-slate-300">Pipeline and complex command support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-magenta mr-2">•</span>
                    <span className="text-slate-300">Tab completion and shell integration</span>
                  </li>
                </ul>
              </div>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {projectsContent.items[1].technologies?.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="primary"
                  onClick={() => window.open(projectsContent.items[1].link, '_blank')}
                >
                  View on GitHub
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(projectsContent.items[1].extraLinks?.PyPI, '_blank')}
                >
                  PyPI Package
                </Button>
              </div>
            </div>

            {/* Project Visual */}
            <div className="lg:col-start-2 relative">
              <div className="bg-primary-navy/80 rounded-lg shadow-2xl p-6 border border-primary-magenta/20">
                <div className="mb-4 flex items-center justify-between border-b border-primary-magenta/20 pb-2">
                  <div className="text-primary-magenta/70 font-mono text-sm">shellrosetta@terminal</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                {/* Interactive translation display */}
                <div className="font-mono text-sm space-y-3 max-h-80 overflow-y-auto">
                  <div className="text-primary-yellow">$ shellrosetta</div>
                  <div className="text-slate-300">=================================================================</div>
                  <div className="text-slate-300">ShellRosetta: Linux ↔ PowerShell CLI Command Translator</div>
                  <div className="text-slate-300">Author: David Donohue</div>
                  <div className="text-slate-300">Repo: github.com/sdirishguy/shellrosetta</div>
                  <div className="text-slate-300">=================================================================</div>
                  <div className="text-slate-300">Welcome to ShellRosetta Interactive Mode!</div>
                  <div className="text-slate-300">Type 'exit' to quit, or 'mode' to switch translation direction.</div>
                  <div className="text-slate-300">Mode [lnx2ps/ps2lnx] (or 'exit'): <span className="text-primary-blue">lnx2ps</span></div>
                  <div className="text-slate-300">Type your LNX2PS commands below. Type 'mode' to switch, 'exit' to quit.</div>
                  
                  <div className="text-primary-blue mt-2">{'>'} ls -alh | grep foo</div>
                  <div className="text-slate-300">--- Translation ---</div>
                  <div className="text-primary-magenta">PowerShell Equivalent:</div>
                  <div className="text-primary-magenta pl-2">Get-ChildItem -Force | Format-List # [Human-readable file sizes not natively available.] | Select-String foo</div>
                  <div className="text-slate-300">-------------------</div>
                  
                  <div className="text-primary-blue mt-2">{'>'} rm -rf /tmp</div>
                  <div className="text-slate-300">--- Translation ---</div>
                  <div className="text-primary-magenta">PowerShell Equivalent:</div>
                  <div className="text-primary-magenta pl-2">Remove-Item -Recurse -Force /tmp</div>
                  <div className="text-slate-300">-------------------</div>
                  
                  <div className="text-primary-blue mt-2">{'>'} mode</div>
                  <div className="text-slate-300">Mode [lnx2ps/ps2lnx] (or 'exit'): <span className="text-primary-sunset-orange">ps2lnx</span></div>
                  <div className="text-slate-300">Switched to PS2LNX mode.</div>
                  
                  <div className="text-primary-sunset-orange mt-2">{'>'} Get-Process</div>
                  <div className="text-slate-300">--- Translation ---</div>
                  <div className="text-primary-blue">Linux Equivalent:</div>
                  <div className="text-primary-blue pl-2">ps aux</div>
                  <div className="text-slate-300">-------------------</div>
                </div>
              </div>
              
              {/* Animated connection lines */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <svg width="40" height="100" viewBox="0 0 40 100" fill="none">
                  <path d="M40,50 C20,20 20,80 0,50" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </motion.div>
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
                    <div className="w-full h-48 bg-primary-navy/80 rounded-t-lg flex items-center justify-center overflow-hidden">
                      {project.title === "Opfynder" ? (
                        <div className="w-full h-full bg-[#04042a] flex items-center justify-center">
                          <img 
                            src="/opfynder_logo5.png" 
                            alt="Opfynder Logo" 
                            className="w-full h-full object-contain border-2 border-primary-blue rounded-lg"
                          />
                        </div>
                      ) : project.title === "MCPHelper Sublime Plugin" ? (
                        <div className="w-full h-full bg-slate-900 p-3 font-mono text-xs">
                          <div className="flex items-center justify-between mb-2 border-b border-slate-600 pb-1">
                            <div className="text-slate-400">MCPHelper.sublime-package</div>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          <div className="space-y-1 text-slate-300">
                            <div className="text-primary-blue">Ctrl+Shift+P: MCPHelper</div>
                            <div className="text-slate-400">└─ Generate Code</div>
                            <div className="text-slate-400">└─ Translate Code</div>
                            <div className="text-slate-400">└─ Refactor Code</div>
                            <div className="text-primary-magenta mt-2">{'>'} Generate Python function</div>
                            <div className="text-slate-500">def calculate_fibonacci(n):</div>
                            <div className="text-slate-500">    return n if n {'<='} 1 else...</div>
                            <div className="text-primary-yellow mt-1">✓ Generated successfully</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-5xl">{project.title.charAt(0)}</span>
                      )}
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

