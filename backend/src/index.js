import express from "express";
import cors from "cors";
import v1route from "./routes/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3300;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

server.use("/api", v1route);

const startAndCreateServer = async () => {
  server.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
  });
};

startAndCreateServer();
