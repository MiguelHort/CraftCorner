import { Bell, Settings, User, PencilRuler } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
            <div className="flex items-center space-x-4">
                <PencilRuler className="w-8 text-muted-foreground stroke-1" />
                <Link href="/">
                    <h1 className="text-2xl font-bold tracking-tight text-sz-1">
                        CRAFT-CORNER
                    </h1>
                </Link>
            </div>
            <div className="flex items-center space-x-6">
                <Bell className="text-gray-600 cursor-pointer hover:opacity-70" />
                <Link href="/editarPerfil">
                    <Settings className="text-gray-600 cursor-pointer hover:opacity-70" />
                </Link>
                <Link href="/meuPerfil">
                    <User className="text-gray-600 cursor-pointer hover:opacity-70" />
                </Link>
            </div>
        </div>
    );
};