import React, { useState } from 'react';
import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
};

// ✅ Validation function
const validateForm = () => {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email); // stronger email check
  return (
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    emailValid &&
    form.message.trim() !== ''
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    if (!pocketbaseUrl) {
      setStatus('❌ Backend URL is missing. Check your .env config.');
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setStatus('❌ Please fill out all fields correctly.');
      setLoading(false);
      return;
    }

    const pb = new PocketBase(pocketbaseUrl);

    try {
      await pb.collection('contacts').create({
        name: form.name,
        email: form.email,
        message: form.message,
        submittedAt: new Date().toISOString(), // optional

      });
      setStatus('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('❌ Submission error:', err);
      setStatus('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" aria-label="Contact Form">
      <div className="contact-container">
        <header className="contact-header">
          <h2 className="contact-title">Connect with Me</h2>
          <p className="contact-subtitle">
            Got a question or opportunity? I’d love to hear from you.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Your Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-action">
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {status && (
            <div
              className="form-status"
              role="status"
              style={{
                marginTop: '1rem',
                color: status.startsWith('✅') ? '#00ff99' : '#ff4d4d',
                fontWeight: 'bold',
              }}
            >
              <p>{status}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}