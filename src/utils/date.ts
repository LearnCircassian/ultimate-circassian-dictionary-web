export function isDateValid({ day, month, year }: { day: number; month: number; year: number }) {
  if (year < 1970 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
