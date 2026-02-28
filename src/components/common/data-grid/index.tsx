import { DataGrid as MuiDataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
}

function DataGrid<T>({ rows, columns, loading }: DataGridProps<T>) {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
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
    </Box>
  );
}

export default DataGrid;
