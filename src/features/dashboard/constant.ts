import { COLORS } from '@/theme/colors';

export const STATUS_COLORS: Record<string, string> = {
  pending: COLORS.common.yellow,
  confirmed: COLORS.common.lightBlue,
  preparing: COLORS.common.darkBlue,
  delivered: COLORS.common.green,
  cancelled: COLORS.common.red,
};
