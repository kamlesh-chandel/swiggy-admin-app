export type ApiError = string | undefined;

export interface AsyncStateProps {
  loading?: boolean;
  error?: ApiError;
}
