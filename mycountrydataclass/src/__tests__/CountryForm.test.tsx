import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CountryForm from '../Pages/CountryForm';

test('renders CountryForm component', () => {
  render(
    <Router>
      <CountryForm />
    </Router>
  );
  const geoDiscoveryText = screen.getByText(/Geo Discovery/i);
  expect(geoDiscoveryText).toBeInTheDocument();
});

test('search button is disabled when no input', () => {
  render(
    <Router>
      <CountryForm />
    </Router>
  );

  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeDisabled();
});

test('search button is enabled when input is provided', () => {
  render(
    <Router>
      <CountryForm />
    </Router>
  );

  const inputField = screen.getByLabelText(/Enter Country Name/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(inputField, { target: { value: 'Canada' } });

  expect(searchButton).toBeEnabled();
});

test('search button is disabled when input is space', () => {
  render(
    <Router>
      <CountryForm />
    </Router>
  );

  const inputField = screen.getByLabelText(/Enter Country Name/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(inputField, { target: { value: ' ' } });

  expect(searchButton).toBeDisabled();
});