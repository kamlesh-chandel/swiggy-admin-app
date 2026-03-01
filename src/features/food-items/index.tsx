import { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import DataGrid from '@/components/common/data-grid';
import Button from '@/components/common/button';
import ActionMenu from '@/components/common/menu/action-menu';
import Dialog from '@/components/common/dialog';

import { COLORS } from '@/theme/colors';
import { useFoodItems } from './hooks/useFoodItems';
import FoodItemFormDialog from './components/food-item-form-dialog';
import type { FoodItem, CreateFoodItemPayload } from './food-item.types';
import { useRestaurantName } from './hooks/useRestaurantName';

const styles = {
  addButton: {
    width: 150,
    backgroundColor: COLORS.brand,
    color: COLORS.softPink,
  },
  buttonBox: { display: 'flex', justifyContent: 'flex-end' },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    mt: 0.5,
  },
};

const FoodItems = () => {
  const { restaurantId } = useParams();
  const numericRestaurantId = Number(restaurantId);

  const {
    data,
    loading,
    handleDelete,
    handleCreate,
    handleUpdate,
    createLoading,
    updateLoading,
  } = useFoodItems(numericRestaurantId);
  const { restaurantName } = useRestaurantName(numericRestaurantId);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      sortable: false,
      filterable: false,
      flex: 0.5,
      renderCell: ({ row }) => (
        <Avatar
          src={`${import.meta.env.VITE_API_BASE_URL.replace(
            '/api',
            '',
          )}${row.image.url}`}
          sx={styles.image}
          variant="rounded"
        />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: ({ row }) => `₹ ${row.price}`,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: ({ row }) => row.description,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: ({ row }) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Button
          onClick={(e) => {
            setSelectedItem(row);
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </Button>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedItem(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleOnEdit = () => {
    handleClose();
    if (!selectedItem) return;
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleOnDelete = () => {
    handleClose();
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    await handleDelete(selectedItem.id);
    toast.success('Food Item Deleted Successfully');
    setDeleteOpen(false);
  };

  const getInitialValues = () => {
    if (formMode === 'edit' && selectedItem) {
      return {
        name: selectedItem.name,
        price: String(selectedItem.price),
        description: selectedItem.description,
      };
    }
    return undefined;
  };

  const handleSubmit = async (payload: CreateFoodItemPayload) => {
    if (formMode === 'create') {
      await handleCreate(payload);
      toast.success('Food Item Created Successfully');
    } else if (formMode === 'edit' && selectedItem) {
      await handleUpdate(selectedItem.id, payload);
      toast.success('Food Item Updated Successfully');
    }

    setFormOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 28 } }}>
        Food Items {restaurantName && `- ${restaurantName}`}
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Box mb={2} sx={styles.buttonBox}>
          <Button
            variant="contained"
            style={styles.addButton}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>

        <DataGrid rows={data} columns={columns} loading={loading} />
      </Box>

      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        actions={[
          { label: 'Edit', onClick: handleOnEdit, color: 'warning.main' },
          { label: 'Delete', onClick: handleOnDelete, color: 'error.main' },
        ]}
      />

      <Dialog
        open={deleteOpen}
        title="Delete Food Item"
        description="Are you sure you want to delete this food item? This action cannot be undone."
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <FoodItemFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={formMode}
        loading={formMode === 'create' ? createLoading : updateLoading}
        initialValues={getInitialValues()}
        onSubmit={handleSubmit}
        restaurantId={numericRestaurantId}
      />
    </Box>
  );
};

export default FoodItems;
