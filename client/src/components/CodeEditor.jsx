import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ selectedLanguage, handleEditorChange, value, theme }) => {
  return (
    <div
      className={`shadow-md p-4 rounded-lg ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <header
        className={`flex items-center justify-between mb-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        <h2 className="text-lg font-bold">Code Editor</h2>
        <p className="text-sm italic">
          Language: <span className="font-semibold">{selectedLanguage}</span>
        </p>
      </header>
      <div
        data-testid="editor"
        className={`border ${
          theme === "dark"
            ? "border-gray-700 rounded bg-neutral-900"
            : "border-gray-300 rounded bg-gray-100"
        }`}
      >
        <Editor
          height="60vh"
          width="100%"
          language={selectedLanguage}
          value={value}
          theme={theme === "dark" ? "hc-black" : "vs"}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
