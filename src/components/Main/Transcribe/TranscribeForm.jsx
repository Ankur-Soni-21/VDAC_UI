import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FileText } from "lucide-react";

function TranscribeForm({ url, setUrl, handleSubmit, isDarkMode, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="transcribe-url"
          className={isDarkMode ? "text-gray-300" : ""}
        >
          YouTube URL
        </Label>
        <Input
          id="transcribe-url"
          placeholder="https://www.youtube.com/watch?v=..."
          className={isDarkMode ? "bg-[#2c2c2c] text-gray-100" : ""}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className={`${
          isDarkMode ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]" : ""
        } relative overflow-hidden`}
        disabled={isLoading}
      >
        {isLoading && (
          <div className="inset-0 overflow-hidden">
            <div className="animate-move-bg bg-gradient-to-r from-transparent via-gray-700 to-transparent absolute inset-0 bg-[length:200%_100%]"></div>
          </div>
        )}
        <FileText className="mr-2 h-4 w-4" /> Generate Transcript
      </Button>
    </form>
  );
}

export default TranscribeForm;
