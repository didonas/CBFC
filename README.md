# Churchill Brothers FC Goa ("The Red Machines") — Official Digital Platform

> **Built on History. Driven by Passion.**  
> Official Digital Platform for Churchill Brothers Football Club Goa, 2x I-League Champions & Indian Football Titans.

---

## 🏆 Project Overview

This is a comprehensive, production-grade digital platform developed for **Churchill Brothers FC Goa** ("The Red Machines"). The platform combines an official football club portfolio, squad presentation, match center, interactive demonstration ticket booking with scannable QR passes, official merchandise megastore, supporter accounts, and a full-featured club administration dashboard.

### ⚠️ Critical Project Constraint: Demonstration Mode

> **STRICT DEMONSTRATION MODE NOTICE**  
> This platform operates in **Strict Demo Mode (`DEMO_MODE=true`)**.
> - **NO REAL FINANCIAL TRANSACTIONS:** No credit card, UPI, net banking, or external payment gateways (Stripe, Razorpay, PayPal) are integrated.
> - **SIMULATED MATCH PASSES:** All ticket bookings generate unique QR passes for digital testing and turnstile simulation. They are clearly watermarked as `DEMO ONLY — NOT VALID FOR ENTRY`.
> - **SIMULATED MERCHANDISE:** All e-commerce checkout and order status transitions are fully simulated with atomic inventory tracking.

---

## 🚀 Key Features

### 1. Public Football Club Experience
- **Cinematic Homepage:** Bold hero showcase, live next-match kickoff countdown, latest match results, breaking editorial news, featured squad stars, trophy honours cabinet, official kits showcase, and matchday photo galleries.
- **Club Heritage & Timeline (`/club`):** Detailed history from 1988 genesis as Varca Sports Club, acquisition by Churchill Alemao, honours trophy cabinet (2x I-League, 3x Durand Cup, 2x IFA Shield, 8x Goa Pro League), Fatorda Stadium fortress, and the historic "Goan Derby" rivalry with Dempo SC.
- **First-Team Squad & Profiles (`/team` & `/team/[slug]`):** Complete 26-man squad with positions (Goalkeepers, Defenders, Midfielders, Forwards), shirt numbers, nationalities, portraits, season statistics (appearances, goals, clean sheets, minutes, cards), and coaching staff.
- **Fixtures & Match Center (`/matches` & `/matches/[slug]`):** Upcoming fixture calendar in IST (Asia/Kolkata), recent completed results, goalscorers with minute-by-minute logs, ball possession and match statistics, official match reports, and ticket booking links.
- **Newsroom & Editorial (`/news` & `/news/[slug]`):** Filterable category archives (Match Reports, Club News, Interviews, Press Releases).
- **Media Gallery (`/media`):** Photography albums with interactive full-screen image lightbox.
- **Commercial Partners (`/partners`):** Principal, kit manufacturer (Nivia), and associate brand showcases.
- **Contact & Fan Support (`/contact` & `/faq`):** Margao headquarters details and simulated inquiry forms.
- **Legal Policies:** Fully drafted Privacy Policy, Terms of Service, Refund Policy, and Shipping Policy tailored to the demo club platform.

### 2. Demonstration Ticketing Module
- **Match Ticket Portal (`/tickets`):** Match listings with stadium capacity and demo seat availability.
- **Interactive Seat Selection (`/tickets/[matchId]`):** Stand categories (General Stand, East Stand, VIP Hospitality), quantity selector (1–10 seats), customer contact inputs, live inventory validation, and demo booking confirmation.
- **Digital QR Match Passes (`/tickets/confirmation/[bookingId]`):** Individual digital passes with dynamically rendered scannable QR codes (`qrcode`), seat identifiers, booking reference, and print/download capabilities.

### 3. Demonstration Merchandise Megastore
- **Product Megastore (`/shop`):** Filter by category (Home Jerseys, Away Jerseys, Training Kits, Fan Merchandise, Accessories) and sort by featured, price, or name.
- **Product Detail (`/shop/[slug]`):** Multi-angle photo gallery, size variant selector (S, M, L, XL, XXL) with live demo stock checking, interactive size guide modal, and Add to Bag feedback.
- **Shopping Bag (`/cart`):** Quantity adjustments, variant removal, subtotal calculation, simulated promotional coupon `REDMACHINES10` (10% discount), and free shipping threshold.
- **Simulated Checkout (`/checkout`):** Collects delivery address and contact details without payment card inputs.
- **Order Tracking (`/order-confirmation/[orderId]`):** Generates unique order reference (e.g., `CBFC-ORD-XXXXXX`) and displays simulated tracking stages: *Demo Placed* → *Demo Processing* → *Demo Shipped* → *Demo Delivered*.

### 4. Supporter Authentication & Account
- **Account Overview (`/account`):** One-click demo sign-in (Supporter or Super Admin), profile details, and portal shortcuts.
- **Digital Passes Archive (`/account/tickets`):** Access all previously booked match passes with QR codes.
- **Order History (`/account/orders`):** Review simulated merchandise purchases and delivery timeline receipts.
- **Profile Settings (`/account/profile`):** Edit supporter display name, phone, and contact details.

### 5. Administrative Dashboard (`/admin`)
- **Executive Overview (`/admin`):** Live telemetry for ticket bookings, available seat quotas, merchandise orders, simulated gross sales in INR, and low-stock alerts.
- **Squad Manager (`/admin/players`):** Full CRUD for first-team squad, shirt numbers, positions, and homepage spotlighting.
- **Coaching Staff (`/admin/staff`):** CRUD for technical, medical, and managerial staff.
- **Match Scheduler (`/admin/matches`):** Schedule fixtures, update full-time scores, edit match reports, and toggle gate ticket availability.
- **Ticket Categories (`/admin/tickets`):** Configure stand tiers, pricing in INR, total capacities, and gate entrances.
- **Turnstile QR Scanner (`/admin/bookings`):** Interactive barcode/QR simulator to validate ticket numbers, enforce single-entry rules, and record check-in timestamps.
- **Product Catalog (`/admin/products`):** CRUD for apparel items, pricing, compare-at prices, and promotional badges.
- **Inventory Control (`/admin/inventory`):** Adjust stock per size variant with quick restock buttons (+25 / +50 units).
- **Orders Dispatcher (`/admin/orders`):** Progress simulated order statuses (*Demo Placed* → *Processing* → *Shipped* → *Delivered* → *Cancelled*).
- **Newsroom CMS (`/admin/news`):** Compose and publish editorial stories.
- **Media CMS (`/admin/media`):** Upload and categorize photography assets.
- **Sponsors Manager (`/admin/sponsors`):** Manage commercial partner tiers and logos.
- **User Profiles (`/admin/customers`):** View registered demo accounts and role permissions.
- **Site Settings (`/admin/settings`):** Live editing of the top announcement ticker, active season title, and factory reset button.

---

## 🛠 Technology Stack

- **Framework:** Next.js 14 (App Router, React 18, TypeScript)
- **Styling:** Tailwind CSS with Churchill Brothers visual design tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **QR Code Engine:** `qrcode` canvas generator
- **Celebration Effects:** `canvas-confetti`
- **Database Architecture:** Supabase PostgreSQL Schema with full Row Level Security (RLS) migrations
- **Local Fallback:** Out-of-the-box local storage persistence layer for instantaneous evaluation without external API keys

---

## 📂 Project Directory Structure

```
c:\Users\HP\Desktop\CBFC\
├── .env.example                     # Environment variables template
├── .env.local                       # Local demo configuration
├── package.json                     # Dependencies and build scripts
├── tsconfig.json                    # TypeScript compiler options
├── tailwind.config.ts               # Brand tokens (Primary Red, Gold, Dark Surface)
├── postcss.config.js                # PostCSS configuration
├── next.config.mjs                  # Next.js configuration
├── public/
│   ├── images/
│   │   ├── club/                    # Official crest (SVG & transparent PNG)
│   │   ├── kits/                    # Extracted home & away kit photography
│   │   ├── stadiums/                # Fatorda & Tilak Maidan stadium images
│   │   ├── players/                 # First team squad portrait cards
│   │   ├── opponents/               # Opponent club crests (Dempo, Sporting, etc.)
│   │   ├── sponsors/                # Sponsor badges (Nivia, Churchill Group, etc.)
│   │   └── products/                # Merchandise kit product illustrations
├── src/
│   ├── app/
│   │   ├── (public)/                # Public club routes group
│   │   │   ├── layout.tsx           # Public header, announcement bar, footer
│   │   │   ├── page.tsx             # Cinematic Homepage
│   │   │   ├── club/page.tsx        # Club history, timeline, honours, stadium
│   │   │   ├── team/page.tsx        # Squad listing by position & search
│   │   │   ├── team/[slug]/page.tsx # Player profile & statistics
│   │   │   ├── matches/page.tsx     # Fixtures & Results tabs
│   │   │   ├── matches/[slug]/page.tsx # Match center & report
│   │   │   ├── tickets/page.tsx     # Demo ticket match listings
│   │   │   ├── tickets/[matchId]/page.tsx # Interactive seat booking flow
│   │   │   ├── tickets/checkout/page.tsx # Ticket checkout redirect
│   │   │   ├── tickets/confirmation/[bookingId]/page.tsx # QR digital passes
│   │   │   ├── shop/page.tsx        # Merchandise megastore
│   │   │   ├── shop/[slug]/page.tsx # Product details & size selector
│   │   │   ├── cart/page.tsx        # Shopping cart & coupon simulation
│   │   │   ├── checkout/page.tsx    # Simulated checkout & address form
│   │   │   ├── order-confirmation/[orderId]/page.tsx # Order tracking
│   │   │   ├── news/page.tsx        # Newsroom listing
│   │   │   ├── news/[slug]/page.tsx # Article reader
│   │   │   ├── media/page.tsx       # Photo gallery with lightbox
│   │   │   ├── partners/page.tsx    # Official sponsors showcase
│   │   │   ├── contact/page.tsx     # Club headquarters & inquiry form
│   │   │   ├── faq/page.tsx         # Supporter FAQ
│   │   │   ├── account/page.tsx     # Supporter portal overview
│   │   │   ├── account/profile/page.tsx # Supporter profile editing
│   │   │   ├── account/orders/page.tsx  # Merchandise purchase history
│   │   │   ├── account/tickets/page.tsx # Digital match pass history
│   │   │   ├── privacy/page.tsx     # Privacy policy
│   │   │   ├── terms/page.tsx       # Terms of service
│   │   │   ├── refund-policy/page.tsx # Demo refund policy
│   │   │   └── shipping-policy/page.tsx # Demo shipping policy
│   │   ├── admin/                   # Administrative portal
│   │   │   ├── layout.tsx           # Admin layout with dedicated sidebar
│   │   │   ├── page.tsx             # Overview dashboard
│   │   │   ├── players/page.tsx     # Squad CRUD management
│   │   │   ├── staff/page.tsx       # Coaching staff CRUD
│   │   │   ├── matches/page.tsx     # Fixture scheduler & scores
│   │   │   ├── tickets/page.tsx     # Ticket categories & capacities
│   │   │   ├── bookings/page.tsx    # Turnstile QR scanner simulator
│   │   │   ├── products/page.tsx    # Product catalog management
│   │   │   ├── inventory/page.tsx   # Stock control per variant
│   │   │   ├── orders/page.tsx      # Simulated order dispatcher
│   │   │   ├── news/page.tsx        # News editorial CMS
│   │   │   ├── media/page.tsx       # Photo archive CMS
│   │   │   ├── sponsors/page.tsx    # Partner management
│   │   │   ├── customers/page.tsx   # User profiles & roles
│   │   │   └── settings/page.tsx    # Announcement bar & platform settings
│   │   ├── layout.tsx               # Root layout, fonts & DemoBanner
│   │   ├── globals.css              # Custom styling & scrollbar
│   │   ├── robots.ts                # SEO robots directive
│   │   └── sitemap.ts               # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── layout/                  # SiteHeader, SiteFooter, AnnouncementBar
│   │   ├── ui/                      # ClubCrest, DemoBanner, MatchCard, ScoreCard,
│   │   │                            # PlayerCard, ProductCard, NewsCard, TicketCard, QRDemoTicket
│   │   └── admin/                   # AdminSidebar, AdminHeader, AdminStatsCard
│   ├── lib/
│   │   ├── demo-data.ts             # Official seed data from club PDF reference
│   │   ├── store.tsx                # Context provider, state mutations & local store
│   │   └── supabase.ts              # Supabase client wrapper
│   └── types/
│       └── index.ts                 # Complete TypeScript domain interfaces
└── supabase/
    └── migrations/
        └── 20261108000000_cbfc_schema.sql # Complete PostgreSQL schema & RLS policies
```

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- **Node.js:** v18.0.0 or later (Tested on Node.js v24)
- **npm:** v9.0.0 or later

### Installation Steps

1. **Clone or Open Repository:**
   ```bash
   cd c:\Users\HP\Desktop\CBFC
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

4. **Production Build & Verification:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Demo Credentials

The platform includes convenient instant role switchers at the top of every page. You may also log in manually using these preconfigured accounts:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Super Admin** | `admin@churchillbrothers.com` | `RedMachines@1988` | Full Admin Portal (`/admin`), Gate Scanner, CMS, Inventory |
| **Club Supporter** | `fan@churchillbrothers.com` | `RedMachines@1988` | Customer Account (`/account`), Ticket History, Orders |

---

## 🗄 Database Setup (Supabase PostgreSQL)

When connecting an external Supabase project:

1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase project.
3. Open `supabase/migrations/20261108000000_cbfc_schema.sql` and execute the script.
4. Copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_DEMO_MODE=true
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. If Supabase credentials are not provided, the platform automatically utilizes its high-performance built-in local persistence layer.

---

## 🚢 Deployment Instructions (Vercel)

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Ensure the Build Command is `npm run build` and Output Directory is `.next`.
4. Set Environment Variables:
   - `NEXT_PUBLIC_DEMO_MODE=true`
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
5. Click **Deploy**. The platform is fully optimized for static generation and edge delivery.

---

## 🛡 Quality Assurance & Acceptance Verification

| Requirement | Status | Notes |
|---|---|---|
| Responsive Navigation & Mobile Drawer | ✅ Verified | Tested across mobile, tablet, and desktop viewports |
| Official Club Identity & Crest | ✅ Verified | Scalable SVG & extracted transparent official crest with 2 championship stars |
| First-Team Squad (26 Players) | ✅ Verified | Filterable by position, search by name/number, individual stat pages |
| Match Schedule & Fixtures | ✅ Verified | IST (Asia/Kolkata) time display, goalscorers, possession stats, match reports |
| Interactive Demo Ticketing | ✅ Verified | Category selection, quantity limit (10), unique booking ref & scannable QR ticket |
| Admin Gate QR Scanner | ✅ Verified | Live scan simulation, single-entry check-in validation, check-in history |
| Merchandise Megastore | ✅ Verified | Sizes S–XXL, stock variant check, cart quantity update, promo discount simulation |
| Admin Operations Portal | ✅ Verified | Full CRUD for players, staff, matches, products, stock control, and CMS |
| Demo Mode Architecture | ✅ Verified | Zero real payment gateways, zero financial credentials collected, prominent disclaimers |
| Production Build | ✅ Verified | Clean compilation across all 41 routes without errors |
