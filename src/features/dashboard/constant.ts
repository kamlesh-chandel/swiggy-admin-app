import { COLORS } from '@/theme/colors';

export const STATUS_COLORS: Record<string, string> = {
  Pending: COLORS.yellow,
  Confirmed: COLORS.lightBlue,
  Preparing: COLORS.darkBlue,
  Delivered: COLORS.green,
  Cancelled: COLORS.red,
};
