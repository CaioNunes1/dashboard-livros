// src/App.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { useBooks } from './hooks/useBooks';
import { LoadingSkeleton } from './components/Loading';

export default function App() {
  // hook de busca e paginação
  const {
    term,
    setTerm,
    books,
    total,
    page,
    setPage,
    loading,
    error,
  } = useBooks();

  // estados para controlar o modal de detalhes
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // calculo de total de páginas
  const totalPages = Math.ceil(total / 12);

  // abre o modal com o livro clicado
  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  // fecha o modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <Box p={2}>
    {/* Barra de busca */}
    <SearchBar term={term} onSearch={setTerm} />
    
    {/* Placeholder antes da primeira busca */}
    {!term && (
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary'
        }}
      >
        <Typography variant="h4" gutterBottom>
          📚 Bem‑vindo ao Dashboard de Livros
        </Typography>
        <Typography variant="body1">
          Comece digitando um termo na busca acima para encontrar livros.
        </Typography>
      </Box>
    )}

    {/* Loading Skeleton na busca inicial */}
    {loading && books.length === 0 && (
      <LoadingSkeleton count={12} />
    )}

    {/* Mensagem de erro */}
    {error && (
      <Typography color="error" align="center" mt={2}>
        Erro ao buscar livros.
      </Typography>
    )}

    {/* Nenhum resultado encontrado */}
    {!loading && !error && books.length === 0 && term && (
      <Typography align="center" mt={2}>
        Nenhum livro encontrado para "{term}".
      </Typography>
    )}

    {/* Grid de livros */}
    <Grid container spacing={2} mt={2} justifyContent="center">
      {books.map((book) => (
        <Grid item key={book.key}>
          <Box onClick={() => handleOpenModal(book)} sx={{ cursor: 'pointer' }}>
            <BookCard book={book} />
          </Box>
        </Grid>
      ))}
    </Grid>

    {/* Paginação */}
    {totalPages > 1 && (
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    )}

    {/* Modal de detalhes */}
    <BookModal
      open={modalOpen}
      book={selectedBook}
      onClose={handleCloseModal}
    />
  </Box>
  );
}
