// FileUpload.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FileUpload({
  isDarkMode,
  handleFileChange,
  maxFiles,
  maxSize,
  currentFileCount,
  setFileLimitError,
  setFileSizeError,
  allowedFileTypes,
  allowedMimeTypes,
  fileLimitError,
  fileSizeError
}) {
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = maxFiles - currentFileCount;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    const rejectedFiles = selectedFiles.length - filesToAdd.length;

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
  };

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2 w-full sm:w-auto">
        <Label
          htmlFor="file-upload"
          className={isDarkMode ? "text-gray-300 mr-4" : "mr-4"}
        >
          Upload Files (Max {maxFiles - currentFileCount} more files)
        </Label>
        <Button
          onClick={() => {
            const fileInput = document.getElementById("file-upload");
            if (fileInput) fileInput.click();
          }}
          className={`w-full sm:w-auto ${
            isDarkMode ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]" : ""
          }`}
          disabled={currentFileCount >= maxFiles}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add More Files
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileSelect}
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