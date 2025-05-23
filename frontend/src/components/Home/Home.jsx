import IMG from "/screenshots/screenshot.jpeg";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <CodeIcon />, text: "Smart Code Editor" },
    { icon: <AutoFixHighIcon />, text: "Syntax Highlighting" },
    { icon: <RocketLaunchIcon />, text: "Fast Performance" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "background.default",
        background: `
          radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(33, 203, 243, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
        paddingLeft: 6,
        paddingRight: 6,
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          background:
            "linear-gradient(45deg, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1))",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            height: "92vh",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 4, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Left Content Section */}
          <Fade in={isVisible} timeout={1000}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                maxWidth: { xs: "100%", md: "600px" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {/* Main Title */}
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
                    fontWeight: 800,
                    fontFamily: "Poppins, sans-serif",
                    background:
                      "linear-gradient(45deg, #2196F3, #21CBF3, #9C27B0)",
                    backgroundSize: "200% 200%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradient 3s ease infinite",
                    "@keyframes gradient": {
                      "0%": { backgroundPosition: "0% 50%" },
                      "50%": { backgroundPosition: "100% 50%" },
                      "100%": { backgroundPosition: "0% 50%" },
                    },
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                >
                  CodeKaro
                </Typography>
                <Box
                  sx={{
                    width: { xs: "80px", md: "120px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                    borderRadius: "2px",
                    mx: { xs: "auto", md: 0 },
                    mb: 2,
                  }}
                />
              </Box>

              {/* Subtitle */}
              <Typography
                variant="h4"
                sx={{
                  color: "light.main",
                  fontSize: { xs: "1rem", md: "1.5rem", lg: "2rem" },
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                  lineHeight: 1.3,
                  opacity: 0.9,
                  maxWidth: "600px",
                }}
              >
                A powerful, modern code editor built for the web.
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    mt: 1,
                    fontSize: "0.8em",
                    opacity: 0.7,
                  }}
                >
                  Experience coding like never before.
                </Box>
              </Typography>

              {/* Features Chips */}
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 2 }}
              >
                {features.map((feature, index) => (
                  <Zoom in={isVisible} timeout={1000 + index * 200} key={index}>
                    <Chip
                      icon={feature.icon}
                      label={feature.text}
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "light.main",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        fontWeight: 500,
                        "& .MuiChip-icon": {
                          color: "#2196F3",
                        },
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Zoom>
                ))}
              </Stack>

              {/* CTA Button */}
              <Zoom in={isVisible} timeout={1500}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/editor")}
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1rem" },
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    px: 4,
                    py: 2,
                    borderRadius: "50px",
                    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                    boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                    textTransform: "none",
                    alignSelf: { xs: "center", md: "flex-start" },
                    maxWidth: "250px",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                      "&::before": {
                        left: "100%",
                      },
                      "& .MuiSvgIcon-root": {
                        transform: "translateX(4px)",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      transition: "transform 0.3s ease",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Get Started
                </Button>
              </Zoom>
            </Box>
          </Fade>

          {/* Right Image Section */}
          <Fade in={isVisible} timeout={1200}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: { xs: "100%", md: "50%" },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                  backdropFilter: "blur(20px)",
                  borderRadius: "24px",
                  padding: { xs: 2, md: 3 },
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background:
                      "linear-gradient(45deg, #2196F3, #21CBF3, #9C27B0, #2196F3)",
                    borderRadius: "24px",
                    zIndex: -1,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 0.7,
                  },
                }}
              >
                <img
                  alt="CodeKaro Editor Interface"
                  src={IMG}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                    display: "block",
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                  }}
                />

                {/* Floating badges */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                    },
                  }}
                >
                  ✨ Live Demo
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
