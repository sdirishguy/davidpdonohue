// src/components/ExperienceTimeline.jsx

import React, { useState } from "react";
import "./ResumeShowcase.css";

export default function ExperienceTimeline({ experience }) {
  const [active, setActive] = useState(0);

  return (
    <div className="exp-timeline-wrapper">
      <div className="exp-timeline-list">
        {experience.map((exp, idx) => (
          <div
            className={`exp-timeline-item${active === idx ? " active" : ""}`}
            key={idx}
            onClick={() => setActive(idx)}
          >
            <span className="exp-timeline-year">
              {(exp.dates && exp.dates.split("-")[0].trim()) || ""}
            </span>
            <span className="exp-timeline-role">{exp.title}</span>
            {exp.company && <span className="exp-timeline-company">, {exp.company}</span>}
          </div>
        ))}
      </div>
      <div className="exp-timeline-detail ocean-card">
        <h3>
          {experience[active].title}
          {experience[active].company ? `, ${experience[active].company}` : ""}
        </h3>
        <div style={{ fontStyle: "italic", marginBottom: "0.4em" }}>
          {experience[active].location}
          {experience[active].dates && <> | {experience[active].dates}</>}
        </div>
        <ul>
          {experience[active].details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
