import React, { useState } from "react";
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
import Faq from "./faq";

function Main({ isDarkMode, activeTab, setActiveTab }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (newTab) => {
    if (!isLoading) {
      setActiveTab(newTab);
    }
  };

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
                setIsLoading={setIsLoading}
              />
            </TabsContent>
            <TabsContent value="convert">
              <ConvertComponent
                isDarkMode={isDarkMode}
                setIsLoading={setIsLoading}
              />
            </TabsContent>
            <TabsContent value="transcribe">
              <TranscribeComponent
                isDarkMode={isDarkMode}
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
      {/* This will push the second card to the bottom */}
      <div className="flex-grow"></div>
      <Faq isDarkMode={isDarkMode} />
    </main>
  );
}

export default Main;
