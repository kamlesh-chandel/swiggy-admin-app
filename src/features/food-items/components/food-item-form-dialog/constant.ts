import type { FieldConfig } from '@/components/common/form';
import type { FoodItemFormValues } from '@/features/food-items/food-item.types';

export const FOOD_ITEM_FIELDS: FieldConfig<FoodItemFormValues>[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    minLength: 2,
  },
  {
    id: 'price',
    name: 'price',
    label: 'Price',
    type: 'number',
    required: true,
  },
  {
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    minLength: 3,
  },
  {
    id: 'image',
    name: 'image',
    label: 'Upload Image',
    type: 'file',
    required: true,
    accept: 'image/*',
  },
];
