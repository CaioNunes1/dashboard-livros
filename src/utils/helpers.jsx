// src/utils/helpers.js

/**
 * Retorna a URL da capa de um livro na OpenLibrary.
 * @param {number | undefined} coverId — valor book.cover_i vindo da API
 * @param {'S'|'M'|'L'} size — tamanho da imagem: S (small), M (medium), L (large)
 * @returns {string} URL da capa ou caminho para placeholder local
 */
export function getCoverImageURL(coverId, size = 'M') {
    if (coverId) {
      // tamanhos válidos: S, M ou L
      return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
    }
    // placeholder local dentro de public/placeholder-book.png
    return '/placeholder-book.png';
  }
  
  /**
   * Formata o ano de primeira publicação de um livro.
   * @param {number | undefined} year — valor book.first_publish_year
   * @returns {string} Ano como string ou texto padrão
   */
  export function formatPublishYear(year) {
    return year ? String(year) : 'Ano desconhecido';
  }
  
  /**
   * (Opcional) Formata um array de autores para string.
   * @param {string[] | undefined} authors
   * @returns {string}
   */
  export function formatAuthors(authors) {
    if (!authors || !authors.length) {
      return 'Autor desconhecido';
    }
    return authors.join(', ');
  }
  