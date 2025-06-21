"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

// CONFIGURACIÓN DE FECHA DE NACIMIENTO - CAMBIAR AQUÍ
const BIRTH_DATE = new Date("2004-01-15T00:00:00");

// Nombres que rotarán en el título
// const NAMES = ["Romina", "Milca", "Romi", "Fifi", "Lagrimas"]

// Mensajes de cumpleaños por edad
const birthdayMessages = {
  21: "Cumplir 21 años marca el inicio de una etapa llena de decisiones importantes y descubrimientos personales. Es un momento en el que los sueños se sienten más reales y la vida empieza a tomar forma propia. Aunque nuestros caminos hayan tomado rumbos diferentes, siempre recordaré lo que compartimos con cariño. Deseo que esta etapa esté llena de oportunidades, aprendizajes valiosos y personas que sumen a tu vida. Ojalá te sientas libre, fuerte y orgullosa de la persona en la que te estás convirtiendo.",
  22: "A los 22 años, uno comienza a entenderse mejor, a buscar su lugar en el mundo con más claridad. Es una edad para tomar riesgos, para equivocarse y también para construir cosas verdaderas. Espero que tus sueños florezcan con fuerza y que siempre tengas el valor de seguir tu intuición. Aunque no esté cerca, sigo deseándote lo mejor. Que este momento de tu vida esté lleno de entusiasmo, propósito y paz interior.",
  23: "Tener 23 años no es solo sumar un año más, sino acumular historias, aprendizajes y pequeños logros que te han ido moldeando. Es una etapa de redefiniciones, de soltar lo que ya no va y abrazar lo nuevo. Que en este tiempo encuentres respuestas, inspiración y motivos para seguir construyendo una vida auténtica. Siempre recordaré tu luz con cariño, y deseo que sigas iluminando tu camino con esa energía que te hace única.",
  24: "A los 24 años, las decisiones pesan más, pero también se sienten más propias. Es un momento para confiar en lo aprendido, seguir soñando en grande y cuidar de uno mismo con más conciencia. Deseo que esta etapa esté llena de crecimiento, experiencias transformadoras y personas que te valoren tal como eres. Aunque la vida nos haya llevado por caminos distintos, sigo deseándote lo mejor desde el corazón.",
  25: "Cumplir 25 años representa un punto de inflexión. Un cuarto de siglo de vivencias, cambios, desafíos y descubrimientos. Es una edad que trae nuevos comienzos y aprendizajes más profundos. Espero que cada experiencia que vivas te acerque más a lo que te hace bien, a lo que te define y a lo que te llena. Siempre llevaré con cariño los recuerdos compartidos y deseo que tu vida esté llena de calma, claridad y alegría real.",
  26: "A los 26, comienzas a sentir que el tiempo es más valioso, que las relaciones deben ser sinceras y que tus decisiones tienen un peso real. Esta etapa es perfecta para empezar a construir desde lo que eres, no desde lo que esperan los demás. Que este tiempo de tu vida te regale autenticidad, valentía y mucha luz propia. Aunque ya no forme parte de tu día a día, siempre te deseo lo mejor con sinceridad y aprecio.",
  27: "Tener 27 años es navegar entre certezas que se afirman y dudas que aún persisten. Es una etapa en la que te cuestionas mucho, pero también en la que te entiendes mejor. Que aprendas a soltar lo que no te hace bien, que te rodees de quienes suman y que encuentres paz en los pequeños momentos. Te deseo una etapa profunda, estable y fiel a quien realmente eres.",
  28: "A los 28 años, muchas cosas comienzan a alinearse. Aprendes a decir que no, a elegir mejor, y a seguir tu intuición con más firmeza. Es una edad para mirar con gratitud lo vivido y con confianza lo que viene. Que esta etapa te traiga logros personales, vínculos sanos y motivos para seguir creyendo en lo bueno. Aunque ya no estemos en contacto, te deseo sinceramente una vida plena y verdadera.",
  29: "Cumplir 29 años significa cerrar una década llena de historias, de crecimiento, de tropiezos y de avances. Es tiempo de hacer balance y de prepararse para una nueva etapa más consciente. Que sigas soñando, pero con los pies en la tierra, y que nunca te falte esa chispa que te impulsa a ir por más. Desde la distancia, deseo que te abraces con orgullo por todo lo que has logrado y por lo que aún está por venir.",
  30: "Llegar a los 30 años es mirar atrás con madurez y hacia adelante con propósito. Son tres décadas llenas de experiencias que te han convertido en quien eres hoy. Es momento de vivir con más intención, de soltar lo que pesa y de elegir lo que te hace bien. Que esta etapa te dé paz, claridad y una nueva energía para construir lo que realmente deseas. Aunque la vida nos haya llevado por diferentes caminos, celebro con el alma la persona en la que te estás convirtiendo."
};

const monthlyMessages = {
  0: {
    // Enero (mes del cumpleaños)
    ranges: [
      {
        min: 1,
        max: 5,
        message:
          "El año comienza y ya se siente la cercanía de tu cumpleaños. Enero siempre trae contigo una energía especial, como si la vida se detuviera para recordarme lo importante que fuiste.",
      },
      {
        min: 6,
        max: 14,
        message:
          "Estamos a días de tu cumpleaños. Enero no sería lo mismo sin pensarte. Aunque el tiempo pase, ese día sigue ocupando un lugar importante en mi memoria.",
      },
      {
        min: 15,
        max: 31,
        message:
          "Tu cumpleaños ha pasado, pero su eco sigue presente. Enero me recuerda a ti, y no puedo evitar desearte felicidad, incluso en silencio.",
      },
    ],
  },
  1: {
    // Febrero
    ranges: [
      {
        min: 1,
        max: 13,
        message:
          "Ya pasó tu cumpleaños, pero febrero siempre me deja una sensación de nostalgia. Como si el amor que compartimos aún se sintiera en el aire.",
      },
      {
        min: 14,
        max: 20,
        message:
          "San Valentín llega con sus recuerdos. Aunque cada quien sigue su camino, deseo que el amor —del bueno— te acompañe en cada paso.",
      },
      {
        min: 21,
        max: 28,
        message:
          "Febrero se despide, y tu cumpleaños ya quedó atrás, pero no el deseo profundo de que estés bien y en paz contigo misma.",
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
          "Marzo comienza con la promesa de renovación. Hace poco celebraste un año más de vida, y ojalá lo hayas hecho rodeada de amor.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Los días se alargan, y la vida sigue su curso. Pero a veces, en el silencio, vuelvo a recordar aquel 15 de enero.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Marzo se despide con flores nuevas. Como tus nuevas etapas, que espero estén llenas de luz y razones para seguir celebrando.",
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
          "Abril florece, y con cada flor recuerdo lo mucho que brillabas cuando reías. Ojalá tu año esté floreciendo como mereces.",
      },
      {
        min: 11,
        max: 20,
        message:
          "En medio de lluvias y cielos abiertos, pienso en ti con cariño. Enero fue solo el comienzo de un año más en tu historia.",
      },
      {
        min: 21,
        max: 30,
        message:
          "El mes se va, pero la vida continúa. Espero que este nuevo año de vida te esté llevando justo a donde sueñas.",
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
          "Mayo llega con fuerza, como la fuerza que espero tengas cada día. Aunque tu cumpleaños fue hace meses, aún lo llevo en la memoria.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Mayo avanza con sus aromas y sus brillos. Que cada paso que des esté lleno de vida, como aquel día 15 en que celebramos tu existencia.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Se acerca la mitad del año, pero aún recuerdo enero con dulzura. Celebrarte fue siempre algo especial.",
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
          "Junio marca el punto medio. Medio año desde tu cumpleaños. Y aun así, el recuerdo no se ha ido. Solo espero que estés bien.",
      },
      {
        min: 11,
        max: 20,
        message:
          "El solsticio se acerca, y pienso que en tu vida haya luz y sentido. Que este año nuevo de vida te esté llenando de razones para sonreír.",
      },
      {
        min: 21,
        max: 30,
        message:
          "Junio termina y con él medio ciclo desde tu cumpleaños. Qué rápido pasa el tiempo cuando los recuerdos se quedan a vivir.",
      },
    ],
  },
  6: {
    // Julio
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Julio comienza, y en su calor, recuerdo tu energía, tu risa. Falta medio año para tu cumpleaños, pero nunca es tarde para desearte lo mejor.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Este mes siempre me hace pensar en días compartidos. La distancia no borra lo bonito, y tu cumpleaños sigue marcando el calendario de mi memoria.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Julio termina, y el año avanza. Tu cumpleaños aún está lejos, pero cada mes guarda un rincón donde apareces tú.",
      },
    ],
  },
  7: {
    // Agosto
    ranges: [
      {
        min: 1,
        max: 10,
        message:
          "Agosto trae consigo un nuevo ciclo escolar, nuevas etapas. Y mientras todo comienza de nuevo, yo sigo recordando aquel 15 de enero.",
      },
      {
        min: 11,
        max: 20,
        message:
          "El cielo de agosto guarda deseos secretos. El mío, que en tu próximo cumpleaños sigas cumpliendo sueños y no solo años.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Agosto se despide con tardes suaves. Como los días que me recuerdan a ti, silenciosos pero persistentes.",
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
          "Septiembre empieza a marcar el final del año. Poco a poco nos acercamos a enero. Y sí, vuelvo a pensar en ti.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Las hojas cambian, pero mi recuerdo de ti permanece. Tu cumpleaños cada vez está más cerca.",
      },
      {
        min: 21,
        max: 30,
        message:
          "Septiembre termina con un suspiro. Y con él, una cuenta regresiva silenciosa hacia tu próximo cumpleaños.",
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
          "Octubre se viste de colores cálidos. Tu cumpleaños aún no llega, pero los recuerdos ya comienzan a despertar.",
      },
      {
        min: 11,
        max: 20,
        message:
          "Cada estación tiene su magia, y enero siempre fue tuya. Falta menos para volver a celebrarte, aunque sea en el pensamiento.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Octubre se va, y mi memoria empieza a prepararse. Porque tu cumpleaños se siente incluso meses antes.",
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
          "Noviembre llega con nostalgia. En silencio, comienza la cuenta regresiva para el 15 de enero. Un día que nunca olvidaré.",
      },
      {
        min: 11,
        max: 20,
        message:
          "A menos de dos meses de tu cumpleaños, mi mente se adelanta a esa fecha. Porque celebrar tu vida, aunque sea de lejos, siempre será especial.",
      },
      {
        min: 21,
        max: 30,
        message:
          "Noviembre se despide. Y yo empiezo a sentir que tu cumpleaños se asoma otra vez, con todos los recuerdos que trae consigo.",
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
          "Diciembre llega con luces y esperanza. Y también con la emoción callada de saber que tu cumpleaños se acerca.",
      },
      {
        min: 11,
        max: 20,
        message:
          "La Navidad se aproxima, pero mi corazón ya empieza a recordar tu cumpleaños, tan cerca y tan simbólico para mí.",
      },
      {
        min: 21,
        max: 31,
        message:
          "Diciembre termina y un nuevo año comienza. Enero está por llegar, y con él, ese día que siempre te perteneció: el 15.",
      },
    ],
  },
};


// Estadísticas de vida
const lifeStats = [
  {
    icon: Heart,
    label: "Latidos del corazón",
    value: "aprox. 735 millones",
    color: "text-red-500",
  },
  { icon: Sun, label: "Días vividos", value: "", color: "text-yellow-500" },
  { icon: Moon, label: "Noches soñadas", value: "", color: "text-blue-500" },
  {
    icon: Sparkles,
    label: "Momentos especiales",
    value: "infinitos",
    color: "text-purple-500",
  },
];

// Metas y deseos por edad
const ageWishes = {
  21: [
    "Que encuentres tu pasión en la vida",
    "Que tengas aventuras increíbles",
    "Que construyas amistades duraderas",
  ],
  22: [
    "Que descubras nuevos talentos",
    "Que viajes a lugares soñados",
    "Que encuentres el amor verdadero",
  ],
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
  25: [
    "Que celebres cada pequeño logro",
    "Que la paz llene tu corazón",
    "Que siempre tengas motivos para sonreír",
  ],
};

export default function CumpleanosPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentAge, setCurrentAge] = useState(21);
  const [isBirthday, setIsBirthday] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  // const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [monthlyMessage, setMonthlyMessage] = useState("");

  // Rotar nombres cada 5 segundos
  // useEffect(() => {
  //   const nameInterval = setInterval(() => {
  //     setCurrentNameIndex((prev) => (prev + 1) % NAMES.length)
  //   }, 5000)

  //   return () => clearInterval(nameInterval)
  // }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Birthday is the configured date
      const birthMonth = BIRTH_DATE.getMonth();
      const birthDay = BIRTH_DATE.getDate();

      let nextBirthday = new Date(currentYear, birthMonth, birthDay);

      // If birthday has passed this year, calculate for next year
      if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, birthMonth, birthDay);
      }

      const difference = nextBirthday.getTime() - now.getTime();
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));

      // Calculate current age
      const birthYear = BIRTH_DATE.getFullYear();
      let age = now.getFullYear() - birthYear;

      // If birthday hasn't happened this year yet, subtract 1
      if (
        now.getMonth() < birthMonth ||
        (now.getMonth() === birthMonth && now.getDate() < birthDay)
      ) {
        age -= 1;
      }

      setCurrentAge(age);

      // Check if it's birthday today
      const isToday =
        now.getMonth() === birthMonth && now.getDate() === birthDay;
      setIsBirthday(isToday);

      if (isToday && !showConfetti) {
        setShowConfetti(true);
      }

      // Set monthly message based on current month and days left
      const currentMonth = now.getMonth();
      const monthData = monthlyMessages[currentMonth];
      if (monthData) {
        const range =
          monthData.ranges.find(
            (r) => daysLeft >= r.min && daysLeft <= r.max
          ) || monthData.ranges[0];
        setMonthlyMessage(range.message);
      }

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [showConfetti]);

  const getBirthdayMessage = () => {
    return (
      birthdayMessages[currentAge as keyof typeof birthdayMessages] ||
      "¡Feliz cumpleaños! Que tengas un día maravilloso."
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDaysLived = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - BIRTH_DATE.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getAgeWishes = () => {
    return ageWishes[currentAge as keyof typeof ageWishes] || ageWishes[25];
  };

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
              {
                ["🎉", "🎊", "🎈", "🎂", "✨", "🌟"][
                  Math.floor(Math.random() * 6)
                ]
              }
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
              <PartyPopper
                className="h-14 w-14 text-pink-500 animate-wiggle"
                style={{ animationDelay: "0.5s" }}
              />
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
                    <div className="flex justify-center space-x-6 text-8xl animate-celebration">
                      🎉🎂🎈🎊✨
                    </div>
                    <h2 className="font-dancing text-5xl md:text-6xl font-bold text-orange-600 animate-text-bounce main-title">
                      ¡Feliz Cumpleaños!
                    </h2>
                    <div className="text-3xl font-bold text-slate-700 animate-number-pop">
                      Hoy cumples {currentAge} años
                    </div>
                    <div className="flex justify-center space-x-3 text-5xl animate-sparkle-dance">
                      ✨🌟⭐🌟✨
                    </div>
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
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Mi Mensaje Para Ti
                  </h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed text-center font-serif">
                  {getBirthdayMessage()}
                </p>
                <div className="flex justify-center mt-8 space-x-3">
                  <Gift className="h-6 w-6 text-yellow-400 animate-bounce" />
                  <Cake
                    className="h-6 w-6 text-orange-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <PartyPopper
                    className="h-6 w-6 text-pink-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <Sparkles
                    className="h-6 w-6 text-purple-400 animate-bounce"
                    style={{ animationDelay: "0.6s" }}
                  />
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
                    Mensaje de{" "}
                    {new Date().toLocaleDateString("es-ES", { month: "long" })}
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
                <div className="text-6xl font-bold text-orange-600 mb-6 animate-number-pulse">
                  {currentAge} años
                </div>
                <p className="text-slate-600 leading-relaxed max-w-md mx-auto text-lg">
                  Naciste el {formatDate(BIRTH_DATE)}. Una fecha que siempre
                  recordaré.
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
                      <div className="text-yellow-600 font-medium text-lg">
                        Días
                      </div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-orange-700 animate-number-flip">
                        {timeLeft.hours}
                      </div>
                      <div className="text-orange-600 font-medium text-lg">
                        Horas
                      </div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-pink-700 animate-number-flip">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-pink-600 font-medium text-lg">
                        Minutos
                      </div>
                    </div>
                    <div
                      className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-lg animate-countdown-bounce"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-purple-700 animate-number-flip">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-purple-600 font-medium text-lg">
                        Segundos
                      </div>
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
                    const Icon = stat.icon;
                    let value = stat.value;
                    if (stat.label === "Días vividos") {
                      value = calculateDaysLived().toLocaleString();
                    } else if (stat.label === "Noches soñadas") {
                      value = (calculateDaysLived() - 1).toLocaleString();
                    }

                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg text-center animate-message-float"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <Icon
                          className={`h-8 w-8 mx-auto mb-3 ${stat.color} animate-pulse`}
                        />
                        <div className="text-2xl font-bold text-slate-700 mb-1">
                          {value}
                        </div>
                        <div className="text-sm text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    );
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
                    Mis deseos para tus {currentAge} años
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
                  <h3 className="font-dancing text-3xl font-semibold text-slate-700 main-title">
                    Etapas de tu vida
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Infancia y Adolescencia (0-18 años)
                      </div>
                      <div className="text-slate-500 text-sm">
                        Años de descubrimiento y crecimiento
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Juventud (18-{currentAge} años)
                      </div>
                      <div className="text-slate-500 text-sm">
                        Explorando el mundo y encontrando tu camino
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      →
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Próxima etapa ({currentAge + 1}+ años)
                      </div>
                      <div className="text-slate-500 text-sm">
                        Nuevas aventuras y experiencias te esperan
                      </div>
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
                  <Cake
                    className="h-6 w-6 text-orange-400 animate-gift-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
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
  );
}
