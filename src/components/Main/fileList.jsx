import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X, File } from "lucide-react";

function FileList({ files, setFiles, isDarkMode }) {
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`rounded-md ${isDarkMode ? "bg-[#2c2c2c]" : "bg-gray-100"}`}
    >
      {files.map((file, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 ${
            index > 0 ? "border-t" : ""
          } ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <File className="h-4 w-4" />
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
            <Select>
              <SelectTrigger
                className={`w-[100px] ${
                  isDarkMode ? "bg-[#3c3c3c] text-gray-100" : ""
                }`}
              >
                <SelectValue placeholder="..." />
              </SelectTrigger>
              <SelectContent
                className={isDarkMode ? "bg-[#3c3c3c] text-gray-100" : ""}
              >
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">DOC</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={() => removeFile(index)}
              className={`p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList;
