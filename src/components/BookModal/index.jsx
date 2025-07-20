import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function BookModal({ open, book, onClose }) {
  if (!book) return null;

  const {
    title,
    author_name,
    first_publish_year,
    number_of_pages_median,
    publisher,
    subject,
  } = book;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="book-dialog-title"
    >
      <DialogTitle id="book-dialog-title">{title}</DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Autores:</strong>{' '}
          {author_name?.length ? author_name.join(', ') : 'Desconhecido'}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Primeira publicação:</strong>{' '}
          {first_publish_year ?? '—'}
        </Typography>

        {number_of_pages_median && (
          <Typography variant="body2" gutterBottom>
            <strong>Páginas (mediana):</strong>{' '}
            {number_of_pages_median}
          </Typography>
        )}

        {publisher?.length && (
          <Typography variant="body2" gutterBottom>
            <strong>Editora(s):</strong> {publisher.join(', ')}
          </Typography>
        )}

        {subject?.length && (
          <Typography variant="body2" gutterBottom>
            <strong>Temas:</strong>{' '}
            {subject.slice(0, 10).join(', ')}{/* mostra até 10 */}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
