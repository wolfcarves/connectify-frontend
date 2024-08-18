import { subHours, formatDistanceToNowStrict } from 'date-fns';

export const convertUtil = (dateString?: string) => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const refactorDate = subHours(date, 8);

  return formatDistanceToNowStrict(refactorDate, { addSuffix: true });
};
