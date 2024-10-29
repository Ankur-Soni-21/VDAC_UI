// DragAndDrop.jsx
import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DragAndDrop({ 
  isDarkMode, 
  handleFileChange, 
  maxFiles, 
  currentFileCount, 
  errorMessage, 
  allowedFileTypes,
  allowedMimeTypes
}) {
  const [isDragging, setIsDragging] = useState(false);

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
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      allowedMimeTypes.includes(file.type)
    );
    handleFileChange(droppedFiles);
  }, [handleFileChange, allowedMimeTypes]);

  return (
    <div className="space-y-4">
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
          className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Drag & Drop Files or Click to Upload (Max {maxFiles - currentFileCount} more files)
        </Label>
        <Button
          onClick={() => {
            const fileInput = document.getElementById("file-upload");
            if (fileInput) fileInput.click();
          }}
          className={`px-8 py-6 text-lg ${
            isDarkMode
              ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]"
              : "bg-[#3c3c3c] hover:bg-[#4c4c4c]"
          } text-white`}
          size="lg"
          disabled={currentFileCount >= maxFiles}
        >
          <Upload className="mr-2 h-6 w-4" />
          Add Files
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          accept={allowedFileTypes.join(',')}
        />
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>File Upload Limit</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}