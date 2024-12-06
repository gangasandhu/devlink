import React from "react";

const Avatar = ({ name }) => {
  // Generate a random color for the avatar background
  const randomColor = () => {
    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];
    return colors[name.charCodeAt(0) % colors.length]; // Deterministic randomization
  };

  return (
    <div
      className={`h-20 w-20 flex items-center justify-center rounded-full text-white text-2xl font-bold ${randomColor()}`}
      title={name}
    >
      {name[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
