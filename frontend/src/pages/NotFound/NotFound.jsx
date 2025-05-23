import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Fade,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowBack,
  Code,
  Search,
  KeyboardArrowRight,
  Refresh,
} from "@mui/icons-material";

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToEditor = () => {
    navigate("/editor");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(33, 203, 243, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)
        `,
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "300px",
          height: "300px",
          background:
            "linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
            "50%": { transform: "translateY(-30px) rotate(180deg)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "200px",
          height: "200px",
          background:
            "linear-gradient(45deg, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1))",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "100px",
          height: "100px",
          background:
            "linear-gradient(45deg, rgba(33, 203, 243, 0.1), rgba(156, 39, 176, 0.1))",
          borderRadius: "50%",
          filter: "blur(20px)",
          animation: "float 10s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "32px",
              p: { xs: 4, md: 6 },
              position: "relative",
              overflow: "hidden",
              mx: "auto",
              maxWidth: "800px",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #2196F3, #21CBF3, #9C27B0)",
                borderRadius: "32px 32px 0 0",
              },
            }}
          >
            {/* 404 Animation */}
            <Box
              sx={{
                position: "relative",
                mb: 4,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "8rem", md: "12rem", lg: "14rem" },
                  fontWeight: 900,
                  fontFamily: "Poppins, sans-serif",
                  background:
                    "linear-gradient(45deg, #2196F3, #21CBF3, #9C27B0)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation:
                    "gradient 3s ease infinite, bounce 2s ease-in-out infinite",
                  "@keyframes gradient": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                  },
                  "@keyframes bounce": {
                    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                    "40%": { transform: "translateY(-10px)" },
                    "60%": { transform: "translateY(-5px)" },
                  },
                  lineHeight: 0.8,
                  textShadow: "0 0 50px rgba(33, 150, 243, 0.3)",
                }}
              >
                404
              </Typography>

              {/* Floating Code Icons */}
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "10%",
                  animation: "float 4s ease-in-out infinite",
                }}
              >
                <Code sx={{ fontSize: 40, color: "#2196F3", opacity: 0.6 }} />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  right: "15%",
                  animation: "float 5s ease-in-out infinite reverse",
                }}
              >
                <Search sx={{ fontSize: 35, color: "#21CBF3", opacity: 0.6 }} />
              </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "light.main",
                  mb: 2,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Oops! Page Not Found
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "light.main",
                  opacity: 0.8,
                  fontFamily: "Poppins, sans-serif",
                  lineHeight: 1.6,
                  mb: 1,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                The page you're looking for seems to have wandered off into the
                digital void.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "light.main",
                  opacity: 0.6,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Don't worry, even the best developers get lost sometimes!
              </Typography>
            </Box>

            {/* Error Code Box */}
            <Box
              sx={{
                display: "inline-block",
                background: "rgba(244, 67, 54, 0.1)",
                border: "1px solid rgba(244, 67, 54, 0.3)",
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                mb: 4,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#f44336",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                ERROR_CODE: PAGE_NOT_FOUND
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Home />}
                onClick={handleGoHome}
                sx={{
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                  minWidth: { xs: "200px", sm: "auto" },
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2, #2196F3)",
                    boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Code />}
                endIcon={<KeyboardArrowRight />}
                onClick={handleGoToEditor}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "light.main",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  minWidth: { xs: "200px", sm: "auto" },
                  "&:hover": {
                    borderColor: "#2196F3",
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(33, 150, 243, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Try Editor
              </Button>
            </Stack>

            {/* Secondary Actions */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={handleGoBack}
                sx={{
                  color: "light.main",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowBack />
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                or
              </Typography>

              <IconButton
                onClick={handleRefresh}
                sx={{
                  color: "light.main",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "scale(1.1) rotate(180deg)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Refresh />
              </IconButton>
            </Stack>

            {/* Fun Footer */}
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Poppins, sans-serif",
                  fontStyle: "italic",
                }}
              >
                "In the world of code, every 404 is just a new adventure waiting
                to be discovered."
                <br />— CodeKaro Team
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default NotFound;
