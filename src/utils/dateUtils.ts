import { format, parseISO } from 'date-fns';

/**
 * Форматирует дату в строку формата "yyyy-MM-dd HH:mm:ss"
 * @param date - Дата в формате ISO строки или Date
 * @returns Форматированная строка даты
 */
export const formatDate = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  } catch (error) {
    console.error('Ошибка форматы даты:', error);
    return '';
  }
};

/**
 * Преобразует строку даты и времени из формата "yyyy-MM-dd'T'HH:mm:ss.SSSX" в формат "yyyy-MM-dd HH:mm:ss"
 * @param isoString - Дата в формате ISO строки
 * @returns Форматированная строка даты
 */
export const formatISODate = (isoString: string): string => {
  try {
    const date = parseISO(isoString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  } catch (error) {
    console.error('Error parsing ISO date:', error);
    return '';
  }
};

/**
 * Конвертирует строку даты в формате "yyyy-MM-dd HH:mm:ss" в ISO строку даты
 * @param dateString - Дата в формате "yyyy-MM-dd HH:mm:ss"
 * @returns Дата в формате ISO строки
 */
export const toISOString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    console.error('Error converting to ISO string:', error);
    return '';
  }
};

/**
 * Проверяет, является ли строка допустимой датой
 * @param dateStr - строка, представляющая дату
 * @returns true, если строка является допустимой датой, иначе false
 */
export const isValidDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};
