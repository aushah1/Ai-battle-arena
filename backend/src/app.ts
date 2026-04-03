import express from "express";
import runGraph from "./ai/graph.ai.js";

const app = express();

// Middleware
app.use(express.json());

// CORS — allow the Vite dev server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "AI Battle Arena API" });
});

// Battle endpoint
app.post("/api/battle", async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem || typeof problem !== "string" || !problem.trim()) {
      res.status(400).json({ error: "A non-empty 'problem' string is required." });
      return;
    }

    const result = await runGraph(problem.trim());
    res.json(result);
  } catch (err: any) {
    console.error("Battle error:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
});

export default app;
