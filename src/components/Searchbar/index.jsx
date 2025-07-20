import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

/**
 * SearchBar:
 * @param {{ term: string; onSearch: (term: string) => void }} props
 */
export function SearchBar({ term, onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Buscar livros..."
      value={term}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {<SearchIcon />}
          </InputAdornment>
        ),
      }}
    />
  );
}