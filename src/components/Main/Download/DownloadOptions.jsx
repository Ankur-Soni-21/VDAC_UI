// DownloadOptions.jsx
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Volume2, VolumeX, Download } from "lucide-react";

function DownloadOptions({ data, platform, isDarkMode }) {
  const [isHoveringThumbnail, setIsHoveringThumbnail] = useState(false);

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    window.open(data.thumb, "_blank");
  };

  const renderOptions = () => {
    const items =
      platform === "youtube"
        ? data.url.filter((item) => item.type === "mp4" && item.quality)
        : data.url;

    return (
      <div className="flex flex-col space-y-4">
        <div
          className="relative w-full max-w-md mx-auto cursor-pointer"
          onMouseEnter={() => setIsHoveringThumbnail(true)}
          onMouseLeave={() => setIsHoveringThumbnail(false)}
          onClick={handleThumbnailClick}
        >
          <img
            src={data.thumb}
            alt={data.meta.title}
            className={`w-full rounded-lg transition-opacity duration-300 ${
              isHoveringThumbnail ? "opacity-80" : ""
            }`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isHoveringThumbnail ? "opacity-100" : "opacity-0"
            }`}
          >
            <Download className="text-white" size={48} />
          </div>
        </div>
        <div className="space-y-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {data.meta.title}
          </h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Duration: {data.meta.duration}
          </p>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(75, 85, 99, 0.3)"
                  : "rgba(229, 231, 235, 0.5)",
              }}
            >
              <span
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } flex items-center`}
              >
                {item.quality}
                {platform === "youtube" &&
                  (item.audio ? (
                    <Volume2 className="inline ml-2 h-4 w-4" />
                  ) : (
                    <VolumeX className="inline ml-2 h-4 w-4" />
                  ))}
              </span>
              <Button
                onClick={() => window.open(item.url, "_blank")}
                className={`${
                  !isDarkMode
                    ? "bg-gray-700 hover:bg-black"
                    : "bg-gray-500 hover:bg-slate-200"
                } text-white transition-colors duration-200`}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`mt-4 p-6 rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      {renderOptions()}
    </div>
  );
}

export default DownloadOptions;
