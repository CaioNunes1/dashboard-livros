import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { SearchBar } from './components/Searchbar';
import { Filters } from './components/Filters/Filters';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { LoadingSkeleton } from './components/Loading';
import { DistributionChart } from './components/DistributionChart';
import { useBooks } from './hooks/useBooks';
import { PaginationControls } from './components/PaginationControl';

export default function App() {
  const {
    term,
    setTerm,
    books,
    total,
    page,
    setPage,
    loading,
    error
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Estados de filtros
  const [yearRange, setYearRange] = useState([0, 0]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [sortOption, setSortOption] = useState('year-desc');

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  // Aplicar filtros e ordenação
  const filteredBooks = useMemo(() => {
    let list = books;

    // Filtro por ano
    if (yearRange[0] || yearRange[1]) {
      list = list.filter(
        (b) =>
          b.first_publish_year >= yearRange[0] &&
          b.first_publish_year <= yearRange[1]
      );
    }

    // Filtro por idioma
    if (languageFilter.length > 0) {
      list = list.filter(
        (b) =>
          b.language &&
          b.language.some((lang) => languageFilter.includes(lang))
      );
    }

    // Ordenação
    list = [...list].sort((a, b) => {
      switch (sortOption) {
        case 'year-asc':
          return (a.first_publish_year || 0) - (b.first_publish_year || 0);
        case 'year-desc':
          return (b.first_publish_year || 0) - (a.first_publish_year || 0);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return list;
  }, [books, yearRange, languageFilter, sortOption]);

  // Dados para o gráfico de distribuição por década
  const distributionData = useMemo(() => {
    const counts = {};
    filteredBooks.forEach((b) => {
      const year = b.first_publish_year;
      if (typeof year === 'number') {
        const decade = Math.floor(year / 10) * 10;
        const label = `${decade}s`;
        counts[label] = (counts[label] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([decade, count]) => ({ decade, count }))
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  }, [filteredBooks]);

  const totalPages = Math.ceil(total / 12);

  return (
    <Box p={2}>
      <SearchBar
        term={term}
        onSearch={(value) => {
          setPage(1);
          setTerm(value);
        }}
      />

      {!loading && books.length > 0 && (
        <Filters
          books={books}
          yearRange={yearRange}
          onYearRangeChange={setYearRange}
          languageFilter={languageFilter}
          onLanguageFilterChange={setLanguageFilter}
          sortOption={sortOption}
          onSortOptionChange={setSortOption}
        />
      )}

      {loading && books.length === 0 && <LoadingSkeleton count={12} />}

      
      {!loading && error && term.trim() !== '' && (
        <Typography color="error" align="center" mt={2}>
          Erro ao buscar livros.
        </Typography>
      )}

      {!loading && !error && filteredBooks.length === 0 && term && (
        <Typography align="center" mt={2}>
          Nenhum livro encontrado para &quot;{term}&quot; nos filtros atuais.
        </Typography>
      )}

      {!loading && filteredBooks.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Distribuição de livros por década
          </Typography>
          <DistributionChart data={distributionData} />
        </>
      )}

      <Grid container spacing={2} mt={2} justifyContent="center">
        {filteredBooks.map((book) => (
          <Grid item key={book.key}>
            <Box onClick={() => handleOpenModal(book)} sx={{ cursor: 'pointer' }}>
              <BookCard book={book} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setPage(newPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      )}

      <BookModal
        open={modalOpen}
        book={selectedBook}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
