const API_URL = "http://localhost:5500/api/jogatinas";

async function tratarResposta(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || "Erro ao comunicar com o servidor.");
  }
  return data;
}

export async function listarJogatinas() {
  const res = await fetch(API_URL, {
    credentials: "include",
  });
  return tratarResposta(res);
}

export async function criarJogatina(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function atualizarJogatina(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function deletarJogatina(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return tratarResposta(res);
}
