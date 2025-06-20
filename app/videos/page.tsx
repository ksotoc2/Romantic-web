"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface Video {
  id: string
  catboxId: string
  title: string
  description: string
  date: string
}

// Videos definidos desde código - usando Catbox
const videos: Video[] = [
  {
    id: "1",
    catboxId: "ejemplo1.mp4", // Reemplaza con tu ID real de Catbox
    title: "Tu risa contagiosa",
    description: "Ese momento cuando reías sin parar, el sonido más hermoso",
    date: "Tarde de risas",
  },
  {
    id: "2",
    catboxId: "ejemplo2.mp4",
    title: "Bailando libre",
    description: "Cuando bailabas sin importar nada más, pura felicidad",
    date: "Noche de música",
  },
  {
    id: "3",
    catboxId: "ejemplo3.mp4",
    title: "Momento espontáneo",
    description: "Esos segundos perfectos que capturé sin que te dieras cuenta",
    date: "Día cualquiera",
  },
  {
    id: "4",
    catboxId: "ejemplo4.mp4",
    title: "Tu sonrisa matutina",
    description: "Como lucías cada mañana, radiante y hermosa",
    date: "Amanecer perfecto",
  },
  {
    id: "5",
    catboxId: "ejemplo5.mp4",
    title: "Caminando juntos",
    description: "Nuestros pasos sincronizados, nuestro ritmo perfecto",
    date: "Paseo inolvidable",
  },
]

// Video dedicado definido desde código
const dedicatedVideo = {
  catboxId: "dedicado.mp4", // Reemplaza con tu ID real de Catbox
  title: "Mi Video Para Ti",
  description:
    "Un mensaje desde el corazón que quería compartir contigo. Este video lo hice pensando en todos los momentos que vivimos juntos y en lo especial que eres para mí.",
}

export default function VideosPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videoBlobs, setVideoBlobs] = useState<{ [key: string]: string }>({})
  const [loadingVideos, setLoadingVideos] = useState<{ [key: string]: boolean }>({})

  // Función para obtener video desde Catbox (permite hotlinks)
  const getVideoBlob = async (catboxId: string): Promise<string> => {
    if (videoBlobs[catboxId]) {
      return videoBlobs[catboxId]
    }

    if (loadingVideos[catboxId]) {
      // Esperar a que termine la carga actual
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (videoBlobs[catboxId]) {
            clearInterval(checkInterval)
            resolve(videoBlobs[catboxId])
          }
        }, 100)
      })
    }

    setLoadingVideos((prev) => ({ ...prev, [catboxId]: true }))

    try {
      // Catbox permite hotlinks directos, pero usamos fetch para consistencia
      const response = await fetch(`https://files.catbox.moe/${catboxId}`, {
        method: "GET",
        headers: {
          Accept: "video/*",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      setVideoBlobs((prev) => ({ ...prev, [catboxId]: blobUrl }))
      setLoadingVideos((prev) => ({ ...prev, [catboxId]: false }))

      return blobUrl
    } catch (error) {
      console.error(`Error loading video ${catboxId}:`, error)
      setLoadingVideos((prev) => ({ ...prev, [catboxId]: false }))

      // Fallback: usar URL directa de Catbox (permite hotlinks)
      const directUrl = `https://files.catbox.moe/${catboxId}`
      setVideoBlobs((prev) => ({ ...prev, [catboxId]: directUrl }))
      return directUrl
    }
  }

  // Precargar videos
  useEffect(() => {
    const preloadVideos = async () => {
      // Precargar video actual
      await getVideoBlob(videos[currentIndex].catboxId)

      // Precargar siguiente video
      const nextIndex = (currentIndex + 1) % videos.length
      setTimeout(() => {
        getVideoBlob(videos[nextIndex].catboxId)
      }, 1000)
    }

    preloadVideos()
  }, [currentIndex])

  // Precargar video dedicado
  useEffect(() => {
    setTimeout(() => {
      getVideoBlob(dedicatedVideo.catboxId)
    }, 2000)
  }, [])

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const goToVideo = (index: number) => {
    setCurrentIndex(index)
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className="min-h-screen relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Play className="h-16 w-16 text-pink-500 mx-auto mb-6 relative z-10 animate-bounce" />
          </div>
          <h1 className="font-dancing text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Tus Videos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {videos.length} momentos en movimiento que capturan tu esencia y alegría
          </p>
          <p className="text-slate-400 text-xs mt-2">
            💡 Para usar tus videos: Sube a{" "}
            <a
              href="https://catbox.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              catbox.moe
            </a>{" "}
            y reemplaza los IDs en el código
          </p>
        </div>

        {/* Video Carousel - Tamaño reducido */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="text-center mb-6">
            <h2 className="font-dancing text-2xl font-bold text-slate-700 mb-2">Recuerdos en Movimiento</h2>
            <p className="text-slate-600">Momentos capturados de tu esencia</p>
          </div>

          {/* Main Video - Tamaño reducido */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-pink-200/50 animate-fade-in-up">
            <div className="aspect-video relative transition-all duration-500 ease-in-out transform">
              {loadingVideos[currentVideo.catboxId] ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-pink-600 font-medium">Cargando video...</p>
                  </div>
                </div>
              ) : (
                <video
                  src={videoBlobs[currentVideo.catboxId] || `https://files.catbox.moe/${currentVideo.catboxId}`}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  title={currentVideo.title}
                  onError={(e) => {
                    console.error("Error loading video:", e)
                  }}
                >
                  Tu navegador no soporta el elemento video.
                </video>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Video Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">
                {currentIndex + 1} / {videos.length}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-dancing text-xl font-semibold text-slate-700">{currentVideo.title}</h3>
                <Play className="h-5 w-5 text-pink-400 opacity-60" />
              </div>
              <p className="text-sm text-pink-600 font-medium mb-2">{currentVideo.date}</p>
              <p className="text-slate-600 leading-relaxed text-sm">{currentVideo.description}</p>
            </div>
          </div>

          {/* Video Thumbnails - Tamaño reducido */}
          <div className="flex justify-center mt-6 space-x-3 overflow-x-auto pb-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToVideo(index)}
                className={`flex-shrink-0 relative group transition-all duration-300 transform hover:shadow-lg ${
                  index === currentIndex ? "scale-110" : "hover:scale-105"
                } transition-all duration-300`}
              >
                <div
                  className={`w-24 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentIndex ? "border-pink-400 shadow-lg" : "border-transparent hover:border-pink-300"
                  }`}
                >
                  {loadingVideos[video.catboxId] ? (
                    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToVideo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dedicated Video Section - Video individual */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-dancing text-3xl font-bold text-slate-700 mb-4">Video Dedicado Para Ti</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Un mensaje especial que quiero compartir contigo. Este video lo hice pensando en todos nuestros momentos
              juntos.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-purple-200/50">
            <div className="aspect-video relative">
              {loadingVideos[dedicatedVideo.catboxId] ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-purple-600 font-medium text-lg">Cargando video dedicado...</p>
                  </div>
                </div>
              ) : (
                <video
                  src={videoBlobs[dedicatedVideo.catboxId] || `https://files.catbox.moe/${dedicatedVideo.catboxId}`}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  title="Video Dedicado"
                  poster="/placeholder.svg?height=400&width=800"
                  onError={(e) => {
                    console.error("Error loading dedicated video:", e)
                  }}
                >
                  Tu navegador no soporta el elemento video.
                </video>
              )}
            </div>

            <div className="p-8 text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur opacity-30 animate-pulse"></div>
                <h3 className="font-dancing text-2xl font-semibold text-slate-700 relative z-10">
                  {dedicatedVideo.title}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">{dedicatedVideo.description}</p>

              {/* Decorative elements */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-300"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Instructions */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Usa las flechas o haz clic en las miniaturas para navegar por el carrusel • {videos.length} videos en total
          </p>
        </div>
      </div>
    </div>
  )
}
