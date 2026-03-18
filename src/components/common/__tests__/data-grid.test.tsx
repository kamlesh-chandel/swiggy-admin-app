import { render, screen, within } from '@testing-library/react';
import DataGrid from '../data-grid';
import type { GridColDef } from '@mui/x-data-grid';

interface TestRow {
  id: number;
  name: string;
}

describe('DataGrid Component', () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
  ];

  const rows: TestRow[] = [{ id: 1, name: 'Pizza Hub' }];

  const renderGrid = (props = {}) => {
    render(
      <DataGrid rows={rows} columns={columns} loading={false} {...props} />,
    );
  };

  test('renders rows in the table', () => {
    renderGrid();
    const row = screen.getByRole('row', { name: /pizza hub/i });
    expect(within(row).getByText('Pizza Hub')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    renderGrid({ loading: true });
    const grid = screen.getByRole('grid');
    expect(within(grid).getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows failed state when error exists', () => {
    render(
      <DataGrid
        rows={[]}
        columns={columns}
        loading={false}
        error="Something went wrong"
      />,
    );
    const grid = screen.getByRole('grid');
    expect(within(grid).getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
