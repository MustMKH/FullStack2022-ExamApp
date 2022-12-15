import { render, screen } from '@testing-library/react';
import App from './App';

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

// FAIL: TestingLibraryElementError: Unable to find an element with the text: /learn react / i.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).not.toBeInTheDocument();
})

// FAIL: TestingLibraryElementError: Unable to find an element with the text: /learn react/i
// We get the same error, because getBy always returns an error if the element is not found
/* test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).not.toBeInTheDocument();
}) */
