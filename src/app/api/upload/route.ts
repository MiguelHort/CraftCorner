import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file: File | null = formData.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: 'Arquivo não encontrado.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
  const filePath = path.join(uploadsDir, fileName)

  await writeFile(filePath, buffer)

  return NextResponse.json({ url: `/uploads/${fileName}` })
}
