export const isString = (arg: any): boolean =>
  Object.prototype.toString.call(arg) === '[object String]';

export const isNonEmptyString = (arg: any): boolean =>
  isString(arg) && arg.trim() !== '';
