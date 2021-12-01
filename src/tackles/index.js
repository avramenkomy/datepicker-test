/** Инструменты для работы приложения  */
// export { default as validation } from "./validation"
// export { default as filters } from "./filters"

export function isFunction(functionToCheck) {
  /** Проверка на то что переменная является функцией */ 
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}


export function isString(value) {
  /** Проверка на то что переменная является строкой */ 
  return typeof value === 'string' || value instanceof String;
}

export function toIsoString(date) {
  /** Обьект Date в ISO текстовую переменную */
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}

export function objectIsEmpty(obj) {
  /** Проверка на пустоту объекта */
  for(var prop in obj) {
    // if(obj.hasOwnProperty(prop)) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export function convertDateToString(date) {
  /** Вернет объект date в формате строки 'YYYY-MM-DD' */
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function validateInput(val) {
  /** Вернет true если переданное значение это положительное число: целое или
   * с плавающей точкой, с точностью до 2-х знаков после запятой, 
   * в противном случае вернет false
   */
  const intTemplate = /^(0|[1-9]\d)$/; // /^(0|-?[1-9]\d)$/ - Шаблон для отрицательных чисел
  const floatTemplate = /^(0|[1-9]\d*)(\.[0-9]{1,2})?$/; // /^-?(0|[1-9]\d*)(\.[0-9]{1,2})?$/ - Шаблон для отрицательных чисел с плавающей точкой до 2-х знаков
  if (intTemplate.test(val) || floatTemplate.test(val)) {
    return true;
  } else {
    return false;
  }
}