// src/components/Message.jsx
import React from "react";

const Message = ({ type, message, onClose }) => {
  if (!message) return null;

  const typeStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  return (
    <div
      className={`border ${typeStyles[type]} px-4 py-3 rounded relative mb-4`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          className="fill-current h-6 w-6 text-gray-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414 7.066 14.35a1 1 0 11-1.414-1.415l2.933-2.933-2.933-2.933a1 1 0 111.414-1.414L10 8.586l2.934-2.933a1 1 0 011.414 1.414L11.414 10l2.933 2.934a1 1 0 010 1.415z" />
        </svg>
      </button>
    </div>
  );
};

export default Message;
