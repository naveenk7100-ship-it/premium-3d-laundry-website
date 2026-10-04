'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Waves,
  Flame,
  CheckCircle2,
  Package,
  Phone,
  MessageCircle,
  FileText,
  RotateCw,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { db } from '@/services/storage';
import { Order, OrderStatus } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const STAGES: { status: OrderStatus; label: string; icon: any; desc: string }[] = [
  {
    status: 'Picked up',
    label: 'Pickup',
    icon: Package,
    desc: 'Valet collected clothes & barcoded with RFID tag',
  },
  {
    status: 'Washing',
    label: 'Washing',
    icon: Waves,
    desc: 'Ozone sanitized in honeycomb commercial drum',
  },
  {
    status: 'Drying',
    label: 'Drying',
    icon: Flame,
    desc: 'Moisture-sensing reverse-tumble drying at 42°C',
  },
  {
    status: 'Folding',
    label: 'Folding',
    icon: ShieldCheck,
    desc: 'Inspected under high-CRI light & precision folded',
  },
  {
    status: 'Ready',
    label: 'Ready',
    icon: Sparkles,
    desc: 'Packed in biodegradable covers & staged for dispatch',
  },
  {
    status: 'Delivered',
    label: 'Delivered',
    icon: CheckCircle2,
    desc: 'Returned pristine to doorstep by electric fleet',
  },
];

interface TrackClientViewProps {
  initialOrderId?: string;
}

export default function TrackClientView({ initialOrderId }: TrackClientViewProps) {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.id as string) || initialOrderId || '';
  const { showToast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = () => {
    db.init();
    let found = db.getOrderById(orderId);
    if (!found) {
      // Fallback to first active order or recent order
      const orders = db.getOrders();
      found = orders.find((o) => o.status !== 'Delivered') || orders[0];
    }
    setOrder(found || null);
    setLoading(false);
  };

  useEffect(() => {
    loadOrder();

    const handleUpdate = () => {
      loadOrder();
    };

    window.addEventListener('freshfold_db_update', handleUpdate);
    return () => window.removeEventListener('freshfold_db_update', handleUpdate);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-xs text-slate-500">Locating garment telemetry & RFID scan...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-heading">Order Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            We couldn’t find an order with ID #{orderId}. Check your customer dashboard or view all orders.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-semibold text-xs"
          >
            Go to Customer Dashboard
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine stage progress across 6 stages
  const getStageIndex = (st: OrderStatus): number => {
    if (st === 'Pickup' || st === 'Picked up') return 0;
    if (st === 'Washing') return 1;
    if (st === 'Drying') return 2;
    if (st === 'Folding' || st === 'Ironing') return 3;
    if (st === 'Ready' || st === 'Out for delivery') return 4;
    if (st === 'Delivered') return 5;
    return 0;
  };

  const currentStageIndex = getStageIndex(order.status);
  const progressPercent = Math.max(8, (currentStageIndex / (STAGES.length - 1)) * 100);

  // Helper to advance stage for demonstration
  const handleSimulateNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1].status;
      db.updateOrderStatus(order.id, nextStage, `Garments transitioned to ${nextStage}`);
      setOrder((prev) => (prev ? { ...prev, status: nextStage } : null));
      showToast(`Order #${order.id} updated to ${nextStage}!`, 'success');
    } else {
      showToast('Order is already marked as Delivered!', 'info');
    }
  };

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Demo Mode Notice Banner */}
        <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>
              <strong>DEMO SIMULATION:</strong> Real-time telemetry is simulated locally in browser memory. Click any stage to test transitions:
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            {STAGES.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => {
                  db.updateOrderStatus(order.id, s.status);
                  setOrder((prev) => (prev ? { ...prev, status: s.status } : null));
                  showToast(`Simulated stage: ${s.label}`, 'info');
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  currentStageIndex === idx
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top Navigation & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Tracking Order #{order.id}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800">
                  {order.bagTagId}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Service: <strong>{order.serviceName}</strong> • Placed on {order.createdAt.split('T')[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateNextStage}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Simulate Next Stage</span>
            </button>

            <button
              onClick={handleDownloadInvoice}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Invoice PDF</span>
            </button>
          </div>
        </div>

        {/* Live Animated Stepper Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                  Live Stage: {STAGES[currentStageIndex]?.label || order.status}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                Estimated Delivery: {order.deliveryDate}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400">Recipient Address:</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-xs truncate">
                {order.pickupAddress}
              </p>
            </div>
          </div>

          {/* Stepper Track */}
          <div className="relative pt-6 pb-2">
            {/* Background Line */}
            <div className="absolute top-1/2 left-8 right-8 h-2 bg-slate-200 dark:bg-slate-800 rounded-full -translate-y-1/2 hidden lg:block" />

            {/* Glowing Fill Line */}
            <motion.div
              className="absolute top-1/2 left-8 h-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 rounded-full -translate-y-1/2 hidden lg:block shadow-[0_0_12px_rgba(6,182,212,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Stepper Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {STAGES.map((stg, idx) => {
                const isPassed = currentStageIndex >= idx;
                const isCurrent = currentStageIndex === idx;
                const IconComponent = stg.icon;

                return (
                  <div
                    key={stg.status}
                    className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 text-left md:text-center"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/40 scale-110 ring-4 ring-cyan-400/40'
                          : isPassed
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <p
                        className={`text-xs font-bold font-heading ${
                          isCurrent
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : isPassed
                            ? 'text-slate-800 dark:text-slate-200'
                            : 'text-slate-400'
                        }`}
                      >
                        {stg.label}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-[150px] md:mx-auto">
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Timeline History Log */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
              Status Event Telemetry
            </h4>
            <div className="space-y-3">
              {order.statusHistory.map((hist, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {hist.status}:
                    </span>{' '}
                    <span className="text-slate-600 dark:text-slate-400">{hist.note}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px] shrink-0">
                    {hist.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Courier / Valet Info + Garment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Driver & Delivery Valet Card */}
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Assigned Valet Driver
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                Online GPS Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-300 text-xl font-bold">
                🚚
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {order.driverName || 'Leo Vance'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Electric Van • 4.9★ Rating (620+ drops)
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={`tel:${order.driverPhone || '+15559123841'}`}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-500" />
                <span>Call Driver</span>
              </a>

              <a
                href={`https://wa.me/15559482831?text=${encodeURIComponent(
                  `Hi, checking on FreshFold Order #${order.id}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Contactless delivery option enabled. Hamper bag sanitization sealed.</span>
            </div>
          </div>

          {/* Garments & Receipt Card */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Itemized Garment Manifest
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Fragrance: <strong className="text-cyan-600 dark:text-cyan-400">{order.fragrance || 'Lavender'}</strong>
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-mono font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-mono">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              {order.expressFee > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Express 6h Fee:</span>
                  <span className="font-mono">+${order.expressFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-700 font-bold">
                <span>Total Amount:</span>
                <span className="text-lg text-cyan-600 dark:text-cyan-400 font-extrabold font-heading">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
