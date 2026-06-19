import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen">
      
      
      <section className="w-full py-24 md:py-32 lg:py-48  text-black flex flex-col items-center text-center px-4 border-b border-black/10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 text-black">
          Cada Escolha Importa.
        </h1>
        <p className="max-w-3xl text-lg md:text-xl mb-10">
          Catalogue seus jogos narrativos, registre as suas decisões principais, e
          compare o seu final com outros jogadores da comunidade.
        </p>
      </section>

      
      <section className="w-full py-20 bg-white flex flex-col items-center px-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Buscar Jogo</h2>
            <p className="text-gray-600 mt-2">
              Qual título você terminou recentemente?
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto flex gap-3">
            <Input
              type="text"
              placeholder="Ex: Life is Strange, The Walking Dead..."
              className="h-14 text-lg border-2 border-zinc-200 rounded-lg flex-1 px-4"
            />
            <Button className="h-14 px-8 text-lg rounded-lg">
              Procurar
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 bg-gray-50 flex flex-col items-center px-4 border-t border-gray-200">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3">1. Seus Jogos</h3>
              <p className="text-gray-600">
                Crie um catálogo pessoal salvando todos os jogos que você já finalizou na sua conta.
              </p>
            </div>

            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3">2. Suas Decisões</h3>
              <p className="text-gray-600">
                Registre qual foi a sua decisão principal e exatamente qual final você obteve.
              </p>
            </div>

            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3">3. Estatísticas</h3>
              <p className="text-gray-600">
                Acesse o painel para descobrir se a maioria da comunidade tomou o mesmo caminho que você.
              </p>
            </div>
            
          </div>
      </section>

    </div>
  );
}