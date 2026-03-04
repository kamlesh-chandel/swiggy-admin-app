import Dialog from '@/components/common/dialog';
import { Form } from '@/components/common/form';
import type {
  RestaurantFormDialogProps,
  RestaurantFormValues,
} from '../../restaurant.types';

import { RESTAURANT_FIELDS } from './constant';

const RestaurantFormDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  initialValues,
  mode = 'create',
}: RestaurantFormDialogProps) => {
  const handleSubmit = async (data: RestaurantFormValues) => {
    if (!data.rating) return;

    await onSubmit({
      ...data,
      rating: Number(data.rating),
    });

    onClose();
  };

  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Edit Restaurant' : 'Add Restaurant';
  const buttonText = isEditMode ? 'Update Restaurant' : 'Create Restaurant';

  return (
    <Dialog open={open} title={title} onClose={onClose} showActions={false}>
      <Form<RestaurantFormValues>
        fields={RESTAURANT_FIELDS}
        onSubmit={handleSubmit}
        buttonText={buttonText}
        loading={loading}
        defaultValues={initialValues}
      />
    </Dialog>
  );
};

export default RestaurantFormDialog;
