"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Photo {
  id: string
  catboxId: string
  title: string
  description: string
  date: string
}

const photos: Photo[] = [
  {
    id: "1",
    catboxId: "ejemplo1.jpg", // Reemplaza con tu ID real de Catbox
    title: "Tu sonrisa radiante",
    description: "Esa sonrisa que siempre iluminaba mis días",
    date: "Un día especial",
  },
  {
    id: "2",
    catboxId: "ejemplo2.jpg",
    title: "Momento de felicidad",
    description: "Cuando la felicidad se reflejaba en tus ojos",
    date: "Tarde de primavera",
  },
  {
    id: "3",
    catboxId: "ejemplo3.jpg",
    title: "Tu mirada serena",
    description: "Esa paz que transmitías con solo mirarte",
    date: "Atardecer dorado",
  },
  {
    id: "4",
    catboxId: "ejemplo4.jpg",
    title: "Risa espontánea",
    description: "El sonido más hermoso que conocí",
    date: "Momento perfecto",
  },
  {
    id: "5",
    catboxId: "ejemplo5.jpg",
    title: "Tu belleza natural",
    description: "Sin filtros, sin poses, solo tú siendo perfecta",
    date: "Mañana soleada",
  },
]

export default function FotosPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: string }>({})
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({})

  // Función para obtener imagen desde Catbox (permite hotlinks)
  const getImageBlob = async (catboxId: string): Promise<string> => {
    if (imageBlobs[catboxId]) {
      return imageBlobs[catboxId]
    }

    if (loadingImages[catboxId]) {
      // Esperar a que termine la carga actual
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (imageBlobs[catboxId]) {
            clearInterval(checkInterval)
            resolve(imageBlobs[catboxId])
          }
        }, 100)
      })
    }

    setLoadingImages((prev) => ({ ...prev, [catboxId]: true }))

    try {
      // Catbox permite hotlinks directos, pero usamos fetch para consistencia
      const response = await fetch(`https://files.catbox.moe/${catboxId}`, {
        method: "GET",
        headers: {
          Accept: "image/*",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      setImageBlobs((prev) => ({ ...prev, [catboxId]: blobUrl }))
      setLoadingImages((prev) => ({ ...prev, [catboxId]: false }))

      return blobUrl
    } catch (error) {
      console.error(`Error loading image ${catboxId}:`, error)
      setLoadingImages((prev) => ({ ...prev, [catboxId]: false }))

      // Fallback: usar URL directa de Catbox (permite hotlinks)
      const directUrl = `https://files.catbox.moe/${catboxId}`
      setImageBlobs((prev) => ({ ...prev, [catboxId]: directUrl }))
      return directUrl
    }
  }

  // Precargar imágenes
  useEffect(() => {
    const preloadImages = async () => {
      // Precargar imagen actual
      await getImageBlob(photos[currentIndex].catboxId)

      // Precargar siguiente y anterior
      const nextIndex = (currentIndex + 1) % photos.length
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length

      setTimeout(() => {
        getImageBlob(photos[nextIndex].catboxId)
        getImageBlob(photos[prevIndex].catboxId)
      }, 500)
    }

    preloadImages()
  }, [currentIndex])

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToPhoto = (index: number) => {
    setCurrentIndex(index)
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="min-h-screen relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Star className="h-12 w-12 text-purple-500 fill-current mx-auto mb-4 relative z-10 animate-bounce" />
          </div>
          <h1 className="font-dancing text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Tus Fotos
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {photos.length} momentos capturados que guardan tu esencia y belleza
          </p>
        </div>

        {/* Carousel - Tamaño reducido */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Photo */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-200/50 animate-fade-in-up">
            <div className="aspect-[4/3] relative transition-all duration-500 ease-in-out">
              {loadingImages[currentPhoto.catboxId] ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-purple-600 font-medium text-sm">Cargando imagen...</p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageBlobs[currentPhoto.catboxId] || `https://files.catbox.moe/${currentPhoto.catboxId}`}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Si falla, usar placeholder
                    e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Photo Counter */}
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-dancing text-xl font-semibold text-slate-700">{currentPhoto.title}</h3>
                <Star className="h-5 w-5 text-purple-400 fill-current opacity-60" />
              </div>
              <p className="text-sm text-purple-600 font-medium mb-2">{currentPhoto.date}</p>
              <p className="text-slate-600 leading-relaxed text-sm">{currentPhoto.description}</p>
            </div>
          </div>

          {/* Thumbnails - Tamaño reducido */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-3">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToPhoto(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:shadow-lg ${
                  index === currentIndex
                    ? "border-purple-400 shadow-lg scale-110"
                    : "border-transparent hover:border-purple-300 hover:scale-105"
                }`}
              >
                {loadingImages[photo.catboxId] ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={imageBlobs[photo.catboxId] || `https://files.catbox.moe/${photo.catboxId}`}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-500 scale-125" : "bg-purple-200 hover:bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Instructions */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Usa las flechas o haz clic en las miniaturas para navegar • {photos.length} fotos en total
          </p>
          <p className="text-slate-400 text-xs mt-2">
            💡 Para usar tus fotos: Sube a{" "}
            <a
              href="https://catbox.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              catbox.moe
            </a>{" "}
            y reemplaza los IDs en el código
          </p>
        </div>
      </div>
    </div>
  )
}
