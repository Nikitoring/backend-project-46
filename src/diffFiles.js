import parsers from './parsers.js';

export default (file1, file2) => {
  const cloneFile1 = parsers(file1);
  const cloneFile2 = parsers(file2);
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
