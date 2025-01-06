import { ApiError } from '@/services/core/ApiError';

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
