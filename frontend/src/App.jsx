import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Editor from "./components/Editor/Editor";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { CustomContext } from "./utils/customContext";
import { Box, Container, ThemeProvider } from "@mui/material";
import {
  orangeTheme,
  blueTheme,
  lightTheme,
  yellowTheme,
  greenTheme,
} from "./utils/cutomTheme";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function AppContent() {
  const location = useLocation();

  const routesWithoutNavbar = ["/editor", "/login", "/register"];

  const routesWithNavbar = ["/"];

  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/editor" element={<Editor />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
}

function App() {
  const [theme, setTheme] = useState(greenTheme);

  return (
    <ThemeProvider theme={theme}>
      <CustomContext.Provider value={{ theme, setTheme }}>
        <Router>
          <AppContent />
        </Router>
      </CustomContext.Provider>
    </ThemeProvider>
  );
}

export default App;
