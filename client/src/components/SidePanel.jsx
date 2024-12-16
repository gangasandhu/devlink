import React from "react";
import { MdDelete } from "react-icons/md";

const SidePanel = ({ isOpen, userCodes, handleFileClick, handleNewFile, closePanel, handleDeleteFile }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            style={{ width: "480px", zIndex: 1000 }}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-2xl font-semibold">Your Files</h2>
                    <button
                        onClick={closePanel}
                        className="text-gray-400 hover:text-gray-200 text-lg"
                    >
                        &times; {/* Close Icon */}
                    </button>
                </div>

                {/* File List */}
                <ul className="flex-grow overflow-y-auto p-4 space-y-4">
                    {userCodes.length > 0 ? (
                        userCodes.map((userCode) => (
                            <li
                                key={userCode.id}
                                className="p-4 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                            >
                                <div onClick={() => { handleFileClick(userCode); closePanel(); }} className="flex-1">
                                    <h3 className="text-lg font-bold">{userCode.title || "Untitled"}</h3>
                                    <p className="text-sm text-gray-400">Language: {userCode.language}</p>
                                    <p className="text-xs text-gray-500">
                                        Last Edited: {new Date(userCode.datePublished).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the file click
                                        handleDeleteFile(userCode.id);
                                    }}
                                    className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
                                >
                                    <MdDelete size={24}/>
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No files available. Create a new file!</p>
                    )}
                </ul>



                {/* Footer */}
                <div className="p-4 bg-gray-800">
                    <button
                        onClick={() => { handleNewFile(); closePanel() }}
                        className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 w-full"
                    >
                        New File
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
