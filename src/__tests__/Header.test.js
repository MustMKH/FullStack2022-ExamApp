import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

// FAIL: TestingLibraryElementError: Unable to find an element with the text: /learn react/i.
/* test('renders learn react link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
}) */

// FAIL: TestingLibraryElementError: Unable to find an element with the text: /learn react/i
// We get the same error, because getBy always returns an error if the element is not found
/* test('renders learn react link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).not.toBeInTheDocument();
}) */

// PASS - SOLUTION: use both not and change method to queryBy
test('renders learn react link', () => {
    render(<Header />);
    const linkElement = screen.queryByText(/learn react/i);
    expect(linkElement).not.toBeInTheDocument();
})

// PASS
test('renders React App link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/React App/i);
    expect(linkElement).toBeInTheDocument();
});

// PASS
test('renders Tietoa sovelluksesta link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/Tietoa sovelluksesta/i);
    expect(linkElement).toBeInTheDocument();
});

// PASS
test('renders Hallintapaneeli link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/Hallintapaneeli/i);
    expect(linkElement).toBeInTheDocument();
});

// PASS
test('renders Kirjautuminen link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/Kirjautuminen/i);
    expect(linkElement).toBeInTheDocument();
});

// PASS
test('renders React App link', () => {
    render(<Header />);
    const headingElement = screen.getByText(/React App/i);
    expect(headingElement).toBeInTheDocument();
});

// FAIL: TestingLibraryElementError: Found multiple elements with the role "link"
/* test('renders all links', () => {
    render(<Header />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
}); */

// PASS - Solution 1: Specifying which link is meant by adding an object with the text (name)
test('renders all links 1', () => {
    render(<Header />);
    const linkElement = screen.getByRole("link", { name: "React App" });
    expect(linkElement).toBeInTheDocument();
});

// PASS - Solution 2: getAllBy instead of getBy
// Also, the (linkElements).toBeInTheDocument() does not work because getAllBy returns an array (which is not found in the document)
test('renders all links 2', () => {
    render(<Header />);
    const linkElements = screen.getAllByRole("link");
    expect(linkElements.length).toBe(5);
});