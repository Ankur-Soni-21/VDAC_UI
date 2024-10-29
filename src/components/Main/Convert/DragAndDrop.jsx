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
  maxSize,
  currentFileCount,
  fileLimitError,
  fileSizeError,
  setFileLimitError,
  setFileSizeError,
  allowedFileTypes,
  allowedMimeTypes,
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

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      const remainingSlots = maxFiles - currentFileCount;
      const filesToAdd = droppedFiles.slice(0, remainingSlots);
      const rejectedFiles = droppedFiles.length - filesToAdd.length;

      const validFiles = filesToAdd.filter((file) => file.size <= maxSize);

      handleFileChange(validFiles);

      if (rejectedFiles > 0) {
        setFileLimitError(
          `Only ${filesToAdd.length} file(s) were added. ${rejectedFiles} file(s) were rejected as the maximum limit of ${maxFiles} files has been reached.`
        );
        setTimeout(() => setFileLimitError(""), 7000);
      }

      if (validFiles.length < filesToAdd.length) {
        setFileSizeError(
          `Some files were rejected because they exceed the maximum size of ${maxSize / (1024 * 1024)} MB.`
        );
        setTimeout(() => setFileSizeError(""), 7000);
      }
    },
    [handleFileChange, maxFiles, maxSize, currentFileCount, setFileLimitError, setFileSizeError]
  );

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
          className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Drag & Drop Files or Click to Upload (Max{" "}
          {maxFiles - currentFileCount} more files)
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
          onChange={(e) => {
            console.log(e.target.files.item(0).arrayBuffer());
            const files = Array.from(e.target.files).filter(
              (file) => file.size <= maxSize && allowedMimeTypes.includes(file.type)
            );
            handleFileChange(files);
          }}
          className="hidden"
          accept={allowedFileTypes.join(",")}
        />
      </div>
      {fileLimitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>File Upload Limit</AlertTitle>
          <AlertDescription>{fileLimitError}</AlertDescription>
        </Alert>
      )}
      {fileSizeError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>File Size Limit</AlertTitle>
          <AlertDescription>{fileSizeError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}