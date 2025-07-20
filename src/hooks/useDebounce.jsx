import { useState, useEffect } from 'react';

/**
 * Retorna um valor que só é atualizado após o valor original ficar estável
 * por um determinado delay.
 *
 * @param {any} value — valor a ser “deboundado”
 * @param {number} delay — tempo em ms antes de atualizar o valor (padrão: 500)
 * @returns any — valor debounced
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
