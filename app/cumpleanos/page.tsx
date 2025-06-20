"use client"

import { useState, useEffect } from "react"
import {
  Gift,
  Calendar,
  Cake,
  Sparkles,
  PartyPopper,
  Heart,
  Star,
  Clock,
  Zap,
  Trophy,
  Sun,
  Moon,
  Crown,
} from "lucide-react"

// CONFIGURACIÓN DE FECHA DE NACIMIENTO - CAMBIAR AQUÍ
const BIRTH_DATE = new Date("2004-01-15T00:00:00")

// Nombres que rotarán en el título
// const NAMES = ["Romina", "Milca", "Romi", "Fifi", "Lagrimas"]

// Mensajes de cumpleaños por edad
const birthdayMessages = {
  21: "Hoy cumples 21 años y aunque ya no estemos juntos, quiero que sepas que siempre recordaré tu sonrisa. Que este nuevo año de vida te traiga toda la felicidad que mereces. ¡Feliz cumpleaños!",
  22: "22 años de luz en este mundo. Espero que este día esté lleno de alegría y que todos tus sueños se vayan cumpliendo poco a poco. Siempre fuiste especial, y sé que seguirás siéndolo. ¡Feliz cumpleaños!",
  23: "Hoy celebras 23 años de vida, y yo celebro haber tenido la oportunidad de conocerte. Que este nuevo año te traiga aventuras increíbles y momentos que te hagan sonreír como solías hacerlo. ¡Feliz cumpleaños!",
  24: "24 años de ser esa persona única que conocí. Aunque nuestros caminos se separaron, siempre te desearé lo mejor. Que este cumpleaños marque el inicio de un año lleno de bendiciones. ¡Feliz cumpleaños!",
  25: "¡25 años! Un cuarto de siglo de tu existencia en este mundo. Espero que hayas encontrado la paz y la felicidad que siempre buscabas. Que este día sea tan especial como tú lo eres. ¡Feliz cumpleaños!",
  26: "26 años de vida, de experiencias, de crecimiento. Me alegra saber que sigues adelante, construyendo tu propio camino. Que este nuevo año te traiga todo lo que tu corazón desea. ¡Feliz cumpleaños!",
  27: "Hoy cumples 27 años y quiero que sepas que, sin importar el tiempo que pase, siempre recordaré los momentos hermosos que compartimos. Que este día esté lleno de amor y celebración. ¡Feliz cumpleaños!",
  28: "28 años de ser esa persona increíble que marcó mi vida. Espero que hayas encontrado tu lugar en el mundo y que seas inmensamente feliz. Que este cumpleaños sea el inicio de cosas maravillosas. ¡Feliz cumpleaños!",
  29: "29 años de tu hermosa existencia. Casi tres décadas de ser luz para quienes te rodean. Aunque ya no forme parte de tu día a día, siempre te desearé lo mejor. ¡Feliz cumpleaños!",
  30: "¡30 años! Tres décadas de vida, de aprendizajes, de momentos únicos. Espero que esta nueva etapa esté llena de realizaciones y que encuentres en cada día una razón para sonreír. ¡Feliz cumpleaños!",
}

// Mensajes mensuales según días restantes
const monthlyMessages = {
  0: {
    // Enero (mes del cumpleaños)
    ranges: [
      {
        min: 1,
        max: 5,
        message:
          "¡Ya casi es tu cumpleaños! Los últimos días antes de tu día especial. Espero que estés emocionada por celebrar un año más de vida.",
      },
      {
        min: 6,
        max: 15,
        message:
          "Estamos en tu mes de cumpleaños, enero. El aire frío del invierno no puede opacar la calidez que siempre irradiaste.",
      },
      {
        min: 16,
        max: 31,
        message:
          "Enero apenas comienza, pero ya siento la proximidad de tu día especial. Este mes siempre me recordará a ti.",
      },
    ],
  },
  1: {
    // Febrero
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Febrero, el mes del amor. Aunque ya no estemos juntos, siempre recordaré el cariño que compartimos. Tu cumpleaños se acerca.",
      },
      {
        min: 11,
        max: 20,
        message:
          "San Valentín ha pasado, pero el amor verdadero perdura todo el año. Faltan pocos meses para tu día especial.",
      },
      {
        min: 21,
        max: 28,
        message:
          "Febrero termina, pero los recuerdos hermosos permanecen. Cada día que pasa es un día menos para celebrarte.",
      },
    ],
  },
  2: {
    // Marzo
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Marzo llega con la promesa de la primavera. Como las flores que están por nacer, tu cumpleaños se acerca lentamente.",
      },
      {
        min: 11,
        max: 20,
        message:
          "La primavera despierta y con ella mis recuerdos de ti. Tu energía siempre fue como esta estación: renovadora y llena de vida.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Marzo se despide y abril se asoma. El tiempo pasa, pero mi deseo de que seas feliz en tu cumpleaños permanece.",
      },
    ],
  },
  3: {
    // Abril
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Abril florece como florecía tu sonrisa. Cada pétalo que se abre me recuerda que tu día especial se aproxima.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las lluvias de abril riegan la tierra, como los buenos deseos riegan mi corazón pensando en tu próximo cumpleaños.",
      },
      {
        min: 21,
        max: 30,
        message:
          "Abril se va, pero deja la promesa de días más cálidos. Como la promesa de celebrar tu vida cuando llegue enero.",
      },
    ],
  },
  4: {
    // Mayo
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Mayo, el mes de las flores en plena gloria. Tu belleza siempre me recordó a esta época del año: radiante y natural.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las flores de mayo danzan al viento, como solías bailar tú. Tu cumpleaños aún está lejos, pero ya lo espero.",
      },
      {
        min: 21,
        max: 31,
        message: "Mayo se despide con su fragancia dulce. Cada aroma me transporta a los momentos que compartimos.",
      },
    ],
  },
  5: {
    // Junio
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Junio llega con días largos y noches cortas. Como los recuerdos contigo: intensos y luminosos, aunque breves.",
      },
      {
        min: 11,
        max: 20,
        message:
          "El solsticio se acerca, el día más largo del año. Pero ningún día fue tan largo como los que pasé extrañándote.",
      },
      {
        min: 21,
        max: 30,
        message:
          "Junio se va con su luz dorada. Medio año ha pasado desde tu último cumpleaños, medio año para el próximo.",
      },
    ],
  },
  6: {
    // Julio
    ranges: [
      {
        min: 1,
        max: 10,
        message: "Julio arde con el calor del verano. Tu pasión por la vida siempre fue así: intensa y contagiosa.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las vacaciones de julio me recuerdan a los planes que hacíamos. Espero que estés disfrutando este verano.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Julio se despide con sus atardeceres dorados. Cada puesta de sol me hace pensar en ti y en tu próximo cumpleaños.",
      },
    ],
  },
  7: {
    // Agosto
    ranges: [
      {
        min: 1,
        max: 10,
        message: "Agosto, el último suspiro del verano. Como nuestros últimos momentos juntos: intensos y memorables.",
      },
      {
        min: 11,
        max: 20,
        message: "Las noches de agosto son estrelladas. Cada estrella es un deseo que hago para tu felicidad futura.",
      },
      {
        min: 21,
        max: 31,
        message: "Agosto se despide y con él el verano. Pero el calor de los buenos recuerdos permanece todo el año.",
      },
    ],
  },
  8: {
    // Septiembre
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Septiembre llega con su brisa fresca. El otoño se acerca, como se acerca tu cumpleaños en unos meses.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las hojas comienzan a cambiar de color. Como cambiaron nuestras vidas, pero los buenos recuerdos permanecen.",
      },
      {
        min: 21,
        max: 30,
        message: "Septiembre se va con su melancolía hermosa. Cada día que pasa es un día más cerca de celebrarte.",
      },
    ],
  },
  9: {
    // Octubre
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Octubre viste la naturaleza de colores cálidos. Tu personalidad siempre tuvo esa calidez que abraza el alma.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Halloween se acerca, pero no hay nada que me asuste más que la idea de que no seas feliz en tu cumpleaños.",
      },
      {
        min: 21,
        max: 31,
        message: "Octubre se despide con sus hojas doradas. Como los recuerdos dorados que guardo de ti.",
      },
    ],
  },
  10: {
    // Noviembre
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Noviembre llega con su aire de nostalgia. Es el mes perfecto para recordar y agradecer por haberte conocido.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las tardes de noviembre son cortas pero intensas. Como el tiempo que compartimos: breve pero significativo.",
      },
      {
        min: 21,
        max: 30,
        message: "Noviembre se va y diciembre se asoma. Tu cumpleaños está cada vez más cerca, y mi emoción crece.",
      },
    ],
  },
  11: {
    // Diciembre
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Diciembre llega con su magia navideña. Pero la verdadera magia será cuando llegue tu cumpleaños el próximo mes.",
      },
      {
        min: 11,
        max: 20,
        message: "La Navidad se acerca, tiempo de dar y recibir. Mi regalo para ti será siempre desearte lo mejor.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Diciembre termina y un nuevo año comienza. Con él, la proximidad de tu día especial. ¡Ya casi llegamos!",
      },
    ],
  },
}

// Estadísticas de vida
const lifeStats = [
  { icon: Heart, label: "Latidos del corazón", value: "aprox. 735 millones", color: "text-red-500" },
  { icon: Sun, label: "Días vividos", value: "", color: "text-yellow-500" },
  { icon: Moon, label: "Noches soñadas", value: "", color: "text-blue-500" },
  { icon: Sparkles, label: "Momentos especiales", value: "infinitos", color: "text-purple-500" },
]

// Metas y deseos por edad
const ageWishes = {
  21: ["Que encuentres tu pasión en la vida", "Que tengas aventuras increíbles", "Que construyas amistades duraderas"],
  22: ["Que descubras nuevos talentos", "Que viajes a lugares soñados", "Que encuentres el amor verdadero"],
  23: [
    "Que logres tus metas profesionales",
    "Que mantengas tu esencia única",
    "Que cada día sea una nueva oportunidad",
  ],
  24: [
    "Que la sabiduría acompañe tus decisiones",
    "Que la alegría sea tu compañera diaria",
    "Que tus sueños se hagan realidad",
  ],
  25: ["Que celebres cada pequeño logro", "Que la paz llene tu corazón", "Que siempre tengas motivos para sonreír"],
}

export default function CumpleanosPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [currentAge, setCurrentAge] = useState(21)
  const [isBirthday, setIsBirthday] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  // const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [monthlyMessage, setMonthlyMessage] = useState("")

  // Rotar nombres cada 5 segundos
  // useEffect(() => {
  //   const nameInterval = setInterval(() => {
  //     setCurrentNameIndex((prev) => (prev + 1) % NAMES.length)
  //   }, 5000)

  //   return () => clearInterval(nameInterval)
  // }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()

      // Birthday is the configured date
      const birthMonth = BIRTH_DATE.getMonth()
      const birthDay = BIRTH_DATE.getDate()

      let nextBirthday = new Date(currentYear, birthMonth, birthDay)

      // If birthday has passed this year, calculate for next year
      if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, birthMonth, birthDay)
      }

      const difference = nextBirthday.getTime() - now.getTime()
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24))

      // Calculate current age
      const birthYear = BIRTH_DATE.getFullYear()
      let age = now.getFullYear() - birthYear

      // If birthday hasn't happened this year yet, subtract 1
      if (now.getMonth() < birthMonth || (now.getMonth() === birthMonth && now.getDate() < birthDay)) {
        age -= 1
      }

      setCurrentAge(age)

      // Check if it's birthday today
      const isToday = now.getMonth() === birthMonth && now.getDate() === birthDay
      setIsBirthday(isToday)

      if (isToday && !showConfetti) {
        setShowConfetti(true)
      }

      // Set monthly message based on current month and days left
      const currentMonth = now.getMonth()
      const monthData = monthlyMessages[currentMonth]
      if (monthData) {
        const range = monthData.ranges.find((r) => daysLeft >= r.min && daysLeft <= r.max) || monthData.ranges[0]
        setMonthlyMessage(range.message)
      }

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [showConfetti])

  const getBirthdayMessage = () => {
    return (
      birthdayMessages[currentAge as keyof typeof birthdayMessages] ||
      "¡Feliz cumpleaños! Que tengas un día maravilloso."
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const calculateDaysLived = () => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - BIRTH_DATE.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getAgeWishes = () => {
    return ageWishes[currentAge as keyof typeof ageWishes] || ageWishes[25]
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Confetti Animation */}
      {isBirthday && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "🎊", "🎈", "🎂", "✨", "🌟"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header con nombre rotativo */}
        <div className="text-center mb-16 text-protection-zone">
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative flex items-center justify-center space-x-3 animate-bounce-gentle">
              <Gift className="h-14 w-14 text-yellow-500 animate-wiggle" />
              <Cake className="h-20 w-20 text-orange-500 animate-pulse-glow" />
              <PartyPopper className="h-14 w-14 text-pink-500 animate-wiggle" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          <h1 className="font-dancing text-4xl md:text-6xl font-bold text-orange-600 mb-6 mt-8 main-title">
            Tu Cumpleaños
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {formatDate(BIRTH_DATE)} • Actualmente tienes {currentAge} años
          </p>
        </div>

        {isBirthday ? (
          /* Birthday Celebration */
          <div className="space-y-12">
            {/* Birthday Animation */}
            <div className="text-center text-protection-zone">
              <div className="relative inline-block">
                <div className="absolute -inset-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full blur-3xl opacity-50 animate-pulse-rainbow"></div>
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-yellow-200/50 animate-birthday-bounce">
                  <div className="space-y-8">
                    <div className="flex justify-center space-x-6 text-8xl animate-celebration">🎉🎂🎈🎊✨</div>
                    <h2 className="font-dancing text-5xl md:text-6xl font-bold text-orange-600 animate-text-bounce main-title">
                      ¡Feliz Cumpleaños!
                    </h2>
                    <div className="text-3xl font-bold text-slate-700 animate-number-pop">
                      Hoy cumples {currentAge} años
                    </div>
                    <div className="flex justify-center space-x-3 text-5xl animate-sparkle-dance">✨🌟⭐🌟✨</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Birthday Message */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-200/40 via-orange-200/40 to-pink-200/40 rounded-3xl blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 animate-message-appear">
                <div className="text-center mb-6">
                  <Heart className="h-10 w-10 text-orange-400 mx-auto mb-4 animate-heart-beat fill-current" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">Mi Mensaje Para Ti</h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed text-center font-serif">{getBirthdayMessage()}</p>
                <div className="flex justify-center mt-8 space-x-3">
                  <Gift className="h-6 w-6 text-yellow-400 animate-bounce" />
                  <Cake className="h-6 w-6 text-orange-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <PartyPopper className="h-6 w-6 text-pink-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                  <Sparkles className="h-6 w-6 text-purple-400 animate-bounce" style={{ animationDelay: "0.6s" }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Countdown and Extended Content */
          <div className="space-y-16">
            {/* Mensaje mensual */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 rounded-3xl blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="text-center mb-6">
                  <Calendar className="h-10 w-10 text-blue-500 mx-auto mb-4 animate-calendar-flip" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Mensaje de {new Date().toLocaleDateString("es-ES", { month: "long" })}
                  </h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed text-center font-serif italic">
                  "{monthlyMessage}"
                </p>
              </div>
            </div>

            {/* Current Age Display */}
            <div className="text-center text-protection-zone">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-orange-200/50 mb-8 animate-age-glow">
                <Crown className="h-20 w-20 text-orange-400 mx-auto mb-6 animate-cake-bounce" />
                <h3 className="font-dancing text-4xl font-semibold text-slate-700 mb-4 main-title">
                  Actualmente tienes
                </h3>
                <div className="text-6xl font-bold text-orange-600 mb-6 animate-number-pulse">{currentAge} años</div>
                <p className="text-slate-600 leading-relaxed max-w-md mx-auto text-lg">
                  Naciste el {formatDate(BIRTH_DATE)}. Una fecha que siempre recordaré.
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-200/40 via-orange-200/40 to-pink-200/40 rounded-3xl blur-2xl animate-countdown-glow"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="text-center space-y-10">
                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <Clock className="h-10 w-10 text-orange-500 animate-calendar-flip" />
                    <h2 className="font-dancing text-4xl font-bold text-slate-700 main-title">
                      Faltan para tu cumpleaños #{currentAge + 1}
                    </h2>
                  </div>

                  {/* Countdown Display */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce">
                      <div className="text-4xl md:text-5xl font-bold text-yellow-700 animate-number-flip">
                        {timeLeft.days}
                      </div>
                      <div className="text-yellow-600 font-medium text-lg">Días</div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-orange-700 animate-number-flip">
                        {timeLeft.hours}
                      </div>
                      <div className="text-orange-600 font-medium text-lg">Horas</div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-pink-700 animate-number-flip">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-pink-600 font-medium text-lg">Minutos</div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-purple-700 animate-number-flip">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-purple-600 font-medium text-lg">Segundos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de vida */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-green-200/40 via-blue-200/40 to-purple-200/40 rounded-3xl blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <Trophy className="h-10 w-10 text-green-500 mx-auto mb-4 animate-sparkle-spin" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Estadísticas de tus {currentAge} años
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lifeStats.map((stat, index) => {
                    const Icon = stat.icon
                    let value = stat.value
                    if (stat.label === "Días vividos") {
                      value = calculateDaysLived().toLocaleString()
                    } else if (stat.label === "Noches soñadas") {
                      value = (calculateDaysLived() - 1).toLocaleString()
                    }

                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg text-center animate-message-float"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} animate-pulse`} />
                        <div className="text-2xl font-bold text-slate-700 mb-1">{value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Deseos para la nueva edad */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-pink-200/40 via-purple-200/40 to-blue-200/40 rounded-3xl blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <Star className="h-10 w-10 text-purple-500 mx-auto mb-4 animate-sparkle-spin" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Mis deseos para tus {currentAge + 1} años
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {getAgeWishes().map((wish, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg text-center animate-message-appear"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-3 animate-pulse" />
                      <p className="text-slate-700 font-medium">{wish}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Línea de tiempo de la vida */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 rounded-3xl blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <Zap className="h-10 w-10 text-indigo-500 mx-auto mb-4 animate-sparkle-spin" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">Etapas de tu vida</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Infancia y Adolescencia (0-18 años)</div>
                      <div className="text-slate-500 text-sm">Años de descubrimiento y crecimiento</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Juventud (18-{currentAge} años)</div>
                      <div className="text-slate-500 text-sm">Explorando el mundo y encontrando tu camino</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      →
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Próxima etapa ({currentAge + 1}+ años)</div>
                      <div className="text-slate-500 text-sm">Nuevas aventuras y experiencias te esperan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Age Message */}
            <div className="relative text-protection-zone">
              <div className="absolute -inset-6 bg-gradient-to-r from-orange-200/40 via-pink-200/40 to-purple-200/40 rounded-3xl blur-2xl animate-message-glow"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 animate-message-float">
                <div className="text-center mb-8">
                  <Heart className="h-10 w-10 text-orange-400 mx-auto mb-4 animate-sparkle-spin fill-current" />
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Mi mensaje para tus {currentAge} años
                  </h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed text-center font-serif italic">
                  "{getBirthdayMessage()}"
                </p>
                <div className="flex justify-center mt-8 space-x-3">
                  <Gift className="h-6 w-6 text-yellow-400 animate-gift-bounce" />
                  <Cake className="h-6 w-6 text-orange-400 animate-gift-bounce" style={{ animationDelay: "0.5s" }} />
                  <Heart
                    className="h-6 w-6 text-pink-400 animate-gift-bounce fill-current"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
