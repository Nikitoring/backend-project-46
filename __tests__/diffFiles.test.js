import { describe, test, expect } from '@jest/globals';
import getDiff from '../index.js';

describe('get diff YAML files', () => {
  test('passed files', () => {
    const excectObject = `{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`;
    const result = getDiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml');
    expect(result).toBe(excectObject);
  });
  test('passed empty file', () => {
    const excectObject = `{\n  + host: hexlet.io\n  + timeout: 20\n  + verbose: true\n}`;
    const result = getDiff('__tests__/__fixtures__/file-empty.yml', '__tests__/__fixtures__/file2.yml');
    expect(result).toBe(excectObject);
  });

  test('get diff between JSON files', () => {
    const excectObject = `{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`;
    const result = getDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
    expect(result).toBe(excectObject);
  });
});
