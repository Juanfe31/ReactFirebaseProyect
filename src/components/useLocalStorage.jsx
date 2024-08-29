import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      if (value !== '') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [key, value]);

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  };

  return [value, setValue, clearLocalStorage];
};

export default useLocalStorage;
