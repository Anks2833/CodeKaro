import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  w: "majority",
  authSource: "admin",
};

// Retry configuration
const RETRY_OPTIONS = {
  maxRetries: 5,
  initialDelay: 1000,
  maxDelay: 30000,
  factor: 2,
};

// Connection state tracking
let connectionState = {
  isConnected: false,
  retryCount: 0,
  lastError: null,
};

/**
 * Calculate delay for exponential backoff
 */
const calculateBackoffDelay = (attemptNumber) => {
  const delay = Math.min(
    RETRY_OPTIONS.initialDelay * Math.pow(RETRY_OPTIONS.factor, attemptNumber),
    RETRY_OPTIONS.maxDelay
  );
  return delay + Math.random() * 1000;
};

/**
 * Connect to MongoDB with retry logic
 */
const connectDB = async () => {
  try {
    // Construct connection URI
    const mongoUri = `${process.env.MONGO_URI}/${DB_NAME}`;

    // Validate required environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    console.log("🔄 Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoUri, connectionOptions);

    connectionState.isConnected = true;
    connectionState.retryCount = 0;
    connectionState.lastError = null;

    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    connectionState.lastError = error;
    console.error(`🔴 MongoDB connection error: ${error.message}`);

    // Implement retry logic
    if (connectionState.retryCount < RETRY_OPTIONS.maxRetries) {
      connectionState.retryCount++;
      const delay = calculateBackoffDelay(connectionState.retryCount);

      console.log(
        `🔁 Retrying connection (${connectionState.retryCount}/${
          RETRY_OPTIONS.maxRetries
        }) in ${Math.round(delay / 1000)}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectDB(); // Recursive retry
    } else {
      console.error("❌ Maximum retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
};

/**
 * Setup MongoDB connection event handlers
 */
const setupConnectionHandlers = () => {
  const db = mongoose.connection;

  // Connection events
  db.on("connected", () => {
    console.log("📡 Mongoose connected to MongoDB");
  });

  db.on("error", (err) => {
    console.error(`🔴 Mongoose connection error: ${err}`);
    connectionState.lastError = err;
  });

  db.on("disconnected", () => {
    console.log("🔌 Mongoose disconnected from MongoDB");
    connectionState.isConnected = false;
  });

  db.on("reconnected", () => {
    console.log("🔄 Mongoose reconnected to MongoDB");
    connectionState.isConnected = true;
  });

  // Monitor replica set events (if using replica sets)
  db.on("reconnectFailed", () => {
    console.error("❌ Mongoose reconnection failed");
    process.exit(1);
  });
};

/**
 * Setup graceful shutdown handlers
 */
const setupGracefulShutdown = () => {
  const gracefulShutdown = async (signal) => {
    console.log(
      `\n🛑 Received ${signal} signal, starting graceful shutdown...`
    );

    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log("✅ MongoDB connection closed successfully");
      }

      console.log("👋 Application shutdown complete");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error during shutdown:", error);
      process.exit(1);
    }
  };

  // Handle different termination signals
  process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl+C
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Kubernetes/Docker stop
  process.on("SIGUSR2", () => gracefulShutdown("SIGUSR2")); // Nodemon restart

  // Handle uncaught errors
  process.on("uncaughtException", async (error) => {
    console.error("❌ Uncaught Exception:", error);
    await gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", async (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    await gracefulShutdown("unhandledRejection");
  });
};

/**
 * Health check function for monitoring
 */
const checkDatabaseHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    const health = {
      status: states[state] || "unknown",
      isHealthy: state === 1,
      timestamp: new Date().toISOString(),
      details: {
        readyState: state,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        retryCount: connectionState.retryCount,
        lastError: connectionState.lastError?.message || null,
      },
    };

    // Perform a simple operation to verify connection
    if (state === 1) {
      await mongoose.connection.db.admin().ping();
      health.details.ping = "success";
    }

    return health;
  } catch (error) {
    return {
      status: "error",
      isHealthy: false,
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
};

/**
 * Initialize database connection with all handlers
 */
const initializeDatabase = async () => {
  setupConnectionHandlers();
  setupGracefulShutdown();
  await connectDB();
};

// Export individual functions and a combined initializer
export {
  connectDB,
  setupGracefulShutdown,
  setupConnectionHandlers,
  checkDatabaseHealth,
  initializeDatabase,
  connectionState,
};
