import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const loadJSON = (paths) => {
  const file = fs.readFileSync(new URL(path.resolve(process.cwd(), paths), import.meta.url));
  return JSON.parse(file);
};

const cloneAndSortJsonToObject = (obj) => {
  const result = {};
  const loadJsonObj = loadJSON(obj);
  const clone = _.cloneDeep(loadJsonObj);
  Object.keys(clone)
    .sort()
    .forEach((key) => {
      result[key] = loadJsonObj[key];
    });
  return result;
};

export default (file1, file2) => {
  const cloneFile1 = cloneAndSortJsonToObject(file1);
  const cloneFile2 = cloneAndSortJsonToObject(file2);
  const result = {};
  Object.entries(cloneFile1).forEach(([key, value]) => {
    if (Object.hasOwn(cloneFile2, key)) {
      if (value === cloneFile2[key]) {
        result[key] = value;
      }
      if (value !== cloneFile2[key]) {
        result[`- ${key}`] = value;
        result[`+ ${key}`] = cloneFile2[key];
      }
    } else {
      result[`- ${key}`] = value;
    }
  });
  Object.entries(cloneFile2).forEach(([key, value]) => {
    if (!Object.hasOwn(result, key)) {
      result[`+ ${key}`] = value;
    }
  });
  let strResult = '{';
  Object.entries(result).forEach(([key, value]) => {
    strResult += `\n  ${key}: ${value}`;
  });
  strResult += '\n}';
  return strResult;
};
