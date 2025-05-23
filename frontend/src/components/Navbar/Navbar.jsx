import React from "react";
import {
  AppBar,
  Button,
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../../utils/customContext";
import { useContext, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import PaletteIcon from "@mui/icons-material/Palette";
import CodeIcon from "@mui/icons-material/Code";
import {
  blueTheme,
  orangeTheme,
  yellowTheme,
  greenTheme,
} from "../../utils/cutomTheme";

function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(CustomContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

  const themes = [
    { theme: orangeTheme, color: "#FF7722", name: "Orange" },
    { theme: greenTheme, color: "rgb(144, 214, 208)", name: "Green" },
    { theme: blueTheme, color: "#2196F3", name: "Blue" },
    { theme: yellowTheme, color: "#FFBA09", name: "Yellow" },
  ];

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Editor", path: "/editor" },
  ];

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    handleThemeMenuClose();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
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
              minHeight: "64px",
            }}
          >
            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
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
              <Typography
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
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
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
                      borderRadius: "25px",
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
                        transform: "translateY(-2px)",
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
            )}

            {/* Theme Switcher & Mobile Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Desktop Theme Switcher */}
              {!isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    p: 1,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "light.main",
                      mr: 1,
                      fontWeight: 500,
                      opacity: 0.8,
                    }}
                  >
                    Theme:
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    {themes.map((themeItem, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => setTheme(themeItem.theme)}
                      >
                        <CircleIcon
                          sx={{
                            color: themeItem.color,
                            fontSize: "1.2rem",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.2)",
                              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Mobile Theme Button */}
              {isMobile && (
                <IconButton
                  onClick={handleThemeMenuOpen}
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
                  <PaletteIcon />
                </IconButton>
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
                    ml: 1,
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

      {/* Mobile Theme Menu */}
      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
          },
        }}
      >
        {themes.map((themeItem, index) => (
          <MenuItem
            key={index}
            onClick={() => handleThemeChange(themeItem.theme)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "light.main",
            }}
          >
            <CircleIcon sx={{ color: themeItem.color, fontSize: "1.2rem" }} />
            {themeItem.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 280,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: "light.main",
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
            }}
          >
            Navigation
          </Typography>
          <List>
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
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
