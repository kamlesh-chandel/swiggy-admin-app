import { render, screen } from '@testing-library/react';
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
      <DataGrid<TestRow>
        rows={rows}
        columns={columns}
        loading={false}
        {...props}
      />,
    );
  };

  test('renders rows in the table', () => {
    renderGrid();
    expect(screen.getByText('Pizza Hub')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    renderGrid({ loading: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows failed state when error exists and no rows', () => {
    render(
      <DataGrid<TestRow>
        rows={[]}
        columns={columns}
        loading={false}
        error="Something went wrong"
      />,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
