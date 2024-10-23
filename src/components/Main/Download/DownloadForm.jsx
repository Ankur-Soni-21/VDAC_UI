// DownloadForm.jsx
import React from 'react';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Download } from "lucide-react";

function DownloadForm({ activePlatform, url, setUrl, handleSubmit, isLoading, isDarkMode, isServiceAvailable }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor={`${activePlatform}-url`}
          className={isDarkMode ? "text-gray-300" : ""}
        >
          {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} URL
        </Label>
        <Input
          id={`${activePlatform}-url`}
          placeholder={`https://www.${activePlatform}.com/...`}
          className={isDarkMode ? "bg-[#2c2c2c] text-gray-100" : ""}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={!isServiceAvailable}
        />
      </div>
      <Button
        type="submit"
        className={`w-full ${
          isDarkMode ? "bg-[#3c3c3c] hover:bg-[#4c4c4c]" : ""
        } relative overflow-hidden`}
        disabled={isLoading || !isServiceAvailable}
      >
        {isLoading && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-move-bg bg-gradient-to-r from-transparent via-gray-700 to-transparent absolute inset-0 bg-[length:200%_100%]"></div>
          </div>
        )}
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
    </form>
  );
}

export default DownloadForm;