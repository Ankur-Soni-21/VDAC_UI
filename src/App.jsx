import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

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
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Main
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
