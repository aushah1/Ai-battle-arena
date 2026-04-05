import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "AI Battle Arena API" });
});

// Battle endpoint
app.post("/invoke", async (req, res) => {
  try {
    const { problem } = req.body;
    if (!problem || !problem.trim()) {
      return res.status(400).json({ error: "Problem cannot be empty" });
    }

    const result = await runGraph(problem);
    res.json(result);
  } catch (err: any) {
    console.error("Battle error:", err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
});

export default app;
