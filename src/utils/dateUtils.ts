import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const timeZone = 'America/Sao_Paulo';

  const utcDate = new Date(`${dateString}T03:00:00Z`);
  const zonedDate = toZonedTime(utcDate, timeZone);

  return format(zonedDate, 'MMMM d, yyyy');
}
