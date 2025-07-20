// src/hooks/useBooks.js
import { useState, useEffect, useCallback } from 'react';
import { searchBooks } from '../services/openLibraryAPI';
import { useDebounce } from './useDebounce';

export function useBooks(initialTerm = '') {
  const [term, setTerm] = useState(initialTerm);
  const debouncedTerm = useDebounce(term, 500);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBooks = useCallback(async (searchTerm, pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const { books: docs, total: numFound } = await searchBooks({
        q: searchTerm,
        page: pageNumber,
        limit: 12
      });
      setBooks(docs);
      setTotal(numFound);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Primeiro carregamento: buscar “populares” com q="*"
  useEffect(() => {
    loadBooks('*', 1);
  }, [loadBooks]);

  // Quando o usuário digita ou muda de página
  useEffect(() => {
    // se o termo não for vazio, buscamos o termo; senão, mantemos a lista inicial
    if (debouncedTerm.trim() !== '') {
      loadBooks(debouncedTerm, page);
    }
  }, [debouncedTerm, page, loadBooks]);

  return {
    term,
    setTerm,
    books,
    total,
    page,
    setPage,
    loading,
    error
  };
}
