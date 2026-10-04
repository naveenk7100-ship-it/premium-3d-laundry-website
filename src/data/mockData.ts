import {
  ServiceItem,
  HowItWorksStep,
  ShopTourStop,
  PricingPlan,
  PricingItem,
  Testimonial,
  FaqItem,
  BeforeAfterPair,
} from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    tagline: 'Everyday laundry, crisply folded and scent-free or lavender infused.',
    description:
      'We sort garments by fabric and color, wash with hypoallergenic eco-detergents, gentle tumble dry, and fold with razor-sharp precision.',
    icon: 'Shirt',
    badge: 'Most Popular',
    turnaround: '24 Hours',
    startingPrice: '$2.50 / kg',
    features: ['Fabric-matched temperature', 'Hypoallergenic options', 'Crisp bundle packaging', 'Socks paired & matched'],
    color: 'from-sky-500 to-blue-600',
    accentBg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    tagline: 'Gentle organic solvent care for fine suits, silks, and delicates.',
    description:
      'Zero-PERC organic dry cleaning process that preserves fiber integrity, eliminates stubborn oils, and leaves suits smelling fresh without chemical odor.',
    icon: 'Sparkles',
    badge: 'Zero-PERC Eco',
    turnaround: '48 Hours',
    startingPrice: '$8.00 / item',
    features: ['Hand-inspected buttons', 'Organic hydrocarbon fluid', 'Custom hand finishing', 'Breathable garment bags'],
    color: 'from-blue-600 to-indigo-700',
    accentBg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300',
  },
  {
    id: 'premium-garment-care',
    title: 'Premium Garment Care',
    tagline: 'Couture hand-wash, delicate silk therapy, and artisan steam press.',
    description:
      'From executive business shirts to bespoke evening wear, our textile masters hand-press every crease to crisp symmetry on hangers or folded.',
    icon: 'Flame',
    badge: 'Artisanal Care',
    turnaround: '24-48 Hours',
    startingPrice: '$6.50 / item',
    features: ['Precision collar & cuff rolls', 'Hanger or folded delivery', 'High-pressure dry steam', 'Fabric starch customization'],
    color: 'from-cyan-500 to-teal-600',
    accentBg: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300',
  },
  {
    id: 'express-laundry',
    title: 'Express Laundry',
    tagline: 'Emergency wardrobe rescue when you need it looking immaculate today.',
    description:
      'Priority pickup, dedicated rapid cycle washing, express tunnel drying, hand press, and rush courier delivery back to your doorstep within 4-6 hours.',
    icon: 'Zap',
    badge: 'Lightning Fast',
    turnaround: '4-6 Hours',
    startingPrice: '+$12 Flat Rush',
    features: ['Dedicated express driver', 'Real-time GPS tracker', 'Same-day emergency pickup', 'Priority steam queue'],
    color: 'from-yellow-500 to-amber-600',
    accentBg: 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300',
  },
  {
    id: 'shoe-cleaning',
    title: 'Shoe Cleaning',
    tagline: 'Deep restoration, midsole unyellowing, and suede revival.',
    description:
      'Specialized footwear spa technicians clean uppers, de-grease soles, condition leather and restore suede with hydrophobic repelling shield.',
    icon: 'Footprints',
    badge: 'Specialist Spa',
    turnaround: '48-72 Hours',
    startingPrice: '$18.00 / pair',
    features: ['Midsole oxidation reversal', 'Suede nap rejuvenation', 'Antimicrobial UV treatment', 'Nano stain shield spray'],
    color: 'from-amber-500 to-orange-600',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300',
  },
  {
    id: 'blanket-curtain-cleaning',
    title: 'Blanket & Curtain Cleaning',
    tagline: 'Bulky comforters, drapes, and linens deep cleaned with dust mite removal.',
    description:
      'Super-sized high-capacity drum washers and hot sanitizing cycles guarantee total allergen neutralization for king duvets, draperies, and wool blankets.',
    icon: 'BedDouble',
    badge: 'Allergen Neutral',
    turnaround: '48 Hours',
    startingPrice: '$15.00 / piece',
    features: ['Acarid & mite elimination', 'High-loft down redistribution', 'Anti-static conditioning', 'Heavy blackout curtain care'],
    color: 'from-teal-500 to-emerald-600',
    accentBg: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300',
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Pickup',
    subtitle: 'Doorstep Valet Collection',
    description:
      'Choose your preferred 30-minute pickup slot via our website or WhatsApp. Our branded eco-courier brings personalized reusable hamper bags to your door.',
    timeframe: 'Slot: Selected by you',
    icon: 'CalendarClock',
    highlights: ['Contactless doorstep collection', 'Zero sorting needed', 'Free reusable laundry hampers'],
  },
  {
    step: 2,
    title: 'Wash',
    subtitle: 'Segregated Eco-Wash & Ozone',
    description:
      'Your clothes never mix with anyone else. Garments are barcoded, scanned for stains, and washed using microfiltered soft water and certified bio-enzymes.',
    timeframe: 'Duration: 1-2 hrs',
    icon: 'Waves',
    highlights: ['100% segregated drum loads', 'Enzymatic organic detergents', 'Reverse osmosis purified water'],
  },
  {
    step: 3,
    title: 'Dry',
    subtitle: 'Moisture-Sensing Soft Tumble',
    description:
      'Reverse-tumble drying at fiber-safe 42°C with warm air exhaust. Moisture sensors ensure zero fabric shrinkage or fiber damage.',
    timeframe: 'Duration: 45-60 mins',
    icon: 'Flame',
    highlights: ['Smart humidity sensors', 'Gentle wool-safe temperature', 'Static-free natural air fluff'],
  },
  {
    step: 4,
    title: 'Fold',
    subtitle: 'Precision Hand-Finished Stacks',
    description:
      'Garments are inspected under daylight lamps, de-linted, hand-pressed, and folded with razor-sharp alignment with zero missing socks.',
    timeframe: 'Duration: 30-45 mins',
    icon: 'ShieldCheck',
    highlights: ['Complimentary button repair', 'Infrared stain inspection', 'Ribbon-tied presentation bundles'],
  },
  {
    step: 5,
    title: 'Deliver',
    subtitle: 'Pristine Home Delivery',
    description:
      'Packed into 100% biodegradable garment bags and presentation boxes. Our electric fleet delivers right to your wardrobe at your requested hour.',
    timeframe: 'Same-day or next-day delivery',
    icon: 'Truck',
    highlights: ['Live driver GPS tracking', 'Zero-emission electric fleet', 'Signature fresh scent guarantee'],
  },
];

export const SHOP_TOUR_STOPS: ShopTourStop[] = [
  {
    id: 'reception',
    zone: 'Zone 01',
    title: 'Reception & Smart Garment Tagging',
    subtitle: 'Where every garment gets VIP digital identity',
    description:
      'Step into our boutique reception counter where garments are inspected under high-CRI color-accurate lights, barcoded with heat-seal QR tags, and cataloged for special fabric care instructions.',
    features: ['High-accuracy fabric spectrometer', 'Gentle heat-removable smart QR tags', 'Digital garment health condition report'],
    equipment: 'Miele Touch Check-In Terminals & High-CRI Optical Stations',
    ecoFeature: 'Paperless digital invoicing & tracking',
    badge: 'Point of Entry',
    imageTheme: 'modern-reception',
  },
  {
    id: 'washing',
    zone: 'Zone 02',
    title: 'Hydro-Wash & Ozone Disinfection Suite',
    subtitle: 'Hospital-grade sanitization with mountain spring purity',
    description:
      'Houses 14 heavy-duty commercial Miele honeycomb drum washers operating on closed-loop reverse osmosis water. Ozone gas injection disinfects fabrics at cold temperatures, eliminating 99.9% of bacteria.',
    features: ['Cold-water ozone sanitization', 'Patented Honeycomb drum protection', 'Automated multi-channel liquid dosing'],
    equipment: 'Miele Professional Octoplus Commercial Extractors',
    ecoFeature: 'Saves 42% water via closed-circuit filtration',
    badge: 'Hydro Lab',
    imageTheme: 'washing-drum',
  },
  {
    id: 'dry-cleaning',
    zone: 'Zone 03',
    title: 'Zero-PERC Organic Dry Clean Chamber',
    subtitle: 'No harsh chemicals. Zero odor. Absolute fiber preservation.',
    description:
      'Our sealed chamber utilizes modified hydrocarbons and liquid silicone (GreenEarth) instead of toxic perchloroethylene. Fibers retain natural lanolin, Cashmere stays whisper-soft, and suits hold crisp drape.',
    features: ['Zero toxic PERC fumes', 'Ideal for wedding gowns & leather', 'Color preservation seal'],
    equipment: 'Union K-Series Closed-Loop Organic Dry Cleaning Unit',
    ecoFeature: '100% solvent recovery & distillation in-unit',
    badge: 'Clean Room',
    imageTheme: 'dryclean-chamber',
  },
  {
    id: 'ironing',
    zone: 'Zone 04',
    title: 'Italian Boiler Steam Press & Form Finishing',
    subtitle: 'Artisanal garment shaping using 6-bar dry steam',
    description:
      'Skilled pressing artisans utilize vacuum-heated tables, pneumatic cuff/collar formers, and gentle vertical steam dollies to mold fabrics back into bespoke showroom condition without shine marks.',
    features: ['Zero fabric shine or heat scorch', 'Teflon shoe steam irons', 'Tensioning shirt mannequins'],
    equipment: 'Trevil & Barbanti High-Pressure Steam Finisher Stations',
    ecoFeature: 'Condensate heat recovery system',
    badge: 'Finishing Atelier',
    imageTheme: 'steam-press',
  },
  {
    id: 'packing',
    zone: 'Zone 05',
    title: 'Cleanroom Packaging & Fleet Dispatch',
    subtitle: 'Sterile seal, wooden hanger mounts, and dispatch dispatching',
    description:
      'Garments receive final optical scan verification, are shrouded in 100% biodegradable cornstarch garment bags or folded into rigid presentation boxes, ready for the climate-controlled electric van fleet.',
    features: ['Zero missing item optical audit', 'Biodegradable packaging film', 'Recycled cedar moth-repellent rings'],
    equipment: 'Polystar Automated Garment Bagger & Electric Fleet Dock',
    ecoFeature: '100% electric delivery vehicles & compostable bags',
    badge: 'Dispatch Port',
    imageTheme: 'packaging-bay',
  },
];

export const PRICING_PLANS_KG: PricingPlan[] = [
  {
    id: 'plan-regular',
    name: 'Standard Wash & Fold',
    subtitle: 'Perfect for weekly household loads and essentials',
    price: '$2.50',
    unit: 'per kg',
    turnaround: '24-36 hrs turnaround',
    features: [
      'Min order 5 kg ($12.50)',
      'Colors & whites segregated',
      'Gentle tumble dry & precision fold',
      'Hypoallergenic detergent included',
      'Free reusable FreshFold sack',
    ],
    bestFor: 'Weekly shirts, gym wear, towels, bedsheets',
  },
  {
    id: 'plan-premium',
    name: 'Premium Wash & Steam Press',
    subtitle: 'Everyday clothes returned on wooden hangers or luxury bundles',
    price: '$4.20',
    unit: 'per kg',
    turnaround: '24 hrs turnaround',
    popular: true,
    features: [
      'Min order 4 kg',
      'Enzymatic stain pre-treatment',
      'Hand steam pressed on hangers',
      'Lavender or Fragrance-Free mist',
      'Complimentary button tightening',
      'Priority pickup scheduling',
    ],
    bestFor: 'Work shirts, chinos, blouses, casual blazers',
  },
  {
    id: 'plan-family',
    name: 'Family Megapack Monthly',
    subtitle: 'Subscription plan with maximum savings for active homes',
    price: '$89.00',
    unit: 'per month (40 kg included)',
    turnaround: 'Unlimited free pickups',
    features: [
      '40 kg allowance rolled over',
      'Free bi-weekly scheduled pickup',
      'Includes 3 free dry-cleaned garments/mo',
      'VIP 12-hour turnaround priority',
      'Personal laundry concierge',
    ],
    bestFor: 'Families of 3-5 people & busy professionals',
  },
];

export const PRICING_ITEMS_DATA: PricingItem[] = [
  { id: 'item-shirt', category: 'Tops', name: 'Shirts', pricePerUnit: 3.5, unitLabel: 'shirt', icon: 'Shirt' },
  { id: 'item-pants', category: 'Bottoms', name: 'Pants', pricePerUnit: 4.5, unitLabel: 'pair', icon: 'Scissors' },
  { id: 'item-tshirt', category: 'Tops', name: 'T-shirts', pricePerUnit: 2.5, unitLabel: 'piece', icon: 'Shirt' },
  { id: 'item-dress', category: 'Dresses', name: 'Dresses', pricePerUnit: 7.0, unitLabel: 'dress', icon: 'Sparkles' },
  { id: 'item-bedsheets', category: 'Linens', name: 'Bedsheets', pricePerUnit: 6.0, unitLabel: 'set', icon: 'BedDouble' },
  { id: 'item-blankets', category: 'Bedding', name: 'Blankets', pricePerUnit: 9.0, unitLabel: 'piece', icon: 'Layers' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Victoria Vance',
    role: 'Managing Director, Horizon FinTech',
    location: 'Downtown Financial District',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'As someone who wears tailored Italian wool suits daily, finding FreshFold has been a godsend. No terrible chemical fumes, crisp collar rolls, and the pickup courier arrives like clockwork in their quiet electric van.',
    serviceUsed: 'Dry Cleaning & Steam Press',
    date: '3 days ago',
    verified: true,
  },
  {
    id: 't-2',
    name: 'Marcus Chen',
    role: 'Architect & Sneaker Collector',
    location: 'Marina Bay Waterfront',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'Sent in my vintage 2015 Jordan 1s that had yellowed soles and denim bleed. They came back looking straight off the showroom shelf. The attention to detail and care is unmatched in the city.',
    serviceUsed: 'Sneaker Spa Restoration',
    date: '1 week ago',
    verified: true,
  },
  {
    id: 't-3',
    name: 'Dr. Evelyn Martinez',
    role: 'Chief of Pediatrics',
    location: 'Kensington Heights',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'With two toddlers and a 60-hour hospital week, laundry was my nightmare. FreshFold family plan has given me my weekends back. Their hypoallergenic wash never irritates my baby’s sensitive skin.',
    serviceUsed: 'Wash & Fold Family Plan',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 't-4',
    name: 'Julian Sterling',
    role: 'Executive Chef',
    location: 'Arts & Cultural District',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'Chef whites get demolished by olive oil, wine reductions, and turmeric. FreshFold gets them blindingly white without destroying the cotton fibers. The 6-hour express turnaround has saved me twice before VIP dinner events.',
    serviceUsed: 'Express 6-Hour Rush',
    date: '3 weeks ago',
    verified: true,
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'How does pickup and delivery work?',
    answer:
      'Simply choose a date and 30-minute time window on our website or WhatsApp. Our branded electric van driver arrives with personalized reusable FreshFold hampers. Place your clothes inside unseparated — our facility handles all sorting, spot inspections, and packaging before returning them to your door.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Do my clothes ever get washed with other customers’ items?',
    answer:
      'Never. We practice strict 100% load segregation. Your garments are weighed, tagged with individual heat-soluble barcode QR seals, and washed in their own dedicated commercial honeycomb drums.',
  },
  {
    id: 'faq-3',
    category: 'eco',
    question: 'What makes FreshFold eco-friendly?',
    answer:
      'We operate on closed-circuit reverse osmosis water recycling, saving 42% water compared to conventional laundromats. We use 100% plant-based enzymatic detergents, zero-PERC organic dry cleaning fluids, zero plastic hanger covers (we use biodegradable cassava starch film), and an all-electric delivery fleet.',
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'What if I need my clothes done today urgently?',
    answer:
      'Select our "Express 6-Hour Rush" option at checkout. If booked before 1:00 PM, a dedicated priority driver picks up your garments immediately, routes them to our priority steam lane, and delivers them back by 7:00 PM that evening.',
  },
  {
    id: 'faq-5',
    category: 'process',
    question: 'What if a garment gets damaged or a button is missing?',
    answer:
      'Every garment undergoes high-resolution photo scanning upon check-in. If buttons are loose or missing, our in-house seamstress replaces them with matched Mother-of-Pearl or horn buttons complimentary. In the rare event of damage, our FreshFold Garment Guarantee covers up to $1,000 per garment with zero hassle.',
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'Is there a minimum order charge?',
    answer:
      'For Wash & Fold per-kg orders, our minimum pickup weight is 5 kg ($12.50). For individual dry-cleaning or shoe spa items, the minimum order value is $20. Pickups and deliveries within our metro service zone are 100% free.',
  },
];

export const BEFORE_AFTER_DATA: BeforeAfterPair[] = [
  {
    id: 'ba-wine',
    title: 'Aged Red Wine on White Silk Blouse',
    category: 'Delicate Silk',
    description: 'Stubborn Cabernet Sauvignon tannins deeply penetrated into Mulberry silk fiber.',
    stainType: 'Red Wine & Tannin',
    fabric: '100% Mulberry Silk',
    beforeDesc: 'Heavy burgundy saturation across chest & collar, dried over 24 hours.',
    afterDesc: 'Fiber restored to original crisp pearlescent white, zero fabric thinning or color bleeding.',
  },
  {
    id: 'ba-coffee',
    title: 'Espresso Spill on Cashmere Knit',
    category: 'Knitwear & Wool',
    description: 'Double shot espresso dried into loose rib knit fibers.',
    stainType: 'Oily Coffee & Cream',
    fabric: 'Pure Mongolian Cashmere',
    beforeDesc: 'Dark brown oily ring spreading over 6 inches with stiffened fibers.',
    afterDesc: 'Ultrasonic spot-lifted, reconditioned with organic wool lanolin. Soft and fluffy as day one.',
  },
  {
    id: 'ba-sneaker',
    title: 'Oxidized Soles & Mud on White Sneakers',
    category: 'Footwear Restoration',
    description: 'Severe trail mud encrustation, grass stains, and deeply yellowed translucent soles.',
    stainType: 'Clay, Grass & UV Oxidation',
    fabric: 'Primeknit & Rubber Midsole',
    beforeDesc: 'Mud caked in mesh knit, yellowed oxidized boost midsole.',
    afterDesc: 'UV de-oxidation bath returned midsoles to icy factory white with nano-waterproof shield applied.',
  },
];

export const STORE_LOCATIONS = [
  {
    name: 'Downtown Flagship Atelier',
    address: '428 Ocean Avenue, Suite 100, Metropolis',
    hours: 'Mon - Sun: 7:00 AM - 9:00 PM',
    phone: '+1 (555) 948-2831',
    status: 'Open Now',
    coordinates: 'Downtown Hub (37.7749, -122.4194)',
  },
  {
    name: 'Uptown Boutique & Express Drop',
    address: '1240 Parkview Boulevard, Midtown',
    hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    phone: '+1 (555) 382-7492',
    status: 'Open Now',
    coordinates: 'Midtown Center (37.7833, -122.4167)',
  },
];
