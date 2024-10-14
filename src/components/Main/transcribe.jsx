import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileText } from "lucide-react";

function TranscribeComponent({ isDarkMode }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transcribe form submitted");
  };

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
        />
      </div>
      <Button
        type="submit"
        className={isDarkMode ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]" : ""}
      >
        <FileText className="mr-2 h-4 w-4" /> Generate Transcript
      </Button>
    </form>
  );
}

export default TranscribeComponent;