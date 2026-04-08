"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Check, Package, Navigation, ChevronRight, Bike, Clock, Star, LogOut, User } from 'lucide-react';

const MOCK_DELIVERIES = [
  {
    id: "AZN-12349", customer: "Thabo M.", phone: "082 111 2222",
    address: "45 Golden Highway, Orange Farm, 1841",
    items: "Full House Bunny Chow x2, Cold Drink x2",
    total: 265, distance: "2.3 km", eta: "8 min",
    shopAddress: "123 Kasi Street, Orange Farm, 1841",
    status: "assigned"
  },
  {
    id: "AZN-12348", customer: "Zanele K.", phone: "073 222 3333",
    address: "12 Evaton Road, Evaton, 1982",
    items: "Sticky BBQ Ribs + Chips",
    total: 175, distance: "4.1 km", eta: "15 min",
    shopAddress: "123 Kasi Street, Orange Farm, 1841",
    status: "assigned"
  },
];

const STATUS_STEPS = [
  { key: "assigned", label: "Assigned to You" },
  { key: "heading_to_shop", label: "Heading to Shop" },
  { key: "picked_up", label: "Picked Up" },
  { key: "on_the_way", label: "On the Way" },
  { key: "delivered", label: "Delivered ✓" },
];

type RiderView = 'login' | 'jobs' | 'active';

export default function RiderDashboard() {
  const [view, setView] = useState<RiderView>('login');
  const [loginData, setLoginData] = useState({ phone: '', pin: '' });
  const [jobs, setJobs] = useState(MOCK_DELIVERIES);
  const [activeJob, setActiveJob] = useState<typeof MOCK_DELIVERIES[0] | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState("assigned");
  const [earnings, setEarnings] = useState(280);

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === deliveryStatus);

  const advanceStatus = () => {
    const next = STATUS_STEPS[currentStepIndex + 1];
    if (next) {
      setDeliveryStatus(next.key);
      if (next.key === "delivered") {
        setEarnings(prev => prev + 35);
        setTimeout(() => {
          setActiveJob(null);
          setView('jobs');
          setDeliveryStatus('assigned');
          setJobs(prev => prev.filter(j => j.id !== activeJob?.id));
        }, 2000);
      }
    }
  };

  const acceptJob = (job: typeof MOCK_DELIVERIES[0]) => {
    setActiveJob(job);
    setDeliveryStatus("assigned");
    setView('active');
  };

  if (view === 'login') {
    return (
      <div className="rider-login">
        <div className="login-card card">
          <div className="login-header">
            <img src="/logo.png" alt="Azania" style={{ height: 70, borderRadius: 12, marginBottom: '0.75rem' }} />
            <Bike size={36} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
            <h2>Rider Portal</h2>
            <p>Log in to start your delivery shift</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setView('jobs'); }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" placeholder="+27 82 000 0000"
                value={loginData.phone} onChange={e => setLoginData(p => ({ ...p, phone: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">4-Digit PIN</label>
              <input type="password" maxLength={4} className="form-input" placeholder="••••"
                value={loginData.pin} onChange={e => setLoginData(p => ({ ...p, pin: e.target.value }))} required />
            </div>
            <button type="submit" className="btn btn-primary full-width btn-lg">
              <Bike size={18} /> Start Shift
            </button>
            <p className="demo-note">Demo: any phone + PIN</p>
          </form>
        </div>

        <style jsx>{`
          .rider-login { min-height: calc(100vh - 80px); background: #0f0f0f; display: flex; align-items: center; justify-content: center; padding: 2rem; }
          .login-card { max-width: 400px; width: 100%; padding: 2.5rem; }
          .login-header { text-align: center; margin-bottom: 2rem; }
          .login-header h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.4rem; }
          .login-header p { color: var(--color-gray); font-size: 0.9rem; }
          .full-width { width: 100%; }
          .btn-lg { padding: 1rem; }
          .demo-note { text-align: center; font-size: 0.75rem; color: #9CA3AF; margin-top: 1rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rider-shell">
      {/* Header */}
      <div className="rider-header">
        <div className="rider-profile">
          <div className="rider-ava">S</div>
          <div>
            <strong>Sipo Mokoena</strong>
            <p>Orange Farm Zone • <span className="status-dot active" />On Duty</p>
          </div>
        </div>
        <div className="rider-header-right">
          <div className="earnings-badge">
            <Star size={14} /> R{earnings} Today
          </div>
          <button className="icon-btn" onClick={() => setView('login')} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="rider-content">
        {/* Stats bar */}
        <div className="rider-stats">
          <div className="rider-stat-item">
            <span className="rider-stat-val">{jobs.length + (activeJob ? 0 : 0)}</span>
            <span className="rider-stat-lbl">Available Jobs</span>
          </div>
          <div className="rider-stat-item">
            <span className="rider-stat-val">3</span>
            <span className="rider-stat-lbl">Completed Today</span>
          </div>
          <div className="rider-stat-item">
            <span className="rider-stat-val">4.9★</span>
            <span className="rider-stat-lbl">Your Rating</span>
          </div>
        </div>

        {/* Active Job */}
        {view === 'active' && activeJob && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="active-job-card card mb-6">
            <div className="active-job-header">
              <div>
                <span className="badge badge-primary">Active Delivery</span>
                <h3 className="mt-2">{activeJob.id}</h3>
              </div>
              <div className="active-eta">
                <Clock size={18} />
                <span>{activeJob.eta}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="delivery-steps">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStepIndex;
                const active = i === currentStepIndex;
                return (
                  <div key={step.key} className={`delivery-step ${done ? 'done' : ''} ${active ? 'current' : ''}`}>
                    <div className="step-dot">{done && i < currentStepIndex ? <Check size={12} /> : i + 1}</div>
                    {i < STATUS_STEPS.length - 1 && <div className="step-line" />}
                    <span className="step-label">{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Customer */}
            <div className="job-detail-grid">
              <div className="job-detail-item">
                <MapPin size={16} className="detail-icon" />
                <div>
                  <strong>Pickup from Shop</strong>
                  <p>{activeJob.shopAddress}</p>
                </div>
              </div>
              <div className="job-detail-item">
                <MapPin size={16} className="detail-icon red" />
                <div>
                  <strong>Deliver To</strong>
                  <p>{activeJob.address}</p>
                </div>
              </div>
              <div className="job-detail-item">
                <Package size={16} className="detail-icon" />
                <div>
                  <strong>Order Items</strong>
                  <p>{activeJob.items}</p>
                </div>
              </div>
              <div className="job-detail-item">
                <Phone size={16} className="detail-icon" />
                <div>
                  <strong>Customer: {activeJob.customer}</strong>
                  <a href={`tel:${activeJob.phone}`} className="call-link">{activeJob.phone}</a>
                </div>
              </div>
            </div>

            <div className="active-job-actions">
              {currentStepIndex < STATUS_STEPS.length - 1 ? (
                <button className="btn btn-primary full-width btn-lg" onClick={advanceStatus}>
                  <Navigation size={18} />
                  {currentStepIndex === 0 && "Heading to Shop"}
                  {currentStepIndex === 1 && "Confirm Pickup"}
                  {currentStepIndex === 2 && "Start Delivery"}
                  {currentStepIndex === 3 && "Mark as Delivered"}
                </button>
              ) : (
                <div className="delivered-msg">
                  <Check size={28} />
                  <span>Order Delivered! +R35 earned</span>
                </div>
              )}
              <button className="btn btn-ghost full-width" onClick={() => { setView('jobs'); setActiveJob(null); }}>
                Back to Jobs
              </button>
            </div>
          </motion.div>
        )}

        {/* Live Map Placeholder */}
        {view === 'active' && (
          <div className="map-card card mb-6">
            <div className="map-ph">
              <div className="map-ph-content">
                <Navigation size={40} style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }} />
                <h4>Live Map</h4>
                <p>Google Maps / Leaflet integration<br />will show your route here</p>
              </div>
            </div>
          </div>
        )}

        {/* Available Jobs */}
        {view === 'jobs' && (
          <div>
            <h3 className="jobs-title">Available Deliveries ({jobs.length})</h3>
            {jobs.length === 0 ? (
              <div className="card p-8 text-center">
                <Bike size={48} style={{ color: 'var(--color-gray)', margin: '0 auto 1rem' }} />
                <h4>No Jobs Right Now</h4>
                <p style={{ color: 'var(--color-gray)', marginTop: '0.5rem' }}>New delivery requests will appear here automatically.</p>
              </div>
            ) : (
              <div className="jobs-list">
                {jobs.map(job => (
                  <motion.div key={job.id} className="job-card card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="job-card-header">
                      <div>
                        <span className="job-id">{job.id}</span>
                        <h4 className="job-customer">{job.customer}</h4>
                      </div>
                      <div className="job-earn">
                        <span>+R35</span>
                        <span className="job-dist">{job.distance}</span>
                      </div>
                    </div>
                    <p className="job-address"><MapPin size={14} /> {job.address}</p>
                    <p className="job-items"><Package size={14} /> {job.items}</p>
                    <div className="job-footer">
                      <div className="job-meta">
                        <Clock size={14} /> ETA: {job.eta}
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => acceptJob(job)}>
                        Accept <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .rider-shell { background: var(--color-light); min-height: calc(100vh - 80px); }
        .rider-header {
          background: var(--color-dark);
          padding: 1.25rem 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .rider-profile { display: flex; align-items: center; gap: 1rem; }
        .rider-ava { width: 46px; height: 46px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; }
        .rider-profile strong { display: block; color: #fff; font-size: 1rem; }
        .rider-profile p { color: rgba(255,255,255,0.5); font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem; }
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
        .status-dot.active { background: #10B981; }
        .rider-header-right { display: flex; align-items: center; gap: 1rem; }
        .earnings-badge {
          display: flex; align-items: center; gap: 0.4rem;
          background: rgba(255,152,0,0.15); color: var(--color-secondary);
          padding: 0.4rem 0.9rem; border-radius: 2rem;
          font-size: 0.85rem; font-weight: 700;
        }

        .rider-content { max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem; }
        .rider-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
          background: #fff; border-radius: 1rem; padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 1.5rem;
        }
        .rider-stat-item { text-align: center; }
        .rider-stat-val { display: block; font-size: 1.4rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-dark); }
        .rider-stat-lbl { font-size: 0.72rem; color: var(--color-gray); font-weight: 600; }

        .active-job-card { padding: 1.5rem; margin-bottom: 1.5rem; }
        .active-job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .active-eta { display: flex; align-items: center; gap: 0.4rem; font-weight: 700; color: var(--color-primary); font-size: 1.1rem; }
        .mt-2 { margin-top: 0.5rem; }

        .delivery-steps { display: flex; margin-bottom: 1.75rem; align-items: flex-start; }
        .delivery-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
        .step-dot {
          width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--color-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; font-weight: 700; background: #fff; z-index: 2;
          transition: all 0.3s;
        }
        .delivery-step.done .step-dot { border-color: var(--color-primary); background: var(--color-primary); color: #fff; }
        .delivery-step.current .step-dot { border-color: var(--color-secondary); background: var(--color-secondary); color: #fff; box-shadow: 0 0 0 4px rgba(255,152,0,0.2); }
        .step-line { position: absolute; top: 16px; left: 50%; width: 100%; height: 2px; background: var(--color-border); z-index: 1; }
        .delivery-step.done .step-line { background: var(--color-primary); }
        .step-label { font-size: 0.68rem; color: var(--color-gray); margin-top: 0.4rem; text-align: center; line-height: 1.3; }
        .delivery-step.current .step-label { color: var(--color-secondary); font-weight: 700; }

        .job-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .job-detail-item { display: flex; gap: 0.6rem; align-items: flex-start; }
        .detail-icon { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }
        .detail-icon.red { color: #EF4444; }
        .job-detail-item strong { display: block; font-size: 0.8rem; font-weight: 700; }
        .job-detail-item p { font-size: 0.78rem; color: var(--color-gray); line-height: 1.5; }
        .call-link { font-size: 0.82rem; color: var(--color-primary); font-weight: 700; }

        .active-job-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .full-width { width: 100%; }
        .btn-lg { padding: 1rem; }
        .delivered-msg { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1rem; background: #D1FAE5; color: #065F46; border-radius: 0.75rem; font-weight: 700; font-size: 1.05rem; }

        .map-card { overflow: hidden; margin-bottom: 1.5rem; }
        .map-ph { height: 280px; background: #e8e8e8; background-image: radial-gradient(#ccc 1px, transparent 1px); background-size: 20px 20px; display: flex; align-items: center; justify-content: center; }
        .map-ph-content { background: #fff; border-radius: 1rem; padding: 1.5rem 2rem; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .map-ph-content h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .map-ph-content p { font-size: 0.82rem; color: var(--color-gray); line-height: 1.6; }

        .jobs-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .text-center { text-align: center; }
        .p-8 { padding: 3rem 2rem; }

        .jobs-list { display: flex; flex-direction: column; gap: 1rem; }
        .job-card { padding: 1.25rem; }
        .job-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .job-id { font-size: 0.75rem; font-weight: 700; font-family: monospace; color: var(--color-gray); }
        .job-customer { font-size: 1rem; font-weight: 700; margin-top: 0.2rem; }
        .job-earn { text-align: right; color: var(--color-success); font-weight: 800; font-size: 1.1rem; }
        .job-dist { display: block; font-size: 0.78rem; color: var(--color-gray); font-weight: 600; }
        .job-address, .job-items { display: flex; align-items: flex-start; gap: 0.4rem; font-size: 0.83rem; color: var(--color-gray); margin-bottom: 0.4rem; line-height: 1.5; }
        .job-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }
        .job-meta { display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; color: var(--color-gray); font-weight: 600; }
        .btn-sm { padding: 0.5rem 1rem; font-size: 0.85rem; }
        .badge-primary { background: var(--color-primary); color: #fff; }
      `}</style>
    </div>
  );
}
