import { useState, useEffect } from 'react';

export const useLoading = (initialDelay: number = 1000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if this is the first time loading the app
    const hasLoadedBefore = localStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore) {
      // If user has loaded before, show loading for shorter time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, initialDelay);
      return () => clearTimeout(timer);
    } else {
      // First time loading, show full loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
        localStorage.setItem('hasLoadedBefore', 'true');
      }, 3000); // 3 seconds for first load
      return () => clearTimeout(timer);
    }
  }, [initialDelay]);

  return { isLoading, isFirstLoad };
};
