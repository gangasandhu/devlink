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

const CodePage = () => {
  const user = useRecoilValue(userState);
  const [value, setValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const fetchSavedCode = async () => {
      try {
        const response = await axios.get("http://localhost/cpsc2221/code");
        const allCodes = response.data;
        const userCodes = allCodes.filter(
          (code) => code.userID === user.userID
        );
        if (userCodes.length > 0) {
          setValue(userCodes[userCodes.length - 1].content);
        }
      } catch (error) {
        console.error("Failed to fetch saved codes:", error);
      }
    };

    if (user) {
      // fetchSavedCode();
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
        showSuccessToast(`Compiled Successfully!`);
      }
    } catch (error) {
      console.error(error);
      setProcessing(false);
      showErrorToast();
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme === "dark" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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

  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong!`, {
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
      className={`min-h-screen p-8 flex flex-col ${
        theme === "dark" ? "bg-neutral-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer />
        <EditorConfig
          handleLanguageChange={handleLanguageChange}
          changeTheme={changeTheme}
          theme={theme}
        />
      <main className="flex-grow p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2 flex flex-col">
          <CodeEditor
            handleEditorChange={handleEditorChange}
            selectedLanguage={selectedLanguage.value}
            value={value}
            theme={theme}
          />
          <button
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={runCode}
            disabled={processing}
          >
            {processing ? "Running..." : "Run Code"}
          </button>
        </section>
        <section className="flex flex-col space-y-4">
          <OutputBox outputDetails={outputDetails} processing={processing} theme={theme}/>
        </section>
      </main>
    </div>
  );
};

export default CodePage;
