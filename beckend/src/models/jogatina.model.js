// src/models/jogatina.model.js
import { prisma } from "../lib/prisma.js";

// Busca (ou cria, se ainda não existir) o jogo pelo título.
export async function encontrarOuCriarGame(title, developer) {
  let game = await prisma.game.findFirst({ where: { title } });

  if (!game) {
    game = await prisma.game.create({ data: { title, developer } });
  }

  return game;
}

export async function listarJogatinasPorUsuario(userId) {
  return prisma.jogatina.findMany({
    where: { userId },
    include: { game: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function buscarJogatinaPorId(id) {
  return prisma.jogatina.findUnique({
    where: { id },
    include: { game: true },
  });
}

export async function criarJogatina({
  userId,
  gameId,
  decisaoPrincipal,
  finalObtido,
}) {
  return prisma.jogatina.create({
    data: { userId, gameId, decisaoPrincipal, finalObtido },
    include: { game: true },
  });
}

export async function atualizarJogatina(id, { gameId, decisaoPrincipal, finalObtido }) {
  return prisma.jogatina.update({
    where: { id },
    data: { gameId, decisaoPrincipal, finalObtido },
    include: { game: true },
  });
}

export async function deletarJogatina(id) {
  return prisma.jogatina.delete({ where: { id } });
}
