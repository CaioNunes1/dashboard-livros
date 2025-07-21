/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react'; // Adicione esta linha
import '@testing-library/jest-dom';
import { BookCard } from '.';

const mockBook = {
  key: '123',
  title: 'Livro de Teste',
  author_name: ['Autor X'],
  first_publish_year: 1999,
  cover_i: null,
};

it('exibe título, autor e ano corretamente', () => {
  render(<BookCard book={mockBook} />);
  expect(screen.getByText('Livro de Teste')).toBeInTheDocument();
  expect(screen.getByText(/Autor X/)).toBeInTheDocument();
  expect(screen.getByText('1999')).toBeInTheDocument();
});

it('usa placeholder quando não há cover_i', () => {
  const noCover = { ...mockBook, cover_i: undefined };
  render(<BookCard book={noCover} />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', expect.stringContaining('/placeholder'));
});