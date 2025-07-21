
/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '.';

it('chama onSearch ao digitar no input', async () => {
  const onSearch = jest.fn();
  render(<SearchBar term="" onSearch={onSearch} />);

  const input = screen.getByPlaceholderText(/buscar livros/i);
  await userEvent.type(input, 'React');

  expect(onSearch).toHaveBeenCalledTimes(6); // R-E-A-C-T = 6 letras
});
