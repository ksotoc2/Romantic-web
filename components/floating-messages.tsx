"use client"

import { useEffect, useState } from "react"

interface FloatingMessage {
  id: number
  text: string
  left: number
  top: number
  vx: number
  vy: number
  animationDuration: number
  delay: number
  size: number
  opacity: number
  color: string
}

const colors = [
  "text-red-400", "text-blue-400", "text-green-400", "text-yellow-400",
  "text-purple-400", "text-pink-400", "text-orange-400", "text-emerald-400"
]

const FloatingMessages = () => {
  const [messages, setMessages] = useState<FloatingMessage[]>([])

  const messageTemplates = [
    "Recuerdos",
    "Inolvidable",
    "Te Quiero",
    ":D",
    "Se Feliz"
  ]

  useEffect(() => {
    const initialMessages = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      text: messageTemplates[i % messageTemplates.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.35, // velocidad ligeramente mayor
      vy: (Math.random() - 0.5) * 0.35,
      animationDuration: 20 + Math.random() * 15,
      delay: Math.random() * 10,
      size: 24 + Math.random() * 4,
      opacity: 0.75, // más opaco que antes
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setMessages(initialMessages)

    const moveMessages = () => {
      setMessages(prev =>
        prev.map(msg => {
          let newLeft = msg.left + msg.vx
          let newTop = msg.top + msg.vy
          let newVx = msg.vx
          let newVy = msg.vy
          let newColor = msg.color

          if (newLeft <= 0 || newLeft >= 100) {
            newVx *= -1
            newColor = colors[Math.floor(Math.random() * colors.length)]
          }
          if (newTop <= 0 || newTop >= 100) {
            newVy *= -1
            newColor = colors[Math.floor(Math.random() * colors.length)]
          }

          return {
            ...msg,
            left: Math.min(100, Math.max(0, newLeft)),
            top: Math.min(100, Math.max(0, newTop)),
            vx: newVx,
            vy: newVy,
            color: newColor
          }
        })
      )
      requestAnimationFrame(moveMessages)
    }

    requestAnimationFrame(moveMessages)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {messages.map((msg) => (
        <span
          key={msg.id}
          className={`absolute font-dancing font-semibold select-none whitespace-nowrap ${msg.color}`}
          style={{
            left: `${msg.left}%`,
            top: `${msg.top}%`,
            opacity: msg.opacity,
            fontSize: `${msg.size}px`,
            textShadow: "0 0 16px rgba(168, 85, 247, 0.3)",
            transition: "transform 0.2s ease"
          }}
        >
          {msg.text}
        </span>
      ))}
    </div>
  )
}

export default FloatingMessages
