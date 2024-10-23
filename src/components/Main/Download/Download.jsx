// DownloadComponent.jsx
import React, { useState, useEffect } from "react";
import PlatformTabs from "./PlatformTabs";
import DownloadForm from "./DownloadForm";
import DownloadOptions from "./DownloadOptions";
import ErrorHandler from "./ErrorHandler";
import { validateUrl, fetchData } from "../../../utils/DownloadUtil";

const UNAVAILABLE_SERVICES = ["instagram", "twitter"];

function DownloadComponent({ isDarkMode, setIsLoading, isLoading }) {
  const [activePlatform, setActivePlatform] = useState("youtube");
  const [url, setUrl] = useState("");
  const [downloadData, setDownloadData] = useState({});
  const [error, setError] = useState(null);
  const [lastFetchedUrl, setLastFetchedUrl] = useState("");

  useEffect(() => {
    setUrl("");
    setError(null);
  }, [activePlatform]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(url, activePlatform)) {
      setError("Please enter a valid URL");
      return;
    }
    if (url === lastFetchedUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchData(url, activePlatform);
      setDownloadData({ ...downloadData, [activePlatform]: data });
      setLastFetchedUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <PlatformTabs
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
        unavailableServices={UNAVAILABLE_SERVICES}
      />
      <DownloadForm
        activePlatform={activePlatform}
        url={url}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
        isServiceAvailable={!UNAVAILABLE_SERVICES.includes(activePlatform)}
      />
      <ErrorHandler error={error} isDarkMode={isDarkMode} />
      {downloadData[activePlatform] && (
        <DownloadOptions
          data={downloadData[activePlatform]}
          platform={activePlatform}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default DownloadComponent;
