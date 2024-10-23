import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Copy, Download } from "lucide-react";
import YouTube from "react-youtube";

function TranscribeOptions({ transcriptData, isDarkMode, videoUrl }) {
  const [activeTab, setActiveTab] = useState("text");
  const [player, setPlayer] = useState(null);
  const [copying, setCopying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Switch to mobile view at 768px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    });
  };

  const downloadTranscript = (text, filename) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderTranscript = (text) => {
    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } h-[300px] lg:h-[400px] overflow-y-auto`}
      >
        <p
          className={`mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } text-xs sm:text-sm lg:text-base`}
        >
          {text}
        </p>
      </div>
    );
  };

  const formatOffset = (offset) => {
    const pad = (num) => String(num).padStart(2, "0");
    const minutes = Math.floor(offset / 60);
    const seconds = offset - minutes * 60;
    const hours = Math.floor(minutes / 60);
    return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds.toFixed(0))}`;
  };

  const renderTimestampedTranscript = (json) => {
    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } h-[300px] lg:h-[400px] overflow-y-auto`}
      >
        <div
          className={`space-y-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {json.map((item, index) => (
            <div
              key={index}
              className={`flex cursor-pointer hover:bg-opacity-10 hover:underline text-xs sm:text-sm lg:text-base
                ${
                  isDarkMode
                    ? "hover:bg-gray-700 hover:text-gray-100"
                    : "hover:bg-gray-200 hover:text-gray-900"
                }`}
              onClick={() => {
                if (player) {
                  const seconds = parseFloat(item.offset);
                  player.seekTo(seconds);
                  player.playVideo();
                }
              }}
            >
              <span className="w-14 sm:w-16 lg:w-20 flex-shrink-0">
                {formatOffset(parseFloat(item.offset))}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const embedId = videoUrl.split("v=")[1];

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const opts = {
    width: "100%",
    height: "360rem",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col" : "flex-row"
      } space-y-4 md:space-y-0 md:space-x-4`}
    >
      <div className={isMobile ? "w-full" : "w-1/2"}>
        <div className="">
          <YouTube
            videoId={embedId}
            opts={opts}
            onReady={onReady}
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-center space-x-2 sm:space-x-4 mt-4">
          <Button
            onClick={() => copyToClipboard(transcriptData.transcript_text)}
            className="bg-black hover:bg-gray-800 text-white text-xs sm:text-sm w-28 sm:w-36"
          >
            <Copy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {copying ? "Copied!" : "Copy"}
          </Button>
          <Button
            onClick={() =>
              downloadTranscript(
                transcriptData.transcript_text,
                "transcript.txt"
              )
            }
            className="bg-black hover:bg-gray-800 text-white text-xs sm:text-sm w-28 sm:w-36"
          >
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Download
          </Button>
        </div>
      </div>
      <div className={isMobile ? "w-full" : "w-1/2"}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className={`grid w-full grid-cols-2 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <TabsTrigger
              value="text"
              className={`${
                isDarkMode
                  ? "data-[state=active]:bg-gray-600"
                  : "data-[state=active]:bg-white"
              } text-xs sm:text-sm`}
            >
              Text Transcript
            </TabsTrigger>
            <TabsTrigger
              value="timestamped"
              className={`${
                isDarkMode
                  ? "data-[state=active]:bg-gray-600"
                  : "data-[state=active]:bg-white"
              } text-xs sm:text-sm`}
            >
              Timestamped Transcript
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            {renderTranscript(transcriptData.transcript_text)}
          </TabsContent>
          <TabsContent value="timestamped">
            {renderTimestampedTranscript(transcriptData.transcript_json)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TranscribeOptions;
