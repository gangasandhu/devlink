import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import languageOptions from '../constants/languageOptions';

const EditorConfig = ({ language, handleLanguageChange, changeTheme }) => {
        
    const [theme, setTheme] = useState('dark'); // State for theme

    const handleThemeChange = (selectedOption) => {
        setTheme(selectedOption.value);
        changeTheme(selectedOption.value); // Notify parent about theme change
        document.documentElement.classList.toggle('dark', selectedOption.value === 'dark');
    };

    const themeOptions = [
        { value: 'light', label: 'Light Mode' },
        { value: 'dark', label: 'Dark Mode' },
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? theme === 'dark'
                    ? '#374151'
                    : '#e5e7eb'
                : 'transparent',
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
        singleValue: (base) => ({
            ...base,
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
    };

    return (
        <div
            className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'
                }`}
        >
            {/* Language Selection */}
            <div className='flex gap-2'>
                <div>
                    <Select
                        placeholder="Select Language"
                        options={languageOptions}
                        styles={customStyles}
                        defaultValue={language}
                        value={language}
                        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                    />
                </div>
                <div className="w-48">
                    <Select
                        options={themeOptions}
                        defaultValue={themeOptions[1]}
                        onChange={handleThemeChange}
                        styles={customStyles}
                        isSearchable={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorConfig;
