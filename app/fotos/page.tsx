"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Photo {
  id: string;
  catboxId: string;
  title: string;
  description: string;
  date: string;
}

const photos: Photo[] = [
  {
    id: "1",
    catboxId: "mth3oj.jpg",
    title: "Cuando no sabíamos nada aún",
    description: "Nuestra primera foto. Ni planes, ni certezas, solo ese gesto tuyo tan simple y la cercanía que empezaba a sentirse natural. Ahora que todo quedó atrás, esta imagen guarda lo que fue sin necesidad de palabras.",
    date: "El comienzo de algo que hoy solo vive en la memoria",
  },
  {
    id: "2",
    catboxId: "vopfya.jpg",
    title: "Donde descansabas de todo",
    description: "Ahí estabas, con Tomasino acurrucado cerca y el mundo quedando un poco más lejos por un rato. Esa imagen guarda una calma especial, la que solo aparece cuando uno está exactamente donde quiere estar.",
    date: "Una noche cualquiera que se volvió refugio",
  },
  {
    id: "3",
    catboxId: "n3rtvy.jpg",
    title: "Una quietud que decía todo",
    description: "No hacías nada especial, y aun así lo eras. Esa expresión tranquila, el gesto suave, todo hablaba de un momento que no buscaba ser perfecto, solo sincero. Y por eso quedó guardado con tanto cariño.",
    date: "Una noche cualquiera que terminó siendo única",
  },
  {
    id: "4",
    catboxId: "n9jqyb.jpg",
    title: "Cuando dolía más de lo que se decía",
    description: "Tu mirada estaba lejos, y yo también sentí ese peso. No supe qué decirte, solo quedarme ahí. Esa noche, el silencio fue lo único que supo acompañarte bien.",
    date: "Una tristeza compartida sin palabras, pero muy presente",
  },
  {
    id: "5",
    catboxId: "aunfmj.jpg",
    title: "Lo que igual llegaba",
    description: "No me la enviaste tú, pero cuando la vi, supe que algo tuyo seguía llegando. Esa sonrisa de costado, los colores cálidos, y esa forma tan tuya de estar sin esfuerzo. A veces, eso también alcanza.",
    date: "Un instante tuyo que me encontró por otro camino",
  },
  {
    id: "6",
    catboxId: "ev2bp8.jpg",
    title: "Lo picante también deja risa",
    description: "No estuve ahí, pero esta foto lo cuenta todo: la risa a medias, el ardor en los ojos, y esa alegría inesperada que llega cuando algo pica pero el momento igual vale la pena. Hasta eso me hizo sonreír desde lejos.",
    date: "Un instante espontáneo que ardía y alegraba al mismo tiempo",
  },
  {
    id: "7",
    catboxId: "ycixea.jpg",
    title: "Algo estaba por cambiar",
    description: "Dijiste que querías cortarte el pelo, y lo dijiste así, sin apuro ni explicación. En tu mirada había algo distinto, como si ya lo hubieras hecho por dentro. A veces, los cambios empiezan mucho antes del espejo.",
    date: "Una tarde en la que algo se soltó sin hacer ruido",
  },
  {
    id: "8",
    catboxId: "thiabz.jpg",
    title: "Tu forma de quedarte sin hacer ruido",
    description: "Esa mirada tranquila, la mano apoyada, esa leve curva en tus labios... No hacía falta más. Hay fotos que no buscan ser memorables, pero igual se quedan. Esta es una de esas, que no se va aunque pase el tiempo.",
    date: "Un instante simple que todavía acompaña",
  },
  {
    id: "9",
    catboxId: "f7q98a.jpg",
    title: "El fleco y lo que cambió contigo",
    description: "Ese pequeño corte decía mucho más de lo que parecía. Era nuevo, sí, pero no impostado. Tenía tu forma, tu ritmo. Y aunque parecía un detalle, fue uno de esos que marcan un antes sin hacer ruido.",
    date: "Una novedad simple que se volvió parte de ti enseguida",
  },
  {
    id: "10",
    catboxId: "c1y4fs.jpg",
    title: "Ese primer paso que era un sueño dicho en voz alta",
    description: "Lo dijiste como quien lanza una idea al aire, pero ya venía con forma. Querías ser ñusta, y en esta imagen ya lo eras. El traje, la postura, esa mezcla tuya de orgullo y ternura... todo empezó justo ahí, nombrándolo.",
    date: "Un día de sol que encendió algo más adentro",
  },
  {
    id: "11",
    catboxId: "z7upc6.jpg",
    title: "Todo lo que te gustaba estaba ahí",
    description: "Era imposible no reconocerte en cada elección. Ver esta esquina es como asomarse a tus ideas cuando recién tomaban forma: libres, claras, sin pedir permiso. Todavía da gusto mirarla.",
    date: "Una pared que decía más de lo que parecía",
  },
  {
    id: "12",
    catboxId: "ctzm96.jpg",
    title: "Entre palillos y algo más",
    description: "Ese día pasaban muchas cosas pequeñas al mismo tiempo. Te veías distinta, pero no por la peluca, sino por esa expresión que todavía no sé cómo nombrar. La imagen guarda algo que fue bonito sin necesitar explicación.",
    date: "Una de esas escenas que aún se siente cercana sin hacer ruido",
  },
  {
    id: "13",
    catboxId: "9srf5u.jpg",
    title: "Energía linda sin esfuerzo",
    description: "Ese día todo parecía fluir con naturalidad. Tus gestos, las risas, la manera en que hacías que todo se sintiera más ligero. Esta imagen es como una chispa guardada: pequeña, pero suficiente para volver a sonreír.",
    date: "Un momento que no intentaba ser especial, y lo fue igual",
  },
  {
    id: "14",
    catboxId: "oq3plr.jpg",
    title: "Como si supieras",
    description: "Apareció en medio del día, sin previo aviso, y fue justo lo que necesitaba. No por la foto en sí, sino por lo que llevaba dentro: una calma, una intención, una forma tuya de estar sin hacer ruido.",
    date: "De esas veces en que algo llega sin esperarse, pero en el momento exacto",
  },
  {
    id: "15",
    catboxId: "tvhmc9.jpg",
    title: "Mientras afuera llovía",
    description: "Nos quedamos un rato más en la terminal, sin apuro. La lluvia caía allá afuera, pero adentro todo se sentía tranquilo. No fue por el lugar, sino por lo fácil que era compartir ese momento contigo.",
    date: "Una espera que no pesaba nada",
  },
  {
    id: "16",
    catboxId: "86s9vo.jpg",
    title: "Un rato que no estaba en el plan",
    description: "Ese día no entraste a clases, y por alguna razón, todo fue más suave. A veces lo mejor no se organiza: simplemente pasa. Y queda así, guardado como una pequeña pausa luminosa.",
    date: "De esos momentos que llegan sin anunciarse y se quedan igual",
  },
  {
    id: "17",
    catboxId: "03zf78.jpg",
    title: "Esa paz que dabas sin darte cuenta",
    description: "No era solo la sonrisa, ni el gesto con la mano. Era todo lo que no se decía y aún así se sentía claro. Como si en ese momento nada hiciera falta, porque estabas tú, así, tan simple y tan bien.",
    date: "Una tarde cualquiera que terminó pareciendo importante",
  },
  {
    id: "18",
    catboxId: "1dazwn.jpg",
    title: "Como si vinieras de otro mundo",
    description: "Tenías esa expresión tranquila, casi de personaje. No sé si fue por la peluca, las orejeras o la luz del camino, pero había algo en ti que parecía de otro lugar. Y aun así, eras completamente tú.",
    date: "Un trayecto corto que dejó una imagen para rato",
  },
  {
    id: "19",
    catboxId: "foasnx.jpg",
    title: "Una pausa entre tierra y cielo",
    description: "Tapaste la cámara, pero igual se te ve. En esa mezcla de juego y sol, entre tierra suelta y cielo limpio, quedó atrapado algo tuyo. Algo que no buscaba ser recordado y por eso se recuerda mejor.",
    date: "Un día claro que se guardó sin esfuerzo",
  },
  {
    id: "20",
    catboxId: "mtxg6j.jpg",
    title: "Cuando algo se estaba por decir",
    description: "Tus ojos sostenían algo que no alcanzaba a ser tristeza, pero tampoco calma. Era más bien ese momento justo antes de hablar, cuando todo se siente un poco más nítido. Y quedó en la foto, sin decir palabra.",
    date: "Un instante breve con ganas de quedarse",
  },
  {
    id: "21",
    catboxId: "92gsrt.jpg",
    title: "El brillo del primer intento",
    description: "Me hablaste de ese baile como si todo hubiera empezado ahí. Y al verte en la foto, con esa mezcla de emoción, trenzas largas y luz en la mirada, entendí que sí: algo se encendió ese día, y quedó bailando en vos.",
    date: "Un inicio que todavía deja eco",
  },
  {
    id: "22",
    catboxId: "xzfsm7.jpg",
    title: "La fuerza en tu mirada",
    description: "Misma trenza, misma vestimenta, pero otra energía. En esta foto no estabas esperando nada: ya estabas ahí, plantada, firme, con una presencia que llenaba el cuadro sin esfuerzo.",
    date: "Un segundo del mismo día que dijo algo distinto",
  },
  {
    id: "23",
    catboxId: "p28z7b.jpg",
    title: "Negro con actitud",
    description: "Ese día hablaste del negro como si fuera más que un color. Y te veías así: segura, distinta, con una elegancia silenciosa que no pedía atención, pero la tenía toda.",
    date: "Una charla casual que terminó diciendo mucho más",
  },
  {
    id: "24",
    catboxId: "3wde4g.jpg",
    title: "Primer abrazo del año",
    description: "Subiste hasta allá con ganas de empezar distinto. Rodeada de cerros, cactus y cielo abierto, te reías como quien sabe que está en el lugar justo. Y ese abrazo, tan inesperado como sincero, lo dijo todo.",
    date: "Un comienzo que eligió la tierra y el sol",
  },
  {
    id: "25",
    catboxId: "nz9fbw.jpg",
    title: "Entre colores y amistad",
    description: "Ambas estaban lindas, eso es cierto. Pero había en ti una presencia que brillaba distinto: por cómo sostenías la zampoña, por la luz en tus ojos, por esa forma tuya de habitar cada instante con fuerza suave",
    date: "Un recuerdo compartido en el que tú dejaste huella propia",
  },
  {
    id: "26",
    catboxId: "h8ymdw.jpg",
    title: "Lo que tus ojos decían sin hablar",
    description: "No hacían falta palabras cuando me mirabas así. Había algo en tu forma de ver que hacía pausa en todo lo demás. Como si el mundo se quedara quieto un momento solo para escucharte sin voz.",
    date: "Un primer plano que todavía se siente cerca",
  },
  {
    id: "27",
    catboxId: "ku6p8y.jpg",
    title: "Brillo propio entre luces y globos",
    description: "Fue uno de esos concursos en los que diste todo, y se notaba. El vestido, la postura, la forma en que te parabas al centro... no era solo elegancia, era presencia. Y aunque no fuera el primero, igual dejaste marca.",
    date: "Una noche de esas que todavía sabe a logro",
  },
  {
    id: "28",
    catboxId: "zkynwy.jpg",
    title: "El juego donde tu risa se quedó a vivir",
    description: "Bajabas sin prisa, con esa risa tuya que llenaba todo. Fue solo un momento en un parque cualquiera, pero quedó guardado como si el día supiera que debía quedarse contigo. Incluso lo simple, contigo, se volvía especial. Y ese instante, todavía se siente cerca.",
    date: "Un resbalín que todavía recuerda tu forma de disfrutar",
  },
  {
    id: "29",
    catboxId: "zp5ish.jpg",
    title: "Donde el columpio no se movía, pero tú sí brillabas",
    description: "Sentada ahí, en calma, con el sol suave cayendo justo donde debía. No hacía falta que el columpio se moviera para que todo se sintiera ligero. Tu forma de estar, tan simple y serena, hizo que el parque guardara ese instante como si supiera que era especial.",
    date: "Un instante suspendido entre luz y silencio",
  },
  {
    id: "30",
    catboxId: "fp1s6a.jpg",
    title: "El juego que te sostuvo mientras el mundo giraba",
    description: "Había cadenas por todas partes, pero nada de eso te ataba. De pie, con esa calma tuya tan firme, parecías parte del paisaje y, al mismo tiempo, alguien que lo observaba todo desde otro ritmo. Fue solo un momento, pero quedó grabado como uno de esos silencios que dicen más que una conversación.",
    date: "Una quietud breve en medio del movimiento",
  },
  {
    id: "31",
    catboxId: "wu973u.jpg",
    title: "Donde tu risa se acostó un rato",
    description: "Tu sonrisa hablaba más que el gesto. Era de esas que nacen cuando todo está bien, sin pensar demasiado. El parque te abrazaba en silencio, y vos, entre cuerdas y tierra suave, te dejaste caer como quien confía. Nada urgente, nada pendiente… solo ese momento que, por suerte, quedó guardado.",
    date: "Una pausa que no pedía nada, solo dejarse estar",
  },
  {
    id: "32",
    catboxId: "8fal6g.jpg",
    title: "Una vista amplia, y algo en vos que miraba más allá",
    description: "Ahí parada, con todo ese paisaje detrás, parecías parte del lugar y a la vez un poco aparte. Había luz, viento, cielo... pero también algo en vos que no se veía. Como si estuvieras despidiéndote en silencio o soñando despierta. Sea lo que sea, la ciudad te acompañó.",
    date: "Una mirada que parecía buscar algo más lejos",
  },
  {
    id: "33",
    catboxId: "7tp2vh.jpg",
    title: "Un horizonte que hablaba de despedidas",
    description: "Apoyada en la baranda, el reloj marcaba la hora, pero tú parecías fuera del tiempo. Ni el ruido, ni la gente, ni el cielo cargado lograron distraer lo que guardabas en la mirada. Fue un instante tuyo, silencioso, como si la ciudad quedara atrás y sólo quedara el recuerdo.",
    date: "Entre la ciudad y la memoria",
  },
  {
    id: "34",
    catboxId: "e2lxev.jpg",
    title: "Nada se movía, pero vos le diste vida",
    description: "Te inclinaste con cuidado, como quien se asoma a algo frágil pero importante. Era una maqueta, pero tu mirada le dio vida. Había algo en esa pausa tuya —entre juego y admiración— que hizo que ese instante también se quedara.",
    date: "Un momento sencillo que hablaba de sueños grandes",
  },
  {
    id: "35",
    catboxId: "bv9y7k.jpg",
    title: "Una excusa para verte otra vez",
    description: "Te pedí la foto con cualquier argumento, pero la verdad era simple: quería mirarte un rato más. Y apareciste así, con la mano en la mejilla y esa expresión suave que siempre decía más de lo que parecía.",
    date: "Un momento pedido sin razón, pero con todas las ganas",
  },
  {
    id: "36",
    catboxId: "6t02ha.jpg",
    title: "Un hechizo con tu nombre",
    description: "Dijiste que querías parecerte a Bellatrix Lestrange, y no hizo falta mucho esfuerzo. La mirada intensa, el negro en todo y esa fuerza un poco salvaje... Sí, sí te parecías. Y sí, daba un poco de miedo.",
    date: "Un juego oscuro que salió demasiado bien",
  },
  {
    id: "37",
    catboxId: "74wj13.jpg",
    title: "Entre risas y abrigo",
    description: "Dijiste que era una boda, pero lo que más se nota es que estabas bien. Con tu amiga, con frío, con esos audífonos enormes y esa sonrisa tuya que siempre encuentra la forma de aparecer.",
    date: "Un recuerdo sencillo que aún calienta como en ese día",
  },
  {
    id: "38",
    catboxId: "7cj9qa.jpg",
    title: "Formal y auténtica igual",
    description: "Aunque fuera para la Unidad Académica, no perdiste nada tuyo. Ni la expresión tranquila, ni la mirada firme, ni ese algo que siempre se cuela, incluso en una foto carnet.",
    date: "Un trámite más que también supiste hacer tuyo",
  },
  {
    id: "39",
    catboxId: "yjrttj.jpg",
    title: "Silencio con música de fondo",
    description: "La imagen tiene algo de pausa. El movimiento, el viento, los audífonos… todo habla de un momento que no pide nada, solo dejarse estar. Y ahí estabas, presente sin apuro, como si el tiempo pasara distinto.",
    date: "Un trayecto que se sintió más largo, pero en el buen sentido",
  },
  {
    id: "40",
    catboxId: "mjmv42.jpg",
    title: "La última luz del día",
    description: "Esa sonrisa tranquila, el lago detrás, el pañuelo de colores… todo parecía decir que estabas bien. Y si fue la última que enviaste, entonces fue una forma bonita de cerrar: con calma, con sol, con vos siendo vos.",
    date: "Una despedida sin decir adiós",
  },
];

export default function FotosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: string }>({});
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  // Función para obtener imagen desde Catbox (permite hotlinks)
  const getImageBlob = async (catboxId: string): Promise<string> => {
    if (imageBlobs[catboxId]) {
      return imageBlobs[catboxId];
    }

    if (loadingImages[catboxId]) {
      // Esperar a que termine la carga actual
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (imageBlobs[catboxId]) {
            clearInterval(checkInterval);
            resolve(imageBlobs[catboxId]);
          }
        }, 100);
      });
    }

    setLoadingImages((prev) => ({ ...prev, [catboxId]: true }));

    try {
      // Catbox permite hotlinks directos, pero usamos fetch para consistencia
      const response = await fetch(`https://files.catbox.moe/${catboxId}`, {
        method: "GET",
        headers: {
          Accept: "image/*",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      setImageBlobs((prev) => ({ ...prev, [catboxId]: blobUrl }));
      setLoadingImages((prev) => ({ ...prev, [catboxId]: false }));

      return blobUrl;
    } catch (error) {
      console.error(`Error loading image ${catboxId}:`, error);
      setLoadingImages((prev) => ({ ...prev, [catboxId]: false }));

      // Fallback: usar URL directa de Catbox (permite hotlinks)
      const directUrl = `https://files.catbox.moe/${catboxId}`;
      setImageBlobs((prev) => ({ ...prev, [catboxId]: directUrl }));
      return directUrl;
    }
  };

  // Precargar imágenes
  useEffect(() => {
    const preloadImages = async () => {
      // Precargar imagen actual
      await getImageBlob(photos[currentIndex].catboxId);

      // Precargar siguiente y anterior
      const nextIndex = (currentIndex + 1) % photos.length;
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;

      setTimeout(() => {
        getImageBlob(photos[nextIndex].catboxId);
        getImageBlob(photos[prevIndex].catboxId);
      }, 500);
    };

    preloadImages();
  }, [currentIndex]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="min-h-screen relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Star className="h-12 w-12 text-purple-500 fill-current mx-auto mb-4 relative z-10 animate-bounce" />
          </div>
          <h1 className="font-dancing text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Fotos de Recuerdo
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {photos.length} momentos capturados que guardan tu esencia y belleza
          </p>
        </div>

        {/* Carousel - Tamaño reducido */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Photo */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-200/50 animate-fade-in-up">
            <div className="aspect-[4/3] relative transition-all duration-500 ease-in-out">
              {loadingImages[currentPhoto.catboxId] ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-purple-600 font-medium text-sm">
                      Cargando imagen...
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={
                    imageBlobs[currentPhoto.catboxId] ||
                    `https://files.catbox.moe/${currentPhoto.catboxId}`
                  }
                  alt={currentPhoto.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Si falla, usar placeholder
                    e.currentTarget.src =
                      "/placeholder.svg?height=400&width=600";
                  }}
                />
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Photo Counter */}
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-dancing text-xl font-semibold text-slate-700">
                  {currentPhoto.title}
                </h3>
                <Star className="h-5 w-5 text-purple-400 fill-current opacity-60" />
              </div>
              <p className="text-sm text-purple-600 font-medium mb-2">
                {currentPhoto.date}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                {currentPhoto.description}
              </p>
            </div>
          </div>

          {/* Thumbnails - Tamaño reducido */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-3">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToPhoto(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:shadow-lg ${
                  index === currentIndex
                    ? "border-purple-400 shadow-lg scale-110"
                    : "border-transparent hover:border-purple-300 hover:scale-105"
                }`}
              >
                {loadingImages[photo.catboxId] ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={
                      imageBlobs[photo.catboxId] ||
                      `https://files.catbox.moe/${photo.catboxId}`
                    }
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=64&width=64";
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 scale-125"
                    : "bg-purple-200 hover:bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Instructions */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Usa las flechas o haz clic en las miniaturas para navegar •{" "}
            {photos.length} fotos en total
          </p>
          
        </div>
      </div>
    </div>
  );
}
