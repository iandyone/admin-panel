export function getShortMonthName(monthIndex: number) {
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return shortMonths[monthIndex] ?? null;
}


export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  const match = cleaned.match(/^\+375(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (!match) {
    return 'Неверный формат номера';
  }

  const [, code, first, second, third] = match;

  return `+375 (${code}) ${first}-${second}-${third}`;
}
