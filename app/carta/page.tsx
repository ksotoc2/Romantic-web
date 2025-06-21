"use client";

import { useState } from "react";
import { Mail, Feather } from "lucide-react";
import Envelope from "@/components/envelope";

export default function CartaPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [cartaContent, setCartaContent] = useState(`Hola Romi,

No sé cuántas veces pensé en escribirte esto. Siempre lo dejaba para después, como si evitarlo fuera a hacer que todo se acomodara solo. Pero no. La verdad es que llevo tiempo sintiendo que necesito decirte algo, no por drama, ni para buscar una respuesta… sino porque ya no quiero seguir cargando con esto en silencio.

Fuiste una persona muy importante en mi vida. Eso no lo olvido. Compartimos cosas que marcaron una etapa que, por más que duela, valió la pena. Tu compañía, tus palabras, esos momentos que solo entendíamos nosotros… todo eso significó mucho para mí. Y no me da vergüenza decirlo. Me marcaste. Me hiciste sentir cosas reales. Y por un tiempo, de verdad pensé que íbamos a seguir caminando juntos.

Pero con el tiempo me fui dando cuenta de que las cosas ya no eran lo mismo. Que por más cariño que hubiera, estábamos en sintonías diferentes. Y aunque lo intenté —créeme que lo hice—, seguir en esta especie de limbo, sin saber bien qué éramos o hacia dónde íbamos, me empezó a hacer daño.

No te culpo por nada. No hay rencor en mí. Solo necesitaba aceptar que, por mucho que me haya costado soltar, ahora es lo más sano. Me toca cuidar de mí, poner límites, y dejar ir lo que ya no tiene sentido sostener.

No escribo esto esperando que cambie algo. No busco una reacción, ni una explicación. Solo necesitaba despedirme de verdad. Hacerlo con calma, con claridad, con todo lo que siento. Porque quedarme callado solo me mantenía atado a algo que ya no existe.

Gracias por haber sido parte de mi historia. Gracias por los buenos momentos, por lo que aprendí, incluso por lo que dolió. Te deseo de corazón lo mejor. Que encuentres a personas que te quieran bien, que te sumen, que te acompañen como mereces.

Este es mi cierre. Mi forma de soltar, con cariño, pero también con firmeza. Porque ya entendí que seguir arrastrando algo que ya terminó, solo me impide seguir adelante.

Cuídate mucho.`);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

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
                  <Mail
                    className="h-12 w-12 text-blue-400 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
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
                    <Feather
                      className="h-4 w-4 text-purple-400 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <Mail
                      className="h-5 w-5 text-blue-400 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <Feather
                      className="h-4 w-4 text-slate-400 animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    />
                    <Mail
                      className="h-5 w-5 text-purple-400 animate-pulse"
                      style={{ animationDelay: "2s" }}
                    />
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
                  <Mail
                    className="h-6 w-6 text-purple-300 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <Feather
                    className="h-6 w-6 text-blue-300 animate-pulse"
                    style={{ animationDelay: "2s" }}
                  />
                </div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
