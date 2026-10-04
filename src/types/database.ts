export type OrderStatus =
  | 'Pickup'
  | 'Picked up'
  | 'Washing'
  | 'Drying'
  | 'Folding'
  | 'Ready'
  | 'Ironing'
  | 'Out for delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'COD';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupAddress: string;
  serviceId: string;
  serviceName: string;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  pickupDate: string;
  pickupSlot: string;
  deliveryDate: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  expressFee: number;
  tax: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  specialNotes?: string;
  fragrance?: string;
  bagTagId: string;
  driverName?: string;
  driverPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
  referralCode: string;
  joinedDate: string;
  role: 'customer' | 'admin';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  orderId?: string;
  type: 'order_status' | 'loyalty' | 'promo' | 'system';
  read: boolean;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  timeRange: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  capacity: number;
  booked: number;
  available: boolean;
}

export interface PricingConfig {
  baseKgPrice: number;
  expressFee: number;
  taxRate: number; // e.g. 0.08 for 8%
  services: {
    id: string;
    name: string;
    startingPrice: string;
    active: boolean;
  }[];
  items: {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
  }[];
}
