import React, { useState, useCallback } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Label } from "../ui/label"
import { Download, Youtube, Instagram, Facebook, Twitter } from 'lucide-react'
import { debounce } from 'lodash'
import axios from 'axios'
import DownloadOptions from './DownloadOptions'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

const generateSignature = (url, timestamp) => {
  console.log(SECRET_KEY);
  const data = `${url}${timestamp}${SECRET_KEY}`;
  return CryptoJS.SHA256(data).toString();
};

const generateJsonData = (url) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(url, timestamp);
  return {
    url: url,
    ts: timestamp,
    _s: signature
  };
};

function DownloadComponent({ isDarkMode }) {
  const [activeDownloadTab, setActiveDownloadTab] = useState('youtube')
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [downloadData, setDownloadData] = useState(null)
  const [error, setError] = useState(null)

  const validateUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+$/
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/
    const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/

    switch (activeDownloadTab) {
      case 'youtube':
        return youtubeRegex.test(url)
      case 'facebook':
        return facebookRegex.test(url)
      case 'instagram':
        return instagramRegex.test(url)
      case 'twitter':
        return twitterRegex.test(url)
      default:
        return false
    }
  }

  const handleTabChange = (newTab) => {
    setActiveDownloadTab(newTab);
    setUrl('');
    setError(null);
  };

  const fetchDownloadOptions = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const baseUrl = getApiUrl(); // Assuming getApiUrl is defined elsewhere
      const endpoint = `${baseUrl}/${activeDownloadTab === 'youtube' ? 'yt' : activeDownloadTab === 'facebook' ? 'fb' : activeDownloadTab}`;
      // console.log(endpoint);
      const jsonData = generateJsonData(url);
      console.log(jsonData);
      const response = await axios.post(endpoint, jsonData);
      setDownloadData(response.data)
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data)
      setError('An error occurred while fetching download options')
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedFetchDownloadOptions = useCallback(
    debounce(fetchDownloadOptions, 300),
    [url, activeDownloadTab]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    debouncedFetchDownloadOptions()
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeDownloadTab} onValueChange={handleTabChange}>
        <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-[#2c2c2c]' : ''}`}>
          <TabsTrigger value="youtube" disabled={isLoading} className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Youtube className="mr-2 h-4 w-4" /> YouTube</TabsTrigger>
          <TabsTrigger value="facebook" disabled={isLoading} className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Facebook className="mr-2 h-4 w-4" /> Facebook</TabsTrigger>
          <TabsTrigger value="instagram" disabled={isLoading} className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Instagram className="mr-2 h-4 w-4" /> Instagram</TabsTrigger>
          <TabsTrigger value="twitter" disabled={isLoading} className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Twitter className="mr-2 h-4 w-4" /> Twitter</TabsTrigger>
        </TabsList>
        <TabsContent value={activeDownloadTab}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${activeDownloadTab}-url`} className={isDarkMode ? 'text-gray-300' : ''}>{activeDownloadTab.charAt(0).toUpperCase() + activeDownloadTab.slice(1)} URL</Label>
              <Input 
                id={`${activeDownloadTab}-url`} 
                placeholder={`https://www.${activeDownloadTab}.com/...`} 
                className={isDarkMode ? 'bg-[#2c2c2c] text-gray-100' : ''}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className={`w-full ${isDarkMode ? 'bg-[#3c3c3c] hover:bg-[#4c4c4c]' : ''} relative overflow-hidden`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="animate-move-bg bg-gradient-to-r from-transparent via-white to-transparent absolute inset-0 bg-[length:200%_100%]"></div>
                </div>
              ) : null}
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {['instagram', 'twitter'].includes(activeDownloadTab) && (
            <p className="text-red-500 opacity-75 mt-2">This service is currently unavailable.</p>
          )}
        </TabsContent>
      </Tabs>
      {downloadData && (
        <DownloadOptions 
          data={downloadData} 
          platform={activeDownloadTab} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
  )
}

// Placeholder for getApiUrl function.  This needs to be implemented elsewhere.
const getApiUrl = () => {
  return import.meta.env.VITE_APP_API_URL;
}

export default DownloadComponent