import React, { useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailValid = form.email.includes('@') && form.email.includes('.');
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

    if (!validateForm()) {
      setStatus('❌ Please fill out all fields correctly.');
      setLoading(false);
      return;
    }

    const payload = {
      Name: form.name,
      Email: form.email,
      Message: form.message,
      submittedAt: new Date().toISOString(),
    };

    try {
      await pb.collection('contacts').create(payload);
      setStatus('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
     <section className="contact-section">
      <div className="contact-container">
        <header className="contact-header">
          <h2 className="contact-title">Connect with Me</h2>
          <p className="contact-subtitle">
            Got a question or opportunity? I’d love to hear from you. Send a message and I’ll respond as soon as possible.
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
            <div className="form-status" role="alert">
              <p>{status}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}