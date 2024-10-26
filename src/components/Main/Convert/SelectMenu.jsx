import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = {
  Document: ["PDF", "DOC", "DOCX", "TXT", "RTF", "ODT"],
  Presentation: ["PPT", "PPTX", "ODP", "KEY"],
  Images: ["PNG", "JPEG", "JPG", "GIF", "TIFF", "BMP", "WEBP"],
  "Audio & Video": ["MP3", "WAV", "AAC", "FLAC", "MP4", "AVI", "MOV", "WEBM"],
};

export default function SelectMenu({
  onFormatSelect,
  onClickOutside,
  isDarkMode,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categories)[0]
  );
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      ref={menuRef}
      className={`flex flex-col sm:flex-row rounded-md overflow-hidden shadow-lg p-2 sm:p-4 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <ScrollArea className="h-32 sm:h-48 w-full sm:w-1/3 mb-2 sm:mb-0 sm:mr-2 overflow-y-auto">
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "secondary" : "ghost"}
            className={`w-full justify-start px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-200"
                : "hover:bg-gray-100 text-gray-800"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </ScrollArea>
      <ScrollArea className="h-32 sm:h-48 w-full sm:w-2/3 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-2">
          {categories[selectedCategory].map((format) => (
            <Button
              key={format}
              variant="ghost"
              className={`w-full justify-center py-1 sm:py-2 text-xs sm:text-sm ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900"
              }`}
              onClick={() => onFormatSelect(format)}
            >
              {format}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
