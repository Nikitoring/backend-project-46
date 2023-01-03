import { test, expect } from '@jest/globals';
import getDiff from '../index.js';

test('get diff between JSON files', () => {
  const excectObject = `{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`;
  const result = getDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
  expect(result).toBe(excectObject);
});
