export interface Filter {
  category: string;
  value: string;
  label?: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface MarketplaceAllProps {
  onViewDetails?: (itemId: string) => void;
  onAddToCart?: (itemId: string) => void;
}

export interface FilterState {
  format: string[];
  condition: string[];
  price: [number, number];
  location: string[];
  sellerRating: number;
  year: [number, number];
  search: string;
}