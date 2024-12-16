import { useRecoilState } from 'recoil';
import { postsState } from './postsAtom';
import axios from 'axios';

// Custom hook for managing posts
export const usePosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Error loading posts:', err);
    }
  };

  // Function to add a new post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('Failed to add the post. Please try again.');
    }
  };

  // Function to delete a post
  const deletePost = async (postID) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:3000/posts/${postID}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postID));
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  // Function to get all posts by a user
  const getPostsByUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts?userId=${userId}`);
      return response.data; // Returns the posts for the specified user
    } catch (error) {
      console.error('Failed to fetch posts by user:', error);
      alert('Failed to fetch posts. Please try again.');
      return [];
    }
  };

  const getPostById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      return response.data; // Returns the posts for the specified user
    } catch (error) {
      console.error('Failed to fetch the post:', error);
      alert('Failed to fetch the post. Please try again.');
      return [];
    }
  };

  // Function to update a post
  const updatePost = async (id, updatedPost) => {
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, updatedPost);

      // Update the local Recoil state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === parseInt(id) ? { ...post, ...updatedPost } : post
        )
      );
    } catch (error) {
      console.error('Failed to update post:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };

  return {
    posts,
    fetchPosts,
    addPost,
    deletePost,
    setPosts, // If you need to set posts directly in certain scenarios
    getPostsByUser,
    getPostById,
    updatePost,
  };
};
