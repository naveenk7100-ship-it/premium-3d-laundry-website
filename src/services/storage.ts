import {
  Customer,
  Order,
  OrderStatus,
  NotificationItem,
  TimeSlot,
  PricingConfig,
} from '@/types/database';

const DB_KEYS = {
  INITIALIZED: 'freshfold_db_initialized',
  CUSTOMERS: 'freshfold_customers',
  ORDERS: 'freshfold_orders',
  CURRENT_USER: 'freshfold_current_user',
  NOTIFICATIONS: 'freshfold_notifications',
  SLOTS: 'freshfold_slots',
  PRICING: 'freshfold_pricing',
};

// 15 Realistic Seed Customers
export const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Victoria Vance',
    email: 'victoria.vance@horizon.com',
    phone: '+1 (555) 948-2831',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    address: '428 Ocean Avenue, Penthouse 18B, Downtown',
    tier: 'Platinum',
    loyaltyPoints: 1450,
    totalOrders: 18,
    totalSpent: 980.5,
    referralCode: 'VICTORIA20',
    joinedDate: '2025-04-12',
    role: 'customer',
  },
  {
    id: 'cust-2',
    name: 'Marcus Chen',
    email: 'marcus.chen@archstudio.design',
    phone: '+1 (555) 382-7492',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    address: '1240 Parkview Blvd, Unit 5A, Midtown',
    tier: 'Gold',
    loyaltyPoints: 820,
    totalOrders: 9,
    totalSpent: 420.0,
    referralCode: 'MARCUSCH',
    joinedDate: '2025-06-18',
    role: 'customer',
  },
  {
    id: 'cust-3',
    name: 'Dr. Evelyn Martinez',
    email: 'evelyn.martinez@kensingtonmed.org',
    phone: '+1 (555) 721-9943',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    address: '89 Belmont Crest, Kensington Heights',
    tier: 'Platinum',
    loyaltyPoints: 2100,
    totalOrders: 24,
    totalSpent: 1340.0,
    referralCode: 'EVELYNCARE',
    joinedDate: '2025-01-09',
    role: 'customer',
  },
  {
    id: 'cust-4',
    name: 'Julian Sterling',
    email: 'julian@sterlingbistro.com',
    phone: '+1 (555) 843-1120',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    address: '77 Artisan Row, Arts District',
    tier: 'Gold',
    loyaltyPoints: 950,
    totalOrders: 11,
    totalSpent: 590.0,
    referralCode: 'CHEFJULIAN',
    joinedDate: '2025-07-01',
    role: 'customer',
  },
  {
    id: 'cust-5',
    name: 'Liam O’Connor',
    email: 'liam.oconnor@apexinvest.com',
    phone: '+1 (555) 619-3384',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    address: '310 Wall Street Suite 400, Financial Hub',
    tier: 'Gold',
    loyaltyPoints: 640,
    totalOrders: 7,
    totalSpent: 380.0,
    referralCode: 'LIAMOC',
    joinedDate: '2025-08-14',
    role: 'customer',
  },
  {
    id: 'cust-6',
    name: 'Sophia Patel',
    email: 'sophia@atelierpatel.fashion',
    phone: '+1 (555) 492-8812',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    address: '502 Silk Mill Lofts, Soho Quarter',
    tier: 'Platinum',
    loyaltyPoints: 1780,
    totalOrders: 16,
    totalSpent: 890.0,
    referralCode: 'SOPHIASILK',
    joinedDate: '2025-03-22',
    role: 'customer',
  },
  {
    id: 'cust-7',
    name: 'Alexander Wright',
    email: 'a.wright@moderncontemporary.art',
    phone: '+1 (555) 304-9821',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    address: '15 Gallery Promenade, Waterfront',
    tier: 'Silver',
    loyaltyPoints: 310,
    totalOrders: 3,
    totalSpent: 165.0,
    referralCode: 'ALEXART',
    joinedDate: '2025-11-04',
    role: 'customer',
  },
  {
    id: 'cust-8',
    name: 'Olivia Bennett',
    email: 'olivia@zenithai.tech',
    phone: '+1 (555) 912-4433',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    address: '600 Innovation Way, Silicon Quay',
    tier: 'Gold',
    loyaltyPoints: 720,
    totalOrders: 8,
    totalSpent: 410.0,
    referralCode: 'OLIVIAB',
    joinedDate: '2025-09-10',
    role: 'customer',
  },
  {
    id: 'cust-9',
    name: 'Daniel Kim',
    email: 'daniel.kim@skylinkair.com',
    phone: '+1 (555) 754-0012',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    address: '10 Aviation Boulevard, Metro West',
    tier: 'Silver',
    loyaltyPoints: 450,
    totalOrders: 5,
    totalSpent: 260.0,
    referralCode: 'DANKIM',
    joinedDate: '2025-10-15',
    role: 'customer',
  },
  {
    id: 'cust-10',
    name: 'Maya Sharma',
    email: 'maya.sharma@haveninteriors.com',
    phone: '+1 (555) 438-6621',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    address: '22 Cypress Lane, Westwood Hills',
    tier: 'Gold',
    loyaltyPoints: 890,
    totalOrders: 10,
    totalSpent: 520.0,
    referralCode: 'MAYAINTS',
    joinedDate: '2025-05-19',
    role: 'customer',
  },
  {
    id: 'cust-11',
    name: 'David Miller',
    email: 'david.miller@premierestates.com',
    phone: '+1 (555) 831-9045',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    address: '740 Grand Avenue, Executive District',
    tier: 'Silver',
    loyaltyPoints: 280,
    totalOrders: 4,
    totalSpent: 195.0,
    referralCode: 'DAVEPROP',
    joinedDate: '2025-11-20',
    role: 'customer',
  },
  {
    id: 'cust-12',
    name: 'Chloe Laurent',
    email: 'chloe@chloeparisienne.com',
    phone: '+1 (555) 672-3390',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    address: '9 Rue Royale Apt 3, French Concession',
    tier: 'Platinum',
    loyaltyPoints: 1620,
    totalOrders: 14,
    totalSpent: 810.0,
    referralCode: 'CHLOEFR',
    joinedDate: '2025-02-14',
    role: 'customer',
  },
  {
    id: 'cust-13',
    name: 'Ryan Cooper',
    email: 'r.cooper@mckinleyadvisory.com',
    phone: '+1 (555) 540-8877',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    address: '88 Commerce Square, 12th Floor',
    tier: 'Silver',
    loyaltyPoints: 190,
    totalOrders: 2,
    totalSpent: 110.0,
    referralCode: 'RYANCOOP',
    joinedDate: '2025-12-01',
    role: 'customer',
  },
  {
    id: 'cust-14',
    name: 'Emma Watson',
    email: 'emma.watson@biogenics.lab',
    phone: '+1 (555) 321-7788',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed29d20c?auto=format&fit=crop&w=200&q=80',
    address: '41 University Gardens, Science Park',
    tier: 'Silver',
    loyaltyPoints: 340,
    totalOrders: 3,
    totalSpent: 175.0,
    referralCode: 'EMMABIO',
    joinedDate: '2025-10-28',
    role: 'customer',
  },
  {
    id: 'cust-15',
    name: 'Admin Master',
    email: 'admin@freshfold.luxury',
    phone: '+1 (555) 000-9999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    address: 'FreshFold HQ, Clean Atelier 1, Metropolis',
    tier: 'Platinum',
    loyaltyPoints: 9999,
    totalOrders: 0,
    totalSpent: 0,
    referralCode: 'ADMINMASTER',
    joinedDate: '2025-01-01',
    role: 'admin',
  },
];

// Initial Pricing Config
export const INITIAL_PRICING: PricingConfig = {
  baseKgPrice: 2.5,
  expressFee: 12.0,
  taxRate: 0.08,
  services: [
    { id: 'wash-fold', name: 'Wash & Fold', startingPrice: '$2.50 / kg', active: true },
    { id: 'dry-cleaning', name: 'Organic Dry Cleaning', startingPrice: '$8.00 / item', active: true },
    { id: 'ironing-pressing', name: 'Steam Press & Iron', startingPrice: '$3.50 / item', active: true },
    { id: 'shoe-cleaning', name: 'Sneaker & Shoe Care', startingPrice: '$18.00 / pair', active: true },
    { id: 'curtains-home', name: 'Curtains & Bedding', startingPrice: '$15.00 / piece', active: true },
    { id: 'express-service', name: 'Express 6-Hour Rush', startingPrice: '+$12 Flat Rush', active: true },
  ],
  items: [
    { id: 'item-shirt', name: 'Business Shirt (Wash & Press)', category: 'Tops', price: 3.5, unit: 'shirt' },
    { id: 'item-blouse', name: 'Silk / Delicate Blouse', category: 'Tops', price: 6.5, unit: 'piece' },
    { id: 'item-suit', name: '2-Piece Business Suit (Dry Clean)', category: 'Suits', price: 16.0, unit: 'suit' },
    { id: 'item-blazer', name: 'Blazer / Sports Jacket', category: 'Suits', price: 9.5, unit: 'piece' },
    { id: 'item-trousers', name: 'Trousers / Dress Slacks', category: 'Bottoms', price: 5.0, unit: 'pair' },
    { id: 'item-dress', name: 'Evening / Cocktail Dress', category: 'Dresses', price: 14.0, unit: 'dress' },
    { id: 'item-coat', name: 'Heavy Wool Overcoat', category: 'Outerwear', price: 18.5, unit: 'coat' },
    { id: 'item-duvet', name: 'King / Queen Down Duvet', category: 'Home', price: 22.0, unit: 'piece' },
    { id: 'item-sneakers', name: 'Sneakers Full Deep Spa', category: 'Shoes', price: 20.0, unit: 'pair' },
    { id: 'item-curtain', name: 'Window Drapes (per panel)', category: 'Home', price: 12.0, unit: 'panel' },
  ],
};

// Initial Slots
export const INITIAL_SLOTS: TimeSlot[] = [
  { id: 'slot-m1', timeRange: '07:30 AM - 09:30 AM', period: 'Morning', capacity: 10, booked: 8, available: true },
  { id: 'slot-m2', timeRange: '09:30 AM - 11:30 AM', period: 'Morning', capacity: 12, booked: 7, available: true },
  { id: 'slot-a1', timeRange: '01:00 PM - 03:00 PM', period: 'Afternoon', capacity: 10, booked: 6, available: true },
  { id: 'slot-a2', timeRange: '03:30 PM - 05:30 PM', period: 'Afternoon', capacity: 10, booked: 9, available: true },
  { id: 'slot-e1', timeRange: '06:00 PM - 08:00 PM', period: 'Evening', capacity: 15, booked: 12, available: true },
  { id: 'slot-e2', timeRange: '08:00 PM - 09:30 PM', period: 'Evening', capacity: 8, booked: 4, available: true },
];

// Helper to generate 30 Seed Orders
function generateSeedOrders(): Order[] {
  const statuses: OrderStatus[] = [
    'Delivered', 'Delivered', 'Delivered', 'Delivered', 'Delivered',
    'Delivered', 'Delivered', 'Delivered', 'Delivered', 'Delivered',
    'Out for delivery', 'Out for delivery', 'Out for delivery', 'Out for delivery', 'Out for delivery',
    'Ironing', 'Ironing', 'Ironing', 'Ironing', 'Ironing',
    'Washing', 'Washing', 'Washing', 'Washing', 'Washing', 'Washing',
    'Picked up', 'Picked up', 'Picked up', 'Picked up',
  ];

  const drivers = [
    { name: 'Leo Vance (Electric Van #04)', phone: '+1 (555) 912-3841' },
    { name: 'Carlos Mendez (Eco Sprinter #02)', phone: '+1 (555) 749-2281' },
    { name: 'Samir Patel (CleanFleet Van #07)', phone: '+1 (555) 630-1192' },
  ];

  const services = [
    { id: 'wash-fold', name: 'Wash & Fold' },
    { id: 'dry-cleaning', name: 'Organic Dry Cleaning' },
    { id: 'ironing-pressing', name: 'Steam Press & Iron' },
    { id: 'shoe-cleaning', name: 'Sneaker Spa Restoration' },
  ];

  const payMethods: ('UPI' | 'Card' | 'COD')[] = ['UPI', 'Card', 'COD', 'Card', 'UPI'];

  const orders: Order[] = [];

  for (let i = 0; i < 30; i++) {
    const custIndex = i % (SEED_CUSTOMERS.length - 1); // exclude admin
    const customer = SEED_CUSTOMERS[custIndex];
    const status = statuses[i];
    const srv = services[i % services.length];
    const driver = drivers[i % drivers.length];
    const pMethod = payMethods[i % payMethods.length];
    const orderNum = 1000 + i;
    const dayOffset = Math.floor(i / 3);
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    const dateStr = date.toISOString().split('T')[0];

    const itemCount1 = 2 + (i % 4);
    const itemCount2 = 1 + (i % 3);

    const items = [
      {
        id: 'item-shirt',
        name: 'Business Shirt (Wash & Press)',
        category: 'Tops',
        quantity: itemCount1,
        pricePerUnit: 3.5,
        totalPrice: itemCount1 * 3.5,
      },
      {
        id: 'item-suit',
        name: '2-Piece Business Suit (Dry Clean)',
        category: 'Suits',
        quantity: itemCount2,
        pricePerUnit: 16.0,
        totalPrice: itemCount2 * 16.0,
      },
    ];

    const subtotal = items.reduce((acc, it) => acc + it.totalPrice, 0);
    const expressFee = i % 5 === 0 ? 12.0 : 0;
    const discount = i % 4 === 0 ? 5.0 : 0;
    const tax = Math.round((subtotal + expressFee - discount) * 0.08 * 100) / 100;
    const totalAmount = Math.round((subtotal + expressFee - discount + tax) * 100) / 100;

    orders.push({
      id: `FF-${orderNum}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      pickupAddress: customer.address,
      serviceId: srv.id,
      serviceName: srv.name,
      status: status,
      statusHistory: [
        { status: 'Picked up', timestamp: `${dateStr} 08:30 AM`, note: 'Hamper verified by valet driver' },
        ...(status !== 'Picked up'
          ? [{ status: 'Washing' as OrderStatus, timestamp: `${dateStr} 11:15 AM`, note: 'Hydro ozone cold cycle' }]
          : []),
        ...(status === 'Ironing' || status === 'Out for delivery' || status === 'Delivered'
          ? [{ status: 'Ironing' as OrderStatus, timestamp: `${dateStr} 03:45 PM`, note: 'Hand-pressed with Italian boiler steam' }]
          : []),
        ...(status === 'Out for delivery' || status === 'Delivered'
          ? [{ status: 'Out for delivery' as OrderStatus, timestamp: `${dateStr} 05:30 PM`, note: 'Dispatched in electric delivery van' }]
          : []),
        ...(status === 'Delivered'
          ? [{ status: 'Delivered' as OrderStatus, timestamp: `${dateStr} 07:15 PM`, note: 'Delivered to recipient door' }]
          : []),
      ],
      pickupDate: `${dateStr} (08:00 AM - 10:00 AM)`,
      pickupSlot: '08:00 AM - 10:00 AM',
      deliveryDate: `${dateStr} (06:00 PM - 08:00 PM)`,
      items: items,
      subtotal: subtotal,
      discount: discount,
      expressFee: expressFee,
      tax: tax,
      totalAmount: totalAmount,
      paymentMethod: pMethod,
      paymentStatus: status === 'Delivered' || pMethod !== 'COD' ? 'Paid' : 'Pending',
      fragrance: i % 2 === 0 ? 'Fresh Lavender' : 'Fragrance Free',
      bagTagId: `TAG-9${orderNum}`,
      driverName: driver.name,
      driverPhone: driver.phone,
      specialNotes: i % 3 === 0 ? 'No starch on shirts, please use wooden hangers' : '',
      createdAt: `${dateStr}T08:00:00Z`,
      updatedAt: `${dateStr}T18:00:00Z`,
    });
  }

  return orders;
}

// Custom Event to sync storage updates across components in the same tab
export function dispatchStorageUpdate(eventType: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('freshfold_db_update', { detail: { type: eventType } }));
  }
}

// Database Service
export const db = {
  // Initialize Database if not already done
  init() {
    if (typeof window === 'undefined') return;
    const isInit = localStorage.getItem(DB_KEYS.INITIALIZED);
    if (!isInit) {
      this.resetDatabase();
    }
  },

  resetDatabase() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DB_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(generateSeedOrders()));
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(SEED_CUSTOMERS[0])); // default to Victoria Vance
    localStorage.setItem(DB_KEYS.PRICING, JSON.stringify(INITIAL_PRICING));
    localStorage.setItem(DB_KEYS.SLOTS, JSON.stringify(INITIAL_SLOTS));
    localStorage.setItem(
      DB_KEYS.NOTIFICATIONS,
      JSON.stringify([
        {
          id: 'notif-1',
          userId: 'cust-1',
          title: 'Order Delivered Pristine! 🎉',
          message: 'Your order #FF-1000 was delivered to Penthouse 18B.',
          orderId: 'FF-1000',
          type: 'order_status',
          read: false,
          createdAt: 'Just now',
        },
        {
          id: 'notif-2',
          userId: 'cust-1',
          title: 'FreshPoints Earned! ⭐',
          message: 'You earned +120 FreshPoints on your last dry cleaning order.',
          type: 'loyalty',
          read: false,
          createdAt: '2 hours ago',
        },
        {
          id: 'notif-3',
          userId: 'cust-1',
          title: 'Upcoming Valet Pickup Reminder',
          message: 'Driver Leo Vance is scheduled to arrive tomorrow at 8:30 AM.',
          orderId: 'FF-1026',
          type: 'order_status',
          read: true,
          createdAt: 'Yesterday',
        },
      ])
    );
    localStorage.setItem(DB_KEYS.INITIALIZED, 'true');
    dispatchStorageUpdate('reset');
  },

  // Current User / Auth
  getCurrentUser(): Customer {
    if (typeof window === 'undefined') return SEED_CUSTOMERS[0];
    const userStr = localStorage.getItem(DB_KEYS.CURRENT_USER);
    if (!userStr) {
      this.init();
      return SEED_CUSTOMERS[0];
    }
    return JSON.parse(userStr);
  },

  setCurrentUser(user: Customer) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    dispatchStorageUpdate('user');
  },

  // Customers
  getCustomers(): Customer[] {
    if (typeof window === 'undefined') return SEED_CUSTOMERS;
    const str = localStorage.getItem(DB_KEYS.CUSTOMERS);
    return str ? JSON.parse(str) : SEED_CUSTOMERS;
  },

  getCustomerById(id: string): Customer | undefined {
    return this.getCustomers().find((c) => c.id === id);
  },

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getCustomers();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return null;
    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(DB_KEYS.CUSTOMERS, JSON.stringify(customers));

    // Update currentUser if same
    const cur = this.getCurrentUser();
    if (cur.id === id) {
      this.setCurrentUser(customers[index]);
    }

    dispatchStorageUpdate('customers');
    return customers[index];
  },

  // Orders
  getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    const str = localStorage.getItem(DB_KEYS.ORDERS);
    return str ? JSON.parse(str) : [];
  },

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  },

  getOrdersByCustomerId(customerId: string): Order[] {
    return this.getOrders().filter((o) => o.customerId === customerId);
  },

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'bagTagId'>): Order {
    const orders = this.getOrders();
    const orderId = `FF-${Math.floor(1000 + Math.random() * 9000)}`;
    const bagTagId = `TAG-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      bagTagId,
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        {
          status: 'Picked up',
          timestamp: 'Just now',
          note: 'Valet pickup scheduled & hamper reserved',
        },
      ],
      driverName: 'Leo Vance (Electric Van #04)',
      driverPhone: '+1 (555) 912-3841',
    };

    orders.unshift(newOrder);
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));

    // Add points to customer
    const ptsEarned = Math.floor(newOrder.totalAmount * 2);
    const customer = this.getCustomerById(newOrder.customerId);
    if (customer) {
      this.updateCustomer(customer.id, {
        loyaltyPoints: customer.loyaltyPoints + ptsEarned,
        totalOrders: customer.totalOrders + 1,
        totalSpent: Math.round((customer.totalSpent + newOrder.totalAmount) * 100) / 100,
      });
    }

    // Add notification
    this.addNotification({
      userId: newOrder.customerId,
      title: 'Order Confirmed! 🧺',
      message: `Pickup confirmed for ${newOrder.pickupDate}. Valet bag #${bagTagId}.`,
      orderId: newOrder.id,
      type: 'order_status',
    });

    dispatchStorageUpdate('orders');
    return newOrder;
  },

  updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const order = orders[index];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const today = new Date().toISOString().split('T')[0];

    const history = [...order.statusHistory];
    history.push({
      status: newStatus,
      timestamp: `${today} ${now}`,
      note: note || `Order updated to ${newStatus}`,
    });

    orders[index] = {
      ...order,
      status: newStatus,
      statusHistory: history,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));

    // Send notification to customer
    this.addNotification({
      userId: order.customerId,
      title: `Order #${order.id} is now ${newStatus}!`,
      message: note || `Your garments are progressing smoothly: ${newStatus}.`,
      orderId: order.id,
      type: 'order_status',
    });

    dispatchStorageUpdate('orders');
    return orders[index];
  },

  // Notifications
  getNotifications(userId?: string): NotificationItem[] {
    if (typeof window === 'undefined') return [];
    const str = localStorage.getItem(DB_KEYS.NOTIFICATIONS);
    const list: NotificationItem[] = str ? JSON.parse(str) : [];
    if (userId) {
      return list.filter((n) => n.userId === userId);
    }
    return list;
  },

  markNotificationRead(id: string) {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    dispatchStorageUpdate('notifications');
  },

  markAllNotificationsRead(userId: string) {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.userId === userId ? { ...n, read: true } : n));
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    dispatchStorageUpdate('notifications');
  },

  addNotification(notif: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>) {
    const list = this.getNotifications();
    const newItem: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: 'Just now',
    };
    list.unshift(newItem);
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(list));
    dispatchStorageUpdate('notifications');
  },

  // Pricing
  getPricing(): PricingConfig {
    if (typeof window === 'undefined') return INITIAL_PRICING;
    const str = localStorage.getItem(DB_KEYS.PRICING);
    return str ? JSON.parse(str) : INITIAL_PRICING;
  },

  updatePricing(newPricing: PricingConfig) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DB_KEYS.PRICING, JSON.stringify(newPricing));
    dispatchStorageUpdate('pricing');
  },

  // Slots
  getSlots(): TimeSlot[] {
    if (typeof window === 'undefined') return INITIAL_SLOTS;
    const str = localStorage.getItem(DB_KEYS.SLOTS);
    return str ? JSON.parse(str) : INITIAL_SLOTS;
  },

  updateSlot(slotId: string, updates: Partial<TimeSlot>) {
    const slots = this.getSlots();
    const index = slots.findIndex((s) => s.id === slotId);
    if (index === -1) return;
    slots[index] = { ...slots[index], ...updates };
    localStorage.setItem(DB_KEYS.SLOTS, JSON.stringify(slots));
    dispatchStorageUpdate('slots');
  },
};
