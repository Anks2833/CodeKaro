import random from "../utils/random.js";
import createFiles from "../file-system/createFile.js";

class CompileService {
  constructor() {}

  async runCode(req) {
    try {
      const data = {
        src: req.body.src,
        stdin: req.body.stdin,
        lang: req.body.lang,
        filename: "Test" + random(10),
      };

      console.log(req.body.src);

      if (req.body.src && req.body.lang) {
        const ans = await createFiles(data);
        console.log("Output --> " + JSON.stringify(ans));
        return ans;
      } else {
        console.log("Invalid Request has been made");
        return {
          output: "Invalid Request",
          status: "Invalid Request",
        };
      }
    } catch (error) {
      console.error("Error in CompileService.runCode:", error);
      throw error;
    }
  }
}

export default CompileService;
