import { describe, test, expect } from '@jest/globals';
import parsers from '../src/parsers';

describe('parsers', () => {
  test('passed file', () => {
    const excectObject = {
      follow: false,
      host: 'hexlet.io',
      proxy: '123.234.53.22',
      timeout: 50
    };
    const result = parsers('__tests__/__fixtures__/file1.yml');
    expect(result).toStrictEqual(excectObject);
  });
  test(`passed empty file`, () => {
    const excectObject = {};
    const result = parsers('__tests__/__fixtures__/file-empty.yml');
    expect(result).toEqual(excectObject);
  });
  test(`passed md file`, () => {
    const excectObject = {};
    const result = parsers('__tests__/__fixtures__/file1.md');
    expect(result).toEqual(excectObject);
  });
});
