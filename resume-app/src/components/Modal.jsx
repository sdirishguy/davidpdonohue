// src/components/Modal.jsx

import React from "react";
import "./ResumeShowcase.css";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
