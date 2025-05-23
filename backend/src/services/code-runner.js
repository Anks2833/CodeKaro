import deletingTempFiles from "../file-system/deleteFile.js";
import { commandMap } from "./commands.js";
import { spawn } from "child_process";

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
  go: "go",
};

async function runCode(json_msg) {
  try {
    const timeout = 20;

    const { comCommand, comArgs, exCommand, exArgs } = commandMap(
      json_msg.filename,
      extensions[json_msg.lang]
    );

    // Compilation step
    if (comCommand) {
      await new Promise((resolve, reject) => {
        const compiledCode = spawn(comCommand, comArgs || []);

        compiledCode.stderr.on("data", (error) => {
          reject({ status: "Failed", error: error.toString() });
        });

        compiledCode.on("exit", () => {
          resolve();
        });
      });
    }

    // Execution step
    const result = await new Promise((resolve, reject) => {
      const exCode = spawn(exCommand, exArgs || []);
      let output = "";
      let error = "";

      const timer = setTimeout(() => {
        exCode.kill("SIGHUP");
        reject({
          status: "Runtime Error",
          error: `Timed Out. Your code took too long to execute, over ${timeout} seconds.`,
        });
      }, timeout * 1000);

      exCode.stdin.write(json_msg.stdin.toString());
      exCode.stdin.end();

      exCode.stdin.on("error", (err) => {
        console.log("stdin err", err);
      });

      exCode.stdout.on("data", (data) => {
        output += data.toString();
      });

      exCode.stderr.on("data", (data) => {
        error += data.toString();
      });

      exCode.on("exit", () => {
        clearTimeout(timer);
        resolve({ output, error });
      });
    });

    await deletingTempFiles();
    return result;
  } catch (error) {
    console.error("runCode error:", error);
    await deletingTempFiles();
    return error.status
      ? error
      : { status: "Unknown Error", error: error.toString() };
  }
}

export default runCode;
