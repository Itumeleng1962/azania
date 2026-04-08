"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Info, X, Check, Star, Filter, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

const MENU_ITEMS = [
  { id: 1, name: "Full House Bunny Chow", category: "Bunny Chows", price: 120, rating: 4.9, reviews: 214, desc: "Quarter loaf filled with rich, spicy mutton curry. A township classic served with carrot salad.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: true },
  { id: 2, name: "Beef Bunny Chow", category: "Bunny Chows", price: 100, rating: 4.8, reviews: 189, desc: "Tender slow-cooked beef curry in a fresh half loaf. Rich, hearty and full of flavour.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 3, name: "Chicken Bunny Chow", category: "Bunny Chows", price: 90, rating: 4.6, reviews: 132, desc: "Boneless chicken pieces cooked in a golden curry sauce, stuffed in fresh bread.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", isSoldOut: true, isNew: false, isBestSeller: false },
  { id: 4, name: "Sticky BBQ Ribs (500g)", category: "Ribs", price: 150, rating: 4.9, reviews: 98, desc: "Flame-grilled local pork ribs, glazed with our secret sticky BBQ sauce. Fall-off-the-bone good.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: true },
  { id: 5, name: "Flame Grilled Ribs (1kg)", category: "Ribs", price: 250, rating: 4.8, reviews: 64, desc: "Full 1kg rack of flame-grilled pork ribs, basted with our signature sauce. Feeds 2.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 6, name: "Kota Special", category: "Kota", price: 80, rating: 4.7, reviews: 312, desc: "Quarter loaf loaded with chips, polony, russian, egg, cheese and atchar. The real deal.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: true },
  { id: 7, name: "Kota Deluxe", category: "Kota", price: 110, rating: 4.8, reviews: 87, desc: "Our Kota Special + extra meat, grilled chicken strips, and double the cheese.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: true, isBestSeller: false },
  { id: 8, name: "Wings & Chips Combo (6pc)", category: "Wings", price: 85, rating: 4.8, reviews: 157, desc: "6 crispy wings (spicy or BBQ) served with a generous portion of golden chips.", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 9, name: "Spicy Wings (12pc)", category: "Wings", price: 130, rating: 4.7, reviews: 91, desc: "12 pieces of lip-smacking hot wings. WARNING: These are HOT 🔥", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 10, name: "Classic Beef Burger", category: "Burgers", price: 75, rating: 4.7, reviews: 143, desc: "150g pure beef patty, lettuce, tomato, caramelised onions and our special house sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 11, name: "Double Smash Burger", category: "Burgers", price: 110, rating: 4.9, reviews: 76, desc: "Two smashed beef patties, double cheese, pickles, and special sauce in a brioche bun.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000", isSoldOut: false, isNew: true, isBestSeller: false },
  { id: 12, name: "Loaded Chips", category: "Chips", price: 45, rating: 4.6, reviews: 201, desc: "Fresh-cut chips seasoned with our spice blend. Topped with cheese sauce and atchar.", image: "https://images.unsplash.com/photo-1583150820850-7a2e2a45-1abc?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 13, name: "Russian & Chips", category: "Chips", price: 55, rating: 4.5, reviews: 168, desc: "Grilled beef russian sausage served with seasoned chips and your choice of sauce.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 14, name: "Family Feast Combo", category: "Combos", price: 280, rating: 4.9, reviews: 54, desc: "2x Bunny Chows + 500g Ribs + 4 Wings + 2L Cold Drink. Perfect for the family!", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000", isSoldOut: false, isNew: false, isBestSeller: true },
  { id: 15, name: "Student Special", category: "Combos", price: 89, rating: 4.8, reviews: 201, desc: "Beef Bunny Chow + Chips + Cold Drink 500ml. Fridays only!", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 16, name: "Cold Drink 500ml", category: "Drinks", price: 25, rating: 4.5, reviews: 89, desc: "Assorted cold drinks: Coca-Cola, Fanta Orange, Sprite. Ice cold.", image: "https://images.unsplash.com/photo-1622312674384-59e683faba1e?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
  { id: 17, name: "2 Litre Cold Drink", category: "Drinks", price: 50, rating: 4.6, reviews: 44, desc: "2L bottle of Coca-Cola, Fanta or Sprite. Perfect for sharing with the family.", image: "https://images.unsplash.com/photo-1622312674384-59e683faba1e?auto=format&fit=crop&q=80&w=800", isSoldOut: false, isNew: false, isBestSeller: false },
];

const CATEGORIES = ["All", "Bunny Chows", "Ribs", "Kota", "Wings", "Burgers", "Chips", "Combos", "Drinks"];

const SORT_OPTIONS = [
  { val: 'popular', label: 'Most Popular' },
  { val: 'price_asc', label: 'Price: Low to High' },
  { val: 'price_desc', label: 'Price: High to Low' },
  { val: 'rating', label: 'Top Rated' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedItem, setSelectedItem] = useState<typeof MENU_ITEMS[0] | null>(null);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [qty, setQty] = useState(1);

  const addItem = useCartStore(state => state.addItem);

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS.filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    switch (sortBy) {
      case 'price_asc': return [...items].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...items].sort((a, b) => b.price - a.price);
      case 'rating': return [...items].sort((a, b) => b.rating - a.rating);
      default: return [...items].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (item: typeof MENU_ITEMS[0], quantity = 1) => {
    addItem({ id: item.id, name: item.name, price: item.price, quantity, image: item.image });
    setAddedIds(prev => new Set(prev).add(item.id));
    setTimeout(() => setAddedIds(prev => { const s = new Set(prev); s.delete(item.id); return s; }), 2000);
  };

  const openModal = (item: typeof MENU_ITEMS[0]) => {
    setSelectedItem(item);
    setQty(1);
  };

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header">
        <div className="container">
          <h1 className="page-title text-white mb-2">Our Full Menu</h1>
          <p className="header-sub">Fresh, hot kasi flavours — made to order, delivered fast.</p>
          <div className="search-wrap">
            <Search size={20} className="search-ico" />
            <input type="text" className="search-field" placeholder="Search meals, bunny chows, ribs..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            {searchQuery && <button className="search-clear" onClick={() => setSearchQuery('')}><X size={16} /></button>}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-bar">
        <div className="container">
          <div className="cat-tabs">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container menu-content">
        {/* Toolbar */}
        <div className="menu-toolbar">
          <p className="result-count">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} {activeCategory !== 'All' ? `in ${activeCategory}` : 'on the menu'}
          </p>
          <div className="sort-wrap">
            <Filter size={16} />
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
            </select>
            <ChevronDown size={16} className="sort-arrow" />
          </div>
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <p className="no-results-emoji">🍽️</p>
            <h3>No meals found</h3>
            <p>Try a different search or category.</p>
            <button className="btn btn-outline mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Clear Filters</button>
          </div>
        ) : (
          <div className="menu-grid">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                  className={`menu-card card ${item.isSoldOut ? 'is-sold-out' : ''}`}
                >
                  {/* Image */}
                  <div className="menu-img-wrap" onClick={() => !item.isSoldOut && openModal(item)}>
                    <img src={item.image} alt={item.name} className="menu-img" loading="lazy" />
                    {item.isSoldOut && <div className="sold-out-layer"><span>Sold Out</span></div>}
                    {item.isBestSeller && !item.isSoldOut && <span className="card-tag bestseller">🔥 Best Seller</span>}
                    {item.isNew && <span className="card-tag new-tag">✨ New</span>}
                  </div>

                  {/* Body */}
                  <div className="menu-card-body">
                    <div className="card-meta-row">
                      <span className="category-label">{item.category}</span>
                      <div className="rating-row">
                        <Star size={12} fill="#FF9800" stroke="none" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <h4 className="menu-item-name">{item.name}</h4>
                    <p className="menu-item-desc">{item.desc}</p>
                    <div className="card-footer">
                      <span className="menu-price">R{item.price}</span>
                      <div className="card-actions">
                        <button className="info-btn" onClick={() => openModal(item)} title="View Details"><Info size={18} /></button>
                        <button
                          className={`btn btn-sm ${addedIds.has(item.id) ? 'btn-dark' : 'btn-primary'}`}
                          disabled={item.isSoldOut}
                          onClick={() => handleAddToCart(item)}
                        >
                          {addedIds.has(item.id) ? <><Check size={14} /> Added!</> : <><ShoppingBag size={14} /> Add</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}>
            <motion.div className="modal-box" initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
              onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedItem(null)}><X size={18} /></button>
              <div className="modal-img-wrap">
                <img src={selectedItem.image} alt={selectedItem.name} className="modal-img" />
                {selectedItem.isBestSeller && <span className="card-tag bestseller">🔥 Best Seller</span>}
              </div>
              <div className="modal-body">
                <div className="modal-header-row">
                  <div>
                    <span className="category-label mb-1 block">{selectedItem.category}</span>
                    <h2 className="modal-name">{selectedItem.name}</h2>
                    <div className="modal-rating">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.round(selectedItem.rating) ? "#FF9800" : "#E5E7EB"} stroke="none" />)}
                      <span>{selectedItem.rating} ({selectedItem.reviews} reviews)</span>
                    </div>
                  </div>
                  <span className="modal-price">R{selectedItem.price * qty}</span>
                </div>
                <p className="modal-desc">{selectedItem.desc}</p>
                <div className="modal-qty-row">
                  <span className="font-semibold text-sm">Quantity</span>
                  <div className="qty-controls">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}><span>−</span></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}><span>+</span></button>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-primary full-width btn-lg"
                    disabled={selectedItem.isSoldOut}
                    onClick={() => { handleAddToCart(selectedItem, qty); setSelectedItem(null); }}>
                    <ShoppingBag size={18} /> Add {qty > 1 ? `${qty}x ` : ''}to Cart — R{selectedItem.price * qty}
                  </button>
                  <Link href="/cart" className="btn btn-outline full-width" onClick={() => { handleAddToCart(selectedItem, qty); }}>
                    Add & Go to Cart <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .menu-page { background: var(--color-light); min-height: 100vh; }

        .menu-header { background: #0f0f0f; padding: 4rem 0 5rem; position: relative; overflow: hidden; }
        .menu-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 50%, rgba(211,47,47,0.2) 0%, transparent 60%); }
        .menu-header .container { position: relative; z-index: 1; }
        .page-title { font-size: clamp(2rem, 5vw, 2.75rem); }
        .text-white { color: #fff; }
        .mb-2 { margin-bottom: 0.5rem; }
        .header-sub { color: rgba(255,255,255,0.55); font-size: 1rem; margin-bottom: 2rem; }
        .search-wrap { position: relative; max-width: 560px; }
        .search-ico { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9CA3AF; }
        .search-field { width: 100%; background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.15); color: #fff; padding: 0.9rem 3rem; border-radius: 0.75rem; font-size: 0.95rem; transition: all 0.2s; }
        .search-field::placeholder { color: rgba(255,255,255,0.4); }
        .search-field:focus { outline: none; background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); }
        .search-clear { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #9CA3AF; cursor: pointer; }

        .category-bar { background: #fff; border-bottom: 1px solid var(--color-border); position: sticky; top: 76px; z-index: 50; }
        .cat-tabs { display: flex; gap: 0.25rem; overflow-x: auto; padding: 0.75rem 0; scrollbar-width: none; }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab { white-space: nowrap; padding: 0.45rem 1.1rem; border-radius: 2rem; border: 1.5px solid transparent; background: transparent; font-size: 0.88rem; font-weight: 600; color: var(--color-gray); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .cat-tab:hover { border-color: var(--color-border); color: var(--color-dark); }
        .cat-tab.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

        .menu-content { padding-top: 2rem; padding-bottom: 4rem; }

        .menu-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem; }
        .result-count { font-size: 0.9rem; color: var(--color-gray); font-weight: 500; }
        .sort-wrap { display: flex; align-items: center; gap: 0.5rem; background: #fff; border: 1.5px solid var(--color-border); border-radius: 0.5rem; padding: 0.45rem 0.85rem; position: relative; }
        .sort-select { border: none; outline: none; background: transparent; font-size: 0.88rem; font-weight: 600; cursor: pointer; appearance: none; padding-right: 1.25rem; color: var(--color-dark); }
        .sort-arrow { position: absolute; right: 0.6rem; pointer-events: none; color: var(--color-gray); }

        .no-results { text-align: center; padding: 5rem 1rem; }
        .no-results-emoji { font-size: 4rem; margin-bottom: 1rem; }
        .no-results h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .no-results p { color: var(--color-gray); }
        .mt-4 { margin-top: 1rem; }

        .menu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }

        .menu-card { border-radius: 1.25rem; transition: transform 0.3s, box-shadow 0.3s; }
        .menu-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
        .menu-card.is-sold-out { opacity: 0.7; }

        .menu-img-wrap { position: relative; height: 180px; overflow: hidden; cursor: pointer; }
        .menu-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .menu-card:hover .menu-img { transform: scale(1.05); }
        .sold-out-layer { position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; }
        .sold-out-layer span { background: #0f0f0f; color: #fff; font-size: 0.82rem; font-weight: 700; padding: 0.4rem 0.9rem; border-radius: 2rem; letter-spacing: 0.05em; }
        .card-tag { position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(0,0,0,0.72); color: #fff; padding: 0.25rem 0.7rem; border-radius: 2rem; font-size: 0.72rem; font-weight: 700; backdrop-filter: blur(4px); }
        .card-tag.bestseller { background: rgba(211,47,47,0.85); }
        .card-tag.new-tag { background: rgba(16,185,129,0.85); }

        .menu-card-body { padding: 1rem; }
        .card-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; }
        .category-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--color-gray); }
        .rating-row { display: flex; align-items: center; gap: 0.2rem; font-size: 0.75rem; font-weight: 700; color: var(--color-secondary); }
        .menu-item-name { font-size: 0.95rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.35rem; }
        .menu-item-desc { font-size: 0.78rem; color: var(--color-gray); line-height: 1.5; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; }
        .menu-price { font-size: 1.1rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading); }
        .card-actions { display: flex; gap: 0.5rem; align-items: center; }
        .info-btn { width: 34px; height: 34px; border-radius: 0.4rem; border: 1.5px solid var(--color-border); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-gray); transition: all 0.2s; }
        .info-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .btn-sm { padding: 0.45rem 0.85rem; font-size: 0.8rem; }

        /* Modal styles */
        .modal-img-wrap { position: relative; height: 260px; overflow: hidden; }
        .modal-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-body { padding: 1.5rem; }
        .modal-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .modal-name { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.4rem; }
        .modal-rating { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; color: var(--color-gray); }
        .modal-price { font-size: 1.8rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading); white-space: nowrap; }
        .modal-desc { color: var(--color-gray); line-height: 1.7; font-size: 0.95rem; margin-bottom: 1.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .block { display: block; }
        .modal-qty-row { display: flex; justify-content: space-between; align-items: center; background: #F9FAFB; border-radius: 0.75rem; padding: 1rem 1.25rem; margin-bottom: 1.25rem; }
        .font-semibold { font-weight: 600; }
        .text-sm { font-size: 0.875rem; }
        .qty-controls { display: flex; align-items: center; gap: 1rem; }
        .qty-controls button { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-border); background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 700; transition: all 0.2s; color: var(--color-dark); }
        .qty-controls button:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
        .qty-controls span { font-weight: 800; font-size: 1.1rem; min-width: 24px; text-align: center; }
        .modal-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .full-width { width: 100%; }
        .btn-lg { padding: 1rem; }

        @media (min-width: 640px) { .menu-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .menu-grid { grid-template-columns: repeat(4, 1fr); } .menu-img-wrap { height: 200px; } }
      `}</style>
    </div>
  );
}
