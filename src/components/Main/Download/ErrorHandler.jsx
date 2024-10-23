// ErrorHandler.jsx
import React from 'react';

function ErrorHandler({ error, isDarkMode }) {
  if (!error) return null;

  return (
    <p className={`text-red-500 mt-2 ${isDarkMode ? 'bg-[#2c2c2c] p-2 rounded' : ''}`}>
      {error}
    </p>
  );
}

export default ErrorHandler;