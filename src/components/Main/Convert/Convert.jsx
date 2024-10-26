import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ArrowRight, Upload } from "lucide-react";
import FileList from "./FileList";

function Convert({ isDarkMode }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (newFiles) => {
    const processedFiles = Array.from(newFiles).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      convertTo: "",
    }));
    setFiles([...files, ...processedFiles]);
  };

  const handleConvert = () => {
    console.log("Converting files:", files);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  }, []);

  return (
    <div className="space-y-6 mt-6">
      {files.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg transition-colors ${
            isDarkMode
              ? "bg-gray-800 border-gray-600"
              : "bg-gray-100 border-gray-300"
          } ${isDragging ? "border-blue-500" : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Label
            htmlFor="file-upload"
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Drag & Drop Files or Click to Upload
          </Label>
          <Button
            onClick={() => document.getElementById("file-upload").click()}
            className={`px-8 py-6 text-lg ${
              isDarkMode
                ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]"
                : "bg-[#3c3c3c] hover:bg-[#4c4c4c]"
            } text-white`}
            size="lg"
          >
            <Upload className="mr-2 h-6 w-6" />
            Add Files
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end space-y-4 sm:space-y-0">
          <div className="space-y-2 w-full sm:w-auto">
            <Label
              htmlFor="file-upload"
              className={isDarkMode ? "text-gray-300 mr-4" : "mr-4"}
            >
              Upload Files
            </Label>
            <Button
              onClick={() => document.getElementById("file-upload").click()}
              className={`w-full  sm:w-auto ${
                isDarkMode ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]" : ""
              }`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add More Files
            </Button>
          </div>

          <Button
            onClick={handleConvert}
            className={`w-full sm:w-auto ${
              isDarkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            Convert <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <Input
        id="file-upload"
        type="file"
        multiple
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <FileList files={files} setFiles={setFiles} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}

export default Convert;
