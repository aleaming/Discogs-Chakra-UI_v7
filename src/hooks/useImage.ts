import { useState, useEffect } from 'react';
import { validateImageUrl } from '../utils/discogsApi';

export const useImage = (src: string | undefined) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const validateImage = async () => {
      if (!src) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const valid = await validateImageUrl(src);
        setIsValid(valid);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to validate image'));
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateImage();
  }, [src]);

  return { isValid, isLoading, error };
};