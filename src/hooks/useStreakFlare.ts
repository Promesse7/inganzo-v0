import { useState, useEffect } from 'react';

export function useStreakFlare(streak: number) {
  const [showFlare, setShowFlare] = useState(false);

  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      setShowFlare(true);
      const timer = setTimeout(() => setShowFlare(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  return showFlare;
}

