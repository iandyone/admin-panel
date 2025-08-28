export function formatDateISO(
  iso: Date,
  opts?: { locale?: string; timeZone?: string },
) {
  const { locale = 'ru-RU', timeZone = 'UTC' } = opts ?? {};

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}
