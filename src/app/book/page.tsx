'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Shirt,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  PackageCheck,
  Search,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { db } from '@/services/storage';
import { OrderItem, PaymentMethod } from '@/types/database';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

function BookPickupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'wash-fold';
  const { currentUser, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [pricingConfig, setPricingConfig] = useState(db.getPricing());
  const [timeSlots, setTimeSlots] = useState(db.getSlots());

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({
    'item-shirt': 3,
    'item-suit': 1,
  });
  const [itemSearch, setItemSearch] = useState('');

  // Form Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Victoria Vance');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+1 (555) 948-2831');
  const [customerAddress, setCustomerAddress] = useState(
    currentUser?.address || '428 Ocean Avenue, Penthouse 18B, Downtown'
  );
  const [fragrance, setFragrance] = useState('Fresh Lavender');
  const [specialNotes, setSpecialNotes] = useState('');
  const [expressRush, setExpressRush] = useState(false);

  // Calendar Date & Slot
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [selectedSlotId, setSelectedSlotId] = useState('slot-m1');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Completed Order
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerPhone(currentUser.phone);
      setCustomerAddress(currentUser.address);
    }
  }, [currentUser]);

  const updateQuantity = (itemId: string, delta: number) => {
    setItemQuantities((prev) => {
      const cur = prev[itemId] || 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [itemId]: next };
    });
  };

  // Calculations
  const selectedItemsList: OrderItem[] = pricingConfig.items
    .filter((it) => (itemQuantities[it.id] || 0) > 0)
    .map((it) => {
      const qty = itemQuantities[it.id] || 0;
      return {
        id: it.id,
        name: it.name,
        category: it.category,
        quantity: qty,
        pricePerUnit: it.price,
        totalPrice: Math.round(qty * it.price * 100) / 100,
      };
    });

  const subtotal = selectedItemsList.reduce((acc, it) => acc + it.totalPrice, 0);
  const expressFee = expressRush ? pricingConfig.expressFee : 0;
  const discount = subtotal > 30 ? 5.0 : 0; // $5 voucher automatically applied over $30
  const tax = Math.round((subtotal + expressFee - discount) * pricingConfig.taxRate * 100) / 100;
  const totalAmount = Math.max(0, Math.round((subtotal + expressFee - discount + tax) * 100) / 100);

  const selectedSlot = timeSlots.find((s) => s.id === selectedSlotId) || timeSlots[0];

  const handleNextStep = () => {
    if (step === 2 && selectedItemsList.length === 0) {
      showToast('Please add at least 1 garment to your laundry hamper', 'warning');
      return;
    }
    if (step === 3 && (!customerName || !customerAddress)) {
      showToast('Please provide your name and delivery address', 'warning');
      return;
    }
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else if (step === 5) {
      // Process Payment & Create Order
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const activeService = pricingConfig.services.find((s) => s.id === selectedService);

        const newOrder = db.createOrder({
          customerId: currentUser?.id || 'cust-1',
          customerName,
          customerEmail: currentUser?.email || 'victoria.vance@horizon.com',
          customerPhone,
          pickupAddress: customerAddress,
          serviceId: selectedService,
          serviceName: activeService?.name || 'Wash & Fold',
          status: 'Picked up',
          statusHistory: [
            {
              status: 'Picked up',
              timestamp: 'Just now',
              note: 'Valet pickup confirmed & eco-hamper reserved',
            },
          ],
          pickupDate: `${selectedDate} (${selectedSlot.timeRange})`,
          pickupSlot: selectedSlot.timeRange,
          deliveryDate: `${selectedDate} (Next Day Evening)`,
          items: selectedItemsList,
          subtotal,
          discount,
          expressFee,
          tax,
          totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
          fragrance,
          specialNotes,
        });

        setCreatedOrder(newOrder);
        setStep(6);
        showToast('Pickup successfully booked!', 'success');

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#06b6d4', '#0284c7', '#facc15', '#38bdf8'],
          });
        } catch (e) {
          // ignore
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* Wizard Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/50 border border-cyan-300/40 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Valet Doorstep Booking</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Schedule Your <span className="gradient-text-ocean">Wardrobe Pickup</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Complimentary sanitized bags brought to your door. Track live at every stage.
          </p>

          {/* Demo Mode Notice */}
          <div className="rounded-2xl p-3.5 bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300 max-w-xl mx-auto text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span>
                <strong>DEMO MODE:</strong> Bookings are simulated for client demonstration and stored in local memory. No real payment or dispatch will be triggered.
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 font-bold border border-amber-500/40 shrink-0">
              DEMO
            </span>
          </div>

          {/* Stepper Bar */}
          {step < 6 && (
            <div className="pt-4 max-w-md mx-auto">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                <span className={step >= 1 ? 'text-cyan-500 font-bold' : ''}>1. Service</span>
                <span className={step >= 2 ? 'text-cyan-500 font-bold' : ''}>2. Items</span>
                <span className={step >= 3 ? 'text-cyan-500 font-bold' : ''}>3. Address</span>
                <span className={step >= 4 ? 'text-cyan-500 font-bold' : ''}>4. Slot</span>
                <span className={step >= 5 ? 'text-cyan-500 font-bold' : ''}>5. Payment</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Step Views */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Step 1: Choose Your Primary Service
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select the specialized care required for your batch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pricingConfig.services.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      selectedService === srv.id
                        ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/50 ring-2 ring-cyan-400/50 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700 bg-slate-50/40 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                          {srv.name}
                        </span>
                        {selectedService === srv.id && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Professional studio care with daylight inspection.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex justify-between items-center text-xs">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                        {srv.startingPrice}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Items / Quantity with Live Price Calculation */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    Step 2: Add Garments to Your Hamper
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Live calculation automatically updates totals, discounts, and valet fees.
                  </p>
                </div>

                {/* Search box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search shirts, suits..."
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {pricingConfig.items
                  .filter((it) =>
                    it.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
                    it.category.toLowerCase().includes(itemSearch.toLowerCase())
                  )
                  .map((item) => {
                    const qty = itemQuantities[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          qty > 0
                            ? 'border-cyan-400/80 bg-cyan-50/50 dark:bg-cyan-950/30'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            {item.name}
                          </p>
                          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                            ${item.price.toFixed(2)} / {item.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={qty === 0}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-slate-900 dark:text-white">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Express Rush Option */}
              <div className="p-4 rounded-2xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 fill-amber-400" />
                    <span>Express 6-Hour Rush Turnaround</span>
                  </p>
                  <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                    Dedicated priority electric driver & fast-lane steam press. (+${pricingConfig.expressFee.toFixed(2)})
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={expressRush}
                  onChange={(e) => setExpressRush(e.target.checked)}
                  className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400"
                />
              </div>

              {/* Real-time Order Summary preview */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span>
                    Items: <strong>{selectedItemsList.reduce((a, b) => a + b.quantity, 0)}</strong>
                  </span>
                  <span>
                    Subtotal: <strong>${subtotal.toFixed(2)}</strong>
                  </span>
                  {discount > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      -$5.00 Auto-Discount applied!
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-slate-500 dark:text-slate-400">Total with tax: </span>
                  <span className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-heading">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Address & Care Instructions */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Step 3: Pickup Location & Fabric Details
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Our electric van courier will collect your hamper from this address.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone (for driver call & live GPS SMS)
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address & Apartment / Suite #
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                    required
                  />
                </div>
              </div>

              {/* Fragrance Options */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Signature Fabric Fragrance Finishing
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {['Fresh Lavender', 'Ocean Breeze', '100% Fragrance Free'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFragrance(f)}
                      className={`p-3 rounded-xl border text-center font-medium transition-all ${
                        fragrance === f
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Special Starch / Stain Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Red wine stain on silk collar, please use light starch on shirts and wooden hangers"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Pickup Slot Calendar */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Step 4: Select Pickup Date & Time Window
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Choose a guaranteed 2-hour valet arrival slot.
                </p>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Pickup Date
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {[0, 1, 2, 3, 4].map((offset) => {
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    const dStr = d.toISOString().split('T')[0];
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const isSelected = selectedDate === dStr;

                    return (
                      <button
                        key={dStr}
                        type="button"
                        onClick={() => setSelectedDate(dStr)}
                        className={`p-3 rounded-2xl border min-w-[90px] text-center transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-cyan-300'
                        }`}
                      >
                        <p className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                          {offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dayName}
                        </p>
                        <p className="text-sm font-bold mt-0.5">{monthDay}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Convenient Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    const spotsLeft = slot.capacity - slot.booked;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 ring-2 ring-cyan-400/50 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {slot.period}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            {spotsLeft} vans open
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-500" />
                          <span>{slot.timeRange}</span>
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Payment Mock (UPI / Card / NetBanking / COD) */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Step 5: Payment Preference & Final Review
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Mock payment gateway. Test UPI QR, instant Card, or Cash on Delivery.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'UPI' as PaymentMethod, label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                  { id: 'Card' as PaymentMethod, label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'NetBanking' as PaymentMethod, label: 'NetBanking', icon: <Banknote className="w-4 h-4" /> },
                  { id: 'COD' as PaymentMethod, label: 'Pay on Delivery', icon: <Truck className="w-4 h-4" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === m.id
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold ring-2 ring-cyan-400/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {m.icon}
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Payment Details Form */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Scan QR or Enter UPI VPA (GPay / PhonePe / Paytm)
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Simulated QR */}
                      <div className="w-24 h-24 rounded-xl bg-white p-2 border border-slate-300 flex items-center justify-center shadow-xs">
                        <QrCode className="w-20 h-20 text-slate-900" />
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          placeholder="e.g. yourname@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                        />
                        <p className="text-[11px] text-slate-400 font-mono">
                          UPI ID: freshfold@valet (Instant verification)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      Select Your Preferred Bank
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'Chase', 'Barclays', 'Citibank', 'SBI'].map(
                        (b) => (
                          <div
                            key={b}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-medium hover:border-cyan-500 cursor-pointer text-xs"
                          >
                            {b}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      Pay Cash or UPI at Doorstep upon return
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Our valet courier carries a mobile card POS terminal and QR scanner.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Total Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItemsList.length} item types):</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {expressFee > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Express 6-Hour Rush Fee:</span>
                    <span className="font-mono">+${expressFee.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Voucher Discount:</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Valet Doorstep Pickup & Delivery:</span>
                  <span className="font-bold text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Tax (8%):</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm">
                  <span>Total Due:</span>
                  <span className="text-xl text-cyan-600 dark:text-cyan-400 font-extrabold font-heading">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Screen with Animated Checkmark */}
          {step === 6 && createdOrder && (
            <div className="text-center py-6 space-y-6">
              {/* Animated Checkmark Circle */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 text-emerald-500 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </motion.div>

              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 font-mono text-xs font-bold">
                  Order #{createdOrder.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading mt-2">
                  Pickup Confirmed & Scheduled!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Assigned to <strong className="text-slate-800 dark:text-slate-200">{createdOrder.driverName}</strong>. Driver will arrive at your address with FreshFold personalized hamper sacks.
                </p>
              </div>

              {/* Order Quick Details Card */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup Slot:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {createdOrder.pickupDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hamper Bag Tag:</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                    {createdOrder.bagTagId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {createdOrder.paymentMethod} ({createdOrder.paymentStatus})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FreshPoints Earned:</span>
                  <span className="font-bold text-amber-500">
                    +{Math.floor(createdOrder.totalAmount * 2)} pts
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Link
                  href={`/track/${createdOrder.id}`}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Live Status</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                >
                  View in Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          {step < 6 && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={isProcessing}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <span>
                  {isProcessing
                    ? 'Processing Valet Order...'
                    : step === 5
                    ? `Pay & Confirm ($${totalAmount.toFixed(2)})`
                    : 'Proceed to Next Step'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookPickupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading Valet Booking...</p>
          </div>
        </div>
      }
    >
      <BookPickupContent />
    </Suspense>
  );
}
