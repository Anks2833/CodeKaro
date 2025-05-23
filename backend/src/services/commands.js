import { join } from "path";

export const commandMap = (filename, language) => {
  const tempPath = (ext) => join(process.cwd(), `/temp/${filename}.${ext}`);

  switch (language) {
    case "java":
      return {
        exCommand: "java",
        exArgs: [tempPath("java")],
      };

    case "cpp":
      return {
        comCommand: "g++",
        comArgs: [tempPath("cpp"), "-o", tempPath("out")],
        exCommand: tempPath("out"),
      };

    case "py":
      return {
        exCommand: "python3",
        exArgs: [tempPath("py")],
      };

    case "c":
      return {
        comCommand: "gcc",
        comArgs: [tempPath("c"), "-o", tempPath("out")],
        exCommand: tempPath("out"),
      };

    case "js":
      return {
        exCommand: "node",
        exArgs: [tempPath("js")],
      };

    case "go":
      return {
        exCommand: "go",
        exArgs: ["run", tempPath("go")],
      };

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
