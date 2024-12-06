import React from "react";
import { useUser } from "../context/UserContext";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useUser(); // Fetch user data from context

  // Example friends data
  const friends = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ];

  if (!user) {
    return <p className="text-center text-gray-500">User not logged in</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6">
      {/* User Card */}
      <div className="flex items-center bg-white shadow-lg rounded-lg p-6 mb-8">
        {/* Avatar on the Left */}
        <Avatar name={user.name} size="lg" />

        {/* User Details and Button on the Right */}
        <div className="ml-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <Link
            to="/user-posts"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
          >
            View Blog Posts
          </Link>
        </div>
      </div>
      
      {/* Friends Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Friends</h2>
        {friends.length > 0 ? (
          <ul className="space-y-4">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow"
              >
                <Avatar name={friend.name} />
                <p className="text-gray-700 font-medium">{friend.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No friends found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
