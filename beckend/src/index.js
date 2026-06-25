// src/index.js
import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import planRoutes from "./routes/plan.routes.js"; // importação



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Rotas de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.all("/api/auth/*path", toNodeHandler(auth));

// Middleware
app.use(express.json());

app.use("/api/plans", planRoutes); // registro no prefixo /api/plans

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});
