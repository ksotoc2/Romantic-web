import { Feather, Sparkles, Cloud, Camera, Video, Mail, Gift, Music } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-8 text-protection-zone">
            <div className="flex justify-center relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-slate-300 to-purple-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <Feather className="h-24 w-24 text-slate-500 relative z-10 animate-float-gentle" />
                <Sparkles className="h-8 w-8 text-purple-400 absolute -top-2 -right-2 animate-spin" />
                <Cloud className="h-6 w-6 text-blue-300 absolute -bottom-1 -left-3 animate-pulse" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="font-dancing text-5xl md:text-7xl font-bold text-slate-700 leading-tight main-title">
                Hasta
                <span className="block text-4xl md:text-6xl mt-2 text-purple-600">Siempre</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Un lugar donde viven los recuerdos de quien fuiste para mí.
                <br />
                <span className="text-purple-600 font-medium">
                  Aunque los caminos se separen, los momentos hermosos permanecen.
                </span>
              </p>
            </div>
          </div>

          {/* Memory Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <Link href="/fotos" className="group">
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-200/50 hover:border-purple-300/70 transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full group-hover:from-purple-300 group-hover:to-purple-400 transition-all duration-300 shadow-lg">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-dancing text-xl font-semibold text-slate-700">Fotos</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed">Momentos capturados</p>
                </div>
              </div>
            </Link>

            <Link href="/musica" className="group">
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-200/50 hover:border-green-300/70 transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-teal-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-200 to-teal-300 rounded-full group-hover:from-green-300 group-hover:to-teal-400 transition-all duration-300 shadow-lg">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-dancing text-xl font-semibold text-slate-700">Música</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed">Con las que te asocio</p>
                </div>
              </div>
            </Link>

            <Link href="/carta" className="group">
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-200/50 hover:border-blue-300/70 transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full group-hover:from-blue-300 group-hover:to-blue-400 transition-all duration-300 shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-dancing text-xl font-semibold text-slate-700">Carta</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed">Mis palabras</p>
                </div>
              </div>
            </Link>

            <Link href="/cumpleanos" className="group">
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-yellow-200/50 hover:border-yellow-300/70 transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 to-orange-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full group-hover:from-yellow-300 group-hover:to-orange-400 transition-all duration-300 shadow-lg">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-dancing text-xl font-semibold text-slate-700">Cumpleaños</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed">15 de Enero</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quote */}
          <div className="mt-20 relative text-protection-zone">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 via-purple-200/30 to-blue-200/30 rounded-3xl blur-xl"></div>
            <div className="relative p-10 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl">
              <Feather className="h-8 w-8 text-slate-400 mx-auto mb-4 animate-float-gentle" />
              <blockquote className="font-dancing text-2xl md:text-3xl text-slate-600 italic text-center leading-relaxed main-title">
                "Hay adioses que duran para siempre, 
                <br />
                <span className="text-slate-700">pero los recuerdos que nos hicieron sonreír jamás se desvanecen."</span>
              </blockquote>
              <div className="flex justify-center mt-6 space-x-2">
                <Feather className="h-4 w-4 text-slate-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                <Feather className="h-4 w-4 text-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
