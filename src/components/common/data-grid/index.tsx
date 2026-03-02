import { DataGrid as MuiDataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import FailedState from '../failed-state';

interface DataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
  error?: boolean;
}

function DataGrid<T>({ rows, columns, loading, error }: DataGridProps<T>) {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {error ? (
        <FailedState />
      ) : (
        <MuiDataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      )}
    </Box>
  );
}

export default DataGrid;
