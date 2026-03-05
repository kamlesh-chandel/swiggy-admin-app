import { useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import DataGrid from '@/components/common/data-grid';
import Button from '@/components/common/button';
import ActionMenu from '@/components/common/menu/action-menu';
import Dialog from '@/components/common/dialog';
import RestaurantDrawer from './components/restaurant-drawer';
import RestaurantFormDialog from './components/form-dialog';

import { COLORS } from '@/theme/colors';
import { useRestaurants } from './hooks/useRestaurants';
import { useRestaurantDetails } from './hooks/useRestaurantDetails';
import type {
  CreateRestaurantPayloadProps,
  Restaurant,
} from './restaurant.types';

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
    handleCreate,
    handleUpdate,
    mutationLoading,
  } = useRestaurants();
  const { data: restaurantDetails, fetchDetails } = useRestaurantDetails();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const navigate = useNavigate();
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

  const handleAddRestaurant = () => {
    setSelectedRestaurant(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleOnView = () => {
    handleClose();
    if (selectedRestaurantId) {
      fetchDetails(selectedRestaurantId);
      setDrawerOpen(true);
    }
  };

  const handleNavigateToFoodItems = () => {
    handleClose();
    if (!selectedRestaurantId) return;

    navigate(`/restaurants/${selectedRestaurantId}/food-items`);
  };

  const handleOnEdit = () => {
    handleClose();

    if (!selectedRestaurantId) return;
    const restaurant = restaurantsData.find(
      ({ id }) => id === selectedRestaurantId,
    );
    if (!restaurant) return;

    setSelectedRestaurant(restaurant);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleOnDelete = () => {
    handleClose();
    setDeleteOpen(true);
  };

  const handleOnConfirmDelete = async () => {
    if (!selectedRestaurantId) return;

    const response = await handleDelete(selectedRestaurantId);

    if (response?.status === 200) {
      toast.success(response.data.message);
      setDeleteOpen(false);
    } else {
      toast.error('Failed to delete restaurant');
    }
  };

  const getInitialValues = () => {
    return formMode === 'edit' && selectedRestaurant
      ? {
          name: selectedRestaurant.name,
          address: selectedRestaurant.address,
          city: selectedRestaurant.city,
          rating: String(selectedRestaurant.rating),
        }
      : undefined;
  };

  const handleOnSubmit = async (payload: CreateRestaurantPayloadProps) => {
    if (formMode === 'create') {
      const response = await handleCreate(payload);

      if (response?.status === 201) {
        toast.success(response.data.message);
        setFormOpen(false);
      } else {
        toast.error('Failed to create restaurant');
      }
    }

    if (formMode === 'edit' && selectedRestaurant) {
      const response = await handleUpdate(selectedRestaurant.id, payload);

      if (response?.status === 200) {
        toast.success(response.data.message);
        setFormOpen(false);
      } else {
        toast.error('Failed to update restaurant');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5">Restaurants</Typography>
      <Box sx={{ mt: 6 }}>
        <Box mb={2} gap={2} sx={styles.buttonBox}>
          <Button
            variant="contained"
            style={styles.addButton}
            onClick={handleAddRestaurant}
          >
            Add
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
        actions={[
          { label: 'View', onClick: handleOnView, color: 'success.main' },
          {
            label: 'Manage Food Items',
            onClick: handleNavigateToFoodItems,
            color: 'info.main',
          },
          { label: 'Edit', onClick: handleOnEdit, color: 'warning.main' },
          { label: 'Delete', onClick: handleOnDelete, color: 'error.main' },
        ]}
      />
      <Dialog
        open={deleteOpen}
        title="Delete Restaurant"
        description="Are you sure you want to delete this restaurant? This action cannot be undone."
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleOnConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <RestaurantDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={restaurantDetails}
      />
      <RestaurantFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={formMode}
        loading={mutationLoading}
        initialValues={getInitialValues()}
        onSubmit={handleOnSubmit}
      />
    </Box>
  );
};

export default Restaurants;
