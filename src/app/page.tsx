"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, Clock, Star, ChevronRight, Flame, Bike, CheckCircle, Phone } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const FEATURED = [
  { id: 1, name: "Full House Bunny Chow", price: 120, category: "Bunny Chows", rating: 4.9, reviews: 214, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", tag: "🔥 Best Seller" },
  { id: 4, name: "Sticky BBQ Ribs", price: 150, category: "Ribs", rating: 4.8, reviews: 189, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", tag: "⭐ Top Rated" },
  { id: 5, name: "Kota Special", price: 80, category: "Kota", rating: 4.7, reviews: 322, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", tag: "🌟 Popular" },
  { id: 6, name: "Wings & Chips Combo", price: 85, category: "Wings", rating: 4.8, reviews: 157, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", tag: "🔥 Hot Pick" },
];

const SPECIALS = [
  { id: 10, name: "Family Feast Combo", original: 350, price: 280, description: "2 Bunny Chows + 500g Ribs + 2L Cold Drink + 4 Wings", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", badge: "20% OFF" },
  { id: 11, name: "Student Special", original: 120, price: 89, description: "Beef Bunny Chow + Chips + Cold Drink 500ml", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", badge: "Friday Only" },
];

const STEPS = [
  { icon: <ShoppingBag size={28} />, title: "Browse & Order", desc: "Choose your favourite kasi meals from our rich menu." },
  { icon: <Flame size={28} />, title: "We Prepare It", desc: "Our kitchen freshly prepares your meal with real soul." },
  { icon: <Bike size={28} />, title: "Rider Picks Up", desc: "Your order is collected by one of our trusted riders." },
  { icon: <MapPin size={28} />, title: "Delivered Hot", desc: "Track live on the map and receive it at your door." },
];

const AREAS = ["Orange Farm", "Lakeside", "Evaton", "Stretford", "Vosloorus", "Meyersdal", "Palm Ridge"];

const TESTIMONIALS = [
  { name: "Tebogo M.", area: "Orange Farm", text: "The bunny chow hit different! Still hot when it arrived. Will definitely order again 🔥", rating: 5 },
  { name: "Zanele K.", area: "Evaton", text: "Best kota I've had delivered. The app is super easy to use and the food arrived fast!", rating: 5 },
  { name: "Sipho D.", area: "Lakeside", text: "Ribs were amazing bro. And I could track exactly where my rider was the whole time 💯", rating: 5 },
];

export default function HomePage() {
  const [addedId, setAddedId] = useState<number | null>(null);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (item: typeof FEATURED[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <main className="homepage">

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <motion.div className="hero-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="hero-tag">🇿🇦 South Africa's Favourite Kasi Kitchen</span>
            <h1 className="hero-heading">
              Real Flavour.<br />
              <span className="text-gradient">Hot & Fresh.</span><br />
              Delivered.
            </h1>
            <p className="hero-sub">
              Order your favourite bunny chows, ribs, kota and kasi fast food from Azania — fast, fresh, and delivered to your door across Orange Farm and beyond.
            </p>
            <div className="hero-actions">
              <Link href="/menu" className="btn btn-primary btn-xl">
                <ShoppingBag size={20} /> Order Now
              </Link>
              <Link href="/track" className="btn btn-outline btn-xl">
                Track My Order
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="stat-num">2000+</span><span className="stat-lbl">Orders Delivered</span></div>
              <div className="stat-divider" />
              <div className="hero-stat"><span className="stat-num">4.9★</span><span className="stat-lbl">Customer Rating</span></div>
              <div className="stat-divider" />
              <div className="hero-stat"><span className="stat-num">30min</span><span className="stat-lbl">Avg Delivery</span></div>
            </div>
          </motion.div>
          <motion.div className="hero-image-wrap" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="hero-img-card">
              <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=900" alt="Azania Bunny Chow" className="hero-img" />
              <div className="hero-img-badge">
                <Flame size={18} className="text-secondary" />
                <span>🔥 Most ordered today</span>
              </div>
            </div>
            <div className="hero-float-card left">
              <CheckCircle size={18} className="text-success" />
              <div><strong>Order Placed!</strong><p>AZN-09234</p></div>
            </div>
            <div className="hero-float-card right">
              <Bike size={18} className="text-primary" />
              <div><strong>On the Way</strong><p>15 mins away</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="categories-bar">
        <div className="container">
          <div className="cats-scroll">
            {["🍞 Bunny Chows", "🍖 Ribs", "🌮 Kota", "🍗 Wings", "🍔 Burgers", "🍟 Chips", "🥤 Drinks", "🎁 Combos", "⭐ Specials"].map((cat, i) => (
              <Link key={i} href={`/menu?cat=${cat.split(' ')[1]}`} className="cat-chip">{cat}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED MEALS ============ */}
      <section className="section">
        <div className="container">
          <div className="flex-between mb-8">
            <div>
              <p className="section-label">🔥 Menu Highlights</p>
              <h2 className="section-title">Most Loved Meals</h2>
              <p className="section-subtitle">Fresh off the grill and straight to your door.</p>
            </div>
            <Link href="/menu" className="btn btn-outline view-all-btn">View Full Menu <ChevronRight size={18} /></Link>
          </div>
          <div className="menu-cards-grid">
            {FEATURED.map((item, i) => (
              <motion.div key={item.id} className="food-card card-hover card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="food-card-img-wrap">
                  <img src={item.image} alt={item.name} className="food-card-img" />
                  <span className="food-card-tag">{item.tag}</span>
                </div>
                <div className="food-card-body">
                  <span className="text-xs text-gray font-semibold uppercase tracking-wide mb-1 block">{item.category}</span>
                  <h4 className="food-card-name">{item.name}</h4>
                  <div className="food-card-meta">
                    <span className="rating"><Star size={13} fill="#FF9800" stroke="none" /> {item.rating} ({item.reviews})</span>
                    <span className="food-price">R{item.price}</span>
                  </div>
                  <button
                    className={`btn full-width mt-3 ${addedId === item.id ? 'btn-dark' : 'btn-primary'}`}
                    onClick={() => handleQuickAdd(item)}
                  >
                    {addedId === item.id ? '✓ Added!' : <><ShoppingBag size={16} /> Add to Cart</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how-section section">
        <div className="container">
          <div className="text-center mb-12">
            <p className="how-section-label">⚡ Simple as 1-2-3-4</p>
            <h2 className="how-heading">How Azania Works</h2>
            <p className="how-subtitle mx-auto">Ordering your favourite kasi food has never been this easy or this fast.</p>
          </div>
          <div className="how-grid">
            {STEPS.map((step, i) => (
              <motion.div key={i} className="how-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="how-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="how-icon">{step.icon}</div>
                <h4 className="how-title">{step.title}</h4>
                <p className="how-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPECIALS BANNER ============ */}
      <section className="specials-section section">
        <div className="container">
          <div className="flex-between mb-8">
            <div>
              <p className="section-label">💥 Limited Time</p>
              <h2 className="section-title">Daily Specials</h2>
            </div>
            <Link href="/menu?cat=Specials" className="btn btn-outline view-all-btn">All Specials <ChevronRight size={18} /></Link>
          </div>
          <div className="specials-grid">
            {SPECIALS.map((sp, i) => (
              <motion.div key={sp.id} className="special-card card" initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="special-img-wrap">
                  <img src={sp.image} alt={sp.name} className="special-img" />
                  <span className="special-badge">{sp.badge}</span>
                </div>
                <div className="special-body">
                  <h3 className="special-name">{sp.name}</h3>
                  <p className="special-desc">{sp.description}</p>
                  <div className="special-pricing">
                    <span className="original-price">R{sp.original}</span>
                    <span className="sale-price">R{sp.price}</span>
                  </div>
                  <Link href="/menu" className="btn btn-primary full-width mt-4">Order This Special</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DELIVERY AREAS ============ */}
      <section className="areas-section section">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label"><MapPin size={14} /> Delivery Zones</p>
            <h2 className="section-title">Where We Deliver</h2>
            <p className="section-subtitle mx-auto">Currently delivering across these areas. More zones coming soon!</p>
          </div>
          <div className="areas-chips">
            {AREAS.map((area, i) => (
              <span key={i} className="area-chip">
                <MapPin size={14} /> {area}
              </span>
            ))}
            <span className="area-chip area-chip-more">+ More areas expanding</span>
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="btn btn-outline">Request your area</Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="reviews-section section">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label">❤️ Customer Love</p>
            <h2 className="section-title">What Kasi Says</h2>
          </div>
          <div className="reviews-grid">
            {TESTIMONIALS.map((r, i) => (
              <motion.div key={i} className="review-card card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="review-stars">{Array(r.rating).fill('★').join('')}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <p className="text-sm text-gray">{r.area}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Order?</h2>
              <p>Fresh, hot, kasi fast food delivered straight to your door. Order now!</p>
            </div>
            <div className="cta-actions">
              <Link href="/menu" className="btn btn-primary btn-xl">Order Now</Link>
              <a href="tel:+27821234567" className="btn btn-dark btn-xl">
                <Phone size={18} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ---- HERO ---- */
        .hero {
          position: relative;
          background: #0f0f0f;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(211,47,47,0.25) 0%, transparent 65%),
                      radial-gradient(ellipse at 20% 80%, rgba(255,152,0,0.12) 0%, transparent 60%);
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding-top: 5rem;
          padding-bottom: 5rem;
          position: relative;
          z-index: 2;
        }
        .hero-tag {
          display: inline-block;
          background: rgba(255,152,0,0.15);
          color: var(--color-secondary);
          border: 1px solid rgba(255,152,0,0.3);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .hero-heading {
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 1.5rem;
        }
        .text-gradient {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          max-width: 500px;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .hero-stat { display: flex; flex-direction: column; }
        .stat-num { font-size: 1.6rem; font-weight: 800; color: #fff; font-family: var(--font-heading); }
        .stat-lbl { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-top: 0.1rem; }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }
        /* Hero image */
        .hero-image-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-img-card {
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          position: relative;
          max-width: 500px;
          width: 100%;
        }
        .hero-img { width: 100%; height: 380px; object-fit: cover; }
        .hero-img-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(0,0,0,0.8);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }
        .hero-float-card {
          position: absolute;
          background: #fff;
          border-radius: 1rem;
          padding: 0.8rem 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          font-size: 0.82rem;
        }
        .hero-float-card strong { display: block; font-size: 0.9rem; }
        .hero-float-card p { color: var(--color-gray); font-size: 0.75rem; margin: 0; }
        .hero-float-card.left { bottom: -1rem; left: -1rem; animation: float 4s ease-in-out infinite; }
        .hero-float-card.right { top: 2rem; right: -1rem; animation: float 4s ease-in-out infinite 1s; }

        /* ---- CATEGORIES ---- */
        .categories-bar {
          background: #fff;
          border-bottom: 1px solid var(--color-border);
          padding: 1rem 0;
          position: sticky;
          top: 76px;
          z-index: 50;
        }
        .cats-scroll {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 0.25rem;
        }
        .cats-scroll::-webkit-scrollbar { display: none; }
        .cat-chip {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          padding: 0.5rem 1.1rem;
          border-radius: 2rem;
          background: #F3F4F6;
          color: var(--color-dark);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          flex-shrink: 0;
        }
        .cat-chip:hover { background: var(--color-primary); color: #fff; }

        /* ---- FOOD CARDS ---- */
        .menu-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .food-card { border-radius: 1.25rem; }
        .food-card-img-wrap { position: relative; height: 210px; overflow: hidden; }
        .food-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .food-card:hover .food-card-img { transform: scale(1.06); }
        .food-card-tag {
          position: absolute; top: 0.75rem; left: 0.75rem;
          background: rgba(0,0,0,0.7); color: #fff;
          padding: 0.3rem 0.8rem; border-radius: 2rem;
          font-size: 0.75rem; font-weight: 700; backdrop-filter: blur(4px);
        }
        .food-card-body { padding: 1.25rem; }
        .food-card-name { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.3; }
        .food-card-meta { display: flex; justify-content: space-between; align-items: center; }
        .rating { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; color: var(--color-gray); font-weight: 600; }
        .food-price { font-size: 1.1rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading); }

        /* ---- HOW ---- */
        .how-section { background: #0f0f0f; }
        .how-section-label {
          display: inline-block;
          color: var(--color-secondary);
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .how-heading {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #ffffff !important;
          font-family: var(--font-heading);
          margin-bottom: 0.75rem;
        }
        .how-subtitle {
          color: rgba(255,255,255,0.55) !important;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 520px;
        }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .how-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 2rem;
          transition: all 0.3s;
        }
        .how-card:hover { background: rgba(211,47,47,0.1); border-color: rgba(211,47,47,0.3); }
        .how-num { font-size: 3rem; font-weight: 900; color: rgba(255,255,255,0.06); font-family: var(--font-heading); line-height: 1; margin-bottom: 1rem; }
        .how-icon { width: 56px; height: 56px; border-radius: 1rem; background: rgba(211,47,47,0.15); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .how-title { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
        .how-desc { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.7; }

        /* ---- SPECIALS ---- */
        .specials-section { background: #fff; }
        .specials-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .special-card { border-radius: 1.25rem; display: flex; flex-direction: column; }
        .special-img-wrap { position: relative; height: 220px; overflow: hidden; }
        .special-img { width: 100%; height: 100%; object-fit: cover; }
        .special-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: var(--color-primary); color: #fff;
          padding: 0.4rem 0.9rem; border-radius: 2rem;
          font-size: 0.78rem; font-weight: 800; letter-spacing: 0.05em;
        }
        .special-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .special-name { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem; }
        .special-desc { color: var(--color-gray); font-size: 0.9rem; line-height: 1.6; flex: 1; }
        .special-pricing { display: flex; align-items: center; gap: 1rem; margin-top: 1.25rem; }
        .original-price { font-size: 1rem; color: var(--color-gray); text-decoration: line-through; }
        .sale-price { font-size: 1.6rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading); }

        /* ---- AREAS ---- */
        .areas-section { background: var(--color-light); }
        .areas-chips { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
        .area-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.6rem 1.25rem; border-radius: 2rem;
          background: #fff; border: 1.5px solid var(--color-border);
          font-size: 0.9rem; font-weight: 600; color: var(--color-dark);
          transition: all 0.2s;
        }
        .area-chip:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .area-chip-more { border-style: dashed; color: var(--color-gray); background: transparent; }

        /* ---- REVIEWS ---- */
        .reviews-section { background: #fff; }
        .reviews-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .review-card { padding: 1.75rem; border-radius: 1.25rem; }
        .review-stars { color: var(--color-secondary); font-size: 1.1rem; margin-bottom: 0.75rem; letter-spacing: 0.1em; }
        .review-text { font-size: 1rem; line-height: 1.7; color: var(--color-dark); margin-bottom: 1.5rem; font-style: italic; }
        .review-author { display: flex; align-items: center; gap: 0.75rem; }
        .review-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--color-primary); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem;
        }

        /* ---- CTA ---- */
        .cta-section { padding: 4rem 0; }
        .cta-card {
          background: linear-gradient(135deg, var(--color-dark) 0%, #2d1a1a 100%);
          border-radius: 2rem;
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: flex-start;
          border: 1px solid rgba(211,47,47,0.25);
          overflow: hidden;
          position: relative;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          top: -50%; right: -20%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(211,47,47,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title { font-size: 2.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .cta-card > .cta-text > p { color: rgba(255,255,255,0.6); font-size: 1rem; }
        .cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        @media (min-width: 768px) {
          .hero-content { grid-template-columns: 1fr 1fr; align-items: center; }
          .hero-img { height: 480px; }
          .hero-float-card.left { left: -2rem; }
          .menu-cards-grid { grid-template-columns: repeat(4, 1fr); }
          .how-grid { grid-template-columns: repeat(4, 1fr); }
          .specials-grid { grid-template-columns: repeat(2, 1fr); }
          .reviews-grid { grid-template-columns: repeat(3, 1fr); }
          .cta-card { flex-direction: row; align-items: center; justify-content: space-between; }
          .cta-card > .cta-text { flex: 1; }
        }
        @media (min-width: 1024px) {
          .hero-float-card.left { left: 2rem; bottom: 2rem; }
          .hero-float-card.right { right: 2rem; }
        }
      `}</style>
    </main>
  );
}
