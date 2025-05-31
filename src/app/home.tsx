// app/home/page.tsx

"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Bell, Cog, User, Search } from "lucide-react";

export default function HomePage() {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
    "/img9.jpg",
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">✂️</div>
          <span className="font-bold text-red-600">CRAFT - CORNER</span>
        </div>

        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="text-gray-600 cursor-pointer" />
          <Cog className="text-gray-600 cursor-pointer" />
          <User className="text-gray-600 cursor-pointer" />
        </div>
      </nav>

      {/* Galeria */}
      <section className="grid grid-cols-4 gap-6 p-6">
        {images.map((src, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-md shadow-sm ${
              index < 4 ? "row-span-2 h-72" : "h-32"
            }`}
          >
            <Image
              src={src}
              alt={`Imagem ${index + 1}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
