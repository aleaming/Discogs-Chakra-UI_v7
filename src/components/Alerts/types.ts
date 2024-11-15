export type AlertPriority = 'critical' | 'high' | 'medium' | 'low';
export type AlertType = 
  | 'price' 
  | 'inventory'
  | 'collection'
  | 'transaction'
  | 'community'
  | 'saved_search';

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  data?: {
    itemId?: string;
    searchId?: string;
    price?: number;
    url?: string;
    [key: string]: any;
  };
}

export interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    query?: string;
    format?: string[];
    condition?: string[];
    price?: [number, number];
    location?: string[];
    year?: [number, number];
  };
  notificationEnabled: boolean;
  emailEnabled: boolean;
  lastChecked?: string;
  createdAt: string;
}