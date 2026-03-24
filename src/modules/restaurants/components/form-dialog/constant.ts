import type { FieldConfig } from '@/components/common/form';
import type { RestaurantFormValues } from '../../restaurant.types';

export const RESTAURANT_FIELDS: FieldConfig<RestaurantFormValues>[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    minLength: 3,
  },
  {
    id: 'address',
    name: 'address',
    label: 'Address',
    type: 'text',
    required: true,
    minLength: 5,
  },
  {
    id: 'city',
    name: 'city',
    label: 'City',
    type: 'text',
    required: true,
    minLength: 3,
  },
  {
    id: 'rating',
    name: 'rating',
    label: 'Rating',
    type: 'number',
    required: true,
  },
];
