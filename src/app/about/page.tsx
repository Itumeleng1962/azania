"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export default function AboutContactPage() {
  return (
    <div className="about-page pt-10">
      <div className="container">
        {/* About Section */}
        <div className="grid-layout mb-20 section">
          <div className="text-content">
            <span className="text-secondary font-bold text-sm tracking-wide uppercase mb-2 block">Our Story</span>
            <h1 className="text-4xl font-bold mb-6 text-dark leading-tight">Authentic Kasi Flavour, <br/>Delivered to You.</h1>
            <p className="text-gray mb-4 text-lg">
              Azania Fast Food started with a simple vision: to bring authentic, high-quality township street food directly to the people, faster and hotter than ever before. We combine traditional recipes with modern delivery technology.
            </p>
            <p className="text-gray mb-6 text-lg">
              From our famous spicy quarter mutton bunny chows to our loaded secret-sauce kotas, every meal is prepared with fresh ingredients and local love. 
            </p>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon bg-primary-light text-primary">🍲</div>
                <h4 className="font-bold mb-1">Authentic Taste</h4>
                <p className="text-sm text-gray">Secret kasi spices</p>
              </div>
              <div className="feature">
                <div className="feature-icon bg-primary-light text-primary">⚡</div>
                <h4 className="font-bold mb-1">Fast Delivery</h4>
                <p className="text-sm text-gray">Live tracking tech</p>
              </div>
            </div>
          </div>
          <div className="image-content border-radius-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" 
              alt="Restaurant kitchen" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-card bg-white shadow-xl border-radius-xl p-8 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
            <p className="text-gray">We'd love to hear from you. Drop us a message or visit our store.</p>
          </div>

          <div className="grid-layout items-start">
            <div className="contact-info bg-gray-50 p-6 border-radius-lg">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <ul className="info-list">
                <li>
                  <MapPin className="text-primary icon" size={24} />
                  <div>
                    <strong className="block mb-1">Location</strong>
                    <span className="text-gray text-sm">123 Kasi Street, Orange Farm, 1841<br/>South Africa</span>
                  </div>
                </li>
                <li>
                  <Phone className="text-primary icon" size={24} />
                  <div>
                    <strong className="block mb-1">Phone Number</strong>
                    <span className="text-gray text-sm">+27 82 123 4567<br/>+27 11 987 6543</span>
                  </div>
                </li>
                <li>
                  <Mail className="text-primary icon" size={24} />
                  <div>
                    <strong className="block mb-1">Email Address</strong>
                    <span className="text-gray text-sm">hello@azaniafood.co.za<br/>orders@azaniafood.co.za</span>
                  </div>
                </li>
                <li>
                  <Clock className="text-primary icon" size={24} />
                  <div>
                    <strong className="block mb-1">Operating Hours</strong>
                    <span className="text-gray text-sm">Mon-Sun: 09:00 AM - 10:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-form">
              <form>
                <div className="grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-input" placeholder="Thabo" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-input" placeholder="Mokoena" required />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="thabo@example.com" required />
                </div>
                <div className="form-group mb-6">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={4} placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pt-10 { padding-top: 4rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-20 { margin-bottom: 5rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-3xl { font-size: 2rem; }
        .text-4xl { font-size: 2.5rem; }
        
        .font-bold { font-weight: 700; }
        .tracking-wide { letter-spacing: 0.05em; }
        .uppercase { text-transform: uppercase; }
        .leading-tight { line-height: 1.2; }
        .block { display: block; }
        .text-center { text-align: center; }
        
        .text-dark { color: var(--color-dark); }
        .text-gray { color: var(--color-gray); }
        .text-primary { color: var(--color-primary); }
        .text-secondary { color: var(--color-secondary); }
        
        .bg-white { background-color: var(--color-white); }
        .bg-gray-50 { background-color: #f9fafa; }
        .bg-primary-light { background-color: rgba(211, 47, 47, 0.1); }
        
        .shadow-lg { box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .shadow-xl { box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        
        .border-radius-lg { border-radius: 1rem; }
        .border-radius-xl { border-radius: 1.5rem; }
        .overflow-hidden { overflow: hidden; }
        
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .object-cover { object-fit: cover; }
        
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        
        .items-start { align-items: flex-start; }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .feature-icon {
          width: 50px; height: 50px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 1rem;
        }
        
        .info-list {
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .info-list li {
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .info-list .icon { margin-top: 0.25rem; }
        
        .grid-cols-2 { display: grid; grid-template-columns: 1fr; }
        .gap-4 { gap: 1rem; }
        
        .btn-lg { padding: 1rem 1.5rem; font-size: 1.1rem; }

        @media (min-width: 768px) {
          .grid-layout { grid-template-columns: 1fr 1fr; }
          .grid-cols-2 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
