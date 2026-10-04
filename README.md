# 🫧 FreshFold — Premium Cinematic 3D Laundry & Valet Atelier

An immersive, award-winning interactive showroom and modern e-commerce web application for a luxury garment care and valet laundry brand. Built with **Next.js 16**, **React 19**, **Three.js**, **GSAP**, and **Framer Motion**.

Instead of a traditional flat business website, visitors physically enter and explore a realistic 3D boutique laundry atelier through a continuous, scroll-driven cinematic camera journey.

---

## 🌟 Key Features

### 1. Realistic 3D Atelier Showroom (Three.js)
- **Architectural Interior & Exterior**: Walk from the street sidewalk pavement, past modern planters and an illuminated neon signboard, through sliding glass entrance doors, and across a polished terrazzo microcement floor.
- **Physical Grounding**: Contact shadow plates beneath all heavy equipment (commercial washers, tumble dryers, folding tables, rolling brass garment racks, and courier lockers) ensure objects feel anchored to the physical room.
- **Dynamic Lighting & Reflections**: Warm 2700K spot beams, exterior streetlamp glow, amber heating elements, cyan interior wash lighting, and soft atmospheric exponential fog.

### 2. 10-Scene Cinematic Camera Choreography
Smooth Catmull-Rom 3D spline trajectory mapped seamlessly to user scroll progress:
1. **Scene 01 / Exterior Storefront**: Street dusk facade, illuminated signboard, warm ambient lights.
2. **Scene 02 / Entrance Portal**: Sliding glass doors part smoothly as the camera glides inside.
3. **Scene 03 / Reception Counter**: Fluted oak desk, Carrara marble top, POS check-in tablet, brass bell.
4. **Scene 04 / Commercial Washers**: Bank of 4 heavy-duty stainless steel front-loaders with digital LED displays.
5. **Scene 05 / Water Cycle Macro**: Direct macro zoom into the spinning drum with swirling garments, foaming bubbles, and water level physics.
6. **Scene 06 / Drying Row**: Amber infrared glow, tumbling towels, and rising warm steam exhaust mist.
7. **Scene 07 / Folding Station**: Overhead view of timber workbench; clothes smoothly animate into neat folded stacks as you reach the station.
8. **Scene 08 / Packaging Station**: Folded presentation bundles smoothly slide into open luxury craft laundry bags.
9. **Scene 09 / Dispatch Hub**: Courier parcels move into illuminated dispatch locker cubbies ready for electric fleet pickup.
10. **Scene 10 / Grand Panorama**: Elevated wide cinematic pull-back shot framing the entire warm, spotless shop.

### 3. Procedural Audio Engine (`audioEngine.ts`)
- Pure **Web Audio API** procedural sound synthesizer (zero external audio file dependencies):
  - Ambient store room presence (warm pink noise resonance).
  - Rhythmic water slosh & washer motor hum near washers.
  - Low-frequency warm air rumble near tumble dryers.
  - Crystal chime on waypoint transitions and button clicks.
  - Mute/Unmute toggle with live audio wave animations.

### 4. Interactive Customer Experience
- **Interactive Laundry Estimator**: Select quantities for Shirts, Pants, T-shirts, Dresses, Bedsheets, and Blankets with real-time total price calculation, weight estimation, and turnaround speed toggles.
- **3D Tilt Service Cards**: Wash & Fold, Dry Cleaning, Premium Garment Care, Express Laundry, Shoe Cleaning, and Blanket & Curtain Cleaning.
- **5-Stage Pipeline (`/` & `/how-it-works`)**: Pickup → Wash → Dry → Fold → Deliver.
- **End-to-End Valet Booking (`/book` & `BookingModal`)**: Multi-step wizard with validation, garment notes, time window selection, and confirmation confetti.
- **Live Garment Tracker (`/track` & `/track/[id]`)**: Real-time 6-stage telemetry timeline with simulated stage advancement.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19 + TypeScript |
| **3D Rendering** | Three.js (Procedural geometries, custom canvas textures, multi-point lighting) |
| **Camera & Scroll Motion** | GSAP, Catmull-Rom 3D Splines, ScrollTrigger |
| **Micro-Interactions** | Framer Motion (Spring animations, magnetic hover states) |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **Audio** | Web Audio API (Procedural ambient generator) |

---

## 🗺️ Application Routes

| Route | Purpose |
|---|---|
| `/` | Interactive 3D Showroom Walkthrough, Hero, Services, Estimator, Testimonials |
| `/book` | Dedicated Full-Screen Valet Booking Experience |
| `/track` | Order ID & Bag Tag Search Portal |
| `/track/[id]` | Real-time 6-Stage Garment Telemetry & Driver Status Tracker |
| `/dashboard` | Customer Account Dashboard (Orders, Rewards, Preferences) |
| `/admin` | Store Operations Console (Telemetry, Service Manager, Dispatch) |
| `/sitemap.xml` | Search Engine Sitemap |
| `/robots.txt` | Bot Crawling Directives |

---

## 🎨 One-File Client Customization

All client-specific brand information is centralized in **ONE file**:

```
src/config/brand.config.ts
```

To rebrand the entire website for a client, simply update the fields in `BRAND_CONFIG`:

```typescript
export const BRAND_CONFIG = {
  businessName: 'Your Laundry Brand Name',
  tagline: 'Fresh Clothes. Zero Effort.',
  contact: {
    phone: '+1 (800) 555-0199',
    phoneFormatted: '+1 (800) 555-0199',
    whatsapp: '+18005550199',
    whatsappLink: 'https://wa.me/18005550199',
    email: 'concierge@yourbrand.com',
  },
  location: {
    street: '123 Main Street',
    city: 'San Francisco',
    stateZip: 'CA 94105',
    full: '123 Main Street, San Francisco, CA 94105',
  },
  hours: {
    weekdays: 'Mon – Fri: 7:00 AM – 9:00 PM',
    saturday: 'Saturday: 8:00 AM – 8:00 PM',
    sunday: 'Sunday: 9:00 AM – 6:00 PM',
  },
  // ...
};
```

This single change will update:
- 3D Neon Signboard & Storefront
- Navigation Bar logo and hours
- Footer address, phone, email, and social links
- WhatsApp floating widget
- SEO metadata and `LocalBusiness` JSON-LD schema
- Booking and tracking headers

---

## 🚀 Local Development

### Prerequisites
- **Node.js** v18.0.0 or higher (v20+ recommended)
- **npm** v9+ or **pnpm** / **yarn**

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/naveenk7100-ship-it/premium-3d-laundry-website.git
cd premium-3d-laundry-website

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🚢 Deployment (Vercel)

This project is optimized for 1-click deployment on **Vercel**:

1. Push your code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `premium-3d-laundry-website` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

No environment variables are required for standard demo deployment.

---

## 📄 License & Attribution

Designed and engineered for high-performance interactive retail showrooms. Released under the MIT License.
