export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export interface Player {
  id: string;
  slug: string;
  fullName: string;
  shirtNumber: number;
  position: PlayerPosition;
  nationality: string;
  nationalityCode: string;
  dateOfBirth?: string;
  heightCm?: number;
  portraitUrl: string;
  bio: string;
  previousClubs?: string;
  isActive: boolean;
  isFeatured?: boolean;
  stats?: {
    season: string;
    appearances: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
  };
}

export interface StaffMember {
  id: string;
  fullName: string;
  role: string;
  category: 'Technical' | 'Medical' | 'Management';
  nationality: string;
  bio: string;
  portraitUrl?: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  surface: string;
  description: string;
  imageUrl: string;
  isHomeGround: boolean;
}

export type MatchStatus = 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';

export interface GoalScorer {
  minute: number;
  playerName: string;
  isHomeTeam: boolean;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
}

export interface Match {
  id: string;
  slug: string;
  competition: string;
  season: string;
  matchday?: number;
  opponentName: string;
  opponentCrestUrl: string;
  isHomeMatch: boolean;
  venueName: string;
  matchDate: string; // ISO string
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  attendance?: number;
  referee?: string;
  matchReport?: string;
  goalscorers?: GoalScorer[];
  isTicketsAvailable: boolean;
}

export interface TicketCategory {
  id: string;
  matchId: string;
  name: string;
  description: string;
  priceInr: number;
  demoCapacity: number;
  demoAvailable: number;
  gateEntry: string;
}

export interface DemoBooking {
  id: string;
  bookingReference: string;
  matchId: string;
  matchTitle: string;
  matchDate: string;
  venueName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  ticketCategoryId: string;
  ticketCategoryName: string;
  quantity: number;
  unitPriceInr: number;
  totalAmountInr: number;
  bookingStatus: 'confirmed' | 'cancelled' | 'refunded_demo';
  createdAt: string;
  tickets: DemoTicket[];
}

export interface DemoTicket {
  id: string;
  ticketNumber: string;
  seatIdentifier: string;
  qrCodeData: string;
  ticketStatus: 'valid_demo' | 'checked_in' | 'cancelled';
  checkedInAt?: string;
  checkedInBy?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size';
  demoStockQuantity: number;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  priceInr: number;
  compareAtPriceInr?: number;
  featuredImageUrl: string;
  galleryImages: string[];
  isActive: boolean;
  isFeatured?: boolean;
  badge?: string;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  size: string;
  priceInr: number;
  quantity: number;
  imageUrl: string;
}

export type SimulatedOrderStatus =
  | 'Demo Placed'
  | 'Demo Processing'
  | 'Demo Shipped'
  | 'Demo Delivered'
  | 'Demo Cancelled';

export interface DemoOrder {
  id: string;
  orderReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  items: {
    productId: string;
    productName: string;
    variantId: string;
    size: string;
    quantity: number;
    unitPriceInr: number;
    totalPriceInr: number;
    imageUrl: string;
  }[];
  subtotalInr: number;
  discountInr: number;
  shippingInr: number;
  totalInr: number;
  simulatedStatus: SimulatedOrderStatus;
  createdAt: string;
  timeline: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
}

export interface Post {
  id: string;
  slug: string;
  category: 'Match Report' | 'Club News' | 'Press Release' | 'Interview' | 'Academy';
  title: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  authorName: string;
  isPublished: boolean;
  isFeatured?: boolean;
  publishedAt: string;
  readTimeMinutes: number;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'Matchday' | 'Training' | 'Kit Launch' | 'Club Heritage' | 'Events';
  mediaUrl: string;
  caption?: string;
  date: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Principal' | 'Kit Manufacturer' | 'Official Partner' | 'Associate Partner';
  logoUrl: string;
  websiteUrl: string;
  description: string;
}

export interface ClubHonour {
  title: string;
  count: number;
  years: string[];
  description: string;
  iconType: 'trophy' | 'medal' | 'shield';
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'super_admin' | 'content_editor' | 'fan';
  isDemoAccount: boolean;
}
