// src/components/ResumeShowcase.jsx

import React, { useState } from "react";
import Modal from "./Modal";
import ExperienceTimeline from "./ExperienceTimeline";
import EducationTimeline from "./EducationTimeline";
import SkillsGallery from "./SkillsGallery";
import "./ResumeShowcase.css";

export default function ResumeShowcase({ data }) {
  const [open, setOpen] = useState(null); // 'experience', 'education', or 'skills'

  return (
    <div className="showcase-cards-container">
      {/* Experience Card */}
      <div className="showcase-card" onClick={() => setOpen("experience")}>
        <h3>Experience</h3>
        <p>
          Professional work history and career highlights in full-stack development, healthcare IT, and technology leadership.
        </p>
      </div>

      {/* Education Card */}
      <div className="showcase-card" onClick={() => setOpen("education")}>
        <h3>Education</h3>
        <p>
          Degrees, certifications, and ongoing education in computer science, cybersecurity, and web development.
        </p>
      </div>

      {/* Skills & Tools Card */}
      <div className="showcase-card" onClick={() => setOpen("skills")}>
        <h3>Skills &amp; Tools</h3>
        <p>
          Languages, frameworks, platforms, and tools for development, DevOps, cloud, cybersecurity, and project management.
        </p>
      </div>

      {/* Modals */}
      <Modal open={open === "experience"} onClose={() => setOpen(null)} title="Experience">
        <ExperienceTimeline experience={data.experience} />
      </Modal>
      <Modal open={open === "education"} onClose={() => setOpen(null)} title="Education">
        <EducationTimeline education={data.education} />
      </Modal>
      <Modal open={open === "skills"} onClose={() => setOpen(null)} title="Skills & Tools">
        <SkillsGallery skills={data.skills} />
      </Modal>
    </div>
  );
}
