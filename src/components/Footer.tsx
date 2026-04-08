"use client";
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Azania" className="footer-logo" />
            <p className="footer-tagline">Izwe Lokudla — The Land of Food</p>
            <p className="footer-desc">Your favourite kasi fast food, delivered fresh and hot right to your door. Taste the real flavour of local.</p>
            <div className="social-row">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/menu">Full Menu</Link></li>
              <li><Link href="/track">Track Order</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/account">My Account</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Menu Categories</h4>
            <ul className="footer-links">
              <li><Link href="/menu?cat=Bunny Chows">Bunny Chows</Link></li>
              <li><Link href="/menu?cat=Ribs">Ribs</Link></li>
              <li><Link href="/menu?cat=Kota">Kota</Link></li>
              <li><Link href="/menu?cat=Wings">Wings</Link></li>
              <li><Link href="/menu?cat=Burgers">Burgers</Link></li>
              <li><Link href="/menu?cat=Specials">Specials</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>123 Kasi Street, Orange Farm, 1841, South Africa</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+27 82 123 4567</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>hello@azaniafood.co.za</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>Mon–Sun: 09:00 – 22:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">© {new Date().getFullYear()} Azania Fast Food. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/rider">Rider Portal</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer { background: #0a0a0a; color: rgba(255,255,255,0.75); }
        .footer-top { padding: 5rem 0 3rem; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        .footer-logo { height: 120px; width: auto; border-radius: 1rem; }
        .footer-tagline { color: var(--color-secondary); font-size: 0.85rem; font-weight: 700; margin: 0.75rem 0 0.5rem; letter-spacing: 0.05em; text-transform: uppercase; }
        .footer-desc { font-size: 0.9rem; line-height: 1.7; color: rgba(255,255,255,0.45); max-width: 280px; }
        .social-row { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .social-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          transition: all 0.2s;
        }
        .social-btn:hover { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }

        .footer-heading { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.9); margin-bottom: 1.25rem; }
        .footer-links { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-links li a { font-size: 0.9rem; color: rgba(255,255,255,0.45); transition: color 0.2s; }
        .footer-links li a:hover { color: var(--color-secondary); }

        .contact-list { display: flex; flex-direction: column; gap: 0.9rem; }
        .contact-list li { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.88rem; color: rgba(255,255,255,0.45); }
        .contact-icon { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }

        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 1.5rem 0; }
        .footer-bottom-inner { display: flex; flex-direction: column; gap: 1rem; align-items: center; text-align: center; }
        .copyright { font-size: 0.8rem; color: rgba(255,255,255,0.25); }
        .footer-bottom-links { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
        .footer-bottom-links a { font-size: 0.8rem; color: rgba(255,255,255,0.3); transition: color 0.2s; }
        .footer-bottom-links a:hover { color: var(--color-secondary); }

        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.5fr; }
          .footer-bottom-inner { flex-direction: row; justify-content: space-between; text-align: left; }
        }
      `}</style>
    </footer>
  );
}
