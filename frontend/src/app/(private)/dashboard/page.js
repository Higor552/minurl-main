"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  atualizarJogatina,
  criarJogatina,
  deletarJogatina,
  listarJogatinas,
} from "@/lib/jogatinas-api";

const FORM_VAZIO = {
  gameTitle: "",
  developer: "",
  decisaoPrincipal: "",
  finalObtido: "",
};

export default function Dashboard() {
  const [jogatinas, setJogatinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);

  async function carregarJogatinas() {
    setLoading(true);
    try {
      const dados = await listarJogatinas();
      setJogatinas(dados ?? []);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarJogatinas();
  }, []);

  function handleChange(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function iniciarEdicao(jogatina) {
    setEditandoId(jogatina.id);
    setForm({
      gameTitle: jogatina.game?.title ?? "",
      developer: jogatina.game?.developer ?? "",
      decisaoPrincipal: jogatina.decisaoPrincipal,
      finalObtido: jogatina.finalObtido,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(FORM_VAZIO);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      if (editandoId) {
        await atualizarJogatina(editandoId, form);
      } else {
        await criarJogatina(form);
      }
      cancelarEdicao();
      await carregarJogatinas();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id) {
    const confirmado = window.confirm(
      "Tem certeza que deseja excluir esta jogatina? Essa ação não pode ser desfeita.",
    );
    if (!confirmado) return;

    setErro("");
    try {
      await deletarJogatina(id);
      if (editandoId === id) cancelarEdicao();
      await carregarJogatinas();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card>
        <CardHeader>
          <CardTitle>
            {editandoId ? "Editar jogatina" : "Registrar nova jogatina"}
          </CardTitle>
          <CardDescription>
            Catalogue o jogo, a decisão principal que você tomou e o final que
            obteve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {erro && (
                <p className="text-sm text-red-500 text-center">{erro}</p>
              )}

              <Field>
                <FieldLabel htmlFor="gameTitle">Título do jogo</FieldLabel>
                <Input
                  id="gameTitle"
                  placeholder="Ex: Life is Strange"
                  required
                  value={form.gameTitle}
                  onChange={(e) => handleChange("gameTitle", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="decisaoPrincipal">
                  Decisão principal
                </FieldLabel>
                <Input
                  id="decisaoPrincipal"
                  placeholder="Ex: Salvar Chloe"
                  required
                  value={form.decisaoPrincipal}
                  onChange={(e) =>
                    handleChange("decisaoPrincipal", e.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="finalObtido">Final obtido</FieldLabel>
                <Input
                  id="finalObtido"
                  placeholder="Ex: Arcadia Bay destruída"
                  required
                  value={form.finalObtido}
                  onChange={(e) => handleChange("finalObtido", e.target.value)}
                />
              </Field>

              <Field className="flex-row">
                <Button type="submit" disabled={salvando}>
                  {salvando
                    ? "Salvando..."
                    : editandoId
                      ? "Salvar alterações"
                      : "Cadastrar jogatina"}
                </Button>
                {editandoId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelarEdicao}
                  >
                    Cancelar
                  </Button>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}

        {!loading && jogatinas.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Você ainda não registrou nenhuma jogatina.
          </p>
        )}

        {jogatinas.map((jogatina) => (
          <Card key={jogatina.id}>
            <CardHeader>
              <CardTitle>{jogatina.game?.title}</CardTitle>
              <CardDescription>
                {jogatina.game?.developer || "Desenvolvedora não informada"}
              </CardDescription>
              <CardAction className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => iniciarEdicao(jogatina)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleExcluir(jogatina.id)}
                >
                  Excluir
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                <span className="font-medium">Decisão principal: </span>
                {jogatina.decisaoPrincipal}
              </p>
              <p>
                <span className="font-medium">Final obtido: </span>
                {jogatina.finalObtido}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
