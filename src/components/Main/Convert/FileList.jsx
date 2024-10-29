import React, { useState } from "react";
import { X, MoreHorizontal } from "lucide-react";
import SelectMenu from "./SelectMenu";
import FileUtil from "@/utils/FileUtil";
const fileUtil = new FileUtil();

function FileList({ files, setFiles, isDarkMode }) {
  const [activeFileIndex, setActiveFileIndex] = useState(null);

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setActiveFileIndex(null);
  };

  const handleFormatSelect = (index, format) => {
    const updatedFiles = [...files];
    updatedFiles[index].convertTo = format;
    setFiles(updatedFiles);
    setActiveFileIndex(null);
  };

  const handleClickOutside = () => {
    setActiveFileIndex(null);
  };

  const toggleSelectMenu = (index) => {
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
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSelectMenu(index)}
              className={`px-3 py-1 rounded flex items-center ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="mr-2">
                {file.convertTo ? file.convertTo.toUpperCase() : "Select"}
              </span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeFile(index)}
              className={`p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {activeFileIndex === index && (
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
