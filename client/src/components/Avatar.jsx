import React, { useEffect, useState } from "react";

const Avatar = ({ size = "medium", name, onClick }) => {
  // Define size classes based on the `size` prop
  const sizeClasses = {
    small: "h-8 w-8 text-sm",
    medium: "h-10 w-10 text-base",
    large: "h-16 w-16 text-xl",
    xlarge: "h-24 w-24 text-3xl",
  };

  // Predefined color palette for letters A-Z
  const letterColors = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-gray-500",
    K: "bg-lime-500",
    L: "bg-cyan-500",
    M: "bg-rose-500",
    N: "bg-amber-500",
    O: "bg-fuchsia-500",
    P: "bg-emerald-500",
    Q: "bg-violet-500",
    R: "bg-sky-500",
    S: "bg-stone-500",
    T: "bg-red-700",
    U: "bg-blue-700",
    V: "bg-green-700",
    W: "bg-yellow-700",
    X: "bg-purple-700",
    Y: "bg-pink-700",
    Z: "bg-indigo-700",
  };

  // State for background color
  const [bgColor, setBgColor] = useState("bg-gray-500"); // Default color

  // Assign a color based on the first letter of the name
  useEffect(() => {
    if (name && name[0]) {
      const firstLetter = name[0].toUpperCase();
      setBgColor(letterColors[firstLetter] || "bg-gray-500"); // Fallback color
    }
  }, [name]);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${bgColor} text-white font-bold cursor-pointer ${sizeClasses[size]}`}
      title={name}
      onClick={onClick}
    >
      {name ? name[0].toUpperCase() : "?"}
    </div>
  );
};

export default Avatar;
