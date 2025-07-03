// src/components/OceanResume.jsx

import React from "react";
import "./OceanResume.css";
import resumeData from "./resume_timeline.json";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import ResumeShowcase from "./ResumeShowcase";

const { header, summary } = resumeData;

export default function OceanResume() {
  return (
    <div className="ocean-resume-container">
      {/* Header */}
      <header className="ocean-resume-header">
        <h1>{header.name}</h1>
        <p className="ocean-title">{header.title}</p>
        <p className="ocean-contact">
          {header.location}
          {header.email && (
            <>
              {" | "}
              <a href={`mailto:${header.email}`}>{header.email}</a>
            </>
          )}
          {header.phone && <>{" | "}{header.phone}</>}
        </p>
        <p className="ocean-contact">
          {header.linkedin && (
            <a
              href={header.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{ marginRight: 10, color: "#2FC0C6" }}
            >
              <FaLinkedin size={20} style={{ verticalAlign: "middle", marginRight: 3 }} />
            </a>
          )}
          {header.github && (
            <a
              href={header.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              style={{ marginRight: 10, color: "#2FC0C6" }}
            >
              <FaGithub size={20} style={{ verticalAlign: "middle", marginRight: 3 }} />
            </a>
          )}
          {header.website && (
            <a
              href={header.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Website"
              style={{ marginRight: 10, color: "#9C2CD1" }}
            >
              <FaGlobe size={20} style={{ verticalAlign: "middle", marginRight: 3 }} />
            </a>
          )}
        </p>
      </header>

      {/* Summary */}
      {summary && (
        <section className="summary-section">
          <h2>Professional Summary</h2>
          <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
        </section>
      )}

      {/* Interactive Cards for Experience, Education, Skills */}
      <ResumeShowcase data={resumeData} />

      {/* Download Resume */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
        <a
          className="download-buoy"
          href="/assets/2025CurrentResume-DavidDonohue.pdf"
          download
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
