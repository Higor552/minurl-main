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

export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setLoading(true)

        const { error } = await authClient.signIn.email({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            setError("Email ou senha inválidos.")
            return
        }

        router.push("/dashboard")
    }

    return (
        <div className={cn("flex flex-col gap-6 font-dudu", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Loge na sua conta</CardTitle>
                    <CardDescription>
                        Insira seu email para logar 
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            {error && (
                                <p className="text-sm text-red-500 text-center">{error}</p>
                            )}

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
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
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu sua Senha?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Entrando..." : "Login"}
                                </Button>
                                
                                <FieldDescription className="text-center">
                                    Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}