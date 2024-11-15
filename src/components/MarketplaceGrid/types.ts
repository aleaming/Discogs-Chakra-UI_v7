export interface MarketplaceItem {
  id: string;
  title: string;
  artist: string;
  price: string;
  image: string;
  format: {
    type: string;
    details: string[];
    weight?: string;
    speed?: string;
  };
  condition: {
    media: string;
    sleeve: string;
  };
  seller: {
    name: string;
    rating: number;
    totalRatings: number;
  };
  shipping: {
    cost: string;
    from: string;
  };
}