import DiscogsClient from 'disconnect';

// Initialize Discogs client with environment variables
const discogsDb = new DiscogsClient.Client({
  consumerKey: import.meta.env.VITE_DISCOGS_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_DISCOGS_CONSUMER_SECRET,
}).database();

// Default fallback images by type
export const FALLBACK_IMAGES = {
  DEFAULT: 'https://images.unsplash.com/photo-1647378122504-cc2d0f0e7172?q=80&w=1974&auto=format&fit=crop',
  VINYL: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=1976&auto=format&fit=crop',
  CD: 'https://images.unsplash.com/photo-1611513890292-79c1a67b44e7?q=80&w=1974&auto=format&fit=crop',
};

export interface DiscogsSearchResult {
  id: number;
  title: string;
  year: string;
  cover_image: string;
  thumb: string;
  format: string[];
  label: string[];
  genre: string[];
  style: string[];
}

// Helper function to validate image URL with timeout
export const validateImageUrl = async (url: string, timeout = 5000): Promise<boolean> => {
  if (!url) return false;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn(`Image validation failed for ${url}:`, error);
    return false;
  }
};

// Helper function to get the best available image URL
export const getBestImageUrl = async (images: string[]): Promise<string> => {
  for (const image of images) {
    if (!image) continue;
    
    const isValid = await validateImageUrl(image);
    if (isValid) {
      return image;
    }
  }
  
  return FALLBACK_IMAGES.DEFAULT;
};

export const searchRelease = async (
  artist: string,
  title: string
): Promise<DiscogsSearchResult[]> => {
  if (!artist || !title) {
    console.warn('Missing artist or title for Discogs search');
    return [];
  }

  try {
    const searchQuery = `${artist} ${title}`;
    const response = await discogsDb.search({
      query: searchQuery,
      type: 'release',
      per_page: 10,
    });

    if (!response?.results?.length) {
      console.warn('No results found for:', { artist, title });
      return [];
    }

    return response.results;
  } catch (error) {
    console.error('Error searching Discogs:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return [];
  }
};

export const getReleaseDetails = async (releaseId: number) => {
  if (!releaseId) {
    throw new Error('Release ID is required');
  }

  try {
    const release = await discogsDb.getRelease(releaseId);
    return release;
  } catch (error) {
    console.error('Error fetching release details:', error);
    throw error;
  }
};

export const getCoverArt = async (
  artist: string,
  title: string
): Promise<string> => {
  if (!artist || !title) {
    console.warn('Missing artist or title for cover art search');
    return FALLBACK_IMAGES.DEFAULT;
  }

  try {
    const results = await searchRelease(artist, title);
    
    if (!results?.length) {
      return FALLBACK_IMAGES.DEFAULT;
    }

    // Try to get the best quality image from the first result
    const potentialImages = [
      results[0].cover_image,
      results[0].thumb,
    ].filter(Boolean);

    if (!potentialImages.length) {
      return FALLBACK_IMAGES.DEFAULT;
    }

    const bestImage = await getBestImageUrl(potentialImages);
    return bestImage;
  } catch (error) {
    console.error('Error fetching cover art:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return FALLBACK_IMAGES.DEFAULT;
  }
};