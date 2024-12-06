import React from 'react';
import Select from 'react-select';
import languageOptions from '../constants/languageOptions';
import { customStyles } from '../constants/customStyles';
import '../styles/editor-config.css';

const EditorConfig = ({ handleLanguageChange }) => {
    return (
        <div className='editor-config d-flex mb-4'>
            <div className='me-4' data-testid='language'>
                <label className="form-label text-black" htmlFor="languageSelect">Select Language:</label>
                <div data-testid='language-tab'>
                    <Select
                        placeholder="Filter By Category"
                        options={languageOptions}
                        styles={customStyles}
                        defaultValue={languageOptions[0]}
                        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorConfig;
