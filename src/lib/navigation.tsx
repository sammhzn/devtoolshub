'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type Page =
  | { type: 'home' }
  | { type: 'tool'; toolId: string }
  | { type: 'blog' }
  | { type: 'blog-post'; slug: string }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'tools' };

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  goHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => {
    setCurrentPage({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({ currentPage, navigate, goHome }),
    [currentPage, navigate, goHome]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNav must be used within NavigationProvider');
  return ctx;
}
