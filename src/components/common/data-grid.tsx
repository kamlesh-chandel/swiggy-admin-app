import { DataGrid as MuiDataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import FailedState from './failed-state';
import type { AsyncStateProps } from '@/types/async-state';

interface DataGridProps<T> extends AsyncStateProps {
  rows: T[];
  columns: GridColDef[];
}

function DataGrid<T>({ rows, columns, loading, errorType }: DataGridProps<T>) {
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
          noRowsOverlay: errorType
            ? () => <FailedState height={100} errorType={errorType} />
            : undefined,
        }}
      />
    </Box>
  );
}

export default DataGrid;
