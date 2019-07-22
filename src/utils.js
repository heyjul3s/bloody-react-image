export const isString = arg =>
  Object.prototype.toString.call(arg) === '[object String]';

export const isNonEmptyString = arg => isString(arg) && arg.trim() !== '';
