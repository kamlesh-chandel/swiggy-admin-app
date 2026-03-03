import { DataGrid as MuiDataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import FailedState from '../failed-state';

interface DataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
  error?: number;
}

function DataGrid<T>({ rows, columns, loading, error }: DataGridProps<T>) {
  return (
    <Box sx={{ height: '100%', width: '100%', overflowX: 'auto' }}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        sx={{ width: { xs: '250%', md: '100%' } }}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        slots={{
          noRowsOverlay: error
            ? () => <FailedState error={error} height={100} />
            : undefined,
        }}
      />
    </Box>
  );
}

export default DataGrid;
