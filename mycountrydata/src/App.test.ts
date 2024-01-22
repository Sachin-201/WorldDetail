import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component with CountryForm', () => {
  const { getByText } = render(<App />);
  const countryFormElement = getByText(/Welcome to the Country Data App/i);
  
  expect(countryFormElement).toBeInTheDocument();
});
