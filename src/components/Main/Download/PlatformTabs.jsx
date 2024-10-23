// PlatformTabs.jsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";

function PlatformTabs({ activePlatform, setActivePlatform, isLoading, isDarkMode, unavailableServices }) {
  const platforms = [
    { value: 'youtube', icon: Youtube },
    { value: 'facebook', icon: Facebook },
    { value: 'instagram', icon: Instagram },
    { value: 'twitter', icon: Twitter },
  ];

  return (
    <Tabs value={activePlatform} onValueChange={setActivePlatform}>
      <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? "bg-[#2c2c2c]" : ""}`}>
        {platforms.map(({ value, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            disabled={isLoading || unavailableServices.includes(value)}
            className={isDarkMode ? "data-[state=active]:bg-[#3c3c3c]" : ""}
          >
            <Icon className="mr-2 h-4 w-4" /> {value.charAt(0).toUpperCase() + value.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default PlatformTabs;