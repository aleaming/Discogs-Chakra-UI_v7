import { useState, useEffect } from 'react';
import type { Alert, SavedSearch } from '../components/Alerts/types';

// Mock data - replace with actual data fetching
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'price',
    priority: 'high',
    title: 'Price Drop Alert',
    message: 'Random Access Memories (2013) is now available for $24.99',
    timestamp: new Date().toISOString(),
    isRead: false,
    data: {
      itemId: 'ram-2013',
      price: 24.99,
    },
  },
  {
    id: '2',
    type: 'saved_search',
    priority: 'medium',
    title: 'New Items Found',
    message: '3 new items match your search "Daft Punk Vinyl"',
    timestamp: new Date().toISOString(),
    isRead: false,
    data: {
      searchId: 'search-1',
      count: 3,
    },
  },
];

const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'Daft Punk Vinyl',
    criteria: {
      query: 'Daft Punk',
      format: ['Vinyl'],
      condition: ['M', 'NM'],
      price: [0, 100],
    },
    notificationEnabled: true,
    emailEnabled: false,
    lastChecked: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(mockSavedSearches);

  const markAllRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
  };

  const clearAll = () => {
    setAlerts([]);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const addSavedSearch = (search: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    const newSearch: SavedSearch = {
      ...search,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSavedSearches([...savedSearches, newSearch]);
  };

  const updateSavedSearch = (searchId: string, updates: Partial<SavedSearch>) => {
    setSavedSearches(
      savedSearches.map(search =>
        search.id === searchId ? { ...search, ...updates } : search
      )
    );
  };

  const deleteSavedSearch = (searchId: string) => {
    setSavedSearches(savedSearches.filter(search => search.id !== searchId));
  };

  return {
    alerts,
    savedSearches,
    markAllRead,
    clearAll,
    dismissAlert,
    addSavedSearch,
    updateSavedSearch,
    deleteSavedSearch,
  };
};