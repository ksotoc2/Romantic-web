"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)

  useEffect(() => {
    // Iniciar transición
    setIsTransitioning(true)
    setShowContent(false)

    // Mostrar contenido después de la animación de entrada
    const timer = setTimeout(() => {
      setShowContent(true)
      setIsTransitioning(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="relative">
      {/* Overlay de transición muy sutil - SOLO para el contenido */}
      {isTransitioning && (
        <div className="fixed top-20 left-0 right-0 bottom-0 z-40 pointer-events-none">
          {/* Fade overlay muy sutil que no afecta el navbar */}
          <div className="absolute inset-0 bg-white/60 animate-fade-in-out"></div>

          {/* Pequeño indicador discreto */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin-fast"></div>
          </div>
        </div>
      )}

      {/* Contenido de la página */}
      <div
        className={`transition-all duration-300 ease-out ${
          showContent ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default PageTransition
