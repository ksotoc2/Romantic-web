"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Info,
  Clock,
} from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  catboxId: string;
  meaning: string;
  duration: string;
}

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  shadow: string;
  name: string;
}

const colorThemes: ColorTheme[] = [
  {
    primary: "from-rose-400 to-pink-500",
    secondary: "from-rose-100 to-pink-200",
    accent: "rose-500",
    gradient: "from-rose-200/40 to-pink-200/40",
    shadow: "rose-300/50",
    name: "Rosa",
  },
  {
    primary: "from-purple-400 to-violet-500",
    secondary: "from-purple-100 to-violet-200",
    accent: "purple-500",
    gradient: "from-purple-200/40 to-violet-200/40",
    shadow: "purple-300/50",
    name: "Púrpura",
  },
  {
    primary: "from-blue-400 to-cyan-500",
    secondary: "from-blue-100 to-cyan-200",
    accent: "blue-500",
    gradient: "from-blue-200/40 to-cyan-200/40",
    shadow: "blue-300/50",
    name: "Azul",
  },
  {
    primary: "from-emerald-400 to-teal-500",
    secondary: "from-emerald-100 to-teal-200",
    accent: "emerald-500",
    gradient: "from-emerald-200/40 to-teal-200/40",
    shadow: "emerald-300/50",
    name: "Verde",
  },
  {
    primary: "from-amber-400 to-orange-500",
    secondary: "from-amber-100 to-orange-200",
    accent: "amber-500",
    gradient: "from-amber-200/40 to-orange-200/40",
    shadow: "amber-300/50",
    name: "Ámbar",
  },
  {
    primary: "from-indigo-400 to-blue-500",
    secondary: "from-indigo-100 to-blue-200",
    accent: "indigo-500",
    gradient: "from-indigo-200/40 to-blue-200/40",
    shadow: "indigo-300/50",
    name: "Índigo",
  },
  {
    primary: "from-red-400 to-rose-500",
    secondary: "from-red-100 to-rose-200",
    accent: "red-500",
    gradient: "from-red-200/40 to-rose-200/40",
    shadow: "red-300/50",
    name: "Rojo",
  },
];

const songs: Song[] = [
  {
    id: "1",
    title: "1. Cama y mesa",
    artist: "Roberto Carlos",
    catboxId: "j2cf51.mp3",
    meaning:
      "Primera canción que te dediqué. En ella descubrí cómo se siente imaginar una vida contigo. No solo eras amor, eras hogar, rutina, y ternura. Fuiste la persona con quien soñé compartir los pequeños momentos del día, desde el desayuno hasta el silencio de las noches. Fue el inicio de todo lo que creí que vendría.",
    duration: "3:15",
  },
  {
    id: "2",
    title: "2. Poeta enamorado",
    artist: "Grupo Uno",
    catboxId: "41if18.mp3",
    meaning:
      "Primera canción que me dedicaste, y desde entonces no puedo escucharla sin pensar en cómo me veías. Me sentí visto, admirado, amado de una forma distinta. Tu forma de dedicarme esa canción me hizo creer que el amor también podía ser poesía, arte, dulzura. Me encanta porque ahí está tu esencia.",
    duration: "3:26",
  },
  {
    id: "3",
    title: "3. Ojos color sol",
    artist: "Calle 13, Silvio Rodríguez",
    catboxId: "xmfs22.mp3",
    meaning:
      "Esta canción me hace pensar en cómo era todo cuando estabas: más cálido, más claro, más vivo. Tus ojos tenían esa luz que transformaba mis días grises. Amar contigo fue como vivir bajo un sol que no quemaba, que sanaba. Una belleza serena, como la tuya, que me enseñó a mirar el mundo distinto.",
    duration: "3:34",
  },
  {
    id: "4",
    title: "4. Historia de un Amor",
    artist: "Eydie Gormé, Los Panchos",
    catboxId: "jggmjm.mp3",
    meaning:
      "Nuestra historia no fue perfecta, pero fue intensa y verdadera. Esta canción me recuerda que el amor no siempre tiene un final feliz, pero sí puede dejar huellas imborrables. Me duele, pero me honra haberla vivido contigo. Porque aunque no estemos, lo que sentimos fue real.",
    duration: "2:33",
  },
  {
    id: "5",
    title: "5. Piel canela",
    artist: "Los Panchos, Eydie Gormé",
    catboxId: "uqxfyi.mp3",
    meaning:
      "Cada vez que escucho esta canción, me acuerdo de tu risa, de tu piel y de tu voz. Es una canción que celebra lo bello de una mujer, y tú para mí siempre fuiste eso: belleza que desbordaba por dentro y por fuera. No necesito más que el recuerdo de tu alegría.",
    duration: "2:17",
  },
  {
    id: "6",
    title: "6. Nosotros",
    artist: "Eydie Gormé, Los Panchos",
    catboxId: "awrygh.mp3",
    meaning:
      "Una despedida con amor. No por falta de sentimientos, sino por razones que a veces la vida impone. Esta canción refleja la nobleza con la que quiero soltar lo nuestro: sin reproches, solo con gratitud. Porque aunque ya no sea, fue hermoso mientras duró.",
    duration: "2:44",
  },
  {
    id: "7",
    title: "7. Contigo",
    artist: "Los Panchos",
    catboxId: "gmdi4x.mp3",
    meaning:
      "Esta canción habla de lo esencial, y contigo todo lo simple cobraba un valor inmenso. No necesitaba más que tu compañía. Estar contigo bastaba para que todo tuviera sentido. Y aunque ya no estés, sigo creyendo en la verdad de esas palabras.",
    duration: "2:56",
  },
  {
    id: "8",
    title: "8. Sarà perché ti amo",
    artist: "Ricchi e Poveri",
    catboxId: "xoidtq.mp3",
    meaning:
      "Algo mágico que causaste dentro de mí. Es una canción que vibra con la emoción de lo inesperado, y eso fuiste tú: un terremoto en mi vida, un antes y un después. Me hiciste sentir cosas que no sabía que podían sentirse tan de golpe, tan profundamente.",
    duration: "3:03",
  },
  {
    id: "9",
    title: "9. Alma dinamita",
    artist: "Wos",
    catboxId: "bx1gtx.mp3",
    meaning:
      "Siempre fuiste intensidad, explosión, vida. Esta canción me recuerda tu energía única, tu forma de romper la rutina con tu presencia. Amarte fue como abrazar una tormenta: peligroso, pero imposible de soltar. Tu alma sigue siendo dinamita en mis recuerdos.",
    duration: "2:53",
  },
  {
    id: "10",
    title: "10. Alguien como tú",
    artist: "Josean Log",
    catboxId: "6wgajc.mp3",
    meaning:
      "Pensarte era inevitable. Siempre creí que nadie más se parecería a ti, y quizá siga creyéndolo. Esta canción me hace aceptar que, aunque el tiempo pase, hay personas que dejan huellas que no desaparecen, solo se transforman. Fuiste esa persona.",
    duration: "3:47",
  },
  {
    id: "11",
    title: "11. Cuando estás vos",
    artist: "Milo J",
    catboxId: "8piw2g.mp3",
    meaning:
      "Tu presencia cambiaba todo. El mundo era distinto cuando estabas, incluso las cosas simples como una charla o un abrazo. Esta canción es la sensación de querer detener el tiempo porque tú estabas ahí. Ahora que no estás, también cambia todo.",
    duration: "2:51",
  },
  {
    id: "12",
    title: "12. Sol",
    artist: "Willian",
    catboxId: "k5dwk0.mp3",
    meaning:
      "Fuiste luz cuando todo era gris. Esta canción me recuerda que trajiste claridad y color cuando lo necesitaba sin saberlo. Me enseñaste a mirar el mundo con otra luz, con más ternura. Seguirás siendo ese sol, incluso si ya no me alumbra de cerca.",
    duration: "2:19",
  },
  {
    id: "13",
    title: "13. En otra vida",
    artist: "Yami Safdie, Lasso",
    catboxId: "cd02x3.mp3",
    meaning:
      "Quizás allá, en otro tiempo, lo nuestro podría ser distinto. Esta canción es un suspiro que no se resigna del todo, que imagina una versión de nosotros donde todo encaja. Si no era ahora, quizás en otra vida. Porque el amor no siempre muere; a veces, solo se guarda para después.",
    duration: "2:36",
  },
  {
    id: "14",
    title: "14. DtMF",
    artist: "Bad Bunny",
    catboxId: "t8x2xf.mp3",
    meaning:
      "Una canción que representa esa etapa intensa, pasional, sin filtros. Nuestra historia también tuvo eso: deseo crudo, noches largas, instinto. Esta canción es testigo de lo físico que también fue parte del amor. Una parte honesta y sin adornos.",
    duration: "4:00",
  },
  {
    id: "15",
    title: "15. La noche más linda",
    artist: "Adalberto Santiago",
    catboxId: "vkuvtj.mp3",
    meaning:
      "Hubo momentos contigo que parecen irreales de lo bellos que fueron. Esta canción es una celebración de esas noches que no se olvidan, que te marcan para siempre. Contigo viví algunas de las noches más lindas de mi vida, y eso no se borra.",
    duration: "5:41",
  },
  {
    id: "16",
    title: "16. Te quiero",
    artist: "Hombres G",
    catboxId: "hd2ay1.mp3",
    meaning:
      "Una verdad sencilla, casi infantil, pero eterna: te quise. Sin complicaciones, sin condiciones. Esta canción lo dice como yo a veces no supe decirlo. Puede que estemos cerrando este ciclo, pero no quiero negar lo más básico: que te quise de verdad.",
    duration: "4:03",
  },
  {
    id: "17",
    title: "17. Te juro que te amo",
    artist: "Los Terrícolas",
    catboxId: "sece5m.mp3",
    meaning:
      "Amarte fue cierto, profundo, doloroso y hermoso. Esta canción es esa promesa que hicimos sin decirla: que lo nuestro fue sincero. Me quedo con la certeza de que no fue un juego, ni un error. Fue amor, aunque no haya durado.",
    duration: "3:59",
  },
];

export default function MusicaPage() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showMeaning, setShowMeaning] = useState<string | null>(null);
  const [showTimeRemaining, setShowTimeRemaining] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [audioBlobs, setAudioBlobs] = useState<{ [key: string]: string }>({});
  const [loadingAudio, setLoadingAudio] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentColors = colorThemes[currentThemeIndex];

  // Función para obtener audio desde Catbox (permite hotlinks)
  const getAudioBlob = async (catboxId: string): Promise<string> => {
    if (audioBlobs[catboxId]) {
      return audioBlobs[catboxId];
    }

    if (loadingAudio[catboxId]) {
      // Esperar a que termine la carga actual
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (audioBlobs[catboxId]) {
            clearInterval(checkInterval);
            resolve(audioBlobs[catboxId]);
          }
        }, 100);
      });
    }

    setLoadingAudio((prev) => ({ ...prev, [catboxId]: true }));

    try {
      // Catbox permite hotlinks directos, pero usamos fetch para consistencia
      const response = await fetch(`https://files.catbox.moe/${catboxId}`, {
        method: "GET",
        headers: {
          Accept: "audio/*",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      setAudioBlobs((prev) => ({ ...prev, [catboxId]: blobUrl }));
      setLoadingAudio((prev) => ({ ...prev, [catboxId]: false }));

      return blobUrl;
    } catch (error) {
      console.error(`Error loading audio ${catboxId}:`, error);
      setLoadingAudio((prev) => ({ ...prev, [catboxId]: false }));

      // Fallback: usar URL directa de Catbox (permite hotlinks)
      const directUrl = `https://files.catbox.moe/${catboxId}`;
      setAudioBlobs((prev) => ({ ...prev, [catboxId]: directUrl }));
      return directUrl;
    }
  };

  // Precargar audio de la canción actual y las siguientes
  useEffect(() => {
    const preloadAudio = async () => {
      const currentSongData = songs[currentSong];
      const nextSongData = songs[(currentSong + 1) % songs.length];

      // Precargar canción actual
      await getAudioBlob(currentSongData.catboxId);

      // Precargar siguiente canción
      setTimeout(() => {
        getAudioBlob(nextSongData.catboxId);
      }, 1000);
    };

    preloadAudio();
  }, [currentSong]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % colorThemes.length);
    }, 8000);
    return () => clearInterval(colorInterval);
  }, []);

  // Configurar audio cuando cambie la canción
  useEffect(() => {
    const setupAudio = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      const currentSongData = songs[currentSong];

      // Pausar audio actual y limpiar estado
      audio.pause();
      setIsPlaying(false);
      setIsLoading(true);
      setCurrentTime(0);
      setDuration(0);

      try {
        // Obtener blob URL desde Catbox
        const blobUrl = await getAudioBlob(currentSongData.catboxId);

        // Configurar nueva fuente
        audio.src = blobUrl;
        audio.currentTime = 0;

        // Configurar event listeners
        const handleCanPlay = () => {
          setIsLoading(false);
          // Aplicar volumen cuando esté listo
          audio.volume = volume;
          console.log("Audio listo, volumen aplicado:", audio.volume);
        };

        const handleLoadedMetadata = () => {
          setDuration(audio.duration || 0);
          // Aplicar volumen cuando se carguen los metadatos
          audio.volume = volume;
          console.log("Metadatos cargados, volumen aplicado:", audio.volume);
        };

        const handleTimeUpdate = () => {
          setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
          setIsPlaying(false);
          nextSong();
        };

        const handlePlay = () => {
          console.log("Audio event: play");
          setIsPlaying(true);
        };

        const handlePause = () => {
          console.log("Audio event: pause");
          setIsPlaying(false);
        };

        const handleError = (e: Event) => {
          console.error("Audio error:", e);
          setIsLoading(false);
        };

        // Limpiar listeners anteriores
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("error", handleError);

        // Agregar nuevos listeners
        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("error", handleError);

        // Cargar audio
        audio.load();
      } catch (error) {
        console.error("Error setting up audio:", error);
        setIsLoading(false);
      }
    };

    setupAudio();
  }, [currentSong]);

  // Aplicar volumen cuando cambie
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !isLoading) {
      audio.volume = volume;
      console.log("Volumen cambiado a:", volume, "Audio volume:", audio.volume);
    }
  }, [volume, isLoading]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) {
      console.log("Audio no disponible o cargando");
      return;
    }

    console.log(
      "Toggle play - isPlaying:",
      isPlaying,
      "audio.paused:",
      audio.paused
    );

    try {
      if (isPlaying) {
        audio.pause();
        console.log("Audio pausado");
      } else {
        // Asegurar volumen antes de reproducir
        audio.volume = volume;
        console.log("Intentando reproducir con volumen:", volume);
        await audio.play();
        console.log("Audio reproduciendo");
      }
    } catch (error) {
      console.error("Error toggling play:", error);
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    if (index === currentSong && isPlaying) {
      return; // No permitir pausar desde la lista
    }
    setCurrentSong(index);
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getRemainingTime = () => Math.max(0, duration - currentTime);

  const getProgressPercentage = () =>
    duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration || isLoading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
  };

  const toggleMeaning = (songId: string) => {
    setShowMeaning(showMeaning === songId ? null : songId);
  };

  const toggleTimeDisplay = () => {
    setShowTimeRemaining(!showTimeRemaining);
  };

  return (
    <div className="min-h-screen relative">
      {/* Contenido principal con padding bottom para el reproductor móvil */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div
              className={`absolute -inset-4 bg-gradient-to-r ${currentColors.gradient} rounded-full blur-lg opacity-30 animate-pulse transition-all duration-1000`}
            ></div>
            <Heart
              className={`h-16 w-16 text-${currentColors.accent} mx-auto mb-6 relative z-10 animate-pulse fill-current transition-all duration-1000`}
            />
          </div>
          <h1
            className={`font-dancing text-4xl md:text-6xl font-bold bg-gradient-to-r ${currentColors.primary} bg-clip-text text-transparent mb-6 transition-all duration-1000`}
          >
            Música pa' Ti
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Las canciones que marcaron nuestros momentos juntos
          </p>
          <div
            className={`text-sm text-${currentColors.accent} font-medium transition-all duration-1000`}
          >
            Tema actual: {currentColors.name}
          </div>
          <br />
          <div className="text-center mt-12 lg:mt-0">
            <p className="text-slate-500 text-sm">
              Haz clic en cualquier canción para reproducirla automáticamente •
              Toca
              <Info className="h-4 w-4 inline mx-1" /> para ver el significado
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Song List - Left Side - 3 columns */}
          <div className="col-span-3 space-y-4">
            <h2 className="font-dancing text-3xl font-bold text-slate-700 text-center mb-8">
              Lista de Canciones
            </h2>

            <div className="max-h-[600px] overflow-y-auto pr-4 space-y-4">
              {songs.map((song, index) => (
                <div key={song.id} className="relative">
                  {/* Meaning Tooltip */}
                  {showMeaning === song.id && (
                    <div
                      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
                      onClick={() => setShowMeaning(null)}
                    >
                      <div
                        className={`bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-${currentColors.accent}/20 max-w-md mx-auto animate-fade-in-up transition-all duration-1000`}
                      >
                        <div className="flex items-start space-x-3">
                          <Heart
                            className={`h-6 w-6 text-${currentColors.accent} mt-0.5 flex-shrink-0 fill-current transition-all duration-1000`}
                          />
                          <div>
                            <h5 className="font-dancing text-xl font-semibold text-slate-700 mb-3">
                              {song.title}
                            </h5>
                            <p className="text-slate-600 leading-relaxed">
                              {song.meaning}
                            </p>
                            <button
                              onClick={() => setShowMeaning(null)}
                              className={`mt-4 text-${currentColors.accent} hover:text-${currentColors.accent}/80 text-sm font-medium transition-all duration-1000`}
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-1000 cursor-pointer transform hover:scale-[1.02] ${
                      index === currentSong
                        ? `border-${currentColors.accent}/30 bg-gradient-to-r ${currentColors.secondary} shadow-${currentColors.shadow}`
                        : "border-slate-200/50 hover:border-slate-300"
                    }`}
                    onClick={() => selectSong(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-1000 ${
                            index === currentSong
                              ? `bg-gradient-to-r ${currentColors.primary} shadow-lg animate-pulse-glow`
                              : "bg-slate-200"
                          }`}
                        >
                          {(index === currentSong && isLoading) ||
                          loadingAudio[song.catboxId] ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : index === currentSong && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white ml-0.5" />
                          )}
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-700">
                            {song.title}
                          </h4>
                          <p className="text-slate-500 text-sm">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500 text-sm">
                          {song.duration}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMeaning(song.id);
                          }}
                          className={`p-2 text-slate-400 hover:text-${currentColors.accent} transition-colors duration-300 rounded-full hover:bg-${currentColors.accent}/10 group`}
                          title="Ver significado"
                        >
                          <Info className="h-5 w-5 animate-pulse group-hover:animate-bounce" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Music Player - Right Side - 2 columns */}
          <div className="col-span-2">
            <div className="sticky top-24">
              <div className="relative">
                <div
                  className={`absolute -inset-6 bg-gradient-to-r ${currentColors.gradient} rounded-3xl blur-2xl animate-pulse-gentle transition-all duration-1000`}
                ></div>
                <div
                  className={`relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-${currentColors.accent}/20 transition-all duration-1000`}
                >
                  {/* Album Art Section */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4">
                      <div
                        className={`w-40 h-40 bg-gradient-to-br ${currentColors.primary} rounded-3xl mx-auto flex items-center justify-center shadow-2xl transform transition-all duration-1000 hover:scale-105`}
                      >
                        <div className="relative">
                          <Heart
                            className={`h-16 w-16 text-white fill-current transition-all duration-300 ${
                              isPlaying ? "animate-pulse" : ""
                            }`}
                          />
                          {isPlaying && (
                            <div
                              className={`absolute inset-0 rounded-full border-4 border-white/30 animate-spin opacity-30`}
                            ></div>
                          )}
                        </div>
                      </div>

                      {/* Vinyl Record Effect */}
                      {isPlaying && (
                        <div className="absolute inset-0 w-40 h-40 mx-auto">
                          <div
                            className={`w-full h-full rounded-full border-2 border-${currentColors.accent}/30 animate-spin-slow transition-all duration-1000`}
                          ></div>
                          <div
                            className={`absolute top-3 left-3 right-3 bottom-3 rounded-full border border-${currentColors.accent}/20 animate-spin-slow transition-all duration-1000`}
                          ></div>
                        </div>
                      )}
                    </div>

                    <h3 className="font-dancing text-2xl font-bold text-slate-700 mb-1 animate-fade-in">
                      {songs[currentSong].title}
                    </h3>
                    <p className="text-slate-600 text-base">
                      {songs[currentSong].artist}
                    </p>
                  </div>

                  {/* Time Counter Display */}
                  <div className="mb-6">
                    <div
                      className={`bg-gradient-to-r ${currentColors.secondary} rounded-2xl p-4 shadow-inner border border-${currentColors.accent}/20 transition-all duration-1000`}
                    >
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <Clock
                          className={`h-5 w-5 text-${currentColors.accent} transition-all duration-1000`}
                        />
                        <h4 className="font-dancing text-lg font-semibold text-slate-700">
                          Tiempo
                        </h4>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={toggleTimeDisplay}
                          className="group transition-all duration-300 hover:scale-105"
                        >
                          <div
                            className={`bg-white/80 rounded-xl p-3 shadow-lg border border-${currentColors.accent}/20 group-hover:shadow-xl transition-all duration-1000`}
                          >
                            <div
                              className={`text-3xl font-bold font-mono text-${currentColors.accent} mb-1 tracking-wider transition-all duration-1000`}
                            >
                              {showTimeRemaining
                                ? `-${formatTime(getRemainingTime())}`
                                : formatTime(currentTime)}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              {showTimeRemaining ? "Restante" : "Transcurrido"}
                            </div>
                          </div>
                        </button>

                        <div className="mt-2 text-slate-500 text-xs">
                          Total:{" "}
                          <span className="font-semibold">
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <div
                        className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full cursor-pointer shadow-inner transition-all duration-300 hover:h-4"
                        onClick={handleProgressClick}
                      >
                        <div
                          className={`h-full bg-gradient-to-r ${currentColors.primary} rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden`}
                          style={{ width: `${getProgressPercentage()}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                          <div
                            className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-${currentColors.accent} transition-all duration-1000 hover:scale-125`}
                          >
                            <div
                              className={`w-full h-full bg-gradient-to-br ${currentColors.primary} rounded-full animate-pulse transition-all duration-1000`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                      <span className="bg-white/50 px-2 py-1 rounded">
                        {formatTime(currentTime)}
                      </span>
                      <span className="bg-white/50 px-2 py-1 rounded">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Controls */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <button
                      onClick={prevSong}
                      className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <SkipBack className="h-5 w-5 text-slate-600" />
                    </button>

                    <button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className={`p-5 bg-gradient-to-br ${currentColors.primary} hover:shadow-${currentColors.shadow} text-white rounded-full transition-all duration-1000 transform hover:scale-110 shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
                      {isLoading ? (
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                      ) : isPlaying ? (
                        <Pause className="h-8 w-8 relative z-10" />
                      ) : (
                        <Play className="h-8 w-8 ml-1 relative z-10" />
                      )}
                    </button>

                    <button
                      onClick={nextSong}
                      className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <SkipForward className="h-5 w-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Enhanced Volume Control */}
                  <div
                    className={`bg-gradient-to-r ${currentColors.secondary} rounded-xl p-3 border border-${currentColors.accent}/20 transition-all duration-1000`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Volume2 className="h-4 w-4 text-slate-500" />
                      <div className="flex-1 max-w-24">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) =>
                            setVolume(Number.parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-mono min-w-[2.5rem]">
                        {Math.round(volume * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="space-y-4">
            <h2 className="font-dancing text-3xl font-bold text-slate-700 text-center mb-8">
              Lista de Canciones
            </h2>
            {songs.map((song, index) => (
              <div key={song.id} className="relative">
                {showMeaning === song.id && (
                  <div
                    className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowMeaning(null)}
                  >
                    <div
                      className={`bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-${currentColors.accent}/20 max-w-md mx-auto animate-fade-in-up transition-all duration-1000`}
                    >
                      <div className="flex items-start space-x-3">
                        <Heart
                          className={`h-6 w-6 text-${currentColors.accent} mt-0.5 flex-shrink-0 fill-current transition-all duration-1000`}
                        />
                        <div>
                          <h5 className="font-dancing text-xl font-semibold text-slate-700 mb-3">
                            {song.title}
                          </h5>
                          <p className="text-slate-600 leading-relaxed">
                            {song.meaning}
                          </p>
                          <button
                            onClick={() => setShowMeaning(null)}
                            className={`mt-4 text-${currentColors.accent} hover:text-${currentColors.accent}/80 text-sm font-medium transition-all duration-1000`}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-1000 cursor-pointer transform hover:scale-[1.02] ${
                    index === currentSong
                      ? `border-${currentColors.accent}/30 bg-gradient-to-r ${currentColors.secondary}`
                      : "border-slate-200/50 hover:border-slate-300"
                  }`}
                  onClick={() => selectSong(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-1000 ${
                          index === currentSong
                            ? `bg-gradient-to-r ${currentColors.primary}`
                            : "bg-slate-200"
                        }`}
                      >
                        {(index === currentSong && isLoading) ||
                        loadingAudio[song.catboxId] ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : index === currentSong && isPlaying ? (
                          <Pause className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700">
                          {song.title}
                        </h4>
                        <p className="text-slate-500 text-sm truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-slate-500 text-sm">
                        {song.duration}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMeaning(song.id);
                        }}
                        className={`p-2 text-slate-400 hover:text-${currentColors.accent} transition-colors duration-1000 rounded-full hover:bg-${currentColors.accent}/10 group`}
                        title="Ver significado"
                      >
                        <Info className="h-5 w-5 animate-pulse group-hover:animate-bounce" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
      </div>

      {/* REPRODUCTOR FIJO TIPO SPOTIFY PARA MÓVILES - SIEMPRE VISIBLE */}
      <div className="lg:hidden">
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-t from-white via-white/98 to-white/95 backdrop-blur-md border-t border-${currentColors.accent}/20 shadow-2xl transition-all duration-1000`}
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: 100,
          }}
        >
          {/* Mini Progress Bar */}
          <div className="w-full h-1 bg-slate-200">
            <div
              className={`h-full bg-gradient-to-r ${currentColors.primary} transition-all duration-1000`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>

          <div className="p-3">
            {/* Main Player Row */}
            <div className="flex items-center justify-between">
              {/* Song Info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${currentColors.primary} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 transition-all duration-1000`}
                >
                  <Heart
                    className={`h-6 w-6 text-white fill-current ${
                      isPlaying ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-700 truncate text-sm">
                    {songs[currentSong].title}
                  </h4>
                  <p className="text-slate-500 text-xs truncate">
                    {songs[currentSong].artist}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSong}
                  className="p-2 text-slate-600 hover:text-slate-800 transition-colors duration-300"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={`p-3 bg-gradient-to-r ${currentColors.primary} text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextSong}
                  className="p-2 text-slate-600 hover:text-slate-800 transition-colors duration-300"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Expandable Controls */}
            <div className="mt-3 pt-3 border-t border-slate-200/50">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                <span className="font-mono">{formatTime(currentTime)}</span>
                <button
                  onClick={toggleTimeDisplay}
                  className={`font-mono bg-gradient-to-r ${currentColors.secondary} text-${currentColors.accent} px-2 py-1 rounded-full transition-all duration-1000 hover:shadow-md`}
                >
                  {showTimeRemaining
                    ? `-${formatTime(getRemainingTime())}`
                    : `+${formatTime(getRemainingTime())}`}
                </button>
                <span className="font-mono">{formatTime(duration)}</span>
              </div>

              {/* Progress Bar */}
              <div
                className="w-full h-2 bg-slate-200 rounded-full cursor-pointer mb-3"
                onClick={handleProgressClick}
              >
                <div
                  className={`h-full bg-gradient-to-r ${currentColors.primary} rounded-full transition-all duration-300 relative overflow-hidden`}
                  style={{ width: `${getProgressPercentage()}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <Volume2 className="h-4 w-4 text-slate-500" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) =>
                      setVolume(Number.parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono min-w-[2.5rem]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
}
