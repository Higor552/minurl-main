// src/controllers/jogatina.controller.js
import * as JogatinaModel from "../models/jogatina.model.js";

// GET /api/jogatinas (somente as jogatinas do usuário logado)
export async function listar(req, res) {
  const jogatinas = await JogatinaModel.listarJogatinasPorUsuario(req.user.id);
  return res.json(jogatinas);
}

// GET /api/jogatinas/:id
export async function buscar(req, res) {
  const id = req.params.id;
  const jogatina = await JogatinaModel.buscarJogatinaPorId(id);

  if (!jogatina) {
    return res.status(404).json({ error: "Jogatina não encontrada." });
  }
  if (jogatina.userId !== req.user.id) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  return res.json(jogatina);
}

// POST /api/jogatinas
export async function criar(req, res) {
  const { gameTitle, developer, decisaoPrincipal, finalObtido } = req.body;

  if (!gameTitle || !decisaoPrincipal || !finalObtido) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const game = await JogatinaModel.encontrarOuCriarGame(gameTitle, developer);

  const jogatina = await JogatinaModel.criarJogatina({
    userId: req.user.id,
    gameId: game.id,
    decisaoPrincipal,
    finalObtido,
  });

  return res.status(201).json(jogatina);
}

// PUT /api/jogatinas/:id
export async function atualizar(req, res) {
  const id = req.params.id;
  const { gameTitle, developer, decisaoPrincipal, finalObtido } = req.body;

  const jogatina = await JogatinaModel.buscarJogatinaPorId(id);
  if (!jogatina) {
    return res.status(404).json({ error: "Jogatina não encontrada." });
  }
  if (jogatina.userId !== req.user.id) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  let gameId = jogatina.gameId;
  if (gameTitle) {
    const game = await JogatinaModel.encontrarOuCriarGame(gameTitle, developer);
    gameId = game.id;
  }

  const atualizada = await JogatinaModel.atualizarJogatina(id, {
    gameId,
    decisaoPrincipal,
    finalObtido,
  });
  return res.json(atualizada);
}

// DELETE /api/jogatinas/:id
export async function deletar(req, res) {
  const id = req.params.id;

  const jogatina = await JogatinaModel.buscarJogatinaPorId(id);
  if (!jogatina) {
    return res.status(404).json({ error: "Jogatina não encontrada." });
  }
  if (jogatina.userId !== req.user.id) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  await JogatinaModel.deletarJogatina(id);
  return res.status(204).send();
}
