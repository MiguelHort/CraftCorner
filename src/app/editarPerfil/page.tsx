import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucidePalette, ChevronLeft, Pencil } from "lucide-react";
import Header from "@/components/header";

export default function EditarPerfil() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Settings Card */}
      <div className="flex justify-center mt-20">
        <Card className="w-[450px] p-6 rounded-xl shadow-md">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Editar Perfil</p>
              <p>Roger Klock</p>
              <Pencil className="text-gray-600" />
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Alterar Senha</p>
              <p>********</p>
              <Pencil className="text-gray-600" />
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Conta</p>
              <p>roger.klock</p>
              <Pencil className="text-gray-600" />
            </div>

            <div className="flex justify-center mt-8">
              <LucidePalette className="w-20 h-20 text-gray-500" />
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}