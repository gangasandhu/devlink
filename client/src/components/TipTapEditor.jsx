import React, { useState } from "react";
import { Editor } from "primereact/editor";

export default function TipTapEditor() {
    const [text, setText] = useState('');

    return (
        <div className="card">
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ minHeight: '320px' }} />
        </div>
    )
}