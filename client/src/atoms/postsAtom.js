import { atom, selector } from 'recoil';
import axios from 'axios';

// Selector to fetch posts using Axios
export const postsSelector = selector({
  key: 'postsSelector', // Unique key for this selector
  get: async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts'); // Replace with your actual API endpoint
      return response.data; // Axios returns the response in a `data` field
    } catch (error) {
      console.error('Error loading posts:', error);
      return []; // Fallback to an empty array in case of an error
    }
  },
});

// Atom with default value from the selector
export const postsState = atom({
  key: 'postsState', // Unique key for this atom
  default: postsSelector, // Use the selector as the default value
});
