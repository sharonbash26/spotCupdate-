import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { songs } from "./songs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  helmet({
    // Audio is intentionally fetched cross-origin (client dev server runs on a different port).
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/songs", (_req, res) => {
  res.json(songs);
});

app.get("/api/songs/:id", (req, res) => {
  const song = songs.find((s) => s.id === req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});

app.use("/audio", express.static(path.join(__dirname, "..", "audio")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
