// src/components/SkillIcons.jsx
import {
  SiPython, SiRubyonrails, SiRuby, SiJavascript, SiReact, SiDjango, SiNodedotjs, SiVuedotjs, SiHtml5, SiCss3, SiSass, SiBootstrap,
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiAnsible,
  SiKalilinux, SiWireshark, SiGithub, SiGitlab, SiHeroku, SiJira, SiBitbucket, SiTrello,
  SiLinux, SiApple, SiUbuntu, SiBurpsuite, SiMetasploit
} from 'react-icons/si';
import { FaGitAlt, FaDatabase, FaTools, FaWindows } from 'react-icons/fa';

// Custom logos (PNG/SVG)
import hashcatLogo from '../assets/logos/hashcat-logo.png';
import johnTheRipperLogo from '../assets/logos/jtr.png';
import nessusLogo from '../assets/logos/nessus.png';
import azureLogo from '../assets/logos/azure_logo.png';
import nmapLogo from '../assets/logos/nmap-logo.png';

const ICON_MAP = {
  // Languages, Frameworks & Databases
  "python": SiPython,
  "ruby": SiRuby,
  "rails": SiRubyonrails,
  "javascript": SiJavascript,
  "react.js": SiReact,
  "django": SiDjango,
  "node.js": SiNodedotjs,
  "vue3.js": SiVuedotjs,
  "html5": SiHtml5,
  "css": SiCss3,
  "sass": SiSass,
  "bootstrap": SiBootstrap,
  "sql": FaDatabase,
  "postgresql": SiPostgresql,
  "mysql": SiMysql,
  "mongodb": SiMongodb,
  "redis": SiRedis,

  // Cloud & Infra
  "amazon web services": SiAmazonwebservices,
  "aws": SiAmazonwebservices,
  "gcp": SiGooglecloud,
  "microsoft azure": azureLogo,
  "docker": SiDocker,
  "kubernetes": SiKubernetes,
  "ansible": SiAnsible,

  // Security
  "kali linux": SiKalilinux,
  "metasploit framework": SiMetasploit,
  "hashcat": hashcatLogo,
  "nessus": nessusLogo,
  "burp suite": SiBurpsuite,
  "wireshark": SiWireshark,
  "nmap": nmapLogo,
  "john the ripper": johnTheRipperLogo,

  // Dev & Collab
  "git": FaGitAlt,
  "github": SiGithub,
  "gitlab": SiGitlab,
  "heroku": SiHeroku,
  "jira": SiJira,
  "bitbucket": SiBitbucket,
  "trello": SiTrello,

  // OS & Networking
  "linux cli": SiLinux,
  "windows os": FaWindows,
  "macos": SiApple,
  "ubuntu": SiUbuntu
};

export function SkillIcon({ name, size = 32 }) {
  // Normalize skill key: lowercase, strip parenthesis, periods, extra spaces
  const key = name.toLowerCase().replace(/\s*\(.*?\)/, "").replace(/\.+$/, "").replace(/\s+/g, " ").trim();
  const IconComponent = ICON_MAP[key];

  if (!IconComponent) {
    // fallback for missing icon
    return <div className="skill-chip">{name}</div>;
  }

  // React icon library components are functions
  if (typeof IconComponent === "function") {
    return (
      <div className="skill-icon">
        <IconComponent size={size} title={name} />
        <div className="skill-label">{name.replace(/\..*$/, "")}</div>
      </div>
    );
  }

  // Otherwise, treat as imported image src (png, jpg, svg)
  return (
    <div className="skill-icon">
      <img src={IconComponent} alt={name} width={size} height={size} style={{ objectFit: "contain" }} />
      <div className="skill-label">{name.replace(/\..*$/, "")}</div>
    </div>
  );
}

// Usage: <SkillIcon name="Python" />, <SkillIcon name="Metasploit Framework" />
