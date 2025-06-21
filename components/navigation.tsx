"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Feather, Camera, Video, Mail, Gift, Music, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Inicio", icon: Feather },
    { href: "/fotos", label: "Fotos", icon: Camera },
    { href: "/musica", label: "Música", icon: Music },
    { href: "/carta", label: "Carta", icon: Mail },
    { href: "/cumpleanos", label: "Cumpleaños", icon: Gift },
  ]

  const NAMES = ["Romina", "Milca", "Romi", "Lagrimas"]
  const [currentNameIndex, setCurrentNameIndex] = useState(0)

  useEffect(() => {
    const nameInterval = setInterval(() => {  
      setCurrentNameIndex((prev) => (prev + 1) % NAMES.length)
    }, 5000)
    return () => clearInterval(nameInterval)
  }, [])

  // Cerrar menú al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-purple-200/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Feather className="h-7 w-7 text-slate-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="font-dancing text-2xl font-semibold text-slate-700">
                Hasta Siempre{" "}
                <span className="text-purple-600 transition-all duration-500 transform inline-block min-w-[80px]">
                  {NAMES[currentNameIndex]}
                </span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 text-sm ${
                      isActive
                        ? "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700 shadow-md"
                        : "text-slate-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 transform hover:scale-110 shadow-md"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

          {/* Menu Panel */}
          <div className="absolute top-16 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200/50 animate-slide-in-left">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700 shadow-md"
                        : "text-slate-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium text-base">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
