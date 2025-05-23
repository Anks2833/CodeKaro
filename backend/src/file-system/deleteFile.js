import { join } from "path";
import fs from "fs/promises";

async function deletingTempFiles() {
  try {
    const tempDir = join(process.cwd(), "temp");
    const files = await fs.readdir(tempDir);

    for (const file of files) {
      try {
        await fs.unlink(join(tempDir, file));
        console.log("DELETED file ->", file);
      } catch (err) {
        console.error("Failed to delete:", file, err);
      }
    }
  } catch (error) {
    console.error("Error reading temp directory:", error);
    throw error;
  }
}

export default deletingTempFiles;
