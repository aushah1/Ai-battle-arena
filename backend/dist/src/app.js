import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";
const app = express();
// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? true : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
// Health check
app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "AI Battle Arena API",
    });
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
    }
    catch (err) {
        console.error("Battle error:", err);
        res
            .status(500)
            .json({ error: "Internal server error", message: err.message });
    }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../public");
app.use(express.static(frontendPath));
app.get("/{*any}", (req, res, next) => {
    if (req.path.startsWith("/invoke"))
        return next();
    res.sendFile(path.join(frontendPath, "index.html"));
});
export default app;
//# sourceMappingURL=app.js.map