// src/components/EducationTimeline.jsx

import React from "react";
import "./ResumeShowcase.css";

export default function EducationTimeline({ education }) {
  return (
    <div className="edu-timeline-list">
      {education.map((edu, idx) => (
        <div className="edu-timeline-item ocean-card" key={idx}>
          <h4>{edu.school}</h4>
          <div style={{ margin: "0.4em 0", color: "#2FC0C6" }}>{edu.credential}</div>
          <div style={{ fontSize: "0.96em", color: "#8B8B8B" }}>
            {edu.start}
            {edu.end && <> – {edu.end}</>}
            {edu.status && (
              <span style={{ marginLeft: 12, color: "#9C2CD1", fontWeight: 500 }}>
                {edu.status.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
