import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  getCoverImageURL,
  formatAuthors,
  formatPublishYear
} from '../../utils/helpers';
import { useFavorites } from '../../hooks/useFavorites';

/**
 * Exibe um cartão com capa, título, autores, ano de publicação e botão de favorito.
 *
 * @param {{ book: {
 *   key: string;
 *   cover_i?: number;
 *   title: string;
 *   author_name?: string[];
 *   first_publish_year?: number;
 * } }} props
 */
export function BookCard({ book }) {
  const imageUrl = getCoverImageURL(book.cover_i, 'M');
  const title = book.title;
  const authors = formatAuthors(book.author_name);
  const year = formatPublishYear(book.first_publish_year);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(book.key);

  const handleToggleFavorite = () => {
    if (fav) {
      removeFavorite(book.key);
    } else {
      addFavorite(book.key);
    }
  };

  return (
    <Card sx={{ maxWidth: 200, m: 1, position: 'relative' }}>
      <IconButton
        onClick={handleToggleFavorite}
        size="small"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}
      >
        {fav ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={title}
      />

      <CardContent>
        <Typography
          variant="h6"
          component="div"
          noWrap
          title={title}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          title={authors}
          sx={{ mt: 0.5 }}
        >
          {authors}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 0.5 }}
        >
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
}
