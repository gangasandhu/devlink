import { atom } from 'recoil';

export const postsState = atom({
  key: 'postsState', // Unique key for this atom
  default: [], // Use the selector as the default value
});
