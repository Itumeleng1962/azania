"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const AREAS = ["Orange Farm", "Evaton", "Lakeside", "Stretford", "Vosloorus", "Palm Ridge", "Sebokeng"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label mb-2">📍 Reach Us Anytime</p>
            <h1 className="page-title text-white mb-4">Get In Touch</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto' }}>
              Whether you have a question, feedback, or want to partner with us — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container contact-grid section">
        {/* Left - Info */}
        <div className="contact-info-col">
          <div className="info-card card p-6 mb-6">
            <h3 className="mb-6">Contact Information</h3>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <strong>Location</strong>
                  <p>123 Kasi Street, Orange Farm, 1841<br />Gauteng, South Africa</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <p>+27 82 123 4567</p>
                  <p>+27 11 987 6543</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <strong>Email</strong>
                  <p>hello@azaniafood.co.za</p>
                  <p>orders@azaniafood.co.za</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Clock size={20} /></div>
                <div>
                  <strong>Operating Hours</strong>
                  <p>Monday – Sunday</p>
                  <p className="hours-time">09:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <a href="https://wa.me/27821234567" target="_blank" rel="noopener noreferrer" className="whatsapp-card card">
            <MessageCircle size={28} className="wa-icon" />
            <div>
              <strong>Chat on WhatsApp</strong>
              <p>Quick replies during operating hours</p>
            </div>
          </a>

          {/* Delivery Areas */}
          <div className="card p-6 mt-6">
            <h4 className="mb-4">We Deliver To</h4>
            <div className="areas-wrap">
              {AREAS.map((a, i) => (
                <span key={i} className="area-tag"><MapPin size={12} /> {a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="contact-form-col">
          <div className="card p-8">
            {sent ? (
              <motion.div className="success-msg text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="success-icon">✓</div>
                <h3 className="mb-2">Message Sent!</h3>
                <p className="text-gray mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </motion.div>
            ) : (
              <>
                <h3 className="mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input type="text" className="form-input" placeholder="Thabo Mokoena" required
                        value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-input" placeholder="+27 82 000 0000"
                        value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="thabo@example.com" required
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                      <option value="">Select a subject</option>
                      <option value="order">Order Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="delivery">Delivery Area Request</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-input" rows={5} placeholder="Tell us how we can help you..." required
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary full-width btn-lg">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="map-section">
        <div className="map-placeholder">
          <div className="map-overlay">
            <MapPin size={40} className="text-primary mb-2" />
            <h3>Find Us In Orange Farm</h3>
            <p>123 Kasi Street, Orange Farm, 1841</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener" className="btn btn-primary mt-4">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page { background: var(--color-light); }
        .contact-header {
          background: #0f0f0f;
          padding: 5rem 0 4rem;
        }
        .text-white { color: #fff; }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .text-center { text-align: center; }
        .text-gray { color: var(--color-gray); }
        .text-primary { color: var(--color-primary); }
        .full-width { width: 100%; }

        .info-items { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-item { display: flex; gap: 1rem; align-items: flex-start; }
        .info-icon {
          width: 44px; height: 44px; border-radius: 0.75rem;
          background: rgba(211,47,47,0.08); color: var(--color-primary);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .info-item strong { display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .info-item p { font-size: 0.88rem; color: var(--color-gray); line-height: 1.6; }
        .hours-time { color: var(--color-primary); font-weight: 700; }

        .whatsapp-card {
          display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem;
          text-decoration: none; transition: all 0.2s; border-radius: 1rem;
        }
        .whatsapp-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .wa-icon { color: #25D366; flex-shrink: 0; }
        .whatsapp-card strong { display: block; font-weight: 700; }
        .whatsapp-card p { font-size: 0.85rem; color: var(--color-gray); }

        .areas-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .area-tag {
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.35rem 0.8rem; border-radius: 2rem;
          background: #F3F4F6; font-size: 0.8rem; font-weight: 600;
          color: var(--color-dark);
        }

        .form-row { display: grid; grid-template-columns: 1fr; gap: 0; }

        .success-msg { padding: 3rem 1rem; }
        .success-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: #D1FAE5; color: #065F46;
          font-size: 2rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .map-section { margin-top: 0; }
        .map-placeholder {
          height: 360px;
          background: #e8e8e8;
          background-image:
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 30px 30px;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .map-overlay {
          background: white; border-radius: 1.25rem; padding: 2.5rem 3rem;
          text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.12);
          display: flex; flex-direction: column; align-items: center;
        }
        .map-overlay h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem; }
        .map-overlay p { color: var(--color-gray); font-size: 0.9rem; }
        .btn-lg { padding: 1rem 2rem; }

        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1.3fr; }
          .form-row { grid-template-columns: 1fr 1fr; gap: 1rem; }
        }
      `}</style>
    </div>
  );
}
