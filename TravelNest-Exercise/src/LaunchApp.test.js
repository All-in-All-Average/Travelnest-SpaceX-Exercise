import { render, screen } from '@testing-library/react';
import LaunchApp from './LaunchApp';

test('test presence of loading text', () => {
  render(<LaunchApp />);
  const linkElement = screen.getByText(/loading/i);
  expect(linkElement).toBeInTheDocument();
});

test('test presence of logo', () => {
  render(<LaunchApp />);
  const linkElement = screen.getByRole('img', {name: /logo/i});
  expect(linkElement).toBeInTheDocument();
});
