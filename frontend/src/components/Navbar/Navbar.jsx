import React from "react";
import {
  AppBar,
  Button,
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../../utils/customContext";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(CustomContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Editor", path: "/editor" },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    // Add your login logic here
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleSignup = () => {
    navigate("/register");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          "& *": {
            fontFamily: "Poppins, sans-serif",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "60px",
            }}
          >
            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                // "&:hover": {
                //   transform: "translateY(-2px)",
                // },
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  borderRadius: "12px",
                  p: 1,
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                }}
              >
                <CodeIcon sx={{ color: "white", fontSize: "1.5rem" }} />
              </Box>
              {/* <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                }}
              >
                CodeKaro
              </Typography> */}
            </Box>

            {/* Desktop Navigation */}
            {/* {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      px: 3,
                      py: 1,
                      color: "light.main",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      borderRadius: "12px",
                      textTransform: "none",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                        // transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )} */}

            {/* Auth Buttons & Mobile Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Desktop Auth Buttons */}
              {!isMobile && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    onClick={handleLogin}
                    sx={{
                      color: "light.main",
                      borderColor: "rgba(255,255,255,0.3)",
                      borderRadius: "25px",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      backdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#2196F3",
                        background: "rgba(33, 150, 243, 0.1)",
                        // transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(33, 150, 243, 0.2)",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={handleSignup}
                    sx={{
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      borderRadius: "25px",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1976D2, #2196F3)",
                        // transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(33, 150, 243, 0.4)",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  onClick={handleMobileMenuToggle}
                  sx={{
                    color: "light.main",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 300,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "light.main",
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
            }}
          >
            Navigation
          </Typography>

          {/* Navigation Links */}
          <List sx={{ mb: 2 }}>
            {navigationItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: "12px",
                    mb: 1,
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: "light.main",
                      "& .MuiTypography-root": {
                        fontWeight: 600,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Mobile Auth Buttons */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "light.main",
                opacity: 0.7,
                mb: 2,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.75rem",
              }}
            >
              Account
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LoginIcon />}
                onClick={handleLogin}
                sx={{
                  color: "light.main",
                  borderColor: "rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    borderColor: "#2196F3",
                    background: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PersonAddIcon />}
                onClick={handleSignup}
                sx={{
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  borderRadius: "12px",
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2, #2196F3)",
                    boxShadow: "0 6px 25px rgba(33, 150, 243, 0.4)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
