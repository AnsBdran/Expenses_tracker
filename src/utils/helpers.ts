import { addToDBType, removeFromDBType } from './types';

export const addToDB: addToDBType = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromDB: removeFromDBType = (key) => {
  localStorage.removeItem(key);
};

export const getFromDB = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};
