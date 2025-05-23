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
import { Box, ThemeProvider } from "@mui/material";
import {
  orangeTheme,
  blueTheme,
  lightTheme,
  yellowTheme,
  greenTheme,
} from "./utils/cutomTheme";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NotFound from "./pages/NotFound/NotFound";

function AppContent() {
  const location = useLocation();

  // Approach 1: Use whitelist (recommended)
  const routesWithNavbar = ["/"];
  const shouldShowNavbar = routesWithNavbar.includes(location.pathname);

  // Approach 2: Check for valid routes (alternative)
  // const validRoutes = ["/", "/editor", "/login", "/register", "/forgot-password"];
  // const isValidRoute = validRoutes.includes(location.pathname);
  // const routesWithNavbar = ["/"];
  // const shouldShowNavbar = isValidRoute && routesWithNavbar.includes(location.pathname);

  // Approach 3: Blacklist with 404 detection (another alternative)
  // const routesWithoutNavbar = ["/editor", "/login", "/register", "/forgot-password"];
  // const validRoutes = ["/", "/editor", "/login", "/register", "/forgot-password"];
  // const is404 = !validRoutes.includes(location.pathname);
  // const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname) && !is404;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* The catch-all route should be last */}
        <Route path="*" element={<NotFound />} />
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
