"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/track', label: 'Track Order' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItems = useCartStore(state => state.items);
  const totalQty = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo">
            <img src="/logo.png" alt="Azania" className="logo-img" />
          </Link>

          {/* Desktop Links */}
          <ul className="desktop-nav">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <a href="tel:+27821234567" className="whatsapp-btn desktop-only">
              <Phone size={16} /> Call Us
            </a>
            <Link href="/account" className="icon-btn desktop-only" title="Account">
              <User size={20} />
            </Link>
            <Link href="/cart" className="cart-icon-btn">
              <ShoppingCart size={22} />
              {mounted && totalQty > 0 && (
                <span className="cart-count">{totalQty > 99 ? '99+' : totalQty}</span>
              )}
            </Link>
            <button className="hamburger mobile-only" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="drawer-header">
                <img src="/logo.png" alt="Azania" className="drawer-logo" />
                <button className="icon-btn" onClick={() => setIsOpen(false)}><X size={24} /></button>
              </div>
              <ul className="drawer-links">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="drawer-link" onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li><Link href="/account" className="drawer-link" onClick={() => setIsOpen(false)}>My Account</Link></li>
                <li><Link href="/cart" className="drawer-link" onClick={() => setIsOpen(false)}>
                  Cart {mounted && totalQty > 0 && <span className="cart-count-inline">{totalQty}</span>}
                </Link></li>
              </ul>
              <div className="drawer-footer">
                <a href="tel:+27821234567" className="btn btn-primary full-width">
                  <Phone size={16} /> +27 82 123 4567
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 200;
          background: #fff;
          border-bottom: 1.5px solid #f0f0f0;
          transition: box-shadow 0.3s ease;
        }
        .navbar-wrapper.scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .navbar { padding: 0; }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 1rem;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .logo-img {
          height: 52px;
          width: auto;
          object-fit: contain;
          border-radius: 8px;
          display: block;
        }
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          padding: 0.45rem 0.9rem;
          border-radius: 0.4rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: #333;
          transition: all 0.2s;
          text-decoration: none;
        }
        .nav-link:hover {
          color: var(--color-primary);
          background: rgba(211,47,47,0.06);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.42rem 0.95rem;
          border-radius: 2rem;
          background: rgba(211,47,47,0.08);
          color: var(--color-primary);
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .whatsapp-btn:hover {
          background: var(--color-primary);
          color: #fff;
        }
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          color: var(--color-primary);
          background: rgba(211,47,47,0.06);
        }
        .cart-icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
        }
        .cart-icon-btn:hover {
          color: var(--color-primary);
          background: rgba(211,47,47,0.06);
        }
        .cart-count {
          position: absolute;
          top: 3px;
          right: 3px;
          background: var(--color-primary);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          min-width: 17px;
          height: 17px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #fff;
          line-height: 1;
          pointer-events: none;
        }
        .hamburger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          background: transparent;
          border: 1.5px solid #e8e8e8;
          cursor: pointer;
          color: #333;
          transition: all 0.2s;
        }
        .hamburger:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        /* Mobile Drawer */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 198;
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(300px, 88vw);
          background: #fff;
          z-index: 199;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 50px rgba(0,0,0,0.18);
        }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .drawer-logo { height: 44px; width: auto; border-radius: 6px; }
        .drawer-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 0.2rem;
          overflow-y: auto;
        }
        .drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #222;
          transition: all 0.2s;
          text-decoration: none;
        }
        .drawer-link:hover {
          background: rgba(211,47,47,0.06);
          color: var(--color-primary);
        }
        .cart-count-inline {
          background: var(--color-primary);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 800;
          min-width: 20px;
          height: 20px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
        }
        .drawer-footer {
          padding: 1.25rem;
          border-top: 1px solid #f0f0f0;
        }
        /* Responsive */
        .desktop-only { display: none !important; }
        .mobile-only { display: flex !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex; }
          .desktop-only { display: inline-flex !important; }
          .mobile-only { display: none !important; }
          .logo-img { height: 56px; }
          .nav-inner { height: 72px; }
        }
      `}</style>
    </header>
  );
}
