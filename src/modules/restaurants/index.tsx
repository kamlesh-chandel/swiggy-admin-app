import { useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  getGridNumericOperators,
  type GridColDef,
  type GridFilterOperator,
} from '@mui/x-data-grid';
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
import { useAuth } from '@/context/auth/useAuth';

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

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statusFilterOperators: GridFilterOperator[] = [
    {
      label: 'Active',
      value: 'isActiveTrue',
      getApplyFilterFn: () => {
        return (value) => value === true;
      },
    },
    {
      label: 'Inactive',
      value: 'isActiveFalse',
      getApplyFilterFn: () => {
        return (value) => value === false;
      },
    },
  ];

  const getBasicNumericOperators = () =>
    getGridNumericOperators().filter(
      (operator) =>
        operator.value === '=' ||
        operator.value === '!=' ||
        operator.value === '>' ||
        operator.value === '<',
    );

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, align: 'left' },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    {
      field: 'rating',
      headerName: 'Rating',
      filterOperators: getBasicNumericOperators(),
    },
    {
      field: 'totalOrders',
      headerName: 'Orders',
      filterOperators: getBasicNumericOperators(),
    },
    {
      field: 'totalRevenue',
      headerName: 'Revenue',
      filterOperators: getBasicNumericOperators(),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      type: 'boolean',
      filterOperators: statusFilterOperators,
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
          data-testid={'action-btn'}
          onClick={(e) => {
            setSelectedRestaurant(row);
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
    if (selectedRestaurant) {
      fetchDetails(selectedRestaurant.id);
      setDrawerOpen(true);
    }
  };

  const handleNavigateToFoodItems = () => {
    handleClose();
    if (!selectedRestaurant) return;

    navigate(`/restaurants/${selectedRestaurant.id}/food-items`);
  };

  const handleOnEdit = () => {
    handleClose();
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleOnDelete = () => {
    handleClose();
    setDeleteOpen(true);
  };

  const handleOnConfirmDelete = async () => {
    if (!selectedRestaurant) return;

    const response = await handleDelete(selectedRestaurant.id);

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
            data-testid={'add-restaurant-button'}
            variant="contained"
            style={styles.addButton}
            onClick={handleAddRestaurant}
            disabled={
              error === 'You do not have permission to access this resource'
            }
          >
            Add
          </Button>
        </Box>
        <DataGrid
          data-testid={'restaurant-data-grid'}
          rows={restaurantsData}
          columns={columns}
          loading={loading}
          error={error}
        />
      </Box>
      <ActionMenu
        data-testid={'restaurant-action-menu'}
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
          {
            label: 'Delete',
            onClick: handleOnDelete,
            color: 'error.main',
            disabled: isAdmin,
            tooltip: isAdmin
              ? 'You do not have permission to delete Restaurant'
              : '',
          },
        ]}
      />
      <Dialog
        data-testid={'restaurant-delete-dialog'}
        open={deleteOpen}
        title={`Delete Restaurant ${selectedRestaurant?.name}`}
        description={`Are you sure you want to delete this restaurant (${selectedRestaurant?.name})? This action cannot be undone.`}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleOnConfirmDelete}
        confirmText="confirm"
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
