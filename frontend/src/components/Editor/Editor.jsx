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
  LinearProgress,
  TextField,
  InputLabel,
  Select,
  IconButton,
  Menu,
  Modal,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Fade,
  useMediaQuery,
  useTheme,
  Stack,
  Typography,
  Tooltip,
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const languages = [
    { value: "python3", label: "Python", icon: "🐍", color: "#3776ab" },
    { value: "javascript", label: "JavaScript", icon: "🟨", color: "#f7df1e" },
    { value: "cpp", label: "C++", icon: "⚡", color: "#00599c" },
    { value: "c", label: "C", icon: "🔧", color: "#a8b9cc" },
    { value: "java", label: "Java", icon: "☕", color: "#ed8b00" },
    { value: "go", label: "Go", icon: "🐹", color: "#00add8" },
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
        "https://code-box.onrender.com/api/v1/submit",
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
      >
        <Fade in={showModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              p: 4,
              maxWidth: "400px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <CloudIcon sx={{ fontSize: 48, color: "#2196F3", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: "light.main",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Executing Code
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "light.main",
                opacity: 0.8,
                fontFamily: "Poppins, sans-serif",
                mb: 3,
              }}
            >
              Running on cloud servers. This may take a moment due to cold
              start.
            </Typography>
            <CircularProgress size={40} sx={{ color: "#2196F3" }} />
          </Box>
        </Fade>
      </Modal>

      <Box
        sx={{
          height: "92vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          p: 2,
          "& .ace_gutter": {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          "& .ace_editor": {
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
          },
          "& .ace_support.ace_function": {
            color: "primary.main",
          },
        }}
      >
        {/* Enhanced Code Editor Section */}
        <Paper
          elevation={0}
          sx={{
            flex: isMobile ? "1" : "2",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Editor Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CodeIcon sx={{ color: "#2196F3" }} />
              <Typography
                variant="h6"
                sx={{
                  color: "light.main",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                }}
              >
                Code Editor
              </Typography>
            </Box>
            <Chip
              label={getCurrentLanguage()?.label}
              icon={<span>{getCurrentLanguage()?.icon}</span>}
              sx={{
                background: getCurrentLanguage()?.color,
                color: "white",
                fontWeight: 600,
              }}
            />
          </Box>

          <AceEditor
            placeholder="// Start coding here..."
            mode={editorlang}
            theme="dracula"
            name="CodeKaro"
            onChange={setCode}
            value={code}
            fontSize={16}
            showPrintMargin={false}
            style={{
              height: isMobile ? "300px" : "calc(100% - 80px)",
              width: "100%",
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
              wrap: true,
            }}
          />
        </Paper>

        {/* Enhanced Control Panel */}
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Enhanced Control Bar */}
          <Paper
            elevation={0}
            sx={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              p: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
            >
              <Select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                disabled={executing}
                size="small"
                sx={{
                  minWidth: 120,
                  color: "light.main",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid rgba(255,255,255,0.2)",
                  },
                  "& *": {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
              >
                {languages.map((language) => (
                  <MenuItem key={language.value} value={language.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{language.icon}</span>
                      {language.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                onClick={createRequest}
                disabled={executing}
                startIcon={
                  executing ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <PlayArrowRoundedIcon />
                  )
                }
                sx={{
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2, #2196F3)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {executing ? "Running..." : "Run Code"}
              </Button>

              <Tooltip title={copied ? "Copied!" : "More options"}>
                <IconButton
                  onClick={handleClick}
                  sx={{
                    color: "light.main",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    background: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem onClick={handleCopyCode}>
                  <ContentCopyIcon sx={{ mr: 1, fontSize: 18 }} />
                  Copy Code
                </MenuItem>
                <MenuItem onClick={handleDownloadCode}>
                  <DownloadIcon sx={{ mr: 1, fontSize: 18 }} />
                  Download
                </MenuItem>
              </Menu>
            </Stack>

            {executionTime && (
              <Box
                sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <SpeedIcon sx={{ fontSize: 16, color: "#2196F3" }} />
                <Typography
                  variant="caption"
                  sx={{ color: "light.main", opacity: 0.8 }}
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
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              p: 2,
              flex: "1",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <InputIcon sx={{ color: "#2196F3" }} />
              <Typography
                variant="subtitle1"
                sx={{
                  color: "light.main",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                }}
              >
                Input
              </Typography>
            </Box>
            <TextField
              multiline
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input here..."
              rows={4}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  "& fieldset": {
                    border: "1px solid rgba(255,255,255,0.2)",
                  },
                  "&:hover fieldset": {
                    border: "1px solid rgba(255,255,255,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid #2196F3",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  fontSize: "14px",
                },
              }}
            />
          </Paper>

          {/* Enhanced Output Section */}
          <Paper
            elevation={0}
            sx={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              p: 2,
              flex: "2",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <OutputIcon sx={{ color: "#2196F3" }} />
              <Typography
                variant="subtitle1"
                sx={{
                  color: "light.main",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                }}
              >
                Output
              </Typography>
              {hasOutput && (
                <Chip
                  icon={isError ? <ErrorIcon /> : <CheckCircleIcon />}
                  label={isError ? "Error" : "Success"}
                  size="small"
                  sx={{
                    backgroundColor: isError
                      ? "rgba(244, 67, 54, 0.2)"
                      : "rgba(76, 175, 80, 0.2)",
                    color: isError ? "#f44336" : "#4caf50",
                    ml: "auto",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: "12px",
                p: 2,
                height: "calc(100% - 60px)",
                overflow: "auto",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                color: hasOutput
                  ? isError
                    ? "#ff6b6b"
                    : "#4ecdc4"
                  : "rgba(255,255,255,0.5)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
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
                    gap: 1,
                  }}
                >
                  <OutputIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.5, textAlign: "center" }}
                  >
                    Run your code to see the output here
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Editor;
