import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const loadJSON = (paths) => JSON.parse(fs.readFileSync(new URL(path.resolve(process.cwd(), paths), import.meta.url)));

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

const getDiff = (file1, file2) => {
  const extName1 = path.extname(file1);
  const extName2 = path.extname(file2);
  if (extName1 !== extName2 || extName2 !== '.json' || extName1 !== '.json') {
    throw new Error('only json files');
  }
  const cloneFile1 = cloneAndSortJsonToObject(file1);
  const cloneFile2 = cloneAndSortJsonToObject(file2);
  const result = {};
  for (const [key, value] of Object.entries(cloneFile1)) {
    if (cloneFile2.hasOwnProperty(key)) {
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
  }
  for (const [key, value] of Object.entries(cloneFile2)) {
    if (!result.hasOwnProperty(key)) {
      result[`+ ${key}`] = value;
    }
  }
  let strResult = '{';
  Object.entries(result).forEach(([key, value]) => {
    strResult += `\n   ${key}: ${value}`;
  });
  strResult += '\n}';
  return strResult;
};

export { getDiff };
