import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const HomePost = ({ post }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    }
    return text;
  };

  const maxLength = 140;

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <Avatar name={post.username} />
          {/* User Info */}
          <Link to={`/profile/${post.userId}`}>
            <h1 className="text-sm font-semibold text-gray-800">{post.username}</h1>
            <p className="text-xs text-gray-500">{post.email}</p>
          </Link>
        </div>
        <p className="text-xs text-gray-500">{new Date(post.datePublished).toLocaleDateString()}</p>
      </div>

      {/* Post Content */}
      <Link to={`/post/${post.id}`}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
        <p className="text-sm text-gray-700 mt-2">{truncateText(post.content, maxLength)}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
          Read more
        <p>{post.commentsCount || 0} comments</p>
      </div>
      </Link>
    </div>
  );
};

export default HomePost;
