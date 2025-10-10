import React, { useEffect, useState } from 'react';
import './App.css';
import PocketBase from 'pocketbase';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

  useEffect(() => {
    if (!pocketbaseUrl) {
      console.error("Missing VITE_POCKETBASE_URL in environment.");
      return;
    }

    const pb = new PocketBase(pocketbaseUrl);

    async function fetchContacts() {
      try {
        const records = await pb.collection('contacts').getFullList();
        setContacts(records);
      } catch (err) {
        console.error("PocketBase error:", err);
      }
    }

    fetchContacts();
  }, [pocketbaseUrl]);

  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img src="/me.png" alt="Bryan Portrait" className="passport-photo" />
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
          I’m a fresh graduate with a Bachelor of Science in Information Technology from Philippine Christian University, driven by a strong passion for software development and cloud computing. I’m eager to learn, grow, and contribute meaningfully to the tech industry — bringing curiosity, resilience, and a commitment to continuous improvement.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Projects</h2>
        {[
          { src: "/Terraform.png", title: "Terraform-localstock showcase", link: "https://github.com/cloudybry/Terraform-localstack-showcase" },
          { src: "/JobTrack.png", title: "Job Track", link: "https://github.com/cloudybry/JobTrack" },
          { src: "/MetricPulse.png", title: "Metric Pulse", link: "https://github.com/cloudybry/Metricpulse" },
          { src: "/BookBase.png", title: "Book Base", link: "https://github.com/cloudybry/BookBase" },
          { src: "/MindMesh.png", title: "Mind Mesh", link: "https://github.com/cloudybry/Mindmesh" },
        ].map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.src} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Connect with Me</h2>
        <form id="contact-form">
          <ContactForm />
        </form>
      </section>
    </div>
  );
}

export default App;
