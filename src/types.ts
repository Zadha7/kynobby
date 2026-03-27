export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  platform: 'Amazon' | 'Daraz' | 'ClickBank' | 'Alibaba' | 'Hostinger' | 'Bluehost';
  currency: 'USD' | 'GBP' | 'PKR' | 'INR' | 'AED' | 'SAR';
  category: string;
  description: string;
  features: string[];
  affiliateUrl: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  favorites: string[]; // Product IDs
  clickHistory: ClickEvent[];
  role: 'admin' | 'user';
}

export interface ClickEvent {
  productId: string;
  timestamp: string;
  platform: string;
}
