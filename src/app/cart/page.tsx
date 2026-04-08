"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, MapPin, X, Check, Tag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const DELIVERY_AREAS = [
  { label: "Orange Farm (Zone 1)", fee: 25 },
  { label: "Lakeside", fee: 30 },
  { label: "Evaton", fee: 35 },
  { label: "Stretford", fee: 28 },
  { label: "Palm Ridge", fee: 40 },
];

type Step = 'cart' | 'checkout' | 'success';

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('cart');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'collection'>('delivery');
  const [selectedArea, setSelectedArea] = useState(DELIVERY_AREAS[0]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', unit: '', instructions: '' });
  const [orderNum] = useState(() => `AZN-${Math.floor(10000 + Math.random() * 90000)}`);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? selectedArea.fee : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AZANIA10') setPromoApplied(true);
    else alert('Invalid promo code');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="success-page">
        <motion.div className="success-card card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="success-icon-wrap">
            <motion.div className="success-circle" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <Check size={40} />
            </motion.div>
          </div>
          <h2>Order Placed!</h2>
          <p>Your order <strong>{orderNum}</strong> has been received. Our kitchen is already preparing your food 🔥</p>
          <div className="success-details">
            <div className="success-detail-row">
              <span>Order Total</span><strong className="text-primary">R{total.toFixed(2)}</strong>
            </div>
            <div className="success-detail-row">
              <span>Payment</span><strong>{paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}</strong>
            </div>
            <div className="success-detail-row">
              <span>Estimated Time</span><strong>25–40 min</strong>
            </div>
          </div>
          <Link href="/track" className="btn btn-primary full-width btn-lg mt-4">
            <MapPin size={18} /> Track Order Live
          </Link>
          <Link href="/menu" className="btn btn-ghost full-width mt-2">Order More Food</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Progress Bar */}
      <div className="cart-progress">
        <div className="container">
          <div className="progress-steps">
            {(['cart', 'checkout'] as Step[]).map((s, i) => (
              <div key={s} className={`prog-step ${step === s ? 'active' : ''} ${
                (step === 'checkout' && s === 'cart') ? 'done' : ''}`}
              >
                <div className="prog-dot">{(step === 'checkout' && s === 'cart') ? <Check size={14} /> : i + 1}</div>
                <span>{s === 'cart' ? 'Your Cart' : 'Checkout'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container cart-layout section-sm">
        {/* Main Area */}
        <div className="cart-main">
          {step === 'cart' && (
            <div className="card p-6">
              <div className="cart-header">
                <h2>Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h2>
                {items.length > 0 && (
                  <button className="clear-btn" onClick={clearCart}>Clear All</button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Add some delicious kasi food to get started!</p>
                  <Link href="/menu" className="btn btn-primary mt-4">Browse Menu</Link>
                </div>
              ) : (
                <div className="cart-items">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div key={item.id} layout exit={{ opacity: 0, x: -20 }} className="cart-item-row">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-details">
                          <div className="cart-item-top">
                            <h4>{item.name}</h4>
                            <button className="remove-btn" onClick={() => removeItem(item.id)}><X size={18} /></button>
                          </div>
                          {item.extras && <p className="item-extras">+ {item.extras}</p>}
                          <div className="cart-item-bottom">
                            <div className="qty-controls">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                            </div>
                            <span className="item-total-price">R{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Promo code */}
              {items.length > 0 && (
                <div className="promo-row">
                  <Tag size={18} className="promo-icon" />
                  <input type="text" placeholder="Promo code (try AZANIA10)" className="promo-input"
                    value={promoCode} onChange={e => setPromoCode(e.target.value)} disabled={promoApplied} />
                  {promoApplied
                    ? <span className="promo-success"><Check size={18} /> Applied!</span>
                    : <button className="btn btn-outline btn-sm" onClick={applyPromo}>Apply</button>
                  }
                </div>
              )}
            </div>
          )}

          {step === 'checkout' && (
            <div className="card p-6">
              <h2 className="mb-6">Checkout Details</h2>

              {/* Delivery / Collection Toggle */}
              <div className="delivery-toggle mb-6">
                <button className={`toggle-opt ${deliveryType === 'delivery' ? 'active' : ''}`} onClick={() => setDeliveryType('delivery')}>
                  <MapPin size={18} /> Delivery
                </button>
                <button className={`toggle-opt ${deliveryType === 'collection' ? 'active' : ''}`} onClick={() => setDeliveryType('collection')}>
                  <ShieldCheck size={18} /> Collection
                </button>
              </div>

              <form id="checkout-form" onSubmit={handleCheckout}>
                <h4 className="form-section-title">Personal Details</h4>
                <div className="form-row-2 mb-4">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Thabo Mokoena" required
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp Number</label>
                    <input type="tel" className="form-input" placeholder="+27 82 000 0000" required
                      value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>

                {deliveryType === 'delivery' && (
                  <>
                    <h4 className="form-section-title">Delivery Address</h4>
                    <div className="form-group">
                      <label className="form-label">Delivery Area</label>
                      <select className="form-input" required
                        onChange={e => {
                          const area = DELIVERY_AREAS.find(a => a.label === e.target.value);
                          if (area) setSelectedArea(area);
                        }}>
                        {DELIVERY_AREAS.map(a => <option key={a.label} value={a.label}>{a.label} — R{a.fee} delivery fee</option>)}
                      </select>
                    </div>
                    <div className="form-row-2 mb-4">
                      <div className="form-group">
                        <label className="form-label">Street Address</label>
                        <input type="text" className="form-input" placeholder="45 Golden Highway" required
                          value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">House / Unit Number</label>
                        <input type="text" className="form-input" placeholder="Unit 3B"
                          value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} />
                      </div>
                    </div>
                  </>
                )}

                <h4 className="form-section-title">Payment Method</h4>
                <div className="payment-options mb-4">
                  {[
                    { val: 'cash', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                    { val: 'payfast', label: 'PayFast', sub: 'Secure online card payment' },
                    { val: 'yoco', label: 'Yoco', sub: 'Pay via Yoco card reader on delivery' },
                  ].map(pm => (
                    <label key={pm.val} className={`payment-opt ${paymentMethod === pm.val ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value={pm.val} checked={paymentMethod === pm.val} onChange={() => setPaymentMethod(pm.val)} />
                      <div>
                        <strong>{pm.label}</strong>
                        <p>{pm.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Special Instructions (Optional)</label>
                  <textarea className="form-input" rows={3} placeholder="e.g. Please add extra napkins, gate code is 1234..."
                    value={form.instructions} onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))} />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="cart-sidebar">
          <div className="card p-6 order-summary">
            <h3 className="mb-4">Order Summary</h3>
            <div className="summary-lines">
              <div className="summary-line"><span>Subtotal</span><span>R{subtotal.toFixed(2)}</span></div>
              <div className="summary-line"><span>Delivery Fee</span><span>{deliveryFee === 0 ? 'Free' : `R${deliveryFee}`}</span></div>
              {promoApplied && <div className="summary-line discount"><span>Promo (AZANIA10)</span><span>−R{discount}</span></div>}
              <div className="summary-line total"><span>Total</span><span>R{total.toFixed(2)}</span></div>
            </div>

            {step === 'cart' ? (
              <button className="btn btn-primary full-width btn-lg mt-4" disabled={items.length === 0}
                onClick={() => setStep('checkout')}>
                Continue to Checkout <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <button type="submit" form="checkout-form" className="btn btn-primary full-width btn-lg mt-4">
                  <ShieldCheck size={18} /> Place Order
                </button>
                <button className="btn btn-ghost full-width mt-2" onClick={() => setStep('cart')}>
                  ← Back to Cart
                </button>
              </>
            )}

            <div className="trust-badges">
              <span><ShieldCheck size={14} /> Secure Checkout</span>
              <span>🇿🇦 Local Business</span>
            </div>
          </div>

          {items.length > 0 && (
            <div className="card p-4 mt-4 order-items-summary">
              <h4 className="mb-3">In Your Order</h4>
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="summary-qty">{item.quantity}x</span>
                  <span className="summary-name">{item.name}</span>
                  <span className="summary-price">R{(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cart-page { background: var(--color-light); min-height: 100vh; }
        .success-page { min-height: 70vh; display: flex; align-items: center; justify-content: center; background: var(--color-light); padding: 2rem; }
        .success-card { max-width: 460px; width: 100%; padding: 3rem; text-align: center; margin: 0 auto; }
        .success-icon-wrap { margin-bottom: 1.5rem; }
        .success-circle { width: 90px; height: 90px; border-radius: 50%; background: #D1FAE5; color: #065F46; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
        .success-card h2 { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; }
        .success-card p { color: var(--color-gray); line-height: 1.7; margin-bottom: 1.5rem; }
        .success-details { background: #F9FAFB; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem; }
        .success-detail-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border); }
        .success-detail-row:last-child { border: none; }
        .text-primary { color: var(--color-primary); }
        .mt-4 { margin-top: 1rem; }
        .mt-2 { margin-top: 0.5rem; }
        .full-width { width: 100%; }
        .btn-lg { padding: 1rem; }

        .cart-progress { background: #fff; border-bottom: 1px solid var(--color-border); padding: 1rem 0; }
        .progress-steps { display: flex; align-items: center; gap: 2rem; }
        .prog-step { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; font-weight: 600; color: var(--color-gray); }
        .prog-step.active { color: var(--color-dark); }
        .prog-step.done { color: var(--color-success); }
        .prog-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; }
        .prog-step.active .prog-dot { background: var(--color-dark); color: #fff; border-color: var(--color-dark); }
        .prog-step.done .prog-dot { background: var(--color-success); color: #fff; border-color: var(--color-success); }

        .cart-layout { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .p-6 { padding: 1.5rem; }
        .p-4 { padding: 1rem; }

        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .cart-header h2 { font-size: 1.25rem; font-weight: 800; }
        .clear-btn { font-size: 0.82rem; color: var(--color-gray); background: none; border: none; cursor: pointer; text-decoration: underline; }
        .clear-btn:hover { color: var(--color-primary); }

        .empty-cart { text-align: center; padding: 3rem 1rem; }
        .empty-icon { font-size: 4rem; margin-bottom: 1rem; }
        .empty-cart h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem; }
        .empty-cart p { color: var(--color-gray); }

        .cart-items { display: flex; flex-direction: column; gap: 1.25rem; }
        .cart-item-row { display: flex; gap: 1rem; padding-bottom: 1.25rem; border-bottom: 1px solid #F3F4F6; }
        .cart-item-img { width: 90px; height: 90px; border-radius: 0.75rem; object-fit: cover; flex-shrink: 0; }
        .cart-item-details { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .cart-item-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .cart-item-top h4 { font-size: 0.95rem; font-weight: 700; line-height: 1.3; padding-right: 0.5rem; }
        .remove-btn { background: none; border: none; cursor: pointer; color: #9CA3AF; flex-shrink: 0; transition: color 0.2s; }
        .remove-btn:hover { color: var(--color-primary); }
        .item-extras { font-size: 0.78rem; color: var(--color-gray); margin-top: 0.25rem; }
        .cart-item-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.75rem; }
        .qty-controls { display: flex; align-items: center; gap: 0.6rem; background: #F3F4F6; border-radius: 2rem; padding: 0.2rem 0.5rem; }
        .qty-controls button { width: 26px; height: 26px; border-radius: 50%; border: none; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; }
        .qty-controls button:hover { background: var(--color-primary); color: #fff; }
        .qty-controls span { font-weight: 700; font-size: 0.95rem; min-width: 18px; text-align: center; }
        .item-total-price { font-weight: 800; font-size: 1rem; color: var(--color-primary); font-family: var(--font-heading); }

        .promo-row { display: flex; align-items: center; gap: 0.75rem; background: #F9FAFB; border-radius: 0.75rem; padding: 1rem; margin-top: 1.5rem; }
        .promo-icon { color: var(--color-secondary); flex-shrink: 0; }
        .promo-input { flex: 1; border: none; background: transparent; font-size: 0.9rem; outline: none; }
        .promo-success { display: flex; align-items: center; gap: 0.4rem; color: var(--color-success); font-weight: 700; font-size: 0.85rem; white-space: nowrap; }
        .btn-sm { padding: 0.45rem 1rem; font-size: 0.85rem; }

        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .form-section-title { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-gray); margin-bottom: 1rem; margin-top: 1.5rem; }
        .form-section-title:first-of-type { margin-top: 0; }
        .form-row-2 { display: grid; grid-template-columns: 1fr; gap: 0; }

        .delivery-toggle { display: flex; background: #F3F4F6; border-radius: 0.6rem; padding: 0.25rem; gap: 0.25rem; }
        .toggle-opt { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem; border: none; background: transparent; border-radius: 0.45rem; font-weight: 600; font-size: 0.9rem; color: var(--color-gray); cursor: pointer; transition: all 0.2s; }
        .toggle-opt.active { background: #fff; color: var(--color-primary); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

        .payment-options { display: flex; flex-direction: column; gap: 0.75rem; }
        .payment-opt { display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1.5px solid var(--color-border); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s; }
        .payment-opt.selected { border-color: var(--color-primary); background: rgba(211,47,47,0.04); }
        .payment-opt input { accent-color: var(--color-primary); width: 18px; height: 18px; }
        .payment-opt strong { display: block; font-size: 0.95rem; }
        .payment-opt p { font-size: 0.8rem; color: var(--color-gray); margin: 0; }

        .order-summary {}
        .order-summary h3 { font-size: 1.1rem; font-weight: 800; }
        .mb-4 { margin-bottom: 1rem; }
        .summary-lines { display: flex; flex-direction: column; gap: 0.75rem; }
        .summary-line { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-gray); }
        .summary-line.discount { color: var(--color-success); font-weight: 600; }
        .summary-line.total { font-size: 1.05rem; font-weight: 800; color: var(--color-dark); padding-top: 0.75rem; border-top: 2px solid var(--color-border); }
        .trust-badges { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.25rem; font-size: 0.78rem; color: var(--color-gray); font-weight: 600; }

        .order-items-summary h4 { font-size: 0.9rem; font-weight: 700; }
        .summary-item { display: flex; gap: 0.75rem; align-items: center; padding: 0.4rem 0; font-size: 0.85rem; border-bottom: 1px solid #F3F4F6; }
        .summary-item:last-child { border: none; }
        .summary-qty { background: var(--color-primary); color: #fff; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 2rem; flex-shrink: 0; }
        .summary-name { flex: 1; }
        .summary-price { font-weight: 700; }

        @media (min-width: 768px) {
          .cart-layout { grid-template-columns: 1fr 360px; align-items: flex-start; }
          .form-row-2 { grid-template-columns: 1fr 1fr; gap: 1rem; }
          .cart-sidebar { position: sticky; top: 90px; }
        }
      `}</style>
    </div>
  );
}
