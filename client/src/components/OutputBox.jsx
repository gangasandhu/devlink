import React from "react";

const OutputBox = ({ outputDetails, processing, theme }) => {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;
    if (statusId === 6) {
      return (
        <pre className="text-red-600 whitespace-pre-wrap break-words">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="text-green-600 whitespace-pre-wrap break-words">
          {atob(outputDetails?.stdout) || "No Output"}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="text-yellow-600 whitespace-pre-wrap break-words">
          Time Limit Exceeded
        </pre>
      );
    } else {
      return (
        <pre className="text-red-600 whitespace-pre-wrap break-words">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <div
      className={`shadow-md p-4 rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
      data-testid="output"
    >
      {/* Header */}
      <header className="mb-4">
        <h2 className="text-lg font-bold">
          {processing ? "Compiling..." : "Output"}
        </h2>
      </header>

      {/* Output Window */}
      <div
        className={`compiler p-4 rounded-lg overflow-auto ${
          theme === "dark"
            ? "bg-gray-900 text-gray-300 border-gray-700"
            : "bg-gray-100 text-gray-800 border-gray-300"
        }`}
        style={{ maxHeight: "200px" }}
        data-testid="status"
      >
        {outputDetails ? getOutput() : <p>No output available.</p>}
      </div>

      {/* Additional Details */}
      {outputDetails && (
        <>
          <hr className="my-4 border-gray-400" />
          <div className="output-details grid grid-cols-3 gap-4">
            <p className="text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  outputDetails?.status?.id === 3
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {outputDetails?.status?.description}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Memory:</span>{" "}
              <span className="text-blue-600">
                {outputDetails?.memory || "N/A"}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Time:</span>{" "}
              <span className="text-blue-600">
                {outputDetails?.time || "N/A"} sec
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OutputBox;
