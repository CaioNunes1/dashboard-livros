import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * @param {{
 *   page: number;
 *   totalPages: number;
 *   onPageChange: (newPage: number) => void;
 * }} props
 */
export function PaginationControls({ page, totalPages, onPageChange }) {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        mt: 4
      }}
    >
      <Button
        size="small"
        disabled={isFirst}
        onClick={() => onPageChange(1)}
      >
        « Primeira
      </Button>
      <Button
        size="small"
        disabled={isFirst}
        onClick={() => onPageChange(page - 1)}
      >
        ‹ Anterior
      </Button>

      <Typography variant="body2">
        Página {page} de {totalPages}
      </Typography>

      <Button
        size="small"
        disabled={isLast}
        onClick={() => onPageChange(page + 1)}
      >
        Próxima ›
      </Button>
      <Button
        size="small"
        disabled={isLast}
        onClick={() => onPageChange(totalPages)}
      >
        Última »
      </Button>
    </Box>
  );
}
