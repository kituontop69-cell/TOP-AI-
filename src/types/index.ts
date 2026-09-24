export type PricingType = 
  | 'free'          // 🟢 Free Forever
  | 'free-tier'     // 🟡 Free Tier
  | 'free-credits'  // 🔵 Free Credits
  | 'open-source'   // ⚪ Open Source
  | 'limited-free'  // 🟠 Limited Free
  | 'paid';         // 🔴 Paid

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  url: string;
  logo?: string;
  category: string[];
  tags: string[];
  pricingType: PricingType;
  pricingDetails?: string; // e.g., "50 free daily credits", "Free forever no credit card"
  requiresLogin: boolean;
  mobileFriendly: boolean;
  rating?: number; // e.g. 4.8
  popularity?: number; // 1 - 100
  featured: boolean;
  trending: boolean;
  verified: boolean;
  dateAdded: string; // ISO string e.g. '2026-03-20'
  lastChecked: string;
  views?: number;
  clicks?: number;
  keyFeatures?: string[];
  developerOrCompany?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  emoji: string;
  description: string;
  accentColor: string; // e.g. "from-cyan-500 to-blue-600"
}

export interface ReportItem {
  id: string;
  toolId: string;
  toolName: string;
  reason: 'broken_link' | 'pricing_changed' | 'wrong_category' | 'tool_defunct' | 'incorrect_desc' | 'other';
  details: string;
  userEmail?: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export type SortOption = 'popularity' | 'rating' | 'newest' | 'alphabetical' | 'verified';

export interface FilterState {
  searchQuery: string;
  category: string;
  pricingType: PricingType | 'all';
  requiresLogin: boolean | 'all';
  mobileFriendly: boolean | 'all';
  quickFilter: 'all' | 'free' | 'no-login' | 'free-credits' | 'free-tier' | 'popular' | 'new';
  sortBy: SortOption;
}

export type ActiveTab = 'home' | 'explore' | 'categories' | 'trending' | 'new' | 'favorites' | 'admin';
