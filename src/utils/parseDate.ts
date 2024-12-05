import { subHours, formatDistanceToNowStrict } from 'date-fns';

export const parseDate = (dateString?: string) => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const refactorDate = subHours(date, 8);

  const formatted = formatDistanceToNowStrict(refactorDate, {
    addSuffix: true,
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
