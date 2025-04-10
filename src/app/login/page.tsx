"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { PencilRuler, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { getUser } from "../../api/http/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Inputs = {
  email: string;
  senha: string;
};



export default function LoginPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleLogin(data: Inputs) {
    try {
      const response = await getUser(data);
        if (response) {
        router.push("/usuarios");
        toast.success("Login realizado com sucesso!");
      }
    } catch {
      toast.error(<div className="text-red-500">Erro ao fazer login</div>);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar-border p-4">

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <PencilRuler className="h-12 w-12 text-muted-foreground stroke-1" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-sz-1">
            CRAFT-CORNER
          </h1>
          <p className="mt-2 text-muted-foreground">
            Plataforma para compartilhar seu artesanato.
          </p>
        </div>

        <Card className="py-8 px-6">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="grid gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center border-2 rounded-md pl-4">
                    <Mail className="h-4 w-4 stroke-zinc-600" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="Email"
                      className="border-none"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs"></p>}

                  <div className="flex items-center border-2 rounded-md pl-4">
                    <Lock className="h-4 w-4 stroke-zinc-600" />
                    <Input
                      id="senha"
                      type="password"
                      placeholder="Senha"
                      className="border-none"
                      {...register("senha")}
                    />
                  </div>
                  {errors.senha && <p className="text-red-500 text-xs"></p>}
                </div>

                <Button
                  variant="szcolor"
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Entrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
