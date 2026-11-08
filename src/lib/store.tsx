'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Player,
  Match,
  Product,
  TicketCategory,
  CartItem,
  DemoOrder,
  DemoBooking,
  DemoTicket,
  Post,
  UserProfile,
  SimulatedOrderStatus,
} from '@/types';
import {
  INITIAL_PLAYERS,
  INITIAL_MATCHES,
  INITIAL_PRODUCTS,
  INITIAL_TICKET_CATEGORIES,
  INITIAL_NEWS,
} from './demo-data';

export const DEMO_MODE = true;

interface SiteSettings {
  announcementText: string;
  announcementLinkText: string;
  announcementLinkUrl: string;
  isAnnouncementActive: boolean;
  activeSeason: string;
}

interface ScanResult {
  success: boolean;
  message: string;
  ticket?: DemoTicket;
  booking?: DemoBooking;
  match?: Match;
}

interface AppContextType {
  // Demo Mode
  demoMode: boolean;
  isHydrated: boolean;
  
  // Auth
  currentUser: UserProfile | null;
  loginAsAdmin: () => void;
  loginAsFan: () => void;
  loginWithEmail: (email: string, name?: string, role?: 'super_admin' | 'fan') => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => { success: boolean; message: string };
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Demo Orders
  orders: DemoOrder[];
  placeDemoOrder: (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddressLine1: string;
    shippingAddressLine2?: string;
    shippingCity: string;
    shippingState: string;
    shippingPostalCode: string;
    couponCode?: string;
  }) => { success: boolean; orderId?: string; orderReference?: string; error?: string };
  updateOrderStatus: (orderId: string, status: SimulatedOrderStatus, note?: string) => void;

  // Demo Bookings & Tickets
  bookings: DemoBooking[];
  createDemoBooking: (data: {
    matchId: string;
    ticketCategoryId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => { success: boolean; bookingId?: string; bookingReference?: string; error?: string };
  cancelDemoBooking: (bookingId: string) => void;
  scanTicket: (query: string) => ScanResult;

  // Catalog & Content Data
  players: Player[];
  matches: Match[];
  products: Product[];
  ticketCategories: TicketCategory[];
  news: Post[];
  siteSettings: SiteSettings;

  // Admin Mutations
  savePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  saveMatch: (match: Match) => void;
  deleteMatch: (id: string) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (variantId: string, newStock: number) => void;
  saveTicketCategory: (category: TicketCategory) => void;
  saveNewsPost: (post: Post) => void;
  deleteNewsPost: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_SETTINGS: SiteSettings = {
  announcementText: 'MATCHDAY ALERT: Tickets now live for the Goan Derby: Churchill Brothers vs Dempo SC at Fatorda Stadium!',
  announcementLinkText: 'Reserve Demo Tickets',
  announcementLinkUrl: '/tickets/m-101',
  isAnnouncementActive: true,
  activeSeason: '2026/27',
};

const DEFAULT_ADMIN: UserProfile = {
  id: 'usr-admin-1',
  email: 'admin@churchillbrothers.com',
  fullName: 'Savio Alemao (Admin)',
  phone: '+91 98221 00001',
  role: 'super_admin',
  isDemoAccount: true,
};

const DEFAULT_FAN: UserProfile = {
  id: 'usr-fan-1',
  email: 'fan@churchillbrothers.com',
  fullName: 'Antonio D’Souza',
  phone: '+91 98221 54321',
  role: 'fan',
  isDemoAccount: true,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hydration state
  const [isHydrated, setIsHydrated] = useState(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Entities State
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(INITIAL_TICKET_CATEGORIES);
  const [news, setNews] = useState<Post[]>(INITIAL_NEWS);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cbfc_user');
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      else setCurrentUser(DEFAULT_FAN); // default logged in as demo fan for evaluation

      const storedCart = localStorage.getItem('cbfc_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedOrders = localStorage.getItem('cbfc_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedBookings = localStorage.getItem('cbfc_bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));

      const storedPlayers = localStorage.getItem('cbfc_players');
      if (storedPlayers) setPlayers(JSON.parse(storedPlayers));

      const storedMatches = localStorage.getItem('cbfc_matches');
      if (storedMatches) setMatches(JSON.parse(storedMatches));

      const storedProducts = localStorage.getItem('cbfc_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedTicketCats = localStorage.getItem('cbfc_ticket_categories');
      if (storedTicketCats) setTicketCategories(JSON.parse(storedTicketCats));

      const storedNews = localStorage.getItem('cbfc_news');
      if (storedNews) setNews(JSON.parse(storedNews));

      const storedSettings = localStorage.getItem('cbfc_settings');
      if (storedSettings) setSiteSettings(JSON.parse(storedSettings));
    } catch (e) {
      console.warn('LocalStorage hydration error, using initial defaults:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('cbfc_cart', JSON.stringify(cart));
      localStorage.setItem('cbfc_orders', JSON.stringify(orders));
      localStorage.setItem('cbfc_bookings', JSON.stringify(bookings));
      localStorage.setItem('cbfc_players', JSON.stringify(players));
      localStorage.setItem('cbfc_matches', JSON.stringify(matches));
      localStorage.setItem('cbfc_products', JSON.stringify(products));
      localStorage.setItem('cbfc_ticket_categories', JSON.stringify(ticketCategories));
      localStorage.setItem('cbfc_news', JSON.stringify(news));
      localStorage.setItem('cbfc_settings', JSON.stringify(siteSettings));
      if (currentUser) {
        localStorage.setItem('cbfc_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('cbfc_user');
      }
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }, [
    isHydrated,
    cart,
    orders,
    bookings,
    players,
    matches,
    products,
    ticketCategories,
    news,
    siteSettings,
    currentUser,
  ]);

  // Auth Handlers
  const loginAsAdmin = () => {
    setCurrentUser(DEFAULT_ADMIN);
    try {
      localStorage.setItem('cbfc_user', JSON.stringify(DEFAULT_ADMIN));
    } catch (e) {
      console.error(e);
    }
  };

  const loginAsFan = () => {
    setCurrentUser(DEFAULT_FAN);
    try {
      localStorage.setItem('cbfc_user', JSON.stringify(DEFAULT_FAN));
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithEmail = (email: string, name = 'Club Supporter', role: 'super_admin' | 'fan' = 'fan') => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: name,
      role,
      isDemoAccount: true,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('cbfc_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('cbfc_user');
    } catch (e) {
      console.error(e);
    }
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profileUpdate });
  };

  // Cart Handlers
  const addToCart = (product: Product, size: string, quantity: number) => {
    const variant = product.variants.find((v) => v.size === size);
    if (!variant) {
      return { success: false, message: 'Selected size variant not found.' };
    }
    if (variant.demoStockQuantity < quantity) {
      return {
        success: false,
        message: `Only ${variant.demoStockQuantity} item(s) available in demo stock for size ${size}.`,
      };
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.variantId === variant.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > variant.demoStockQuantity) {
          return prev;
        }
        return prev.map((item) =>
          item.variantId === variant.id ? { ...item, quantity: newQty } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        variantId: variant.id,
        size,
        priceInr: product.priceInr,
        quantity,
        imageUrl: product.featuredImageUrl,
      };
      return [...prev, newItem];
    });

    return { success: true, message: `Added ${product.name} (${size}) to your bag.` };
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const updateCartQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.priceInr * item.quantity, 0);

  // Place Demo Merchandise Order
  const placeDemoOrder = (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddressLine1: string;
    shippingAddressLine2?: string;
    shippingCity: string;
    shippingState: string;
    shippingPostalCode: string;
    couponCode?: string;
  }) => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    // Check stock availability
    for (const item of cart) {
      const prod = products.find((p) => p.id === item.productId);
      const variant = prod?.variants.find((v) => v.id === item.variantId);
      if (!variant || variant.demoStockQuantity < item.quantity) {
        return {
          success: false,
          error: `Insufficient demo stock for ${item.productName} (${item.size}).`,
        };
      }
    }

    // Decrement stock atomically
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        variants: p.variants.map((v) => {
          const cartItem = cart.find((c) => c.variantId === v.id);
          if (cartItem) {
            return {
              ...v,
              demoStockQuantity: Math.max(0, v.demoStockQuantity - cartItem.quantity),
            };
          }
          return v;
        }),
      }))
    );

    const subtotal = cartSubtotal;
    const discount = details.couponCode?.toUpperCase() === 'REDMACHINES10' ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 1500 ? 0 : 99;
    const total = subtotal - discount + shipping;
    const orderId = `ord-${Date.now()}`;
    const orderRef = `CBFC-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: DemoOrder = {
      id: orderId,
      orderReference: orderRef,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      customerPhone: details.customerPhone,
      shippingAddressLine1: details.shippingAddressLine1,
      shippingAddressLine2: details.shippingAddressLine2,
      shippingCity: details.shippingCity,
      shippingState: details.shippingState,
      shippingPostalCode: details.shippingPostalCode,
      shippingCountry: 'India',
      items: cart.map((c) => ({
        productId: c.productId,
        productName: c.productName,
        variantId: c.variantId,
        size: c.size,
        quantity: c.quantity,
        unitPriceInr: c.priceInr,
        totalPriceInr: c.priceInr * c.quantity,
        imageUrl: c.imageUrl,
      })),
      subtotalInr: subtotal,
      discountInr: discount,
      shippingInr: shipping,
      totalInr: total,
      simulatedStatus: 'Demo Placed',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'Demo Placed',
          timestamp: new Date().toISOString(),
          note: 'Simulated order created successfully. No payment charged.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return {
      success: true,
      orderId,
      orderReference: orderRef,
    };
  };

  const updateOrderStatus = (orderId: string, status: SimulatedOrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            simulatedStatus: status,
            timeline: [
              ...ord.timeline,
              {
                status,
                timestamp: new Date().toISOString(),
                note: note || `Order updated to ${status}.`,
              },
            ],
          };
        }
        return ord;
      })
    );
  };

  // Demo Ticket Booking Creation
  const createDemoBooking = (data: {
    matchId: string;
    ticketCategoryId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => {
    const match = matches.find((m) => m.id === data.matchId);
    if (!match) return { success: false, error: 'Match fixture not found.' };

    const cat = ticketCategories.find((c) => c.id === data.ticketCategoryId);
    if (!cat) return { success: false, error: 'Ticket category not found.' };

    if (cat.demoAvailable < data.quantity) {
      return {
        success: false,
        error: `Only ${cat.demoAvailable} demo ticket(s) remaining for ${cat.name}.`,
      };
    }

    // Decrement ticket category available demo capacity
    setTicketCategories((prev) =>
      prev.map((c) =>
        c.id === cat.id
          ? { ...c, demoAvailable: Math.max(0, c.demoAvailable - data.quantity) }
          : c
      )
    );

    const bookingId = `bkg-${Date.now()}`;
    const bookingRef = `CBFC-TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const tickets: DemoTicket[] = [];
    for (let i = 1; i <= data.quantity; i++) {
      const ticketNum = `${bookingRef}-${String(i).padStart(2, '0')}`;
      const seatId = `${cat.gateEntry} • Row ${String.fromCharCode(65 + Math.floor(Math.random() * 10))} • Seat ${Math.floor(1 + Math.random() * 60)}`;
      
      // Standardized QR payload
      const qrPayload = JSON.stringify({
        ref: bookingRef,
        tkt: ticketNum,
        match: match.slug,
        cat: cat.name,
        holder: data.customerName,
        demo: true,
      });

      tickets.push({
        id: `tkt-${Date.now()}-${i}`,
        ticketNumber: ticketNum,
        seatIdentifier: seatId,
        qrCodeData: qrPayload,
        ticketStatus: 'valid_demo',
      });
    }

    const newBooking: DemoBooking = {
      id: bookingId,
      bookingReference: bookingRef,
      matchId: match.id,
      matchTitle: `Churchill Brothers FC vs ${match.opponentName}`,
      matchDate: match.matchDate,
      venueName: match.venueName,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      ticketCategoryId: cat.id,
      ticketCategoryName: cat.name,
      quantity: data.quantity,
      unitPriceInr: cat.priceInr,
      totalAmountInr: cat.priceInr * data.quantity,
      bookingStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      tickets,
    };

    setBookings((prev) => [newBooking, ...prev]);

    return {
      success: true,
      bookingId,
      bookingReference: bookingRef,
    };
  };

  const cancelDemoBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // Restore category capacity
    setTicketCategories((prev) =>
      prev.map((c) =>
        c.id === booking.ticketCategoryId
          ? { ...c, demoAvailable: c.demoAvailable + booking.quantity }
          : c
      )
    );

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'cancelled',
              tickets: b.tickets.map((t) => ({ ...t, ticketStatus: 'cancelled' })),
            }
          : b
      )
    );
  };

  // QR Ticket Check-in Scanner Simulation
  const scanTicket = (query: string): ScanResult => {
    let targetTicketNumber = query.trim();

    // Check if query is JSON string from QR
    try {
      if (query.startsWith('{') && query.endsWith('}')) {
        const parsed = JSON.parse(query);
        if (parsed.tkt) targetTicketNumber = parsed.tkt;
      }
    } catch {
      // not JSON, use raw query
    }

    // Search across all bookings
    for (const bkg of bookings) {
      const foundIndex = bkg.tickets.findIndex(
        (t) =>
          t.ticketNumber.toLowerCase() === targetTicketNumber.toLowerCase() ||
          t.qrCodeData.includes(targetTicketNumber)
      );

      if (foundIndex !== -1) {
        const tkt = bkg.tickets[foundIndex];
        const match = matches.find((m) => m.id === bkg.matchId);

        if (tkt.ticketStatus === 'checked_in') {
          return {
            success: false,
            message: `ALREADY SCANNED: Ticket ${tkt.ticketNumber} was checked in on ${new Date(tkt.checkedInAt || '').toLocaleTimeString()} by ${tkt.checkedInBy || 'Gate Operator'}.`,
            ticket: tkt,
            booking: bkg,
            match,
          };
        }

        if (tkt.ticketStatus === 'cancelled' || bkg.bookingStatus === 'cancelled') {
          return {
            success: false,
            message: `INVALID: Ticket ${tkt.ticketNumber} is from a CANCELLED booking.`,
            ticket: tkt,
            booking: bkg,
            match,
          };
        }

        // Mark ticket checked-in
        const updatedTicket: DemoTicket = {
          ...tkt,
          ticketStatus: 'checked_in',
          checkedInAt: new Date().toISOString(),
          checkedInBy: currentUser?.fullName || 'Turnstile Scanner #4',
        };

        const updatedTickets = [...bkg.tickets];
        updatedTickets[foundIndex] = updatedTicket;

        setBookings((prev) =>
          prev.map((b) => (b.id === bkg.id ? { ...b, tickets: updatedTickets } : b))
        );

        return {
          success: true,
          message: `ACCESS GRANTED (DEMO): Valid ticket for ${bkg.customerName}. Seat: ${tkt.seatIdentifier}`,
          ticket: updatedTicket,
          booking: bkg,
          match,
        };
      }
    }

    return {
      success: false,
      message: `TICKET NOT FOUND: Reference "${query}" does not match any demo ticket in the system.`,
    };
  };

  // Admin CMS CRUD Operations
  const savePlayer = (player: Player) => {
    setPlayers((prev) => {
      const idx = prev.findIndex((p) => p.id === player.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = player;
        return copy;
      }
      return [player, ...prev];
    });
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const saveMatch = (match: Match) => {
    setMatches((prev) => {
      const idx = prev.findIndex((m) => m.id === match.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = match;
        return copy;
      }
      return [match, ...prev];
    });
  };

  const deleteMatch = (id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  const saveProduct = (product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = product;
        return copy;
      }
      return [product, ...prev];
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProductStock = (variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        variants: p.variants.map((v) =>
          v.id === variantId ? { ...v, demoStockQuantity: Math.max(0, newStock) } : v
        ),
      }))
    );
  };

  const saveTicketCategory = (cat: TicketCategory) => {
    setTicketCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === cat.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = cat;
        return copy;
      }
      return [...prev, cat];
    });
  };

  const saveNewsPost = (post: Post) => {
    setNews((prev) => {
      const idx = prev.findIndex((n) => n.id === post.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = post;
        return copy;
      }
      return [post, ...prev];
    });
  };

  const deleteNewsPost = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const updateSiteSettings = (settingsUpdate: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settingsUpdate }));
  };

  const resetAllDemoData = () => {
    try {
      localStorage.clear();
      setPlayers(INITIAL_PLAYERS);
      setMatches(INITIAL_MATCHES);
      setProducts(INITIAL_PRODUCTS);
      setTicketCategories(INITIAL_TICKET_CATEGORIES);
      setNews(INITIAL_NEWS);
      setOrders([]);
      setBookings([]);
      setCart([]);
      setCurrentUser(DEFAULT_FAN);
      setSiteSettings(DEFAULT_SETTINGS);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        demoMode: DEMO_MODE,
        isHydrated,
        currentUser,
        loginAsAdmin,
        loginAsFan,
        loginWithEmail,
        logout,
        updateProfile,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        placeDemoOrder,
        updateOrderStatus,
        bookings,
        createDemoBooking,
        cancelDemoBooking,
        scanTicket,
        players,
        matches,
        products,
        ticketCategories,
        news,
        siteSettings,
        savePlayer,
        deletePlayer,
        saveMatch,
        deleteMatch,
        saveProduct,
        deleteProduct,
        updateProductStock,
        saveTicketCategory,
        saveNewsPost,
        deleteNewsPost,
        updateSiteSettings,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
