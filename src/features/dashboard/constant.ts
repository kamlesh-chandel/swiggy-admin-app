import { COLORS } from '@/theme/colors';

export const STATUS_COLORS: Record<string, string> = {
  pending: COLORS.yellow,
  confirmed: COLORS.lightBlue,
  preparing: COLORS.darkBlue,
  delivered: COLORS.green,
  cancelled: COLORS.red,
};
