import React from 'react'
import { Button } from "../ui/button"
import { Volume2, VolumeX } from 'lucide-react'

function DownloadOptions({ data, platform, isDarkMode }) {
  const renderYouTubeOptions = () => {
    const videoUrls = data.url.filter(item => item.type === 'mp4' && item.quality)
    return (
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img src={data.thumb} alt={data.meta.title} className="w-full rounded-lg" />
        </div>
        <div className="md:w-2/3 md:pl-4 space-y-2">
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{data.meta.title}</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration: {data.meta.duration}</p>
          {videoUrls.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.quality} 
                {item.audio ? <Volume2 className="inline ml-2 h-4 w-4" /> : <VolumeX className="inline ml-2 h-4 w-4" />}
              </span>
              <Button 
                onClick={() => window.open(item.url, '_blank')}
                className={`${isDarkMode ? 'bg-[#3c3c3c] hover:bg-[#4c4c4c]' : ''}`}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFacebookOptions = () => {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img src={data.thumb} alt={data.meta.title} className="w-full rounded-lg" />
        </div>
        <div className="md:w-2/3 md:pl-4 space-y-2">
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{data.meta.title}</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration: {data.meta.duration}</p>
          {data.url.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.quality}
              </span>
              <Button 
                onClick={() => window.open(item.url, '_blank')}
                className={`${isDarkMode ? 'bg-[#3c3c3c] hover:bg-[#4c4c4c]' : ''}`}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-[#2c2c2c]' : 'bg-gray-100'}`}>
      {platform === 'youtube' && renderYouTubeOptions()}
      {platform === 'facebook' && renderFacebookOptions()}
    </div>
  )
}

export default DownloadOptions