import express from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db", "db.json");

const app = express();
app.use(cors());
app.use(express.json());

async function readDb() {
  try {
    const content = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { empleados: [], tareas: [] };
    }
    throw error;
  }
}

async function writeDb(data) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/api/empleados", async (req, res) => {
  const db = await readDb();
  res.json(db.empleados || []);
});

app.post("/api/empleados", async (req, res) => {
  const db = await readDb();
  const empleados = db.empleados || [];
  const nextId = empleados.length
    ? Math.max(...empleados.map((e) => e.id)) + 1
    : 1;
  const nuevoEmpleado = { ...req.body, id: nextId };
  empleados.push(nuevoEmpleado);
  db.empleados = empleados;
  await writeDb(db);
  res.status(201).json(nuevoEmpleado);
});

app.put("/api/empleados/:id", async (req, res) => {
  const db = await readDb();
  const empleados = db.empleados || [];
  const id = Number(req.params.id);
  const index = empleados.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Empleado no encontrado" });
  }
  empleados[index] = { ...empleados[index], ...req.body, id };
  db.empleados = empleados;
  await writeDb(db);
  res.json(empleados[index]);
});

app.delete("/api/empleados/:id", async (req, res) => {
  const db = await readDb();
  const empleados = db.empleados || [];
  const id = Number(req.params.id);
  const filtered = empleados.filter((e) => e.id !== id);
  if (filtered.length === empleados.length) {
    return res.status(404).json({ error: "Empleado no encontrado" });
  }
  db.empleados = filtered;
  await writeDb(db);
  res.status(204).send();
});

app.get("/api/tareas", async (req, res) => {
  const db = await readDb();
  res.json(db.tareas || []);
});

app.post("/api/tareas", async (req, res) => {
  const db = await readDb();
  const tareas = db.tareas || [];
  const nextId = tareas.length ? Math.max(...tareas.map((t) => t.id)) + 1 : 1;
  const nuevaTarea = { ...req.body, id: nextId };
  tareas.push(nuevaTarea);
  db.tareas = tareas;
  await writeDb(db);
  res.status(201).json(nuevaTarea);
});

app.put("/api/tareas/:id", async (req, res) => {
  const db = await readDb();
  const tareas = db.tareas || [];
  const id = Number(req.params.id);
  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  tareas[index] = { ...tareas[index], ...req.body, id };
  db.tareas = tareas;
  await writeDb(db);
  res.json(tareas[index]);
});

app.delete("/api/tareas/:id", async (req, res) => {
  const db = await readDb();
  const tareas = db.tareas || [];
  const id = Number(req.params.id);
  const filtered = tareas.filter((t) => t.id !== id);
  if (filtered.length === tareas.length) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  db.tareas = filtered;
  await writeDb(db);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API simulada en http://localhost:${PORT}`);
});
