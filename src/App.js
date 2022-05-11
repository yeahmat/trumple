import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useTheme } from "./hooks/useTheme";
import { useState } from "react";
import { StatsModalContextProvider } from "./contexts/StatsContext";

function App() {
  const [theme, toggleTheme] = useTheme();
  const [firstTimeUser, resetFirstTimeUser] = useState(null);
  
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StatsModalContextProvider>
        <Header 
          toggleTheme={toggleTheme} 
          theme={theme} 
          resetFirstTimeUser={resetFirstTimeUser} 
        />
        <Game 
          theme={theme} 
          resetFirstTimeUser={resetFirstTimeUser} 
          firstTimeUser={firstTimeUser} 
        />
      </StatsModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
