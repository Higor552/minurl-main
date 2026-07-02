import { Router } from "express";
import * as JogatinaController from "../controllers/jogatina.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", requireAuth, JogatinaController.listar);
router.get("/:id", requireAuth, JogatinaController.buscar);
router.post("/", requireAuth, JogatinaController.criar);
router.put("/:id", requireAuth, JogatinaController.atualizar);
router.delete("/:id", requireAuth, JogatinaController.deletar);

export default router;
