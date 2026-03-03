export type ApiErrorType = 'permission' | 'network' | 'server' | null;

export interface AsyncStateProps {
  loading?: boolean;
  errorType?: ApiErrorType;
}
