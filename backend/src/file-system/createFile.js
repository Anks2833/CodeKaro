import fs from "fs/promises";
import { join } from "path";
import runCode from "../services/code-runner.js";
import deletingTempFiles from "./deleteFile.js";

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
  go: "go",
};

async function createFiles(json_msg) {
  console.log(json_msg);
  try {
    await fs.writeFile(
      join(
        process.cwd(),
        `temp/${json_msg.filename}.${extensions[json_msg.lang]}`
      ),
      json_msg.src
    );
    console.log("Source file created");
    const ans = await runCode(json_msg);
    return ans;
  } catch (error) {
    console.log(error);
    deletingTempFiles();
    throw error;
  }
}

export default createFiles;
