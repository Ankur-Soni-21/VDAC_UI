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
  currentFileCount,
  errorMessage,
  allowedFileTypes,
  allowedMimeTypes,
}) {
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
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files).filter((file) =>
              allowedMimeTypes.includes(file.type)
            );
            handleFileChange(selectedFiles);
          }}
          className="hidden"
          accept={allowedFileTypes.join(",")}
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
