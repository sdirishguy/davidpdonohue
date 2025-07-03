// src/components/FlipCard.jsx
import React, { useState } from "react";
import "./FlipCard.css";

export default function FlipCard({ title, icon, instructions, onClick }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Open ${title} modal`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flip-icon" aria-hidden="true">{icon}</div>
          <h2>{title}</h2>
        </div>
        <div className="flip-card-back">
          <div className="flip-card-instructions">
            {instructions}
            <div style={{ fontSize: "2.4em", marginTop: "1.5em" }}>👆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
