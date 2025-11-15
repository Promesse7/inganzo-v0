import { useState, useEffect } from 'react';

export function useBounce(trigger: boolean) {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return isBouncing;
}

