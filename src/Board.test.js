/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import Board from './Board';

describe('renders the board', () => {
  const initialSquares = [[null, null, null],
                          [null, null, null],
                          [null, null, null]];

  const clickedSquare = jest.fn();

  const { container } = render(
    <Board squares={initialSquares}
      clickedSquare={clickedSquare}
      disabled={false}
    />);

    it('displays the grid', () => {
      expect(container.getElementsByClassName('row').length).toBe(3);
    });
});