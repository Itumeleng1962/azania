"use client";
import React, { useState, useEffect } from 'react';
import { Truck, MapPin, PhoneCall, CheckCircle2, Package, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
// dynamic import of Map to avoid SSR issues
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // 0: Recieved, 1: Preparing, 2: On Way, 3: Delivered

  const steps = [
    { title: "Order Received", icon: <Package size={24} /> },
    { title: "Preparing Food", icon: <Clock size={24} /> },
    { title: "On The Way", icon: <Truck size={24} /> },
    { title: "Delivered", icon: <CheckCircle2 size={24} /> },
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if(orderNumber) setIsTracking(true);
  };

  return (
    <div className="track-page">
      <div className="track-header bg-dark">
        <div className="container text-center">
          <h1 className="page-title text-white">Live Tracking</h1>
          <p className="text-gray">Follow your order from our kitchen to your door.</p>
        </div>
      </div>

      <div className="container track-content">
        {!isTracking ? (
          <div className="track-form-card card animate-fade-in">
            <h2>Enter your Order Number</h2>
            <p className="text-gray mb-4">You can find this in your confirmation email or SMS.</p>
            <form onSubmit={handleTrack}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. AZN-12345"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary full-width">
                <Navigation size={20} /> Track My Order
              </button>
            </form>
          </div>
        ) : (
          <div className="tracking-dashboard animate-fade-in">
            <div className="tracking-info-panel">
              <div className="card tracking-status-card mb-4">
                <div className="status-header">
                  <div>
                    <h3 className="mb-2">Order {orderNumber}</h3>
                    <p className="text-primary font-bold">Estimated Time: 15 mins</p>
                  </div>
                  <div className="rider-contact">
                    <img src="https://ui-avatars.com/api/?name=Sipo+M&background=D32F2F&color=fff" alt="Rider" className="rider-avatar" />
                    <div>
                      <p className="rider-name">Sipo M.</p>
                      <button className="btn btn-outline btn-sm mt-2">
                        <PhoneCall size={16} /> Contact
                      </button>
                    </div>
                  </div>
                </div>

                <div className="timeline-container mt-6">
                  {steps.map((step, index) => {
                    const isCompleted = index <= activeStep;
                    const isActive = index === activeStep;
                    
                    return (
                      <div key={index} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                        <div className="timeline-icon-wrap">
                          <div className={`timeline-icon ${isCompleted ? 'bg-primary text-white' : 'bg-gray-100 text-gray'}`}>
                            {step.icon}
                          </div>
                          {index < steps.length - 1 && <div className={`timeline-line ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}></div>}
                        </div>
                        <p className={`timeline-title ${isActive ? 'text-primary font-bold' : ''}`}>{step.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card delivery-details mb-4">
                <h4 className="mb-4">Delivery Details</h4>
                <div className="detail-row">
                  <MapPin className="text-primary" size={20} />
                  <div>
                    <p className="font-bold">Delivery Address</p>
                    <p className="text-gray text-sm">45 Golden Highway, Orange Farm, 1841</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-container-wrapper card">
              <div className="map-placeholder bg-gray-100">
                {/* Fallback styling for Map */}
                <div className="map-fallback flex-center">
                  <Navigation size={48} className="text-primary mb-4" />
                  <h3>Live Map Will Load Here</h3>
                  <p className="text-gray text-center max-w-sm mt-2">Google Maps / Leaflet integration shows rider's live position using real-time coordinates.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .track-page { background: var(--color-light); min-height: 100vh; }
        .track-header { padding: 4rem 0; border-radius: 0 0 2rem 2rem; margin-bottom: -3rem; }
        .text-white { color: var(--color-white); }
        .text-gray { color: var(--color-gray); }
        .text-primary { color: var(--color-primary); }
        .bg-primary { background-color: var(--color-primary); }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-200 { background-color: #e5e7eb; }
        .font-bold { font-weight: 700; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-6 { margin-top: 2rem; }
        .text-sm { font-size: 0.875rem; }
        .full-width { width: 100%; }
        .flex-center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }

        .track-content {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        .track-form-card {
          max-width: 500px;
          margin: 0 auto;
          padding: 3rem;
          text-align: center;
        }

        .tracking-dashboard {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .rider-contact {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rider-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .btn-sm {
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
        }

        .timeline-container {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 25%;
          position: relative;
          z-index: 2;
        }

        .timeline-icon-wrap {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .timeline-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 0 0 4px white;
        }

        .timeline-line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 3px;
          transform: translateY(-50%);
          z-index: 1;
        }

        .timeline-title {
          margin-top: 1rem;
          font-size: 0.9rem;
          text-align: center;
          font-weight: 500;
        }

        .tracking-status-card, .delivery-details {
          padding: 2rem;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .map-container-wrapper {
          overflow: hidden;
          padding: 0;
          height: 500px;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }

        @media (min-width: 992px) {
          .tracking-dashboard {
            grid-template-columns: 1fr 1fr;
          }
          .map-container-wrapper {
            height: auto;
            min-height: 600px;
          }
        }
      `}</style>
    </div>
  );
}
