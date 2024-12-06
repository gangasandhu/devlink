import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getPostById } from "../services/postsApi.js";

const ViewPost = ({posts}) => {
  const { id } = useParams();
 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);


  useEffect(() => {
    
   
    const post = getPostById(posts, parseInt(id))
    setPost(post);

    // Fetch comments for the post from the backend
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments`);
        const comments = response.data

        setComments(comments.filter((comment) => comment.postID === parseInt(id)));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (post) {
      fetchComments();
    }
    
  
    
  }, []);

  // TODO: connect to backend
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      {post && <BlogPost post={post} comments={comments} setComments={setComments} />}
    </div>
  );
};

export default ViewPost;
