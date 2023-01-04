import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const loadJSON = (paths) => {
  const file = fs.readFileSync(new URL(path.resolve(process.cwd(), paths), import.meta.url));
  return JSON.parse(file);
};

const sortObject = (obj) => {
  const result = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      result[key] = obj[key];
    });
  return result;
};

const cloneAndSortJsonToObject = (obj) => {
  const loadJsonObj = loadJSON(obj);
  return sortObject(_.cloneDeep(loadJsonObj));
};

export default (file) => {
  if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
    const obj = _.cloneDeep(yaml.load(fs.readFileSync(file, 'utf8')));
    return sortObject(obj);
  }
  if (path.extname(file) === '.json') {
    return cloneAndSortJsonToObject(file);
  }
  return {};
};
