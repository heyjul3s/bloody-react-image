import * as utils from './utils';

describe('Utils', () => {
  test('isString', () => {
    expect(utils.isString('1')).toBe(true);
  });

  test('isNonEmptyString', () => {
    expect(utils.isNonEmptyString('This is not an empty string')).toBe(true);
  });
});
