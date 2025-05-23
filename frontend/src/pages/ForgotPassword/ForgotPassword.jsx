import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Fade,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Email,
  ArrowBack,
  LockReset,
  CheckCircle,
  Send,
  KeyboardArrowLeft,
} from "@mui/icons-material";

function ForgotPassword() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
    if (error) {
      setError("");
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock password reset logic
      console.log("Password reset requested for:", email);
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset email resent to:", email);
    } finally {
      setLoading(false);
    }
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
          top: "15%",
          right: "15%",
          width: "200px",
          height: "200px",
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
          bottom: "15%",
          left: "10%",
          width: "150px",
          height: "150px",
          background:
            "linear-gradient(45deg, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1))",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "24px",
              p: { xs: 3, md: 4 },
              position: "relative",
              overflow: "hidden",
              maxWidth: "480px",
              mx: "auto",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #2196F3, #21CBF3, #9C27B0)",
                borderRadius: "24px 24px 0 0",
              },
            }}
          >
            {!success ? (
              <>
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      borderRadius: "50%",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                    }}
                  >
                    <LockReset sx={{ fontSize: 32, color: "white" }} />
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "light.main",
                      mb: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "light.main",
                      opacity: 0.7,
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    No worries! Enter your email address and we'll send you a
                    link to reset your password.
                  </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                  <Fade in={Boolean(error)}>
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        backgroundColor: "rgba(244, 67, 54, 0.1)",
                        border: "1px solid rgba(244, 67, 54, 0.3)",
                        color: "#f44336",
                        "& .MuiAlert-icon": {
                          color: "#f44336",
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                {/* Reset Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    disabled={loading}
                    placeholder="Enter your email address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "rgba(255,255,255,0.7)" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                        "&.Mui-focused": {
                          color: "#2196F3",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    sx={{
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      borderRadius: "12px",
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      fontFamily: "Poppins, sans-serif",
                      boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1976D2, #2196F3)",
                        boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                      },
                      "&:disabled": {
                        background: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Box>

                {/* Back to Login */}
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="text"
                    startIcon={<KeyboardArrowLeft />}
                    onClick={handleBackToLogin}
                    sx={{
                      color: "#2196F3",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                      },
                    }}
                  >
                    Back to Login
                  </Button>
                </Box>
              </>
            ) : (
              /* Success State */
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                    borderRadius: "50%",
                    mb: 3,
                    boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "light.main",
                    mb: 2,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Check Your Email
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "light.main",
                    opacity: 0.8,
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: 1.6,
                    mb: 1,
                  }}
                >
                  We've sent a password reset link to:
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#2196F3",
                    fontWeight: 600,
                    mb: 3,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {email}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    borderRadius: "12px",
                    p: 3,
                    mb: 4,
                    border: "1px solid rgba(33, 150, 243, 0.2)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "light.main",
                      opacity: 0.8,
                      lineHeight: 1.6,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Click the link in the email to reset your password. If you
                    don't see the email, check your spam folder.
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={handleResendEmail}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    sx={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "light.main",
                      borderRadius: "12px",
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      "&:hover": {
                        borderColor: "#2196F3",
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Resend Email"}
                  </Button>

                  <Button
                    variant="text"
                    startIcon={<KeyboardArrowLeft />}
                    onClick={handleBackToLogin}
                    sx={{
                      color: "#2196F3",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                      },
                    }}
                  >
                    Back to Login
                  </Button>
                </Stack>
              </Box>
            )}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
