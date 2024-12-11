import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar"; // Importing the Avatar component

const Comments = ({ comments, addComment }) => {
  const [newComment, setNewComment] = useState(""); // Local state for new comment

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    addComment(newComment);
    setNewComment(""); // Clear input
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

      {/* Comment Input */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Comments List */}
      <ul className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm flex items-start gap-4"
            >
              {/* Avatar */}
              <Avatar size="small" name={comment.username} />

              {/* Comment Details */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <Link to={`/profile/${comment.userId}`} className="text-gray-800 font-semibold">
                    {comment.username}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.datePublished).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
