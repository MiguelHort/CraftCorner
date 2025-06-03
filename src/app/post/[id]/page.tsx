import { PrismaClient } from '@prisma/client'
import Image from 'next/image'

const prisma = new PrismaClient()

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  })

  if (!post) return <div className="p-10 text-red-600">Post não encontrado.</div>

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded shadow-md p-6 max-w-3xl mx-auto">
        <Image
          src={post.imageUrl}
          alt="Imagem do post"
          width={800}
          height={600}
          className="rounded w-full object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Descrição</h1>
        <p className="mb-4">{post.description}</p>

        <h2 className="text-xl font-semibold">Materiais</h2>
        <p className="mb-4">{post.materials}</p>

        <h2 className="text-xl font-semibold">Custo</h2>
        <p className="mb-4">{post.cost}</p>

        <h2 className="text-xl font-semibold">Instruções</h2>
        <p>{post.instructions}</p>
      </div>
    </div>
  )
}
