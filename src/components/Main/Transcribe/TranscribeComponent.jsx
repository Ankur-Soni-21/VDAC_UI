import React, { useState } from "react";
import { fetchData, validateUrl } from "../../../utils/DownloadUtil";
import TranscribeForm from "./TranscribeForm";
import TranscribeOptions from "./TranscribeOptions";

function TranscribeComponent({ isDarkMode, setIsLoading, isLoading }) {
  const [url, setUrl] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [error, setError] = useState(null);
  const [lastFetchedUrl, setLastFetchedUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(url, "youtube")) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    // if (url === lastFetchedUrl) return;

    setIsLoading(true);
    setError(null);
    setTranscriptData(null);

    try {
      const data = await fetchData(url, "youtube-ts");
      setTranscriptData(data);
      setLastFetchedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <TranscribeForm
        url={url}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
        isDarkMode={isDarkMode}
        isLoading={isLoading}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {transcriptData && (
        <TranscribeOptions
          transcriptData={transcriptData}
          isDarkMode={isDarkMode}
          videoUrl={url}
        />
      )}
    </div>
  );
}

export default TranscribeComponent;
