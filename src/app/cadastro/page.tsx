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
import { PencilRuler, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "../../api/http/auth";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleRegister(data: Inputs) {
    try {
      const response = await createUser(data);
      if (response) {
        router.push("/login");
        toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
      }
    } catch {
      toast.error(<div className="text-red-500">Erro ao cadastrar usuário</div>);
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
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>
              Crie sua conta para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="grid gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center border-2 rounded-md pl-4">
                    <User className="h-4 w-4 stroke-zinc-600" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nome"
                      className="border-none"
                      {...register("name", { required: "Nome é obrigatório" })}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

                  <div className="flex items-center border-2 rounded-md pl-4">
                    <Mail className="h-4 w-4 stroke-zinc-600" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="border-none"
                      {...register("email", { required: "Email é obrigatório" })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

                  <div className="flex items-center border-2 rounded-md pl-4">
                    <Lock className="h-4 w-4 stroke-zinc-600" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      className="border-none"
                      {...register("password", { required: "Senha é obrigatória" })}
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                <Button
                  variant="szcolor"
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}