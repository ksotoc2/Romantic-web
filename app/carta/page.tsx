"use client"

import { useState } from "react"
import { Mail, Feather } from "lucide-react"
import Envelope from "@/components/envelope"

export default function CartaPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [cartaContent, setCartaContent] = useState(`Querida amiga,

Escribo estas líneas con el corazón lleno de gratitud por haberte conocido. Fuiste una persona especial en mi vida, alguien que dejó una huella profunda en mi corazón.

Quiero que sepas que cada momento que compartimos fue valioso para mí. Tu risa, tu forma de ver la vida, esos instantes de complicidad que ahora guardo como tesoros en mi memoria.

Aunque nuestros caminos se han separado, quiero agradecerte por todo lo que me enseñaste, por los momentos de alegría que compartimos y por haber sido parte de mi historia.

No hay rencores en mi corazón, solo cariño y buenos deseos para ti. Espero que la vida te sonría siempre, que encuentres la felicidad que mereces y que todos tus sueños se hagan realidad.

Este pequeño rincón digital es mi forma de honrar los recuerdos hermosos que construimos juntos. Aunque ya no estemos en contacto, siempre tendrás un lugar especial en mis pensamientos.

Te deseo lo mejor en esta nueva etapa de tu vida. Que seas muy feliz, que encuentres paz y que siempre tengas motivos para sonreír.

Con cariño sincero y los mejores deseos,
Alguien que te recuerda con afecto.`)

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true)
  }

  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isEnvelopeOpen ? (
          <>
            {/* Header */}
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <div className="absolute -inset-6 bg-gradient-to-r from-slate-300 via-purple-300 to-blue-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <Mail className="h-12 w-12 text-slate-500 animate-pulse" />
                  <Feather className="h-8 w-8 text-purple-400 animate-float-gentle" />
                  <Mail className="h-12 w-12 text-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
              </div>
              <h1 className="font-dancing text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-6 mt-8">
                Mi Carta Para Ti
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Palabras sinceras que quería compartir contigo
              </p>
            </div>

            {/* Envelope */}
            <Envelope onOpen={handleOpenEnvelope} />
          </>
        ) : (
          <>
            {/* Header after opening */}
            <div className="text-center mb-12">
              <h1 className="font-dancing text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-4">
                Mi Carta Para Ti
              </h1>
            </div>

            {/* Letter Content with Opening Animation */}
            <div className="relative animate-letter-unfold">
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-200/30 via-purple-200/30 to-blue-200/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
                {/* Decorative header */}
                <div className="h-3 bg-gradient-to-r from-slate-300 via-purple-300 to-blue-300"></div>

                <div className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="font-serif text-slate-700 leading-relaxed whitespace-pre-line text-lg"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        lineHeight: "1.9",
                      }}
                    >
                      {cartaContent}
                    </div>
                  </div>
                </div>

                {/* Decorative footer */}
                <div className="px-8 md:px-12 pb-8">
                  <div className="flex justify-center space-x-4">
                    <Mail className="h-5 w-5 text-slate-400 animate-pulse" />
                    <Feather className="h-4 w-4 text-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <Mail className="h-5 w-5 text-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />
                    <Feather className="h-4 w-4 text-slate-400 animate-pulse" style={{ animationDelay: "1.5s" }} />
                    <Mail className="h-5 w-5 text-purple-400 animate-pulse" style={{ animationDelay: "2s" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Final decorative elements */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-6 text-slate-300">
                <div className="w-20 h-px bg-gradient-to-r from-transparent to-slate-300"></div>
                <div className="flex space-x-2">
                  <Feather className="h-6 w-6 text-slate-300 animate-pulse" />
                  <Mail className="h-6 w-6 text-purple-300 animate-pulse" style={{ animationDelay: "1s" }} />
                  <Feather className="h-6 w-6 text-blue-300 animate-pulse" style={{ animationDelay: "2s" }} />
                </div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
