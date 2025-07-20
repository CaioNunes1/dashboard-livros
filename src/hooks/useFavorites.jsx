import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dashboardLivros:favorites';

/**
 * Hook para gerenciar uma lista de IDs de favoritos no localStorage.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    // ao iniciar, tenta ler do localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // sempre que favorites mudar, persiste no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // se falhar, ignora
    }
  }, [favorites]);

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites((prev) => [...prev, id]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
