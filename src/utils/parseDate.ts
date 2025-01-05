import { subHours, formatDistanceToNowStrict } from 'date-fns';

export const parseDate = (dateString: string, addSuffix: boolean) => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const refactorDate = subHours(date, 0);

  const formatted = formatDistanceToNowStrict(refactorDate, {
    addSuffix: addSuffix ?? true,
  });

  const abbreviated = formatted
    .replace(/ seconds?/, 's')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')
    .replace(/ months?/, 'mo')
    .replace(/ years?/, 'y');

  return abbreviated;
};
