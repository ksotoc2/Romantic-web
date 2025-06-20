"use client"

import { useEffect, useState } from "react"
import {
  Feather, Sparkles, Cloud, Star, Heart,
  Music, Camera, Video, Mail, Gift
} from "lucide-react"

interface FloatingElement {
  id: number
  left: number
  top: number
  vx: number
  vy: number
  animationDuration: number
  size: number
  opacity: number
  delay: number
  type:
    | "feather"
    | "sparkle"
    | "cloud"
    | "star"
    | "heart"
    | "music"
    | "camera"
    | "video"
    | "mail"
    | "gift"
    | "flower"
    | "butterfly"
  color: string
}

interface Particle {
  left: number
  top: number
  delay: number
  duration: number
}

interface Orb {
  left: number
  top: number
  delay: number
  duration: number
}

const colors = [
  "text-red-400", "text-blue-400", "text-green-400", "text-yellow-400",
  "text-purple-400", "text-pink-400", "text-orange-400", "text-emerald-400"
]

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const types: FloatingElement["type"][] = [
      "feather", "sparkle", "cloud", "star", "heart",
      "music", "camera", "video", "mail", "gift",
      "flower", "butterfly"
    ]

    const initialElements = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      animationDuration: 20 + Math.random() * 35,
      size: 26 + Math.random() * 8,
      opacity: 0.35 + Math.random() * 0.2, // menos opacos
      delay: Math.random() * 25,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setElements(initialElements)

    const moveElements = () => {
      setElements(prev =>
        prev.map(el => {
          let newLeft = el.left + el.vx
          let newTop = el.top + el.vy
          let newVx = el.vx
          let newVy = el.vy
          let newColor = el.color

          if (newLeft <= 0 || newLeft >= 100) {
            newVx *= -1
            newColor = colors[Math.floor(Math.random() * colors.length)]
          }
          if (newTop <= 0 || newTop >= 100) {
            newVy *= -1
            newColor = colors[Math.floor(Math.random() * colors.length)]
          }

          return {
            ...el,
            left: Math.min(100, Math.max(0, newLeft)),
            top: Math.min(100, Math.max(0, newTop)),
            vx: newVx,
            vy: newVy,
            color: newColor
          }
        })
      )
      requestAnimationFrame(moveElements)
    }

    requestAnimationFrame(moveElements)

    setParticles(Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 30,
      duration: 25 + Math.random() * 30
    })))

    setOrbs(Array.from({ length: 10 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 30 + Math.random() * 25
    })))
  }, [])

  const getIcon = (type: string, size: number, color: string) => {
    const baseClass = `opacity-70 ${color}` // opacidad reducida aquí también

    switch (type) {
      case "feather":   return <Feather  size={size} className={baseClass} />
      case "sparkle":   return <Sparkles size={size} className={baseClass} />
      case "cloud":     return <Cloud    size={size} className={baseClass} />
      case "star":      return <Star     size={size} className={baseClass + " fill-current"} />
      case "heart":     return <Heart    size={size} className={baseClass + " fill-current"} />
      case "music":     return <Music    size={size} className={baseClass} />
      case "camera":    return <Camera   size={size} className={baseClass} />
      case "video":     return <Video    size={size} className={baseClass} />
      case "mail":      return <Mail     size={size} className={baseClass} />
      case "gift":      return <Gift     size={size} className={baseClass} />
      case "flower":    return <div style={{width: size, height: size}} className={`flex items-center justify-center text-2xl ${color} opacity-70`}>🌸</div>
      case "butterfly": return <div style={{width: size, height: size}} className={`flex items-center justify-center text-2xl ${color} opacity-70`}>🦋</div>
      default:           return <Feather  size={size} className={baseClass} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Figuras flotantes */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            opacity: el.opacity
          }}
        >
          {getIcon(el.type, el.size, el.color)}
        </div>
      ))}

      {/* Partículas */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-slate-300/20 via-purple-300/20 to-pink-300/20 rounded-full animate-float-slow opacity-10"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      {/* Orbes */}
      <div className="absolute inset-0">
        {orbs.map((o, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full animate-float-gentle opacity-20 blur-sm"
            style={{
              left: `${o.left}%`,
              top: `${o.top}%`,
              animationDelay: `${o.delay}s`,
              animationDuration: `${o.duration}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FloatingElements
