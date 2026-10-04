'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RotateCw,
  FileText,
  Copy,
  Gift,
  Award,
  ChevronRight,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Calendar,
  X,
  Printer,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { db } from '@/services/storage';
import { Order, OrderStatus } from '@/types/database';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { currentUser, switchUser } = useAuth();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedReferral, setCopiedReferral] = useState(false);

  const loadData = () => {
    db.init();
    const all = db.getOrders();
    // show orders for current user or all if testing
    const userOrders = currentUser
      ? all.filter((o) => o.customerId === currentUser.id)
      : all;
    setOrders(userOrders.length > 0 ? userOrders : all.slice(0, 10));
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('freshfold_db_update', handleUpdate);
    return () => window.removeEventListener('freshfold_db_update', handleUpdate);
  }, [currentUser]);

  // Calculations
  const activeOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const completedOrders = orders.filter((o) => o.status === 'Delivered');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.bagTagId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReorder = (order: Order) => {
    // 1-Click reorder: create new order with same items
    const newOrder = db.createOrder({
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      pickupAddress: order.pickupAddress,
      serviceId: order.serviceId,
      serviceName: order.serviceName,
      status: 'Picked up',
      statusHistory: [
        {
          status: 'Picked up',
          timestamp: 'Just now',
          note: `Reordered from prior order #${order.id}`,
        },
      ],
      pickupDate: 'Tomorrow (08:00 AM - 10:00 AM)',
      pickupSlot: '08:00 AM - 10:00 AM',
      deliveryDate: 'Tomorrow (06:00 PM - 08:00 PM)',
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      expressFee: order.expressFee,
      tax: order.tax,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      paymentStatus: 'Paid',
      fragrance: order.fragrance,
      specialNotes: order.specialNotes,
    });

    showToast(`Order rebooked as #${newOrder.id}!`, 'success');
    router.push(`/track/${newOrder.id}`);
  };

  const copyReferralCode = () => {
    const code = currentUser?.referralCode || 'VICTORIA20';
    navigator.clipboard.writeText(code);
    setCopiedReferral(true);
    showToast('Referral code copied to clipboard!', 'info');
    setTimeout(() => setCopiedReferral(false), 3000);
  };

  const handleRedeemPoints = () => {
    if ((currentUser?.loyaltyPoints || 0) < 500) {
      showToast('Minimum 500 FreshPoints needed to redeem $5 voucher.', 'warning');
      return;
    }
    db.updateCustomer(currentUser!.id, {
      loyaltyPoints: currentUser!.loyaltyPoints - 500,
    });
    showToast('Redeemed 500 FreshPoints! $5 credit applied to your next laundry hamper.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Customer Header Profile & Stats */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser?.name || 'Customer'}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  {currentUser?.name || 'Victoria Vance'}
                </h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700">
                  ★ {currentUser?.tier || 'Platinum'} Atelier VIP
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentUser?.email || 'victoria.vance@horizon.com'} • {currentUser?.address}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Pickup</span>
            </Link>

            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Admin Portal →</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Active In Atelier</span>
              <Truck className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {activeOrders.length}
            </p>
            <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1 font-mono">
              Live tracking available
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Total Orders</span>
              <Package className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {orders.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              {completedOrders.length} completed pristine
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">FreshPoints Balance</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-500 font-heading">
              {currentUser?.loyaltyPoints || 1450} <span className="text-xs text-slate-400 font-sans">pts</span>
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              =${((currentUser?.loyaltyPoints || 1450) / 100).toFixed(2)} valet wallet credit
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Lifetime Valet Spent</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              ${(currentUser?.totalSpent || 980.5).toFixed(2)}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Saved ~36 hrs of chores
            </p>
          </div>
        </div>

        {/* Loyalty & Referral Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FreshPoints Loyalty Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-600/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-4 h-4" />
                <span>FreshPoints Atelier Rewards</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-heading">
                Redeem Laundry Credits
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                You earn 2 points per $1 spent. Redeem 500 points anytime for an instant $5 discount coupon on your next hamper.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Available: {currentUser?.loyaltyPoints || 1450} pts
              </span>
              <button
                onClick={handleRedeemPoints}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all"
              >
                Redeem 500 Pts ($5 Credit)
              </button>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-transparent border border-cyan-300/40 dark:border-cyan-600/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Invite Friends & Colleagues</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-heading">
                Give $20, Get $20
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Share your personal code with neighbors or office peers. When they schedule their first valet pickup, you both earn $20 laundry credit.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-cyan-400/40 font-mono font-bold text-cyan-700 dark:text-cyan-300 text-xs flex items-center justify-between">
                <span>{currentUser?.referralCode || 'VICTORIA20'}</span>
              </div>
              <button
                onClick={copyReferralCode}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedReferral ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active In-Progress Orders Alert Bar (if any) */}
        {activeOrders.length > 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-900 via-blue-950 to-slate-900 text-white border border-cyan-400/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  Active Hamper Processing ({activeOrders.length})
                </span>
              </div>
              <span className="text-xs text-slate-300 font-mono">Live Sync</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeOrders.slice(0, 2).map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">#{act.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold">
                        {act.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      {act.serviceName} • Slot: {act.pickupSlot}
                    </p>
                  </div>

                  <Link
                    href={`/track/${act.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-300 transition-colors"
                  >
                    <span>Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Order History Table & Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Garment Order History
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Inspect items, reorder identical hampers, or download receipts.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order ID or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:outline-cyan-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-cyan-500"
              >
                <option value="All">All Statuses</option>
                <option value="Picked up">Picked up</option>
                <option value="Washing">Washing</option>
                <option value="Ironing">Ironing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Order & Tag</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Items</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-slate-900 dark:text-white font-mono">
                        #{ord.id}
                      </div>
                      <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                        {ord.bagTagId}
                      </div>
                    </td>

                    <td className="py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {ord.serviceName}
                    </td>

                    <td className="py-4 text-slate-500">
                      {ord.pickupDate.split('(')[0]}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : ord.status === 'Out for delivery'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : ord.status === 'Ironing'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : ord.status === 'Washing'
                            ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>

                    <td className="py-4 text-slate-600 dark:text-slate-400">
                      {ord.items.reduce((a, b) => a + b.quantity, 0)} garments
                    </td>

                    <td className="py-4 font-bold text-slate-900 dark:text-white font-mono">
                      ${ord.totalAmount.toFixed(2)}
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/track/${ord.id}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors text-[11px] font-semibold"
                        >
                          Track
                        </Link>

                        <button
                          onClick={() => handleReorder(ord)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors text-[11px] font-semibold flex items-center gap-1"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Reorder</span>
                        </button>

                        <button
                          onClick={() => setSelectedInvoice(ord)}
                          className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                          title="View & Download Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400 italic">
                No orders found matching your search.
              </p>
            )}
          </div>
        </div>

        {/* Invoice Modal / Printable Receipt */}
        <AnimatePresence>
          {selectedInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6"
              >
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Printable Invoice Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                        FreshFold
                      </h4>
                      <p className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                        Official Tax Invoice & Receipt
                      </p>
                    </div>
                    <div className="text-right text-xs font-mono">
                      <p className="font-bold text-slate-900 dark:text-white">
                        INV-#{selectedInvoice.id}
                      </p>
                      <p className="text-slate-400">{selectedInvoice.createdAt.split('T')[0]}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Billed To:</span>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {selectedInvoice.customerName}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate">
                        {selectedInvoice.pickupAddress}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 font-semibold block">Payment:</span>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedInvoice.paymentMethod} (PAID)
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Tag: {selectedInvoice.bagTagId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                  {selectedInvoice.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span>
                        {it.quantity}x {it.name}
                      </span>
                      <span className="font-mono">${it.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-mono">${selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount Voucher:</span>
                      <span className="font-mono">-${selectedInvoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (8%):</span>
                    <span className="font-mono">${selectedInvoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-800 font-bold text-sm">
                    <span>Total Paid:</span>
                    <span className="text-xl text-cyan-600 dark:text-cyan-400 font-extrabold font-heading">
                      ${selectedInvoice.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Print button */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
