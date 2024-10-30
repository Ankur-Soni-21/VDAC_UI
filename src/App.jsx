import React, { useState } from "react";
import HeaderComponent from "./components/Header/HeaderComponent";
import MainComponent from "./components/Main/MainComponent";
import FooterComponent from "./components/Footer/FooterComponent";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("download");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-[#0c0c0c] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <HeaderComponent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <MainComponent
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <FooterComponent isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
