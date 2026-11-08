-- =====================================================================
-- CHURCHILL BROTHERS FC GOA ("THE RED MACHINES")
-- DATABASE SCHEMA MIGRATION
-- Compliant with Master Specification Part 14 & 15 (Demo Mode Architecture)
-- =====================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================================
-- 1. PROFILES & ROLES
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT DEFAULT 'Margao',
    state TEXT DEFAULT 'Goa',
    postal_code TEXT,
    country TEXT DEFAULT 'India',
    is_demo_account BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_editor', 'match_manager', 'ticket_manager', 'store_manager', 'fan')),
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, role)
);

-- =====================================================================
-- 2. FOOTBALL CLUB ENTITIES
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Margao, Goa',
    capacity INTEGER NOT NULL DEFAULT 19000,
    surface TEXT DEFAULT 'Natural Grass',
    opened_year INTEGER,
    description TEXT,
    image_url TEXT,
    is_home_ground BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    shirt_number INTEGER NOT NULL,
    position TEXT NOT NULL CHECK (position IN ('Goalkeeper', 'Defender', 'Midfielder', 'Forward')),
    nationality TEXT NOT NULL,
    nationality_code TEXT NOT NULL DEFAULT 'IND',
    date_of_birth DATE,
    height_cm INTEGER,
    portrait_url TEXT,
    bio TEXT,
    previous_clubs TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_seasons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    season TEXT NOT NULL,
    appearances INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    clean_sheets INTEGER DEFAULT 0,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    minutes_played INTEGER DEFAULT 0,
    UNIQUE(player_id, season)
);

CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Technical', 'Medical', 'Management')),
    nationality TEXT DEFAULT 'India',
    bio TEXT,
    portrait_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    competition TEXT NOT NULL,
    season TEXT NOT NULL DEFAULT '2026-27',
    matchday INTEGER,
    opponent_name TEXT NOT NULL,
    opponent_crest_url TEXT,
    is_home_match BOOLEAN DEFAULT true,
    venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
    venue_name TEXT NOT NULL DEFAULT 'Fatorda Stadium, Margao',
    match_date TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'postponed', 'cancelled')),
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    attendance INTEGER,
    referee TEXT,
    match_report TEXT,
    goalscorers JSONB DEFAULT '[]'::jsonb,
    lineup JSONB DEFAULT '{}'::jsonb,
    is_tickets_available BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('Principal', 'Kit Manufacturer', 'Official Partner', 'Associate Partner')),
    logo_url TEXT NOT NULL,
    website_url TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 3. TICKETING (DEMO MODE COMPLIANT)
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.ticket_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price_inr INTEGER NOT NULL,
    demo_capacity INTEGER NOT NULL DEFAULT 500,
    demo_available INTEGER NOT NULL DEFAULT 500,
    gate_entry TEXT DEFAULT 'Gate 1-3',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    ticket_category_id UUID NOT NULL REFERENCES public.ticket_categories(id),
    ticket_category_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0 AND quantity <= 10),
    unit_price_inr INTEGER NOT NULL,
    total_amount_inr INTEGER NOT NULL,
    booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'refunded_demo')),
    is_demo_booking BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT UNIQUE NOT NULL,
    booking_id UUID NOT NULL REFERENCES public.demo_bookings(id) ON DELETE CASCADE,
    seat_identifier TEXT NOT NULL,
    qr_code_data TEXT NOT NULL,
    ticket_status TEXT NOT NULL DEFAULT 'valid_demo' CHECK (ticket_status IN ('valid_demo', 'checked_in', 'cancelled')),
    checked_in_at TIMESTAMPTZ,
    checked_in_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.demo_tickets(id) ON DELETE CASCADE,
    scanned_at TIMESTAMPTZ DEFAULT NOW(),
    scanner_operator TEXT NOT NULL,
    scan_result TEXT NOT NULL,
    notes TEXT
);

-- =====================================================================
-- 4. MERCHANDISE E-COMMERCE (DEMO MODE COMPLIANT)
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price_inr INTEGER NOT NULL,
    compare_at_price_inr INTEGER,
    featured_image_url TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    size TEXT NOT NULL,
    color TEXT DEFAULT 'Red',
    demo_stock_quantity INTEGER NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, variant_id)
);

CREATE TABLE IF NOT EXISTS public.demo_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_reference TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address_line1 TEXT NOT NULL,
    shipping_address_line2 TEXT,
    shipping_city TEXT NOT NULL,
    shipping_state TEXT NOT NULL DEFAULT 'Goa',
    shipping_postal_code TEXT NOT NULL,
    shipping_country TEXT NOT NULL DEFAULT 'India',
    subtotal_inr INTEGER NOT NULL,
    discount_inr INTEGER DEFAULT 0,
    shipping_inr INTEGER DEFAULT 0,
    total_inr INTEGER NOT NULL,
    simulated_status TEXT NOT NULL DEFAULT 'Demo Placed' CHECK (
        simulated_status IN ('Demo Placed', 'Demo Processing', 'Demo Shipped', 'Demo Delivered', 'Demo Cancelled')
    ),
    is_simulated_order BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.demo_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id),
    product_name TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_inr INTEGER NOT NULL,
    total_price_inr INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.demo_order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.demo_orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 5. CONTENT MANAGEMENT & NEWS
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.post_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.post_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image_url TEXT NOT NULL,
    author_name TEXT DEFAULT 'Churchill Brothers Media Team',
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Matchday', 'Training', 'Kit Launch', 'Club Heritage', 'Events')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    match_id UUID REFERENCES public.matches(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_percentage INTEGER CHECK (discount_percentage > 0 AND discount_percentage <= 100),
    discount_amount_inr INTEGER,
    min_order_amount_inr INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    actor_email TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read permissions on public entities
CREATE POLICY "Public read active venues" ON public.venues FOR SELECT USING (true);
CREATE POLICY "Public read active players" ON public.players FOR SELECT USING (is_active = true);
CREATE POLICY "Public read player seasons" ON public.player_seasons FOR SELECT USING (true);
CREATE POLICY "Public read staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Public read matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Public read sponsors" ON public.sponsors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read ticket categories" ON public.ticket_categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public read product categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read post categories" ON public.post_categories FOR SELECT USING (true);
CREATE POLICY "Public read media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read coupons" ON public.coupons FOR SELECT USING (is_active = true);

-- User private permissions
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "Users can view own bookings" ON public.demo_bookings FOR SELECT USING (auth.uid() = (SELECT auth_user_id FROM public.profiles WHERE id = profile_id));
CREATE POLICY "Users can view own orders" ON public.demo_orders FOR SELECT USING (auth.uid() = (SELECT auth_user_id FROM public.profiles WHERE id = profile_id));
CREATE POLICY "Anyone can create demo booking" ON public.demo_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create demo order" ON public.demo_orders FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_slug ON public.players(slug);
CREATE INDEX IF NOT EXISTS idx_matches_date ON public.matches(match_date);
CREATE INDEX IF NOT EXISTS idx_matches_slug ON public.matches(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.demo_bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_orders_ref ON public.demo_orders(order_reference);
CREATE INDEX IF NOT EXISTS idx_tickets_number ON public.demo_tickets(ticket_number);
