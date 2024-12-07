import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { postsState } from '../atoms/postsAtom';

const ViewPost = () => {
  const { id } = useParams();
  const posts = useRecoilValue(postsState); // Get posts from Recoil state

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Find the post by ID using the posts from Recoil
    const post = posts.find((post) => post.id === parseInt(id));
    setPost(post);

    // Fetch comments for the post from the backend
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments`);
        const comments = response.data;

        setComments(comments.filter((comment) => comment.postID === parseInt(id)));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    // if (post) {
    //   fetchComments();
    // }
  }, [id, posts]);

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      {post ? (
        <BlogPost post={post} comments={comments} setComments={setComments} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ViewPost;
