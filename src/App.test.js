import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';


describe('renders initial new game', () => {
  render(<App />);
  
  it('displays initial text content', () => {
    expect(screen.getByText(/Tick Tac Toe!/i)).toBeInTheDocument();
    expect(screen.getByText(/It's X's Turn/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('New game');
  });
  
});

test('clicking on squares changes state', async () => {
  render(<App />);

  fireEvent.click(screen.getByTestId('square-0-0'));
  
  await waitFor(() => {
    expect(screen.getByTestId('square-0-0')).toHaveTextContent('X');
  });


  fireEvent.click(screen.getByTestId('square-0-0'));
 
  // No changes if clicked on same square
  await waitFor(() => {
    expect(screen.getByTestId('square-0-0')).toHaveTextContent('X');
  });

  await waitFor(() => {
    expect(screen.getByTestId(/turnMessage/i)).toHaveTextContent(/It's O's Turn/i);
  })

  fireEvent.click(screen.getByTestId('square-0-1'));
  
  await waitFor(() => {
    expect(screen.getByTestId('square-0-1')).toHaveTextContent('O');
  });

  await waitFor(() => {
    expect(screen.getByTestId(/turnMessage/i)).toHaveTextContent(/It's X's Turn/i);
  })
});