import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react'

const prisma = new PrismaClient()

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  })

  if (!post) return <div className="p-10 text-red-600">Post não encontrado.</div>

  return (
    <div className="flex justify-center bg-neutral-100 min-h-screen py-10">
      <div className="bg-white border rounded-md w-full max-w-xl">
        {/* Header com avatar e nome de usuário */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <span className="ml-3 font-semibold">Roger Klock</span>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </div>

        {/* Imagem */}
        <div className="w-full aspect-square relative">
          <Image
            src={post.imageUrl}
            alt="Imagem do post"
            fill
            className="object-cover"
          />
        </div>

        {/* Ações */}
        <div className="flex justify-between px-4 py-3">
          <div className="flex space-x-4">
            <Heart className="w-6 h-6 cursor-pointer" />
            <MessageCircle className="w-6 h-6 cursor-pointer" />
            <Send className="w-6 h-6 cursor-pointer" />
          </div>
          <Bookmark className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Descrição / Detalhes */}
        <div className="px-4 pb-4 text-sm space-y-2">
          <p>
            <span className="font-semibold">Roger Klock</span> {post.description}
          </p>
          <p><span className="font-semibold">Materiais:</span> {post.materials}</p>
          <p><span className="font-semibold">Custo:</span> {post.cost}</p>
          <p><span className="font-semibold">Instruções:</span> {post.instructions}</p>
        </div>
      </div>
    </div>
  )
}
