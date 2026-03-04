import { useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { GridColDef } from '@mui/x-data-grid';

import DataGrid from '@/components/common/data-grid';
import Button from '@/components/common/button';
import ActionMenu from '@/components/common/menu/action-menu';
import Dialog from '@/components/common/dialog';
import RestaurantDrawer from './components/restaurant-drawer';

import { COLORS } from '@/theme/colors';
import { useRestaurants } from './hooks/useRestaurants';
import { useRestaurantDetails } from './hooks/useRestaurantDetails';
import { toast } from 'react-toastify';

const styles = {
  addButton: {
    width: 150,
    backgroundColor: COLORS.brand,
    color: COLORS.softPink,
  },
  buttonBox: { display: 'flex', justifyContent: 'flex-end' },
  switch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: COLORS.brand,
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: COLORS.brand,
    },
  },
};

const Restaurants = () => {
  const {
    data: restaurantsData,
    loading,
    error,
    handleDelete,
    handleToggle,
  } = useRestaurants();
  const { data: restaurantDetails, fetchDetails } = useRestaurantDetails();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, align: 'left' },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'rating', headerName: 'Rating' },
    { field: 'totalOrders', headerName: 'Orders' },
    { field: 'totalRevenue', headerName: 'Revenue' },
    {
      field: 'isActive',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Switch
          sx={styles.switch}
          checked={row.isActive}
          onChange={() => {
            handleToggle(row.id, !row.isActive);
            toast.success('Status Changed Successfully');
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Button
          onClick={(e) => {
            setSelectedRestaurantId(row.id);
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5">Restaurants</Typography>
      <Box sx={{ mt: 6 }}>
        <Box mb={2} gap={2} sx={styles.buttonBox}>
          <Button variant="contained" style={styles.addButton}>
            Add Restaurant
          </Button>
        </Box>
        <DataGrid
          rows={restaurantsData}
          columns={columns}
          loading={loading}
          error={error}
        />
      </Box>
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onDelete={() => {
          handleClose();
          setDeleteOpen(true);
        }}
        onView={() => {
          handleClose();
          if (selectedRestaurantId) {
            fetchDetails(selectedRestaurantId);
            setDrawerOpen(true);
          }
        }}
      />
      <Dialog
        open={deleteOpen}
        title="Delete Restaurant"
        description="Are you sure you want to delete this restaurant? This action cannot be undone."
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          if (!selectedRestaurantId) return;
          await handleDelete(selectedRestaurantId);
          setDeleteOpen(false);
          toast.success('Restaurant Deleted Successfully');
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <RestaurantDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={restaurantDetails}
      />
    </Box>
  );
};

export default Restaurants;
