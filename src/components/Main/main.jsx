import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DownloadComponent from "./download";
import ConvertComponent from "./convert";
import TranscribeComponent from "./transcribe";

function Main({ isDarkMode, activeTab, setActiveTab }) {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow flex flex-col space-y-6">
      <Card className={`${isDarkMode ? "bg-[#1c1c1c] text-gray-100" : ""}`}>
        <CardHeader>
          <CardTitle>Video Downloader and Converter</CardTitle>
          <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
            Download videos, convert files, and generate transcripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className={`grid w-full grid-cols-3 ${
                isDarkMode ? "bg-[#2c2c2c]" : ""
              }`}
            >
              <TabsTrigger
                value="download"
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Download
              </TabsTrigger>
              <TabsTrigger
                value="convert"
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Convert
              </TabsTrigger>
              <TabsTrigger
                value="transcribe"
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Transcribe
              </TabsTrigger>
            </TabsList>
            <TabsContent value="download">
              <DownloadComponent isDarkMode={isDarkMode} />
            </TabsContent>
            <TabsContent value="convert">
              <ConvertComponent isDarkMode={isDarkMode} />
            </TabsContent>
            <TabsContent value="transcribe">
              <TranscribeComponent isDarkMode={isDarkMode} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* //! This will push the second card to the bottom */}
      <div className="flex-grow"></div>{" "}
      <Card className={isDarkMode ? "bg-[#1c1c1c] text-gray-100" : ""}>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How do I download a video?</h3>
              <p className={isDarkMode ? "text-gray-300" : ""}>
                Simply paste the video URL into the input field and click the
                Download button.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                What file formats are supported for conversion?
              </h3>
              <p className={isDarkMode ? "text-gray-300" : ""}>
                We support a wide range of video and audio formats. You can
                convert to MP4, MP3, WAV, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                How accurate are the generated transcripts?
              </h3>
              <p className={isDarkMode ? "text-gray-300" : ""}>
                Our transcription service uses advanced AI to provide highly
                accurate results, but may not be perfect for all accents or
                audio qualities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Main;
