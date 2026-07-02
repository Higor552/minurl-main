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

     
    
    </div>
    
  );
}
