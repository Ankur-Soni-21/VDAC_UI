import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Label } from "../ui/label"
import { Download, Youtube, Instagram, Facebook, Twitter } from 'lucide-react'

function DownloadComponent({ isDarkMode }) {
  const [activeDownloadTab, setActiveDownloadTab] = useState('youtube')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Download form submitted')
  }

  return (
    <Tabs value={activeDownloadTab} onValueChange={setActiveDownloadTab}>
      <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-[#2c2c2c]' : ''}`}>
        <TabsTrigger value="youtube" className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Youtube className="mr-2 h-4 w-4" /> YouTube</TabsTrigger>
        <TabsTrigger value="instagram" className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Instagram className="mr-2 h-4 w-4" /> Instagram</TabsTrigger>
        <TabsTrigger value="facebook" className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Facebook className="mr-2 h-4 w-4" /> Facebook</TabsTrigger>
        <TabsTrigger value="twitter" className={isDarkMode ? 'data-[state=active]:bg-[#3c3c3c]' : ''}><Twitter className="mr-2 h-4 w-4" /> Twitter</TabsTrigger>
      </TabsList>
      {['youtube', 'instagram', 'facebook', 'twitter'].map((platform) => (
        <TabsContent key={platform} value={platform}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${platform}-url`} className={isDarkMode ? 'text-gray-300' : ''}>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</Label>
              <Input id={`${platform}-url`} placeholder={`https://www.${platform}.com/...`} className={isDarkMode ? 'bg-[#2c2c2c] text-gray-100' : ''} />
            </div>
            <Button type="submit" className={isDarkMode ? 'bg-[#3c3c3c] hover:bg-[#4c4c4c]' : ''}><Download className="mr-2 h-4 w-4" /> Download</Button>
          </form>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default DownloadComponent