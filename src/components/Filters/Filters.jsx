import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export function Filters({
  books,
  yearRange,
  onYearRangeChange,
  languageFilter,
  onLanguageFilterChange,
  sortOption,
  onSortOptionChange
}) {
  // Extrai linguagens únicas dos livros (pode ser code como 'eng', 'por' etc)
  const languages = useMemo(() => {
    const set = new Set();
    books.forEach((b) => {
      (b.language || []).forEach((lang) => set.add(lang));
    });
    return Array.from(set);
  }, [books]);

  // Determina limites do slider com base nos dados
  const [minYear, maxYear] = useMemo(() => {
    const years = books
      .map((b) => b.first_publish_year)
      .filter((y) => typeof y === 'number');
    if (!years.length) return [0, 0];
    return [Math.min(...years), Math.max(...years)];
  }, [books]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2,
        alignItems: 'center'
      }}
    >
      {/* Slider de ano */}
      <Box sx={{ width: 200 }}>
        <Typography variant="subtitle2">Ano de publicação</Typography>
        <Slider
          value={yearRange}
          onChange={(_, val) => onYearRangeChange(val)}
          valueLabelDisplay="auto"
          min={minYear}
          max={maxYear}
          disableSwap
        />
      </Box>

      {/* Multi-select de idiomas */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="filter-language-label">Idioma</InputLabel>
        <Select
          labelId="filter-language-label"
          multiple
          value={languageFilter}
          onChange={(e) => onLanguageFilterChange(e.target.value)}
          renderValue={(selected) => selected.join(', ')}
          label="Idioma"
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              <Checkbox checked={languageFilter.includes(lang)} />
              <ListItemText primary={lang} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select de ordenação */}
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="filter-sort-label">Ordenar por</InputLabel>
        <Select
          labelId="filter-sort-label"
          value={sortOption}
          onChange={(e) => onSortOptionChange(e.target.value)}
          label="Ordenar por"
        >
          <MenuItem value="year-desc">Ano ↓</MenuItem>
          <MenuItem value="year-asc">Ano ↑</MenuItem>
          <MenuItem value="title-asc">Título A‑Z</MenuItem>
          <MenuItem value="title-desc">Título Z‑A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
