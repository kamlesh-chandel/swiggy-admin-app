import {
  DataGrid as MuiDataGrid,
  type GridColDef,
  type DataGridProps as MuiDataGridProps,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import FailedState from './failed-state';
import type { AsyncStateProps } from '@/types/async-state';

interface DataGridProps<T> extends AsyncStateProps, MuiDataGridProps {
  rows: T[];
  columns: GridColDef[];
}

function DataGrid<T>({
  rows,
  columns,
  loading,
  error,
  ...rest
}: DataGridProps<T>) {
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
            ? () => <FailedState height={100} error={error} />
            : undefined,
        }}
        {...rest}
      />
    </Box>
  );
}

export default DataGrid;
