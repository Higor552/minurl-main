"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export function SignupForm({ className, ...props }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")

        if (password.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.")
            return
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.")
            return
        }

        setLoading(true)

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        })

        setLoading(false)

        if (error) {
            setError("Erro ao criar conta. Verifique os dados e tente novamente.")
            return
        }

        router.push("/dashboard")
    }

    return (
        <div className={cn("flex flex-col gap-6 font-dudu", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Crie sua conta</CardTitle>
                    <CardDescription>
                        Insira seus dados abaixo para criar seu diário de escolhas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            {error && (
                                <p className="text-sm text-red-500 text-center">{error}</p>
                            )}

                            <Field>
                                <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Max Caulfield"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@examplo.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirmar Senha
                                        </FieldLabel>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Deve ter pelo menos 8 caracteres.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Criando conta..." : "Criar Conta"}
                                </Button>
                                <FieldDescription className="text-center mt-4">
                                    Já tem uma conta?{" "}
                                    <a href="/login" className="underline font-bold text-primary">
                                        Entrar
                                    </a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center text-zinc-500">
                Ao continuar, você concorda com nossos <a href="#" className="underline">Termos de Serviço</a>{" "}
                e <a href="#" className="underline">Política de Privacidade</a>.
            </FieldDescription>
        </div>
    )
}