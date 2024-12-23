import { RefObject, useEffect } from 'react';

const useEnterToSubmit = (
  ref: RefObject<HTMLElement>,
  callback: () => void | Promise<void>,
) => {
  useEffect(() => {
    const enterToSubmit = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        await callback();
      }
    };

    const element = ref.current;

    if (element) element.addEventListener('keypress', enterToSubmit);

    return () => {
      if (element) element.removeEventListener('keypress', enterToSubmit);
    };
  }, []);
};

export default useEnterToSubmit;
