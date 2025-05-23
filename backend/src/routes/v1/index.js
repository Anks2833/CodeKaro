import express from "express";
import { compileController } from "../../controller/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Successfully made the GET request");
});

router.post("/submit", compileController.runCode);

export default router;
