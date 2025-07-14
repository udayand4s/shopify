'use client';

import { useEffect, useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { StoreProvider } from '@/contexts/StoreContext';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}