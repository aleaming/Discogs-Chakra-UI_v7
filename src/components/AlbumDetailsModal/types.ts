export interface PriceHistory {
  date: string;
  price: number;
  volume: number;
}

export interface MarketStats {
  lowestPrice: number;
  medianPrice: number;
  highestPrice: number;
  totalSales: number;
  priceHistory: PriceHistory[];
}

export interface AlbumDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
    title: string;
    artist: string;
    image: string;
    releaseYear: number;
    label: string;
    format: string;
    condition?: {
      media: string;
      sleeve: string;
    };
    marketStats: MarketStats;
  };
}