'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

type Post = {
  id: number;
  imageUrl: string;
  description: string;
  // Você pode adicionar outros campos aqui se precisar
};

export default function MeuPerfil() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/images'); // ou o endpoint da sua API
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-200 p-6 flex flex-col items-center border-r">
          <UserCircle className="w-32 h-32 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-red-700">Nome</h2>
          <p className="text-gray-500 mb-2">email</p>
          <p className="text-gray-500 mb-4">Posts</p>
          <Button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg text-lg">
            Novo Post
          </Button>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-red-700 mb-6">Meus posts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {posts.length === 0 && <p>Carregando posts...</p>}
            {posts.map(post => (
              <Image
                key={post.id}
                src={post.imageUrl}
                alt={post.description || 'Post'}
                width={300}
                height={300}
                className="rounded-lg shadow object-cover"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
