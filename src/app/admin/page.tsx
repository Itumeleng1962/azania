"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Users, Bike,
  TrendingUp, Bell, Settings, LogOut, ChevronRight, Plus,
  Eye, Edit2, Trash2, Check, X, Clock, Search, Filter
} from 'lucide-react';

const MOCK_ORDERS = [
  { id: "AZN-12349", customer: "Thabo M.", area: "Orange Farm", items: "Full House Bunny Chow x2", total: 240, status: "preparing", time: "2 min ago", rider: null },
  { id: "AZN-12348", customer: "Zanele K.", area: "Evaton", items: "Sticky BBQ Ribs + Cold Drink", total: 175, status: "onway", time: "15 min ago", rider: "Sipo M." },
  { id: "AZN-12347", customer: "Sipho D.", area: "Lakeside", items: "Kota Special x3", total: 240, status: "delivered", time: "32 min ago", rider: "Bongani T." },
  { id: "AZN-12346", customer: "Nomsa P.", area: "Stretford", items: "Wings & Chips Combo", total: 85, status: "pending", time: "1 min ago", rider: null },
  { id: "AZN-12345", customer: "Lerato B.", area: "Orange Farm", items: "Family Feast Combo", total: 280, status: "delivered", time: "1 hr ago", rider: "Sipho R." },
];

const MOCK_MENU = [
  { id: 1, name: "Full House Bunny Chow", category: "Bunny Chows", price: 120, sold: 214, available: true },
  { id: 2, name: "Beef Bunny Chow", category: "Bunny Chows", price: 100, sold: 189, available: true },
  { id: 3, name: "Chicken Bunny Chow", category: "Bunny Chows", price: 90, sold: 132, available: false },
  { id: 4, name: "Sticky BBQ Ribs", category: "Ribs", price: 150, sold: 98, available: true },
  { id: 5, name: "Kota Special", category: "Kota", price: 80, sold: 312, available: true },
];

const MOCK_RIDERS = [
  { id: 1, name: "Sipo Mokoena", phone: "082 111 2222", zone: "Orange Farm", status: "active", deliveries: 12 },
  { id: 2, name: "Bongani Thabethe", phone: "073 333 4444", zone: "Evaton", status: "active", deliveries: 8 },
  { id: 3, name: "Sipho Radebe", phone: "071 555 6666", zone: "Lakeside", status: "offline", deliveries: 5 },
];

const STATS = [
  { label: "Today's Revenue", value: "R4,820", icon: <TrendingUp size={22} />, color: "#D32F2F", bg: "rgba(211,47,47,0.1)", change: "+12%" },
  { label: "Total Orders", value: "38", icon: <ShoppingBag size={22} />, color: "#FF9800", bg: "rgba(255,152,0,0.1)", change: "+5 today" },
  { label: "Active Deliveries", value: "6", icon: <Bike size={22} />, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", change: "Live" },
  { label: "Pending Orders", value: "4", icon: <Clock size={22} />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", change: "Needs action" },
];

type Tab = 'dashboard' | 'orders' | 'menu' | 'riders' | 'customers';

const STATUS_MAP: Record<string, string> = {
  pending: 'status-pending',
  preparing: 'status-preparing',
  onway: 'status-onway',
  delivered: 'status-delivered',
  cancelled: 'status-cancelled',
};
const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending', preparing: 'Preparing', onway: 'On the Way', delivered: 'Delivered', cancelled: 'Cancelled',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [menuItems, setMenuItems] = useState(MOCK_MENU);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-box card">
          <div className="login-logo">
            <img src="/logo.png" alt="Azania" style={{ height: 80, borderRadius: 12, marginBottom: '1rem' }} />
          </div>
          <h1 className="text-2xl font-bold mb-1">Admin Portal</h1>
          <p className="text-gray mb-6 text-sm">Sign in to manage your restaurant</p>
          <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="admin@azaniafood.co.za"
                value={loginData.email} onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="••••••••"
                value={loginData.password} onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))} required />
            </div>
            <button type="submit" className="btn btn-primary full-width btn-lg">Sign In to Admin</button>
          </form>
          <p className="demo-hint">Demo: any email + password</p>
        </div>
        <style jsx>{`
          .admin-login { min-height: 100vh; background: #0f0f0f; display: flex; align-items: center; justify-content: center; padding: 2rem; }
          .login-box { max-width: 420px; width: 100%; padding: 2.5rem; text-align: center; }
          .text-2xl { font-size: 1.5rem; }
          .font-bold { font-weight: 700; }
          .mb-1 { margin-bottom: 0.25rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .text-sm { font-size: 0.875rem; }
          .text-gray { color: var(--color-gray); }
          .full-width { width: 100%; }
          .btn-lg { padding: 1rem; }
          .demo-hint { font-size: 0.77rem; color: #9CA3AF; margin-top: 1rem; }
        `}</style>
      </div>
    );
  }

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NAV = [
    { tab: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { tab: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { tab: 'menu', icon: <UtensilsCrossed size={20} />, label: 'Menu' },
    { tab: 'riders', icon: <Bike size={20} />, label: 'Riders' },
    { tab: 'customers', icon: <Users size={20} />, label: 'Customers' },
  ] as const;

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="Azania" style={{ height: 56, borderRadius: 8 }} />
        </div>
        <nav className="sidebar-nav-list">
          {NAV.map(item => (
            <button key={item.tab} className={`sidebar-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => setActiveTab(item.tab)}>
              {item.icon}<span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-item"><Settings size={20} /><span>Settings</span></button>
          <button className="sidebar-item text-danger" onClick={() => setIsLoggedIn(false)}>
            <LogOut size={20} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div>
            <h2 className="topbar-title">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'orders' && 'Manage Orders'}
              {activeTab === 'menu' && 'Manage Menu'}
              {activeTab === 'riders' && 'Manage Riders'}
              {activeTab === 'customers' && 'Customers'}
            </h2>
            <p className="topbar-date">{new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn"><Bell size={20} /><span className="notif-dot" /></button>
            <div className="admin-avatar">A</div>
          </div>
        </div>

        <div className="admin-content">
          {/* ===== DASHBOARD ===== */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stats */}
              <div className="stats-grid mb-8">
                {STATS.map((s, i) => (
                  <div key={i} className="stat-card" style={{ borderLeftColor: s.color }}>
                    <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                    <div>
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                      <span className="stat-change">{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="section-card mb-8">
                <div className="section-card-header">
                  <h3>Recent Orders</h3>
                  <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('orders')}>View All <ChevronRight size={16} /></button>
                </div>
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {orders.slice(0, 4).map(order => (
                        <tr key={order.id}>
                          <td><span className="order-id">{order.id}</span></td>
                          <td><strong>{order.customer}</strong><br /><span className="text-xs text-gray">{order.area}</span></td>
                          <td><span className="text-sm">{order.items}</span></td>
                          <td><strong className="text-primary">R{order.total}</strong></td>
                          <td><span className={`status-pill ${STATUS_MAP[order.status]}`}>{STATUS_LABELS[order.status]}</span></td>
                          <td>
                            <select className="status-select" value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="onway">On the Way</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Riders Status */}
              <div className="section-card">
                <div className="section-card-header">
                  <h3>Rider Status</h3>
                  <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('riders')}>Manage <ChevronRight size={16} /></button>
                </div>
                <div className="riders-list">
                  {MOCK_RIDERS.map(r => (
                    <div key={r.id} className="rider-row">
                      <div className="rider-ava">{r.name[0]}</div>
                      <div className="rider-info">
                        <strong>{r.name}</strong>
                        <span>{r.zone} · {r.deliveries} deliveries today</span>
                      </div>
                      <span className={`status-pill ${r.status === 'active' ? 'status-active' : 'status-offline'}`}>
                        {r.status === 'active' ? 'Active' : 'Offline'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== ORDERS ===== */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="table-toolbar mb-4">
                <div className="search-bar-sm">
                  <Search size={16} className="search-ico" />
                  <input type="text" placeholder="Search orders..." className="search-inp"
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <button className="btn btn-outline btn-sm"><Filter size={16} /> Filter</button>
              </div>
              <div className="section-card">
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>Area</th><th>Items</th><th>Total</th><th>Rider</th><th>Status</th><th>Time</th></tr></thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td><span className="order-id">{order.id}</span></td>
                          <td><strong>{order.customer}</strong></td>
                          <td>{order.area}</td>
                          <td><span className="text-sm">{order.items}</span></td>
                          <td><strong className="text-primary">R{order.total}</strong></td>
                          <td>{order.rider ?? <span className="text-gray text-sm">Unassigned</span>}</td>
                          <td>
                            <select className="status-select" value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="onway">On the Way</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="text-xs text-gray">{order.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== MENU ===== */}
          {activeTab === 'menu' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex-between mb-4">
                <p className="text-gray text-sm">{menuItems.length} items in menu</p>
                <button className="btn btn-primary btn-sm"><Plus size={16} /> Add Item</button>
              </div>
              <div className="section-card">
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead><tr><th>Item Name</th><th>Category</th><th>Price</th><th>Sold</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {menuItems.map(item => (
                        <tr key={item.id}>
                          <td><strong>{item.name}</strong></td>
                          <td>{item.category}</td>
                          <td><strong className="text-primary">R{item.price}</strong></td>
                          <td>{item.sold} sold</td>
                          <td>
                            <button className={`toggle-btn ${item.available ? 'available' : 'unavailable'}`}
                              onClick={() => toggleAvailability(item.id)}>
                              {item.available ? <><Check size={14} /> Available</> : <><X size={14} /> Sold Out</>}
                            </button>
                          </td>
                          <td>
                            <div className="action-btns">
                              <button className="action-btn edit"><Edit2 size={15} /></button>
                              <button className="action-btn delete"><Trash2 size={15} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== RIDERS ===== */}
          {activeTab === 'riders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex-between mb-4">
                <p className="text-gray text-sm">{MOCK_RIDERS.length} riders registered</p>
                <button className="btn btn-primary btn-sm"><Plus size={16} /> Add Rider</button>
              </div>
              <div className="section-card">
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead><tr><th>Rider</th><th>Phone</th><th>Zone</th><th>Deliveries Today</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {MOCK_RIDERS.map(r => (
                        <tr key={r.id}>
                          <td><div className="rider-cell"><div className="rider-ava sm">{r.name[0]}</div><strong>{r.name}</strong></div></td>
                          <td>{r.phone}</td>
                          <td>{r.zone}</td>
                          <td>{r.deliveries}</td>
                          <td><span className={`status-pill ${r.status === 'active' ? 'status-active' : 'status-offline'}`}>{r.status === 'active' ? 'Active' : 'Offline'}</span></td>
                          <td><div className="action-btns"><button className="action-btn edit"><Eye size={15} /></button><button className="action-btn edit"><Edit2 size={15} /></button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== CUSTOMERS ===== */}
          {activeTab === 'customers' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="section-card p-8 text-center">
                <Users size={48} className="text-gray mx-auto mb-4" />
                <h3 className="mb-2">Customer Management</h3>
                <p className="text-gray">Customer data will appear here as orders come in. Connect to your database to see live customer profiles, order history, and analytics.</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <style jsx>{`
        .admin-shell { display: flex; min-height: calc(100vh - 0px); background: #F9FAFB; }
        .admin-sidebar {
          width: 240px; background: #0f0f0f; display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0;
        }
        .sidebar-brand { padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .sidebar-nav-list { flex: 1; padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 0.2rem; }
        .sidebar-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1rem; border-radius: 0.5rem; width: 100%;
          background: transparent; border: none; cursor: pointer;
          font-size: 0.88rem; font-weight: 600; color: rgba(255,255,255,0.45);
          text-align: left; transition: all 0.2s;
        }
        .sidebar-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }
        .sidebar-item.active { background: rgba(211,47,47,0.15); color: var(--color-primary); }
        .sidebar-bottom { padding: 1rem 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 0.2rem; }
        .text-danger { color: #ef4444 !important; }
        .admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .admin-topbar {
          background: #fff; border-bottom: 1px solid var(--color-border);
          padding: 1.25rem 2rem; display: flex; justify-content: space-between;
          align-items: center; position: sticky; top: 0; z-index: 10;
        }
        .topbar-title { font-size: 1.25rem; font-weight: 800; font-family: var(--font-heading); }
        .topbar-date { font-size: 0.8rem; color: var(--color-gray); margin-top: 0.15rem; }
        .topbar-actions { display: flex; align-items: center; gap: 1rem; }
        .notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: var(--color-primary); border-radius: 50%; border: 2px solid #fff; }
        .admin-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .admin-content { flex: 1; padding: 2rem; overflow-y: auto; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .stat-card { background: #fff; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-left: 4px solid; display: flex; align-items: center; gap: 1rem; }
        .stat-icon { width: 48px; height: 48px; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-value { font-size: 1.6rem; font-weight: 800; font-family: var(--font-heading); }
        .stat-label { font-size: 0.78rem; color: var(--color-gray); font-weight: 500; }
        .stat-change { font-size: 0.72rem; color: var(--color-success); font-weight: 700; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .section-card { background: #fff; border-radius: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden; }
        .section-card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; }
        .section-card-header h3 { font-size: 1rem; font-weight: 700; }
        .order-id { font-family: monospace; font-weight: 700; font-size: 0.85rem; }
        .text-primary { color: var(--color-primary); }
        .text-gray { color: var(--color-gray); }
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.85rem; }
        .riders-list { padding: 0.5rem; }
        .rider-row { display: flex; align-items: center; gap: 1rem; padding: 0.85rem 1rem; border-radius: 0.5rem; transition: background 0.2s; }
        .rider-row:hover { background: #F9FAFB; }
        .rider-ava { width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .rider-ava.sm { width: 32px; height: 32px; font-size: 0.85rem; }
        .rider-info { flex: 1; font-size: 0.88rem; }
        .rider-info strong { display: block; font-weight: 700; }
        .rider-info span { color: var(--color-gray); font-size: 0.8rem; }
        .rider-cell { display: flex; align-items: center; gap: 0.75rem; }
        .status-select { padding: 0.3rem 0.6rem; border-radius: 0.4rem; border: 1px solid var(--color-border); font-size: 0.8rem; cursor: pointer; background: #F9FAFB; }
        .table-toolbar { display: flex; gap: 1rem; align-items: center; }
        .search-bar-sm { flex: 1; position: relative; }
        .search-ico { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--color-gray); }
        .search-inp { width: 100%; padding: 0.6rem 0.75rem 0.6rem 2.25rem; border: 1.5px solid var(--color-border); border-radius: 0.5rem; font-size: 0.9rem; }
        .search-inp:focus { outline: none; border-color: var(--color-primary); }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .toggle-btn { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.8rem; border-radius: 2rem; border: none; cursor: pointer; font-size: 0.78rem; font-weight: 700; }
        .toggle-btn.available { background: #D1FAE5; color: #065F46; }
        .toggle-btn.unavailable { background: #FEE2E2; color: #991B1B; }
        .action-btns { display: flex; gap: 0.5rem; }
        .action-btn { width: 30px; height: 30px; border-radius: 0.4rem; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .action-btn.edit { background: #EFF6FF; color: #1D4ED8; }
        .action-btn.delete { background: #FEF2F2; color: #DC2626; }
        .action-btn:hover { opacity: 0.75; }
        .p-8 { padding: 4rem 2rem; }
        .text-center { text-align: center; }
        .mx-auto { margin: 0 auto 1rem; display: block; }
        .mb-2 { margin-bottom: 0.5rem; }
        .btn-sm { padding: 0.45rem 1rem; font-size: 0.85rem; }
        @media (min-width: 1024px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px) { .admin-sidebar { display: none; } .admin-content { padding: 1rem; } }
      `}</style>
    </div>
  );
}
