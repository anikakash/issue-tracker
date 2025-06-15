// src/App.tsx
import { BrowserRouter} from "react-router-dom";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext";
import { darkTheme, lightTheme } from "./theme";
import AppLayout from "./Layout";


const App = () => {
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  const { themeMode } = themeContext;
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
