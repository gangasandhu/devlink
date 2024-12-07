import { atom } from 'recoil';

export const postsState = atom({
  key: 'postsState', // Unique key for this atom
  default: [], // Default value is an empty array since there are no posts initially
});
