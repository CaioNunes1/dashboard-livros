import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Typography from '@mui/material/Typography';

/**
 * Recebe um array de objetos { decade: string, count: number }
 * e exibe um gráfico de barras responsivo.
 */
export function DistributionChart({ data }) {
  if (!data || !data.length) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
        Nenhum dado para exibir no gráfico.
      </Typography>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="decade" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" name="Livros" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
