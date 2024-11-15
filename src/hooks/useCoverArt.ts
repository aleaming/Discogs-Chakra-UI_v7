import { useState, useEffect } from 'react';
import { getCoverArt, validateImageUrl } from '../utils/discogsApi';

export const useCoverArt = (artist: string, title: string) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverArt = async () => {
      if (!artist || !title) return;

      setLoading(true);
      setError(null);

      try {
        const url = await getCoverArt(artist, title);
        const isValid = await validateImageUrl(url);
        
        if (isValid) {
          setCoverUrl(url);
        } else {
          throw new Error('Invalid image URL or image not accessible');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cover art';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverArt();
  }, [artist, title]);

  return { coverUrl, loading, error };
};