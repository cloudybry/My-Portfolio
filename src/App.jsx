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
      <header className="hero unified-hero">
        <div className="hero-left">
          <h1 className="hero-title">Bryan John Berzabal</h1>
           <p className="hero-intro">Aspiring Junior Software Developer Based in the Philippines and passionate about Cloud.</p>
          
        <a href="#projects" className="cta-button unified-button">Explore My Work &gt;</a>

        <div className="hero-right">
        <img src="" alt="my-portrait" className="hero-photo" onError={(e) => (e.target.style.display = 'none')} />

        </div>
        </div>
        </header>

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
