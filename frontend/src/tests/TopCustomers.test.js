import { cleanup, render } from '@testing-library/react';
import App from '../App';

it('should render TopCustomers Component', async () => {
  render(<App />);
  expect(screen.getByText('Top Customers')).toBeInTheDocument();
});
