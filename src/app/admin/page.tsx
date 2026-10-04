'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Calendar,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RotateCw,
  Edit2,
  Save,
  Check,
  Eye,
  X,
  Truck,
  Sparkles,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { db } from '@/services/storage';
import { Order, Customer, OrderStatus, TimeSlot, PricingConfig } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { showToast } = useToast();
  const { currentUser, switchUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'customers' | 'pricing' | 'slots'>('analytics');

  // Database States
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pricing, setPricing] = useState<PricingConfig>(db.getPricing());
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  // Filters & Selected State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Editable pricing temporary state
  const [editablePricing, setEditablePricing] = useState<PricingConfig>(pricing);

  const loadData = () => {
    db.init();
    setOrders(db.getOrders());
    setCustomers(db.getCustomers());
    const p = db.getPricing();
    setPricing(p);
    setEditablePricing(p);
    setSlots(db.getSlots());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('freshfold_db_update', handleUpdate);
    return () => window.removeEventListener('freshfold_db_update', handleUpdate);
  }, []);

  // Update order status live
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    db.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} moved to ${newStatus}. Live tracking synced.`, 'success');
  };

  // Save pricing changes
  const handleSavePricing = () => {
    db.updatePricing(editablePricing);
    setPricing(editablePricing);
    showToast('Pricing and service tariffs updated across atelier!', 'success');
  };

  // Toggle slot availability
  const handleToggleSlot = (slotId: string, currentAvail: boolean) => {
    db.updateSlot(slotId, { available: !currentAvail });
    showToast(`Slot capacity ${!currentAvail ? 'opened' : 'closed'}.`, 'info');
  };

  // Analytics Computations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
  const avgOrderValue = totalRevenue / Math.max(1, orders.length);

  // Recharts Mock Datasets based on live orders
  const dailyOrdersData = [
    { day: 'Mon', orders: 4, revenue: 165 },
    { day: 'Tue', orders: 6, revenue: 280 },
    { day: 'Wed', orders: 8, revenue: 390 },
    { day: 'Thu', orders: 5, revenue: 240 },
    { day: 'Fri', orders: 9, revenue: 460 },
    { day: 'Sat', orders: 12, revenue: 610 },
    { day: 'Sun', orders: 7, revenue: 350 },
  ];

  const serviceSplitData = [
    { name: 'Wash & Fold', value: 42, color: '#0ea5e9' },
    { name: 'Dry Cleaning', value: 28, color: '#2563eb' },
    { name: 'Steam Press', value: 18, color: '#06b6d4' },
    { name: 'Sneaker Spa', value: 12, color: '#f59e0b' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.bagTagId.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.tier.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                FF
              </span>
              <div>
                <h1 className="text-base font-bold font-heading text-white">
                  FreshFold Command Studio
                </h1>
                <p className="text-[10px] text-cyan-400 font-mono">
                  METRO VALET OPERATIONS
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                db.resetDatabase();
                showToast('Reset database to 30 seed orders & 15 customers!', 'info');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reset 30 Orders</span>
            </button>

            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-xs transition-colors"
            >
              Customer View →
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pt-1">
          {[
            { id: 'analytics', label: 'Overview & Charts', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <Package className="w-3.5 h-3.5" /> },
            { id: 'customers', label: `Customers (${customers.length})`, icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'pricing', label: 'Pricing & Tariffs', icon: <DollarSign className="w-3.5 h-3.5" /> },
            { id: 'slots', label: 'Slot Capacities', icon: <Calendar className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 sm:p-8 flex-1 max-w-7xl mx-auto w-full space-y-8">
        {/* TAB 1: Analytics & Charts (Recharts) */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Total Studio Revenue</span>
                <p className="text-2xl font-extrabold text-white mt-1 font-heading">
                  ${totalRevenue.toFixed(2)}
                </p>
                <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                  ↑ +18.4% this week
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Active In-Flight Orders</span>
                <p className="text-2xl font-extrabold text-cyan-400 mt-1 font-heading">
                  {activeOrdersCount}
                </p>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                  Across 5 studio zones
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Delivered Pristine</span>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1 font-heading">
                  {completedOrdersCount}
                </p>
                <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                  100% on-time guarantee
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Average Order Value</span>
                <p className="text-2xl font-extrabold text-amber-400 mt-1 font-heading">
                  ${avgOrderValue.toFixed(2)}
                </p>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                  ~3.2 garments per basket
                </span>
              </div>
            </div>

            {/* Charts Row: Orders Trend (Area) + Revenue (Bar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Daily Orders AreaChart */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">
                      Daily Orders & Valet Pickup Volume
                    </h3>
                    <p className="text-xs text-slate-400">
                      Weekly dispatch trends across Metro zone
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                    Live Week
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyOrdersData}>
                      <defs>
                        <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '12px',
                          fontSize: '12px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#orderGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Distribution PieChart */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Service Share Split
                  </h3>
                  <p className="text-xs text-slate-400">
                    Garment treatment mix
                  </p>
                </div>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceSplitData}
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {serviceSplitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '12px',
                          fontSize: '11px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800">
                  {serviceSplitData.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-300">{s.name} ({s.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Orders Management with live status update dropdown */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">
                  Order Management Table
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update any status below — it instantly syncs to the customer tracking view and triggers notifications!
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, tag..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-cyan-500"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-cyan-500"
                >
                  <option value="All">All Statuses ({orders.length})</option>
                  <option value="Picked up">Picked up</option>
                  <option value="Washing">Washing</option>
                  <option value="Ironing">Ironing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider bg-slate-950/60">
                      <th className="py-3.5 px-4 font-semibold">Order / Tag</th>
                      <th className="py-3.5 px-4 font-semibold">Customer</th>
                      <th className="py-3.5 px-4 font-semibold">Service</th>
                      <th className="py-3.5 px-4 font-semibold">Status (Dropdown)</th>
                      <th className="py-3.5 px-4 font-semibold">Pickup Slot</th>
                      <th className="py-3.5 px-4 font-semibold">Amount</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-850/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-white">#{ord.id}</span>
                          <span className="block text-[10px] text-cyan-400 font-mono">{ord.bagTagId}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-200 block">{ord.customerName}</span>
                          <span className="text-[10px] text-slate-400">{ord.customerPhone}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {ord.serviceName}
                        </td>

                        {/* Interactive Status Update Dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border font-mono transition-colors cursor-pointer ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : ord.status === 'Out for delivery'
                                ? 'bg-sky-950 text-sky-300 border-sky-700'
                                : ord.status === 'Ironing'
                                ? 'bg-purple-950 text-purple-300 border-purple-700'
                                : ord.status === 'Washing'
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                                : 'bg-amber-950 text-amber-300 border-amber-700'
                            }`}
                          >
                            <option value="Picked up">Picked up</option>
                            <option value="Washing">Washing</option>
                            <option value="Ironing">Ironing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {ord.pickupSlot}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          ${ord.totalAmount.toFixed(2)}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                            >
                              Details
                            </button>
                            <Link
                              href={`/track/${ord.id}`}
                              className="p-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 transition-colors"
                              title="Customer live view"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Customers List (15 Seeded Customers) */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">
                  Customer Directory ({customers.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  15 verified atelier client profiles with order counts, lifetime spent, and loyalty tier.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search customer name..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((cust) => (
                <div
                  key={cust.id}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-400/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{cust.name}</h4>
                        <p className="text-[11px] text-slate-400">{cust.email}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        cust.tier === 'Platinum'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700'
                          : cust.tier === 'Gold'
                          ? 'bg-yellow-950 text-yellow-300 border border-yellow-700'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {cust.tier}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed truncate">
                    📍 {cust.address}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Orders</span>
                      <span className="font-bold text-white">{cust.totalOrders}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Points</span>
                      <span className="font-bold text-amber-400">{cust.loyaltyPoints}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Spent</span>
                      <span className="font-bold text-emerald-400">${cust.totalSpent.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Pricing Management */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">
                  Pricing & Service Tariffs
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update per-kg base rates and item prices. Reflects instantly in customer booking calculator.
                </p>
              </div>

              <button
                onClick={handleSavePricing}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Tariff Changes</span>
              </button>
            </div>

            {/* Base Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-400">
                  Base Wash & Fold ($ / kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editablePricing.baseKgPrice}
                  onChange={(e) =>
                    setEditablePricing({
                      ...editablePricing,
                      baseKgPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-cyan-500"
                />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-400">
                  Express 6-Hour Rush Surcharge ($)
                </label>
                <input
                  type="number"
                  step="1"
                  value={editablePricing.expressFee}
                  onChange={(e) =>
                    setEditablePricing({
                      ...editablePricing,
                      expressFee: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-cyan-500"
                />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-400">
                  Standard Tax Rate (0.08 = 8%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editablePricing.taxRate}
                  onChange={(e) =>
                    setEditablePricing({
                      ...editablePricing,
                      taxRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-cyan-500"
                />
              </div>
            </div>

            {/* Itemized Price Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white font-heading">
                Garment Item Menu Prices
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editablePricing.items.map((it, idx) => (
                  <div
                    key={it.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-200">{it.name}</p>
                      <span className="text-[10px] text-slate-500">{it.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">$</span>
                      <input
                        type="number"
                        step="0.5"
                        value={it.price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const newItems = [...editablePricing.items];
                          newItems[idx] = { ...newItems[idx], price: val };
                          setEditablePricing({ ...editablePricing, items: newItems });
                        }}
                        className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-right font-mono font-bold text-cyan-400 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Slot Capacity Management */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-white">
                Valet Pickup Slot Capacities
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitor electric courier capacity across morning, afternoon, and evening cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {slots.map((slot) => {
                const percent = Math.round((slot.booked / slot.capacity) * 100);

                return (
                  <div
                    key={slot.id}
                    className={`p-6 rounded-3xl border transition-all space-y-4 ${
                      slot.available
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-slate-900/40 border-rose-900/40 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                        {slot.period}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          slot.available
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {slot.available ? 'Active' : 'Closed'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white font-mono">
                        {slot.timeRange}
                      </h4>
                      <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                        <span>Booked Vans:</span>
                        <span className="font-mono text-white">
                          {slot.booked} / {slot.capacity} ({percent}%)
                        </span>
                      </div>

                      {/* Capacity progress */}
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-full rounded-full ${
                            percent > 80 ? 'bg-amber-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleSlot(slot.id, slot.available)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors ${
                        slot.available
                          ? 'bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-200'
                          : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                      }`}
                    >
                      {slot.available ? 'Close This Slot' : 'Reopen Slot'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal: Order Details */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-800 shadow-2xl relative space-y-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-lg">
                  #{selectedOrder.id}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {selectedOrder.bagTagId}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p>
                  <strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.pickupAddress}
                </p>
                <p>
                  <strong>Service:</strong> {selectedOrder.serviceName}
                </p>
                <p>
                  <strong>Slot:</strong> {selectedOrder.pickupSlot}
                </p>
                <p>
                  <strong>Fragrance:</strong> {selectedOrder.fragrance}
                </p>
                {selectedOrder.specialNotes && (
                  <p className="text-amber-300">
                    <strong>Notes:</strong> {selectedOrder.specialNotes}
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-800">
                    <span>
                      {it.quantity}x {it.name}
                    </span>
                    <span className="font-mono text-cyan-400">${it.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                <span className="font-bold text-white text-sm">Total Paid:</span>
                <span className="text-xl font-bold text-cyan-400 font-mono">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href={`/track/${selectedOrder.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center"
                >
                  Open Live Tracking Page
                </Link>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
