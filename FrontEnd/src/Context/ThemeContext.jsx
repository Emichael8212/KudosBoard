import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
  // Check if dark mode preference exists in localStorage, otherwise use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and apply class to body when darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
