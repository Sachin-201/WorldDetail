import React from 'react';
import { render,screen } from '@testing-library/react';
import index from './index';

test('renders without crashing', () => {
  const { container } = render(<index />);
  const linkElement = screen.getByText(/Welcome to the Country Data App /i);
  expect(linkElement).toBeInTheDocument();
});