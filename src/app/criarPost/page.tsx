'use client'

import Header from '@/components/header'
import { useState } from 'react'

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [cost, setCost] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    setLoading(true)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    const uploadedImageUrl = data.url

    // Agora salva no banco
    const postRes = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: uploadedImageUrl,
        description,
        materials,
        cost,
        instructions,
      }),
    })

    if (postRes.ok) {
      alert('Post criado com sucesso!')
      // Limpa os campos se quiser
    } else {
      alert('Erro ao salvar post.')
    }

    setLoading(false)
  }


  return (
    <>
      <Header />

      <div className="flex justify-center items-start bg-gray-100 min-h-screen p-8">
        <form onSubmit={handleUpload} className="flex gap-8 bg-white p-6 rounded shadow-md">
          {/* Imagem de upload */}
          <div className="w-80 h-96 bg-gray-300 flex items-center justify-center text-center text-lg font-semibold text-black relative overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <span>Selecione a imagem</span>
            )}
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Campos de entrada */}
          <div className="flex flex-col gap-4 w-96">
            <input
              type="text"
              placeholder="Descrição"
              className="border border-gray-300 rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Materiais"
              className="border border-gray-300 rounded px-3 py-2"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
            />
            <input
              type="text"
              placeholder="Custo"
              className="border border-gray-300 rounded px-3 py-2"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <textarea
              placeholder="Instruções de criação:"
              className="border border-gray-300 rounded px-3 py-2 h-24 resize-none"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-700 text-white py-2 font-bold rounded hover:bg-red-800 transition"
              disabled={loading}
            >
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
