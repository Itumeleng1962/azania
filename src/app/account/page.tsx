"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // MOCK LOGGED IN DASHBOARD
  if (isAuth) {
    return (
      <div className="account-dashboard py-10 bg-light">
        <div className="container">
          <div className="account-grid">
            {/* Sidebar */}
            <div className="account-sidebar card">
              <div className="user-profile mb-6 text-center">
                <div className="avatar mx-auto mb-3">TM</div>
                <h3 className="font-bold">Thabo M.</h3>
                <p className="text-gray text-sm">thabom@example.com</p>
              </div>
              <ul className="account-nav">
                <li className="active"><User size={18} /> My Profile</li>
                <li><ShoppingBag size={18} /> Order History</li>
                <li className="text-danger mt-10 border-t pt-4 cursor-pointer" onClick={() => setIsAuth(false)}>
                  <LogOut size={18} /> Logout
                </li>
              </ul>
            </div>

            {/* Main */}
            <div className="account-main">
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
              <div className="order-history-list">
                {[
                  { id: "AZN-12345", date: "Today, 14:30", items: "Full House Bunny Chow", amount: "R120.00", status: "Delivered" },
                  { id: "AZN-11200", date: "Oct 12, 19:00", items: "Ribs, Wings Combo", amount: "R235.00", status: "Delivered" }
                ].map((order, i) => (
                  <div key={i} className="order-history-item card mb-4 p-4 flex-between align-center">
                    <div>
                      <div className="flex align-center gap-2 mb-1">
                        <span className="font-bold">{order.id}</span>
                        <span className="badge badge-success text-xs">Delivered</span>
                      </div>
                      <p className="text-gray text-sm">{order.date}</p>
                      <p className="text-sm mt-2">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">{order.amount}</p>
                      <button className="btn btn-outline btn-sm mt-2">Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .py-10 { padding-top: 3rem; padding-bottom: 3rem; }
          .bg-light { background-color: var(--color-light); min-height: 100vh; }
          .mb-1 { margin-bottom: 0.25rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-3 { margin-bottom: 0.75rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mt-2 { margin-top: 0.5rem; }
          .mt-10 { margin-top: 2.5rem; }
          .pt-4 { padding-top: 1rem; }
          .p-4 { padding: 1rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: 700; }
          .text-gray { color: var(--color-gray); }
          .text-primary { color: var(--color-primary); }
          .text-danger { color: #ef4444; }
          .text-sm { font-size: 0.875rem; }
          .text-lg { font-size: 1.125rem; }
          .text-2xl { font-size: 1.5rem; }
          .text-xs { font-size: 0.75rem; }
          .flex { display: flex; }
          .flex-between { display: flex; justify-content: space-between; }
          .align-center { align-items: center; }
          .gap-2 { gap: 0.5rem; }
          .border-t { border-top: 1px solid var(--color-border); }
          .cursor-pointer { cursor: pointer; }
          
          .account-grid { display: grid; gap: 2rem; grid-template-columns: 1fr; }
          
          .account-sidebar { padding: 2rem; }
          .avatar { width: 80px; height: 80px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; }
          .account-nav { list-style: none; padding: 0; }
          .account-nav li { padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: 0.5rem; display: flex; align-items: center; gap: 0.75rem; transition: background 0.2s; cursor: pointer; }
          .account-nav li:hover { background: #f3f4f6; }
          .account-nav li.active { background: rgba(211,47,47,0.1); color: var(--color-primary); font-weight: 600; }
          
          .badge-success { background: #d1fae5; color: #047857; }
          .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
          
          @media (min-width: 768px) {
            .account-grid { grid-template-columns: 250px 1fr; }
          }
        `}</style>
      </div>
    );
  }

  // MOCK LOGIN / REGISTER
  return (
    <div className="auth-page py-10">
      <div className="container">
        <div className="auth-card card mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-gray">{isLogin ? 'Log in to track your order and view history.' : 'Join Azania for faster checkout.'}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsAuth(true); }}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrap">
                  <User className="input-icon" size={20} />
                  <input type="text" className="form-input with-icon" placeholder="Thabo Mokoena" required />
                </div>
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <Mail className="input-icon" size={20} />
                <input type="email" className="form-input with-icon" placeholder="thabo@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <Lock className="input-icon" size={20} />
                <input type="password" className="form-input with-icon" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary full-width btn-lg mt-6">
              {isLogin ? 'Log In' : 'Register'}
            </button>
          </form>

          <div className="auth-switch text-center mt-6 pt-6 border-t text-sm">
            <span className="text-gray">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button className="text-primary font-bold ml-2 switch-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create one' : 'Log in here'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page { min-height: calc(100vh - 80px); display: flex; align-items: center; background-color: #f9fafa; }
        .auth-card { max-width: 450px; padding: 3rem; margin: 0 auto; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-6 { margin-top: 1.5rem; }
        .pt-6 { padding-top: 1.5rem; }
        .ml-2 { margin-left: 0.5rem; }
        .text-center { text-align: center; }
        .text-3xl { font-size: 2rem; }
        .font-bold { font-weight: 700; }
        .text-gray { color: var(--color-gray); }
        .text-primary { color: var(--color-primary); }
        .text-sm { font-size: 0.875rem; }
        .border-t { border-top: 1px solid var(--color-border); }
        .full-width { width: 100%; }
        .btn-lg { padding: 1rem; font-size: 1.1rem; }
        
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .form-input.with-icon { padding-left: 3rem; }
        
        .switch-btn { background: none; border: none; cursor: pointer; text-decoration: underline; font-family: inherit; font-size: inherit; }
      `}</style>
    </div>
  );
}
