import { ReactNode } from 'react';

export interface CollectionItem {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  format: {
    type: string;
    details: string[];
    weight?: string;
    speed?: string;
  };
  condition: {
    media: string;
    sleeve: string;
    notes?: string;
  };
  image: string;
  dateAdded: string;
  personalNotes?: string;
  tags: string[];
  rating: number;
}

export type ViewMode = 'grid' | 'list' | 'table' | 'crate';
export type SortOption = 'dateAdded' | 'artist' | 'title' | 'rating' | 'releaseYear';