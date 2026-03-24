import { render, screen, within } from '@testing-library/react';
import DataGrid from '../data-grid';

describe('DataGrid Component', () => {
  const columns = [{ field: 'name', headerName: 'Name', flex: 1 }];
  const rows = [{ id: 1, name: 'Pizza Hub' }];

  const renderGrid = (props = {}) => {
    render(
      <DataGrid rows={rows} columns={columns} loading={false} {...props} />,
    );
  };

  test('renders rows in the table', () => {
    renderGrid();
    const grid = screen.getByRole('grid');
    const row = within(grid).getByRole('row', { name: /pizza hub/i });
    expect(within(row).getByText('Pizza Hub')).toBeInTheDocument();
  });

  test('shows loader when loading is true', () => {
    renderGrid({ loading: true });
    const grid = screen.getByRole('grid');
    expect(within(grid).getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows failed state when error exists', () => {
    render(
      <DataGrid rows={[]} columns={columns} error="Something went wrong" />,
    );
    const grid = screen.getByRole('grid');
    expect(within(grid).getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
