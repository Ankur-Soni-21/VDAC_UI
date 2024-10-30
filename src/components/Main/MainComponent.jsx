import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DownloadComponent from "./Download/Download";
import ConvertComponent from "./Convert/Convert";
import TranscribeComponent from "./Transcribe/Transcribe";
import FaqComponent from "./FaqComponent";

function MainComponent({ isDarkMode, activeTab, setActiveTab }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (newTab) => {
    if (!isLoading) {
      setActiveTab(newTab);
    }
  };

  return (
    <main className="container px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto py-8 flex-grow flex flex-col space-y-6">
      <Card className={`${isDarkMode ? "bg-[#1c1c1c] text-gray-100" : ""}`}>
        <CardHeader>
          <CardTitle>Video Downloader, Converter, and Transcriber</CardTitle>
          <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
            Download videos, convert files, and generate transcripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList
              className={`grid w-full grid-cols-3 ${
                isDarkMode ? "bg-[#2c2c2c]" : ""
              }`}
            >
              <TabsTrigger
                value="download"
                disabled={isLoading}
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Download
              </TabsTrigger>
              <TabsTrigger
                value="convert"
                disabled={isLoading}
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Convert
              </TabsTrigger>
              <TabsTrigger
                value="transcribe"
                disabled={isLoading}
                className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
              >
                Transcribe
              </TabsTrigger>
            </TabsList>
            <TabsContent value="download">
              <DownloadComponent
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabsContent>
            <TabsContent value="convert">
              <ConvertComponent
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabsContent>
            <TabsContent value="transcribe">
              <TranscribeComponent
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {isLoading && (
        <div
          className={`text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Loading... Please wait while we process your request.
        </div>
      )}
      <div className="flex-grow"></div>
      <FaqComponent isDarkMode={isDarkMode} />
    </main>
  );
}

export default MainComponent;
