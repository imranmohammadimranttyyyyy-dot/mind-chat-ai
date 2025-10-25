import React from "react";
import "./ThinkingDots.css";

const ThinkingDots: React.FC = () => {
  return (
    <div className="thinking-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default ThinkingDots;
import React from "react";
import "./ThinkingDots.css"; // CSS file same folder me

const ThinkingDots = () => {
  return (
    <div className="thinking-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default ThinkingDots;