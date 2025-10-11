import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ContactForm from './ContactForm';
import pb, { loginAdmin } from './auth';

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
                <a href="https://www.linkedin.com/in/bryanberzabal/" target="_blank" rel="noopener noreferrer" className="icon-button">
                  <img src="/linkedin.svg" alt="Linkedin" className="social-icon" />
                </a>
                <a href="https://github.com/cloudybry" target="_blank" rel="noopener noreferrer" className="icon-button">
                  <img src="/github.svg" alt="GitHub" className="social-icon" />
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
    { src: "/terraform.jpg", alt: "Terraform", title: "Terraform-localstock Showcase", link: "https://github.com/cloudybry/Terraform-localstack-showcase" },
    { src: "/jobtrack.png", alt: "Jobtrack", title: "Job Track", link: "https://github.com/cloudybry/JobTrack" },
    { src: "/metricpulse.png", alt: "Metricpulse", title: "Metric Pulse", link: "https://github.com/cloudybry/Metricpulse" },
    { src: "/bookbase.jpg", alt: "Bookbase", title: "Book Base", link: "https://github.com/cloudybry/BookBase" },
    { src: "/mindmesh.png", alt: "Mindmesh", title: "Mind Mesh", link: "https://github.com/cloudybry/Mindmesh" },
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

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await loginAdmin();
        const records = await pb.collection('contacts').getFullList();
        setContacts(records);
        console.log('✅ Fetched contacts:', records);
      } catch (err) {
        console.error('❌ PocketBase error:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <section className="contacts">

        <h2>Contact Submissions</h2>
        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        )}
      
    </section>
  );
}

function App() {
  return (
    <Router>
       <div className="container">
      <nav className="navbar">
       
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminContacts />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;