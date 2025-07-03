// resume-app/src/App.jsx
import React from "react";
import OceanResume from "./components/OceanResume";
import resumeData from "./components/resume_timeline.json";

function App() {
  return (
    <div>
      {/* other stuff */}
      <OceanResume />
      {/* or if using ResumeShowcase directly */}
      {/* <ResumeShowcase data={resumeData} /> */}
    </div>
  );
}

export default App;
