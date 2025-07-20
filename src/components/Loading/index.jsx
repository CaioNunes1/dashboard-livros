// src/components/Loading/index.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export function LoadingSkeleton({ count = 12 }) {
  // Quantos esqueleto de card exibir
  const items = Array.from({ length: count });

  return (
    <Grid container spacing={2} justifyContent="center" mt={2}>
      {items.map((_, idx) => (
        <Grid item key={idx}>
          <Box sx={{ maxWidth: 200, m: 1 }}>
            {/* Capa */}
            <Skeleton variant="rectangular" height={300} />

            {/* Título */}
            <Skeleton variant="text" width={160} height={30} sx={{ mt: 1 }} />

            {/* Autor */}
            <Skeleton variant="text" width={120} height={20} />

            {/* Ano */}
            <Skeleton variant="text" width={40} height={20} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
