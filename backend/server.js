import express from "express";
import cors from "cors";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import { json } from "stream/consumers";

const app = express();
const PORT = 3000;

// -------------------------------------------------
// Adaptación para ES Modules (non existe __dirname)
// -------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------------
// Middlewares básicos
// -------------------------------------------------
app.use(cors()); // permite peticións desde o frontend
app.use(express.json()); // permite recibir JSON no body

// -------------------------------------------------
// json-server: crea a API a partir de db.json
// -------------------------------------------------
const router = jsonServer.router(path.join(__dirname, "db/db.json"));

const middlewares = jsonServer.defaults();

// middlewares propios de json-server (logger, etc.)
app.use(middlewares);

// -------------------------------------------------
// Prefixo /api → simula unha API real
// -------------------------------------------------
app.use("/api", router);

// -------------------------------------------------
// Arranque do servidor
// -------------------------------------------------
app.listen(PORT, () => {
  console.log(`API simulada en http://localhost:${PORT}`);
});
