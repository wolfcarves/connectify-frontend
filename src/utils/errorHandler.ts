import { ApiError } from '@/services/core/ApiError';

const errorHandler = <T, K extends (...args: any[]) => void>(
  error: unknown,
  schema: T,
  setError: K,
) => {
  console.log(typeof schema);

  if (error instanceof ApiError) {
    const err = error.body.error.validationErrors;

    err.map((e: { message: string; path: Array<keyof typeof schema> }) => {
      setError(e.path[0], { message: e.message });
    });
  }
};

export default errorHandler;
