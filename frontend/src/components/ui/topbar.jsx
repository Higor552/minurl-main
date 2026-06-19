import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="border-b border-shadow-grey-200 bg-tan-100 w-full">
            <div className="flex h-16 items-center px-4 md:px-8 justify-between font-dudu">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="font-medium text-tan-800">
                        <Link href="/login">Entrar</Link>
                    </Button>
                    <Button className="font-medium px-6 bg-coffee-bean-500 text-white shadow-sm border-none">
                        <Link href="/cadastro">Cadastrar</Link>
                    </Button>
                </div>

                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-tan-900 ">
                        <Link href="/">
                            O Efeito Borboleta
                        </Link>
                    </h1>
                </div>
            </div>
        </header>
    )
}