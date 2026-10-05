import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = '@bob-dylan-lyrics/favorites-v1';

type FavoritesContextValue = {
  favoriteIds: string[];
  favoritesReady: boolean;
  isFavorite: (trackId: string) => boolean;
  toggleFavorite: (trackId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: React.PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const currentIds = useRef<string[]>([]);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!active || !saved) return;
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'string')) {
          currentIds.current = parsed;
          setFavoriteIds(parsed);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setFavoritesReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleFavorite = useCallback((trackId: string) => {
    const current = currentIds.current;
    const next = current.includes(trackId)
      ? current.filter((id) => id !== trackId)
      : [...current, trackId];
    currentIds.current = next;
    setFavoriteIds(next);
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      favoritesReady,
      isFavorite: (trackId) => favoriteIds.includes(trackId),
      toggleFavorite,
    }),
    [favoriteIds, favoritesReady, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
