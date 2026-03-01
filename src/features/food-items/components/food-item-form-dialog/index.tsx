import Dialog from '@/components/common/dialog';
import { Form } from '@/components/common/form';

import { uploadFoodItemImage } from '@/features/food-items/food-item.service';
import type {
  CreateFoodItemPayload,
  FoodItemFormDialogProps,
  FoodItemFormValues,
} from '@/features/food-items/food-item.types';

import { FOOD_ITEM_FIELDS } from './constant';

const FoodItemFormDialog = ({
  open,
  onClose,
  onSubmit,
  mode,
  loading,
  initialValues,
  restaurantId,
}: FoodItemFormDialogProps) => {
  const handleSubmit = async (values: FoodItemFormValues) => {
    const file = values.image as unknown as File;
    let imageId: number | undefined;

    if (file instanceof File) {
      const uploaded = await uploadFoodItemImage(file);
      imageId = uploaded[0].id;
    }

    const payload: CreateFoodItemPayload = {
      name: values.name,
      price: Number(values.price),
      description: values.description,
      restaurant: restaurantId,
      image: imageId as number,
    };

    await onSubmit(payload);
    onClose();
  };

  const title = mode === 'edit' ? 'Edit Food Item' : 'Add Food Item';
  const buttonText = mode === 'edit' ? 'Update Food Item' : 'Create Food Item';

  return (
    <Dialog open={open} title={title} onClose={onClose} showActions={false}>
      <Form<FoodItemFormValues>
        fields={FOOD_ITEM_FIELDS}
        onSubmit={handleSubmit}
        buttonText={buttonText}
        loading={loading}
        defaultValues={initialValues}
      />
    </Dialog>
  );
};

export default FoodItemFormDialog;
