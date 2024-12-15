import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import OutputBox from "../components/OutputBox";
import { getOutputStatus, getOutputToken } from "../services/compileApi";
import languageOptions from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorConfig from "../components/EditorConfig";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import SidePanel from "../components/SidePanel";
// import SlidingPanel from 'react-sliding-side-panel';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const CodePage = () => {
  const user = useRecoilValue(userState);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState(""); // New title state
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState({});
  const [userCodes, setUserCodes] = useState([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  useEffect(() => {
    const fetchSavedCodes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/codes/user/${user.id}`);
        const codes = response.data;

        setUserCodes(codes); // Store fetched codes

        if (codes.length > 0) {
          const recentCode = codes[0]; // Most recent code
          setValue(recentCode.content);
          setCode(recentCode);
          setTitle(recentCode.title || "Untitled");
          setSelectedLanguage(
            languageOptions.find((lang) => lang.value === recentCode.language) || languageOptions[0]
          );
        } else {
          setTitle("Untitled");
        }
      } catch (error) {
        console.error("Failed to fetch saved codes:", error);
      }
    };

    if (user) {
      fetchSavedCodes();
    }
  }, [user]);

  const handleEditorChange = (value) => {
    setValue(value);
  };

  const handleLanguageChange = (langObj) => {
    setValue(`// write your ${langObj.value} code here`);
    setSelectedLanguage(langObj);
  };

  const runCode = async () => {
    setOutputDetails("");
    await compileCode(value, selectedLanguage.id, customInput);
  };

  const compileCode = async (sourceCode, languageId, customInput) => {
    setProcessing(true);
    try {
      const token = await getOutputToken(sourceCode, languageId, customInput);
      getSubmission(token);
    } catch (error) {
      console.error(error);
      setProcessing(false);
    }
  };

  const getSubmission = async (token) => {
    try {
      const response = await getOutputStatus(token);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          getSubmission(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully!");
      }
    } catch (error) {
      console.error(error);
      setProcessing(false);
      showErrorToast();
    }
  };

  const saveCode = async () => {
    if (!title.trim() || title === "Untitled") {
      showErrorToast("Please provide a title for the code!");
      return;
    }

    const updatedCode = {
      userId: user.id,
      content: value,
      language: selectedLanguage.value,
      datePublished: new Date().toISOString(),
      title: title.trim(),
    };

    try {
      if (code.id) {
        // Update the existing code
        const response = await axios.put(`http://localhost:3000/codes/${code.id}`, updatedCode);
        showSuccessToast("Code updated successfully!");
        // Update the corresponding code in userCodes
        setUserCodes((prevCodes) =>
          prevCodes.map((c) => (c.id === code.id ? { ...response.data } : c))
        );
      } else {
        // Save a new code
        const response = await axios.post(`http://localhost:3000/codes`, updatedCode);
        setCode(response.data); // Save the new code's data (including its ID)
        showSuccessToast("Code saved successfully!");

        // Add the new code to userCodes
        setUserCodes((prevCodes) => [response.data, ...prevCodes]);

      }
    } catch (error) {
      console.error("Failed to save/update the code:", error);
      showErrorToast("Failed to save/update the code. Please try again.");
    }
  };

  const handleNewFile = () => {
    setValue(""); // Clear the editor content
    setTitle("Untitled"); // Reset the title to "Untitled"
    setCode({}); // Clear the current code state
    setSelectedLanguage(languageOptions[0]); // Reset the language to the default
  };

  const handleFileClick = (clickedCode) => {
    setValue(clickedCode.content);
    setCode(clickedCode);
    setTitle(clickedCode.title);
    setSelectedLanguage(
      languageOptions.find((lang) => lang.value === clickedCode.language) || languageOptions[0]
    );
  };

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/codes/${id}`);
      setUserCodes((prevCodes) => prevCodes.filter((code) => code.id !== id)); // Update local state
      showSuccessToast("File deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the file:", error);
      showErrorToast("Failed to delete the file. Please try again.");
    }
  };
  

  const changeTheme = (newTheme) => {
    setTheme(newTheme === "dark" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const showSuccessToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className={`min-h-screen px-8 flex flex-col ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-gray-100 text-gray-900"
        }`}
    >
      <ToastContainer />

      <SidePanel
        isOpen={sidePanelOpen}
        closePanel={() => setSidePanelOpen(false)}
        userCodes={userCodes}
        handleFileClick={handleFileClick}
        handleNewFile={handleNewFile}
        handleDeleteFile={handleDeleteFile}
      />

      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 border-b border-gray-300">
        <button
          onClick={() => setSidePanelOpen((prev) => !prev)}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Files
        </button>
        <EditorConfig
          language={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
          changeTheme={changeTheme}
          theme={theme}
        />
      </header>
      <main className="flex-grow p-4">
        {/* Top Bar */}
        <div
          className={` flex flex-col md:flex-row justify-between md:items-center mb-4 shadow rounded-md m-3 p-3 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
          {/* Left Section */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="title" className="font-medium">
              File:
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className={`px-3 py-1 border rounded w-48 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                }`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleNewFile}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                New
              </button>
              <button
                onClick={saveCode}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>

          {/* Right Section */}
          <button
            onClick={runCode}
            disabled={processing}
            className={`px-4 py-1 rounded transition ${processing
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-blue-600"
              }`}
          >
            {processing ? "Running..." : "Run"}
          </button>
        </div>

        {/* Main Content: Editor and Output */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Editor Section */}
          <div className={`p-4 col-span-2 rounded ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-gray-900"}`}>
            <CodeEditor
              handleEditorChange={handleEditorChange}
              selectedLanguage={selectedLanguage.value}
              value={value}
              theme={theme}
            />
          </div>

          {/* Output Section */}
          <div className={`p-4 rounded ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-gray-900"}`}>
            <OutputBox outputDetails={outputDetails} processing={processing} theme={theme} />
          </div>
        </div>
      </main>


    </div>
  );
};

export default CodePage;
