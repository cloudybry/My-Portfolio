// src/App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* Hero Section */}
<header className="hero">
  <div className="hero-content">
    <div className="hero-image">
      <img src="/me.png" alt="Bryan Portrait" class="passport-photo" />
    </div>
    <div className="hero-text">
      <h1 className="title">Bryan John Berzabal</h1>
      <p className="subtitle">Aspiring Junior Software Developer</p>
      <p className="subtitle">Philippines</p>
      <a href="#projects" className="cta-button">Explore My Work</a>
    </div>
  </div>
</header>
      {/* About Section */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          I’m a fresh graduate with a Bachelor of Science in Information Technology from Philippine Christian University, driven by a strong passion for software development and cloud computing. I’m eager to learn, grow, and contribute meaningfully to the tech industry bringing curiosity, resilience, and a commitment to continuous improvement.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Projects</h2>
      <div className="project-card">
    <img src= "/Terraform.png" alt="Terraform-localstock showcase" className="project-image" />
    <h3>Terraform-localstock showcase</h3>
    <a href="https://github.com/cloudybry/Terraform-localstack-showcase">View on GitHub</a>
  </div>

  <div className="project-card">
    <img src="/JobTrack.png" alt="Job Track" className="project-image" />
    <h3>Job Track</h3>
    <a href="https://github.com/cloudybry/JobTrack">View on GitHub</a>
  </div>

  <div className="project-card">
    <img src="/MetricPulse.png" alt="Metric Pulse" className="project-image" />
    <h3>Metric Pulse</h3>
    <a href="https://github.com/cloudybry/Metricpulse">View on GitHub</a>
  </div>

  <div className="project-card">
    <img src="/BookBase.png" alt="Book Base" className="project-image" />
    <h3>Book Base</h3>
    <a href="https://github.com/cloudybry/BookBase">View on GitHub</a>
  </div>

  <div className="project-card">
    <img src="/MindMesh.png" alt="Mind Mesh" className="project-image" />
    <h3>Mind Mesh</h3>
    <a href="https://github.com/cloudybry/Mindmesh">View on GitHub</a>
  </div>

      </section>
      {/* Contact Section */}
 <section class="contact">
  <h2>Connect with Me</h2>
  <form id="contact-form">
    <input type="text" name="name" placeholder="Your Name" required />
    <input type="email" name="email" placeholder="Your Email" required />
    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>
    </div>
  );
}


export default App;