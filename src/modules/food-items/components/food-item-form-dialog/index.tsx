import Dialog from '@/components/common/dialog';
import { Form } from '@/components/common/form';

import { uploadFoodItemImage } from '@/modules/food-items/food-item.service';
import type {
  CreateFoodItemPayload,
  FoodItemFormDialogProps,
  FoodItemValues,
} from '@/modules/food-items/food-item.types';

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
  const resolveImageId = async (image: FoodItemValues['image']) => {
    if (!image) return undefined;

    if (image instanceof File) {
      const uploaded = await uploadFoodItemImage(image);
      return uploaded[0]?.id;
    }

    if (typeof image === 'object' && 'id' in image) {
      return image.id;
    }

    return undefined;
  };

  const handleSubmit = async (values: FoodItemValues) => {
    const imageId = await resolveImageId(values.image);

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
      <Form<FoodItemValues>
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
