import { useEffect, useState } from 'react';

export const useDebounce = (input: string, delayMs = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(input);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(input), delayMs);
    return () => clearTimeout(handler);
  }, [input, delayMs]);
  return debouncedValue;
};
