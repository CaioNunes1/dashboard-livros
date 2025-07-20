import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json';

/**
 * Busca livros na OpenLibrary.
 * @param {{ q?: string; page?: number; limit?: number }} options
 * @returns {Promise<{ books: any[]; total: number }>} Objetos de livros e total encontrado.
 */
export async function searchBooks({ q = '', page = 1, limit = 10 } = {}) {
  try {
    const params = { q, page, limit };
    const response = await axios.get(BASE_URL, { params });
    const { docs, numFound } = response.data;
    return {
      books: docs,
      total: numFound,
    };
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
}