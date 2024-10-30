import React, { useState } from "react";
import { X, MoreHorizontal, Download, Loader2 } from "lucide-react";
import SelectMenu from "./SelectMenu";
import FileUtil from "@/utils/FileUtil";
const fileUtil = new FileUtil();

function FileList({ files, setFiles, isDarkMode, isConverting }) {
  const [activeFileIndex, setActiveFileIndex] = useState(null);

  const removeFile = (index) => {
    const file = files[index];
    if (file.convertedUrl) {
      URL.revokeObjectURL(file.convertedUrl);
    }
    setFiles(files.filter((_, i) => i !== index));
    setActiveFileIndex(null);
  };

  const handleFormatSelect = (index, format) => {
    const updatedFiles = [...files];
    updatedFiles[index] = {
      ...updatedFiles[index],
      convertTo: format,
      isConverted: false,
      convertedUrl: null,
      convertedFileName: null,
      error: null,
    };
    setFiles(updatedFiles);
    setActiveFileIndex(null);
  };

  const handleDownload = (file) => {
    if (!file.convertedUrl || !file.convertedFileName) return;

    const link = document.createElement("a");
    link.href = file.convertedUrl;
    link.download = file.convertedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClickOutside = () => {
    setActiveFileIndex(null);
  };

  const toggleSelectMenu = (index) => {
    if (isConverting || files[index].isConverted || files[index].error) return;
    setActiveFileIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={`rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      {files.map((file, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between p-3 ${
            index > 0 ? "border-t" : ""
          } ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              📄
            </div>
            <div>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {file.name}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {(file.size / 1024).toFixed(2)} KB
                {file.error && (
                  <span className="text-red-500 ml-2">{file.error}</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {file.isConverting ? (
              <button
                disabled
                className={`px-3 py-1 rounded flex items-center ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Converting...
              </button>
            ) : file.isConverted ? (
              <button
                onClick={() => handleDownload(file)}
                className={`px-3 py-1 rounded flex items-center ${
                  isDarkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            ) : !file.error ? (
              <button
                onClick={() => toggleSelectMenu(index)}
                disabled={isConverting}
                className={`px-3 py-1 rounded flex items-center ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-200 text-gray-800"
                } ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="mr-2">
                  {file.convertTo ? file.convertTo.toUpperCase() : "Select"}
                </span>
                <MoreHorizontal className="h-4 w-4" />
              </button>
            ) : null}
            <button
              onClick={() => removeFile(index)}
              disabled={isConverting}
              className={`p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {activeFileIndex === index &&
            !isConverting &&
            !file.isConverted &&
            !file.error && (
              <div className="absolute right-0 top-full mt-2 z-10">
                <SelectMenu
                  onFormatSelect={(format) => handleFormatSelect(index, format)}
                  onClickOutside={handleClickOutside}
                  isDarkMode={isDarkMode}
                  fileType={file.type}
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

export default FileList;
