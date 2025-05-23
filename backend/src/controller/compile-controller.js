import { CompileService } from "../services/index.js";

class CompileController {
  constructor() {
    this.compileService = new CompileService();
  }

  runCode = async (req, res) => {
    try {
      const resp = await this.compileService.runCode(req);
      return res.status(202).json({
        message: "Successfully ran it",
        data: resp,
        err: {},
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };
}

export default new CompileController();
