import React from "react";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";
import logoBlackTransparent from "../../assets/logoBlackTransparent.svg";
import logoWhiteTransparent from "../../assets/logoWhiteTransparent.svg";

function HeaderComponent({ isDarkMode, toggleTheme }) {
  return (
    <header
      className={`border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold italic"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <img
            src={isDarkMode ? logoWhiteTransparent : logoBlackTransparent}
            alt="Logo"
            className="h-10 w-20"
          />
        </h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
          <Moon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
