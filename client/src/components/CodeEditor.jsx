import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ selectedLanguage, handleEditorChange, value }) => {
    return (
        <div>
            <div className="shadow-md p-4 rounded-lg bg-white">
                <p className="text-gray-600 text-left mt-4">Code Editor</p>
                <div data-testid="editor">
                    <Editor
                        height="60vh"
                        width="100%"
                        language={selectedLanguage}
                        value={value}
                        theme="light"
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
