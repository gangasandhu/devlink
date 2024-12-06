import React from 'react';
import '../styles/output.css';

const OutputBox = ({ outputDetails, processing }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;
        if (statusId === 6) {
            // compilation error
            return (
                <pre className="text-red-600">
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre>
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="text-red-600">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="text-red-600">
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };

    return (
        <div className="shadow-md p-4 rounded-lg bg-white" data-testid="output">
            <p className="text-gray-600 text-left mt-4">Compiler</p>
            <div className="compiler text-black bg-gray-100 p-4 rounded-lg" data-testid="status">
                $ {processing && "\nCompiling the code..."}
                <div className="output-window mt-2">
                    {outputDetails ? <>{getOutput()}</> : null}
                </div>
                <hr className="my-4 border-gray-300" />
                {outputDetails && (
                    <div className="output-window pt-3">
                        <div className="flex justify-between" data-testid="output">
                            <p data-testid="status">
                                Status:{" "}
                                <span className="text-green-600">
                                    {outputDetails?.status?.description}
                                </span>
                            </p>
                            <p>
                                Memory:{" "}
                                <span className="text-green-600">
                                    {outputDetails?.memory}
                                </span>
                            </p>
                            <p>
                                Time:{" "}
                                <span className="text-green-600">
                                    {outputDetails?.time}
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutputBox;
