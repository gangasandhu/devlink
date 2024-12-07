import { useRecoilState } from 'recoil';
import { postsState } from './postsAtom';
import axios from 'axios';

// Custom hook for managing posts
export const usePosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);

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

  return {
    posts,
    addPost,
    deletePost,
    setPosts, // If you need to set posts directly in certain scenarios
  };
};
