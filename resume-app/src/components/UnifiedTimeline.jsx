// resume-app/src/components/UnifiedTimeline.jsx
import React, { useState } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import "./OceanResume.css";

function formatYears(item) {
  // Handles "2016-09", "2016", etc.
  const format = s => s ? String(s).slice(0, 4) : "";
  if (item.start && item.end && item.start !== item.end) {
    return `${format(item.start)} – ${format(item.end)}`;
  }
  return format(item.start || item.end || "");
}

function TimelineItem({ item, idx, expanded, onClick }) {
  const isExperience = item.type === "experience";
  return (
    <div className={`timeline-item${expanded ? " expanded" : ""}`} onClick={onClick}>
      <div className="timeline-icon">
        {isExperience ? <FaBriefcase color="#2FC0C6" /> : <FaGraduationCap color="#9C2CD1" />}
      </div>
      <div className="timeline-content">
        <div className="timeline-years">{formatYears(item)}</div>
        <div className="timeline-title">
          {isExperience ? item.title : item.credential}
        </div>
        <div className="timeline-where">
          {isExperience ? item.company : item.school}
        </div>
        {expanded && (
          <div className="timeline-details">
            {isExperience ? (
              <ul>
                {item.details?.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            ) : (
              <span>{item.status ? item.status[0].toUpperCase() + item.status.slice(1) : ""}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnifiedTimeline({ experience, education }) {
  // Add a "type" field to distinguish experience vs education
  const items = [
    ...experience.map(e => ({ ...e, type: "experience" })),
    ...education.map(e => ({ ...e, type: "education" }))
  ].sort((a, b) => {
    // Prefer end, fallback to start, descending
    const aYear = Number((a.end || a.start || "0").slice(0,4));
    const bYear = Number((b.end || b.start || "0").slice(0,4));
    return bYear - aYear;
  });

  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div className="vertical-timeline">
      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          item={item}
          idx={idx}
          expanded={expandedIdx === idx}
          onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
