import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageUrl, description, materials, cost, instructions } = body

    const post = await prisma.post.create({
      data: {
        imageUrl,
        description,
        materials,
        cost,
        instructions,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro ao criar post.' }, { status: 500 })
  }
}
