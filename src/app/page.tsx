"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Link from "next/link"

type Post = {
  id: number
  imageUrl: string
  description: string
  materials: string
  cost: string
  instructions: string
}

export default function HomePage() {
  const [images, setImages] = useState<string[]>([])

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images")
      const data = await res.json()
      setPosts(data || [])
    }

    fetchImages()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="grid grid-cols-4 gap-6 p-6">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className={`overflow-hidden rounded-md shadow-sm block ${index < 4 ? "row-span-2 h-72" : "h-32"
              }`}
          >
            <Image
              src={post.imageUrl}
              alt={`Imagem ${index + 1}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </Link>
        ))}
      </section>
    </main>
  )
}
