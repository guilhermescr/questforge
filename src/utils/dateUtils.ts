import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const timeZone = 'America/Sao_Paulo';

  const utcDate = new Date(dateString);
  if (isNaN(utcDate.getTime())) {
    throw new RangeError('Invalid date value');
  }

  const zonedDate = toZonedTime(utcDate, timeZone);

  return format(zonedDate, 'MMMM d, yyyy');
}
