import ace from "ace-builds";
import AceEditor from "react-ace";
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/ext-language_tools";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Select,
  IconButton,
  Menu,
  Modal,
  Paper,
  Chip,
  CircularProgress,
  Fade,
  useMediaQuery,
  useTheme,
  Stack,
  Typography,
  Tooltip,
  Container,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import CodeIcon from "@mui/icons-material/Code";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import CloudIcon from "@mui/icons-material/Cloud";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { saveAs } from "file-saver";

import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandCpp } from "react-icons/tb";
import { FaGolang } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";

function Editor() {
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("cpp");
  const [input, setInput] = useState("");
  const [executing, setExecuting] = useState(false);
  const [editorlang, setEditorLang] = useState("c_cpp");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const languages = [
    { value: "python3", label: "Python", icon: <FaPython />, color: "#3776ab" },
    {
      value: "javascript",
      label: "JavaScript",
      icon: <IoLogoJavascript />,
      color: "#f7df1e",
    },
    { value: "cpp", label: "C++", icon: <TbBrandCpp />, color: "#00599c" },
    { value: "c", label: "C", icon: "🔧", color: "#a8b9cc" },
    { value: "java", label: "Java", icon: <FaJava />, color: "#ed8b00" },
    { value: "go", label: "Go", icon: <FaGolang />, color: "#00add8" },
  ];

  const defaultCodeArray = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CodeKaro! 🚀" << endl;
    cout << "Welcome to the enhanced editor!" << endl;
    return 0;
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, CodeKaro! 🚀\\n");
    printf("Welcome to the enhanced editor!\\n");
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeKaro! 🚀");
        System.out.println("Welcome to the enhanced editor!");
    }
}`,
    python3: `print("Hello, CodeKaro! 🚀")
print("Welcome to the enhanced editor!")

# Try some Python magic
import datetime
print(f"Current time: {datetime.datetime.now()}")`,
    go: `package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println("Hello, CodeKaro! 🚀")
    fmt.Println("Welcome to the enhanced editor!")
    fmt.Printf("Current time: %v\\n", time.Now())
}`,
    javascript: `console.log("Hello, CodeKaro! 🚀");
console.log("Welcome to the enhanced editor!");

// Try some JavaScript magic
const currentTime = new Date();
console.log(\`Current time: \${currentTime}\`);`,
  };

  const [code, setCode] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const langMap = {
      cpp: { editor: "c_cpp", code: defaultCodeArray.cpp },
      c: { editor: "c_cpp", code: defaultCodeArray.c },
      java: { editor: "java", code: defaultCodeArray.java },
      python3: { editor: "python", code: defaultCodeArray.python3 },
      go: { editor: "golang", code: defaultCodeArray.go },
      javascript: { editor: "javascript", code: defaultCodeArray.javascript },
    };

    if (langMap[lang]) {
      setEditorLang(langMap[lang].editor);
      setCode(langMap[lang].code);
    }
  }, [lang]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
    handleClose();
  };

  const handleDownloadCode = () => {
    const languageArrayExtension = {
      java: "java",
      python3: "py",
      cpp: "cpp",
      c: "c",
      javascript: "js",
      go: "go",
    };
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `CodeKaro-${Date.now()}.${languageArrayExtension[lang]}`);
    handleClose();
  };

  const createRequest = async () => {
    try {
      const startTime = Date.now();
      let data = {
        src: code,
        lang: lang,
        stdin: input,
      };

      setShowModal(true);
      setExecuting(true);
      setOutput("");
      setExecutionTime(null);

      const response = await fetch(
        "https://codekaro-8yee.onrender.com/api/v1/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      setExecuting(false);
      setShowModal(false);
      setOutput(res);
    } catch (error) {
      console.error("Execution error:", error);
      setShowModal(false);
      setExecuting(false);
      setOutput("❌ Network Error or Server Down");
      setExecutionTime(null);
    }
  };

  const getCurrentLanguage = () => languages.find((l) => l.value === lang);
  const hasOutput = output && (output.data?.output || output.data?.error);
  const isError = output && (output.data?.error || typeof output === "string");

  return (
    <>
      {/* Enhanced Loading Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="execution-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={showModal}>
          <Box
            sx={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              p: 3,
              width: "300px",
              textAlign: "center",
              outline: "none",
            }}
          >
            <CloudIcon sx={{ fontSize: 40, color: "#2196F3", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                mb: 1,
                fontSize: "1.1rem",
              }}
            >
              Executing Code
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontFamily: "Poppins, sans-serif",
                mb: 3,
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              Running on cloud servers. This may take a moment due to cold
              start.
            </Typography>
            <CircularProgress size={32} sx={{ color: "#2196F3" }} />
          </Box>
        </Fade>
      </Modal>

      {/* Main Container with proper height management */}
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Editor Layout Container */}
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: { xs: 1, sm: 1.5 },
            p: { xs: 1, sm: 1.5 },
            maxWidth: "100% !important",
            overflow: "hidden",
          }}
        >
          {/* Code Editor Section - Enhanced for stability */}
          <Paper
            elevation={0}
            sx={{
              flex: isMobile ? "1 1 50%" : isTablet ? "1 1 55%" : "1 1 65%",
              minHeight: isMobile ? "300px" : "auto",
              maxHeight: isMobile ? "50vh" : "100%",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Compact Editor Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.15)",
                flexShrink: 0,
                minHeight: "52px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CodeIcon sx={{ color: "#2196F3", fontSize: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.primary",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  CodeKaro Editor
                </Typography>
              </Box>
              <Chip
                label={getCurrentLanguage()?.label}
                size="small"
                sx={{
                  background: getCurrentLanguage()?.color,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 28,
                }}
              />
            </Box>

            {/* Editor Container with proper height management */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                minHeight: 0, // Important for flex child
              }}
            >
              <AceEditor
                placeholder="// Start coding here..."
                mode={editorlang}
                theme="dracula"
                name="CodeKaro"
                onChange={setCode}
                value={code}
                fontSize={14}
                showPrintMargin={false}
                width="100%"
                height="100%"
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  wrap: false,
                  scrollPastEnd: 0.5,
                  animatedScroll: true,
                  fontSize: 14,
                  showFoldWidgets: true,
                  foldStyle: "markbegin",
                  displayIndentGuides: true,
                }}
              />
            </Box>
          </Paper>

          {/* Control Panel - Enhanced responsive design */}
          <Box
            sx={{
              flex: isMobile ? "1 1 50%" : isTablet ? "1 1 45%" : "1 1 35%",
              minWidth: isMobile ? "auto" : "320px",
              maxWidth: isMobile ? "100%" : "400px",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 1.5 },
              overflow: "hidden",
            }}
          >
            {/* Enhanced Control Bar */}
            <Paper
              elevation={0}
              sx={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                p: 1.5,
                flexShrink: 0,
              }}
            >
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={1}
                alignItems={isMobile ? "stretch" : "center"}
                sx={{ gap: 1 }}
              >
                <Select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  disabled={executing}
                  size="small"
                  fullWidth={isMobile}
                  sx={{
                    minWidth: isMobile ? "auto" : 120,
                    color: "text.primary",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    "& .MuiSelect-select": {
                      py: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid rgba(255,255,255,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid rgba(255,255,255,0.25)",
                    },
                    "& *": {
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                >
                  {languages.map((language) => (
                    <MenuItem key={language.value} value={language.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box sx={{ color: language.color, fontSize: "1rem" }}>
                          {language.icon}
                        </Box>
                        <span style={{ fontSize: "0.875rem" }}>
                          {language.label}
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>

                <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
                  <Button
                    variant="contained"
                    onClick={createRequest}
                    disabled={executing}
                    fullWidth={isMobile}
                    startIcon={
                      executing ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />
                      )
                    }
                    sx={{
                      background: "linear-gradient(135deg, #2196F3, #42a5f5)",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      px: 2,
                      py: 1,
                      minWidth: "auto",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1976D2, #2196F3)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                      },
                      "&:disabled": {
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {executing ? "Running" : "Run Code"}
                  </Button>

                  <Tooltip title={copied ? "Copied!" : "More options"}>
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{
                        color: "text.primary",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                        },
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      background: "rgba(0,0,0,0.8)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      mt: 0.5,
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleCopyCode}
                    sx={{ fontSize: "0.875rem", py: 1 }}
                  >
                    <ContentCopyIcon sx={{ mr: 1, fontSize: 16 }} />
                    Copy Code
                  </MenuItem>
                  <MenuItem
                    onClick={handleDownloadCode}
                    sx={{ fontSize: "0.875rem", py: 1 }}
                  >
                    <DownloadIcon sx={{ mr: 1, fontSize: 16 }} />
                    Download
                  </MenuItem>
                </Menu>
              </Stack>

              {executionTime && (
                <Box
                  sx={{
                    mt: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 0.5,
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 16, color: "#2196F3" }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    Executed in {executionTime}ms
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Enhanced Input Section */}
            <Paper
              elevation={0}
              sx={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                p: 1.5,
                flex: "1 1 auto",
                minHeight: isMobile ? "120px" : "150px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <InputIcon sx={{ color: "#2196F3", fontSize: 18 }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.primary",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Input
                </Typography>
              </Box>
              <TextField
                multiline
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    "& fieldset": {
                      border: "1px solid rgba(255,255,255,0.15)",
                    },
                    "&:hover fieldset": {
                      border: "1px solid rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #2196F3",
                    },
                    "& textarea": {
                      height: "100% !important",
                      overflow: "auto !important",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "text.primary",
                    padding: "12px",
                    "&::placeholder": {
                      opacity: 0.6,
                    },
                  },
                }}
              />
            </Paper>

            {/* Enhanced Output Section */}
            <Paper
              elevation={0}
              sx={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                p: 1.5,
                flex: "2 1 auto",
                minHeight: isMobile ? "200px" : "250px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <OutputIcon sx={{ color: "#2196F3", fontSize: 18 }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.primary",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Output
                </Typography>
                {hasOutput && (
                  <Chip
                    icon={
                      isError ? (
                        <ErrorIcon sx={{ fontSize: 12 }} />
                      ) : (
                        <CheckCircleIcon sx={{ fontSize: 12 }} />
                      )
                    }
                    label={isError ? "Error" : "Success"}
                    size="small"
                    sx={{
                      backgroundColor: isError
                        ? "rgba(244, 67, 54, 0.15)"
                        : "rgba(76, 175, 80, 0.15)",
                      color: isError ? "#f44336" : "#4caf50",
                      fontSize: "0.75rem",
                      height: 24,
                      ml: "auto",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "8px",
                  p: 1.5,
                  flex: 1,
                  overflow: "auto",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  color: hasOutput
                    ? isError
                      ? "#ff6b6b"
                      : "#4ecdc4"
                    : "rgba(255,255,255,0.4)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  minHeight: 0, // Important for proper scrolling
                }}
              >
                {hasOutput ? (
                  output?.data?.output || output?.data?.error || output
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <OutputIcon sx={{ fontSize: 36, opacity: 0.3 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.4,
                        textAlign: "center",
                        fontSize: "0.8rem",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Output will appear here
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Editor;
