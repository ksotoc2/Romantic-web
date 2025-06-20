"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  left: number
  animationDuration: number
  size: number
  opacity: number
  delay: number
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 15 + Math.random() * 20,
          size: 12 + Math.random() * 16,
          opacity: 0.1 + Math.random() * 0.3,
          delay: Math.random() * 10,
        })
      }
      setHearts(newHearts)
    }

    generateHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <Heart
            className="text-rose-300 fill-current"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          />
        </div>
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-rose-200 rounded-full animate-float-slow opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FloatingHearts
