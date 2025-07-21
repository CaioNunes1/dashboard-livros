/* eslint-env jest */
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

/* global jest, describe, it, expect */

jest.useFakeTimers();

describe('useDebounce', () => {
  it('atualiza o valor apenas após o delay', () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'a', delay: 500 } }
    );
    expect(result.current).toBe('a');

    rerender({ val: 'b', delay: 500 });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('b');
  });
});
