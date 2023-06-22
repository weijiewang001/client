import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { Header } from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// const products = [
//   { name: 'product1', price: 100.00 },
//   { name: 'product2', price: 200.00 },
// ]
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
