import { useReducer } from "react";
import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [theme, toggleTheme] = useTheme();
  const [statsModalIsOpen, toggleStatsModal] = useReducer((state) => !state, false);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} theme={theme} toggleStatsModal={toggleStatsModal} />
      <Game statsModalIsOpen={statsModalIsOpen} toggleStatsModal={toggleStatsModal} />
    </ThemeProvider>
  );
}

export default App;
