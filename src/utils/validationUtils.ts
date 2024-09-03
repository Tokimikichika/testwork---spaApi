/**
 * Проверяет, является ли значение непустой строкой.
 * @param value - значение для проверки
 * @returns true, если строка не пустая, иначе false
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
* Проверяет, является ли значение допустимой датой в формате ISO.
* @param dateStr - строка, представляющая дату
* @returns true, если строка представляет собой допустимую дату, иначе false
*/
export const isISODate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && dateStr === date.toISOString();
};

/**
* Проверяет, является ли значение строкой, содержащей только буквы.
* @param value - строка для проверки
* @returns true, если строка содержит только буквы, иначе false
*/
export const isAlphabetic = (value: string): boolean => {
  return /^[A-Za-zА-Яа-яЁё]+$/.test(value); // Добавлено для поддержки русских букв
};

/**
* Проверяет, является ли значение строкой, содержащей только цифры.
* @param value - строка для проверки
* @returns true, если строка содержит только цифры, иначе false
*/
export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};

/**
* Валидация записи данных перед добавлением или обновлением
* @param data - объект данных, который нужно валидировать
* @returns Объект с результатами валидации
*/
export const validateRecord = (data: any): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!isNotEmpty(data.companySignatureName)) {
      errors.companySignatureName = 'Имя подписи компании не может быть пустым.';
  }

  if (!isNotEmpty(data.documentName)) {
      errors.documentName = 'Название документа не может быть пустым.';
  }

  if (!isNotEmpty(data.documentStatus)) {
      errors.documentStatus = 'Статус документа не может быть пустым.';
  }

  if (!isNotEmpty(data.documentType)) {
      errors.documentType = 'Тип документа не может быть пустым.';
  }

  if (!isNumeric(data.employeeNumber)) {
      errors.employeeNumber = 'Номер сотрудника должен содержать только цифры.';
  }

  if (!isISODate(data.companySigDate)) {
      errors.companySigDate = 'Дата подписи компании должна быть в формате ISO.';
  }

  if (!isISODate(data.employeeSigDate)) {
      errors.employeeSigDate = 'Дата подписи сотрудника должна быть в формате ISO.';
  }

  if (!isNotEmpty(data.employeeSignatureName)) {
      errors.employeeSignatureName = 'Имя подписи сотрудника не может быть пустым.';
  }

  return errors;
};
