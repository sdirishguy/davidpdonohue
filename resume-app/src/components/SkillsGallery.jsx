// src/components/SkillsGallery.jsx

import React from "react";
import "./ResumeShowcase.css";
import { SkillIcon } from "./SkillIcons";

export default function SkillsGallery({ skills }) {
  return (
    <div className="skills-gallery-modal">
      {Object.entries(skills).map(([category, skillList], idx) => (
        <div className="card" key={idx}>
          <div className="skills-modal-category">
            <h4>{category}</h4>
            <div className="skills-modal-list">
              {skillList.map((skill, i) => (
                <SkillIcon key={i} name={skill} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
