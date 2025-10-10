import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PocketBase from 'pocketbase';
import ContactForm from './ContactForm';

function Home() {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-text-horizontal">
            <h1 className="hero-title">Bryan John Berzabal</h1>
            <p className="hero-intro">
              Aspiring Junior Software Developer based in the Philippines and passionate about Cloud.
            </p>
          </div>

          <div className="hero-button-wrapper">
            <Link to="/projects" className="cta-button">Explore My Work &gt;</Link>

            <div className="social-buttons">
              <a
                href="https://www.facebook.com/bryanberzbal"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
              >
                <img src="/facebook.png" alt="Facebook" className="social-icon" />
              </a>

              <a
                href="https://github.com/cloudybry"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
              >
                <img src="/github.png" alt="GitHub" className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/me.png"
            alt="my-portrait"
            className="hero-photo"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      </div>
    </header>
  );
}

function Projects() {
  const projectList = [
    { src: "/terraform.jpg", title: "Terraform-localstock showcase", link: "https://github.com/cloudybry/Terraform-localstack-showcase" },
    { src: "/jobtrack.png", title: "Job Track", link: "https://github.com/cloudybry/JobTrack" },
    { src: "/metricpulse.png", title: "Metric Pulse", link: "https://github.com/cloudybry/Metricpulse" },
    { src: "/bookbase.jpg", title: "Book Base", link: "https://github.com/cloudybry/BookBase" },
    { src: "/MindMesh.png", title: "Mind Mesh", link: "https://github.com/cloudybry/Mindmesh" },
  ];

  return (
    <section className="projects">
      <h2>Projects</h2>
      {projectList.map((project, index) => (
        <div className="project-card" key={index}>
          <img src={project.src} alt={project.title} className="project-image" />
          <h3>{project.title}</h3>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      ))}
    </section>
  );
}

function Contact() {
  return (
    <section className="contact">
      <h2>Connect with Me</h2>
      <form id="contact-form">
        <ContactForm />
      </form>
    </section>
  );
}

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
    <Router>
      <div className="container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;