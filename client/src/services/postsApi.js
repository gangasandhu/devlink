// Function to get a post by its ID
export const getPostById = (posts, postId) => {
    return posts.find((post) => post.postID === postId) || null;
  };
  
  // Function to get all posts created by a specific user
  export const getPostsByUserId = (posts, userId) => {
    return posts.filter((post) => post.userID === userId);
  };
  
  // Function to delete a post by its ID
  export const deletePostById = (posts, setPosts, postId) => {
    const updatedPosts = posts.filter((post) => post.postID !== postId);
    setPosts(updatedPosts);
  };
  
  // Function to edit a post
  export const editPostById = (posts, setPosts, postId, newContent) => {
    const updatedPosts = posts.map((post) =>
      post.postID === postId
        ? { ...post, content: newContent }
        : post
    );
    setPosts(updatedPosts);
  };
  