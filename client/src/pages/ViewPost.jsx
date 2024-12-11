import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { postsState } from '../atoms/postsAtom';
import { useFollowers } from "../atoms/useFollowers";

const ViewPost = () => {
  const { id } = useParams();
  const posts = useRecoilValue(postsState); // Get posts from Recoil state
  const { followersState, toggleFollow } = useFollowers();


  const [post, setPost] = useState(null);

  useEffect(() => {
    // Find the post by ID using the posts from Recoil
    const post = posts.find((post) => post.id === parseInt(id));
    setPost(post);

  }, [id, posts]);

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      {post ? (
        <BlogPost post={post} isFollowing={followersState.following.some((f) => f.id === post.userId)}
        toggleFollow={toggleFollow}/>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ViewPost;
