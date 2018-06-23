import uniq from 'lodash.uniq';

export const flatten = arrayOfArrays =>
  arrayOfArrays.reduce((a, b) => a.concat(b), []);

export const cleanArray = a => uniq(a.filter(n => n));

export const getFirstFromSingleElementArray = (array = []) =>
  array.length === 1 ? array[0] : null;

export const getFirstFromSingleElementArrayNotNull = (array = []) =>
  array.length === 1 ? array[0] : {};

export const isEmptyOrNull = value => value == null || value.length === 0;
export const isNotEmptyOrNull = value => !isEmptyOrNull(value);

export const truncateString = (string, max = 30) =>
  string.substr(0, max - 1) + (string.length > max ? '...' : '');

export const omitDeepArrayWalk = (arr, key) =>
  arr.map(val => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    // eslint-disable-next-line
    else if (typeof val === 'object') return omitDeep(val, key);
    return val;
  });

export const omitDeep = (obj, key) => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach(i => {
    if (i !== key) {
      const val = obj[i];
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === 'object' && val !== null)
        newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
};
