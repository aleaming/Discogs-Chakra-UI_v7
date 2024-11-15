export interface Performance {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  status?: 'available' | 'limited' | 'sold_out';
  price?: {
    currency: string;
    min: number;
    max: number;
  };
  attendance?: number;
  setlist?: string[];
  images?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  ticketUrl?: string;
}

export interface Tour {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'world_tour' | 'festival' | 'special_event';
  description: string;
  totalShows: number;
  totalAttendance?: number;
  countries: string[];
  image?: string;
  performances: Performance[];
}