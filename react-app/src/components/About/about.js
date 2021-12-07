import React, { useState, useEffect } from "react";
import "./about.css";

function About() {
  return (
    <div id="about">
      <div id="innerAbout">
        <h4>Designed by: AJ Abushaban</h4>
        <a target="_blank" href="https://github.com/asabushaban">
          <img
            id="github"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/aj-abushaban-919231100/"
        >
          <img
            id="linkedin"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
          />
        </a>
      </div>
    </div>
  );
}
export default About;
