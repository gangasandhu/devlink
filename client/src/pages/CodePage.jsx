import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import OutputBox from '../components/OutputBox';
import { getOutputStatus, getOutputToken } from '../services/compileApi';
import languageOptions from '../constants/languageOptions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorConfig from '../components/EditorConfig';
import '../styles/home.css';
import axios from 'axios';
import { useUser } from "../context/UserContext";


const CodePage = () => {
  // code editor states
  const { user } = useUser();
  const [value, setValue] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("");

  useEffect(() => {
    const fetchSavedCode = async () => {
      try {
        // Fetch all codes from the backend
        const response = await axios.get("http://localhost/cpsc2221/code");
        const allCodes = response.data;
        console.log(allCodes)
        // Filter by the current user's userID and sort by most recent
        const userCodes = allCodes
          .filter((code) => code.userID === user.userID); // Assuming `dateSaved` exists

          console.log(userCodes)
        // Set the value to the most recent code, if available
        if (userCodes.length > 0) {
          setValue(userCodes[userCodes.length - 1].content); // Assuming `codeContent` is the code field
        }
      } catch (error) {
        console.error("Failed to fetch saved codes:", error);
      }
    };

    if (user) {
      fetchSavedCode();
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
      console.log(error);
      setProcessing(false);
    }
  };

  const getSubmission = async (token) => {
    try {
      let response = await getOutputStatus(token);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          getSubmission(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (error) {
      console.error(error);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div data-testid="website" className="p-4 bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-between items-center mb-4">
        <EditorConfig handleLanguageChange={handleLanguageChange} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={runCode}
        >
          Run
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <CodeEditor
            handleEditorChange={handleEditorChange}
            selectedLanguage={selectedLanguage.value}
            value={value}
          />
        </div>
        <div>
          <OutputBox outputDetails={outputDetails} processing={processing} />
        </div>
      </div>
    </div>
  );
};

export default CodePage;
