"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface EnvelopeProps {
  onOpen: () => void
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 3000) // Wait for full animation to complete
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Arrows pointing to envelope */}
      {!isOpening && (
        <div className="flex space-x-8 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <ChevronDown className="h-10 w-10 text-purple-500 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 h-10 w-10 bg-purple-400 rounded-full blur-md opacity-50 animate-ping"></div>
            </div>
            <span className="text-purple-700 font-dancing text-2xl font-bold drop-shadow-md bg-white/80 px-3 py-1 rounded-full border-2 border-purple-300 animate-pulse">
              Ábreme
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              <ChevronDown className="h-10 w-10 text-pink-500 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 h-10 w-10 bg-pink-400 rounded-full blur-md opacity-50 animate-ping"></div>
            </div>
            <span className="text-pink-700 font-dancing text-2xl font-bold drop-shadow-md bg-white/80 px-3 py-1 rounded-full border-2 border-pink-300 animate-pulse">
              Ábreme
            </span>
          </div>
        </div>
      )}

      {/* Envelope */}
      <div
        className={`relative cursor-pointer transition-all duration-500 transform ${
          isHovered && !isOpening ? "scale-110 rotate-1" : "hover:scale-105"
        } ${isOpening ? "animate-envelope-shake" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Envelope Shadow */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-purple-300 rounded-lg blur-xl opacity-30 transform translate-y-4"></div>

        {/* Envelope Body */}
        <div className="relative bg-gradient-to-br from-slate-100 to-purple-100 w-80 h-56 rounded-lg shadow-2xl border border-slate-200/50">
          {/* Envelope Flap */}
          <div
            className={`absolute -top-0 left-0 right-0 h-32 bg-gradient-to-br from-slate-200 to-purple-200 transform origin-bottom transition-all duration-3000 rounded-t-lg border border-slate-200/50 ${
              isOpening ? "animate-envelope-flap-open" : "rotate-0 hover:rotate-12"
            }`}
          >
            {/* Wax Seal */}
            <div
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-1000 ${
                isOpening ? "animate-seal-break" : ""
              }`}
            >
              <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✉</span>
              </div>
            </div>
          </div>

          {/* Letter inside envelope - Now fully animated */}
          <div
            className={`absolute bottom-8 left-8 right-8 transition-all duration-3000 ${
              isOpening ? "animate-letter-emerge-full" : ""
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform">
              <div className="space-y-2">
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                <div className="h-2 bg-slate-200 rounded w-full"></div>
                <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                <div className="h-1 bg-slate-200 rounded w-1/2 mt-3"></div>
                <div className="text-xs text-slate-500 text-right mt-2 font-dancing">Para ti...</div>
              </div>
            </div>
          </div>

          {/* Sparkles around envelope */}
          <div className="absolute -top-4 -left-4 w-4 h-4 text-slate-400 animate-pulse">✨</div>
          <div
            className="absolute -top-2 -right-6 w-4 h-4 text-purple-400 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            ✨
          </div>
          <div
            className="absolute -bottom-4 -left-6 w-4 h-4 text-blue-400 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            ✨
          </div>
          <div
            className="absolute -bottom-2 -right-4 w-4 h-4 text-slate-400 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          >
            ✨
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!isOpening && (
        <p className="text-slate-500 text-center max-w-md leading-relaxed">
          Haz clic en cualquier parte del sobre para abrirlo y leer la carta que escribí para ti
        </p>
      )}

      {isOpening && (
        <div className="text-center space-y-2">
          <p className="text-slate-600 font-dancing text-xl animate-pulse">Abriendo tu carta...</p>
          <p className="text-slate-500 text-sm">La carta está saliendo del sobre</p>
        </div>
      )}
    </div>
  )
}

export default Envelope
