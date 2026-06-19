import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    console.log("4:47 a melhor hora para se fazer um pedido, mas isso é um segredo, só to contando pra ti porque tu é tu"),
    <div className="flex flex-col min-h-screen bg-tan-50">
      <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center text-center px-4 border-b border-shadow-grey-200">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 text-tan-900">
          Cada Escolha Importa.
        </h1>
        <p className="max-w-3xl text-lg md:text-xl mb-10 text-tan-700">
          Catalogue seus jogos narrativos, registre as suas decisões principais, e
          compare o seu final com outros jogadores da comunidade.
        </p>
      </section>

      <section className="w-full py-20 bg-shadow-grey-50 flex flex-col items-center px-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-tan-900">Buscar Jogo</h2>
            <p className="text-tan-700 mt-2">
              Qual título você terminou recentemente?
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto flex gap-3">
            <Input
              type="text"
              placeholder="Ex: Life is Strange, The Walking Dead..."
              className="h-14 text-lg border-2 border-shadow-grey-200 bg-white text-tan-900 rounded-lg flex-1 px-4"
            />
            
            <Button className="h-14 px-8 text-lg rounded-lg bg-coffee-bean-500 hover:bg-coffee-bean-600 text-white border-none shadow-md">
              Procurar
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 bg-tan-50 flex flex-col items-center px-4 border-t border-shadow-grey-200">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="bg-shadow-grey-100 p-6 rounded-xl border border-shadow-grey-200 shadow-sm ">
              <h3 className="text-xl font-bold mb-3 text-tan-900">1. Seus Jogos</h3>
              <p className="text-tan-700">
                Crie um catálogo pessoal salvando todos os jogos que você já finalizou na sua conta.
              </p>
            </div>

            <div className="bg-shadow-grey-100 p-6 rounded-xl border border-shadow-grey-200 shadow-sm ">
              <h3 className="text-xl font-bold mb-3 text-tan-900">2. Suas Decisões</h3>
              <p className="text-tan-700">
                Registre qual foi a sua decisão principal e exatamente qual final você obteve.
              </p>
            </div>
            <div className="bg-shadow-grey-100 p-6 rounded-xl border border-shadow-grey-200 shadow-sm ">
              <h3 className="text-xl font-bold mb-3 text-tan-900">3. Estatísticas</h3>
              <p className="text-tan-700">
                Acesse o painel para descobrir se a maioria da comunidade tomou o mesmo caminho que você.
              </p>
            </div>
            
          </div>
      </section>
    
    </div>
    
  );
}
