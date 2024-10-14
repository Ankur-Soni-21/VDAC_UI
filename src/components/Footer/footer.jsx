import React from "react";

function Footer({ isDarkMode }) {
  return (
    <footer
      className={`border-t mt-4 ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 py-8 text-center">
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          &copy; 2024 VDAC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
