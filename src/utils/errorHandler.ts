import { ApiError } from '@/services/core/ApiError';

// eslint-disable-next-line no-unused-vars
const errorHandler = <T, K extends (...args: any[]) => void>(
  error: unknown,
  schema: T,
  setError: K,
) => {
  if (error instanceof ApiError) {
    const err = error.body.error?.validationErrors;

    if (err)
      err.map((e: { message: string; path: Array<keyof typeof schema> }) => {
        e.path.forEach(path => {
          setError(path, { message: e.message });
        });
      });
  }
};

export default errorHandler;
