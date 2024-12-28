import React, { useState } from "react";
import { Editor } from "primereact/editor";

export default function TextEditor(value, ) {
    const [text, setText] = useState('');

    return (
        <div className="card">
          {text}
        </div>
    )
}