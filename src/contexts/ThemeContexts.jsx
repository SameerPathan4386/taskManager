import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check if user has a theme preference in local storage
  // or use system preference as default
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("todo-theme");
    if (storedTheme) {
      return storedTheme;
    }
    
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Update the class on the html element when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save the theme preference to localStorage
    localStorage.setItem("todo-theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
