# Hasta Siempre - Sitio Web Romántico

Un sitio web hermoso y emotivo creado para preservar recuerdos especiales.

## 🚀 Instalación Rápida

\`\`\`bash
npm install
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

\`\`\`
hasta-siempre-website/
├── app/
│   ├── page.tsx          # Página principal
│   ├── fotos/            # Galería de fotos
│   ├── videos/           # Galería de videos
│   ├── musica/           # Reproductor de música
│   ├── carta/            # Carta personal
│   ├── cumpleanos/       # Página de cumpleaños
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Estilos globales
├── components/
│   ├── navigation.tsx    # Navegación
│   ├── floating-elements.tsx
│   ├── floating-messages.tsx
│   └── envelope.tsx      # Sobre animado
└── public/               # Archivos estáticos
\`\`\`

## 🎵 Configuración de Música

Para agregar tus propias canciones:

1. Sube archivos MP3 a Dropbox
2. Obtén enlaces públicos (cambia `?dl=0` por `?dl=1`)
3. Actualiza el array `songs` en `app/musica/page.tsx`

### Ejemplo de configuración:
\`\`\`typescript
{
  id: "1",
  title: "Tu Canción",
  artist: "Artista",
  url: "https://www.dropbox.com/scl/fi/TU_ID/cancion.mp3?rlkey=TU_KEY&dl=1",
  meaning: "El significado especial de esta canción...",
  duration: "3:45",
  colors: {
    primary: "from-rose-400 to-pink-500",
    secondary: "from-rose-100 to-pink-200",
    accent: "rose-500",
    gradient: "from-rose-200/40 to-pink-200/40",
    shadow: "rose-300/50",
  },
}
\`\`\`

## 📸 Configuración de Fotos/Videos

Similar a la música:

1. Sube archivos a Dropbox
2. Obtén enlaces públicos (cambia `?dl=0` por `?raw=1`)
3. Actualiza los arrays en las páginas correspondientes

### Para fotos:
\`\`\`typescript
{
  id: "1",
  url: "https://www.dropbox.com/scl/fi/TU_ID/foto.jpg?rlkey=TU_KEY&raw=1",
  title: "Título de la foto",
  description: "Descripción...",
  date: "Fecha especial",
}
\`\`\`

### Para videos:
\`\`\`typescript
{
  id: "1",
  url: "https://www.dropbox.com/scl/fi/TU_ID/video.mp4?rlkey=TU_KEY&raw=1",
  title: "Título del video",
  description: "Descripción...",
  date: "Fecha especial",
}
\`\`\`

## 🎂 Configuración de Cumpleaños

Edita la fecha de nacimiento en `app/cumpleanos/page.tsx`:

\`\`\`typescript
const BIRTH_DATE = new Date("2004-01-15T00:00:00") // Cambia por la fecha correcta
\`\`\`

## 💌 Personalización de la Carta

Edita el contenido de la carta en `app/carta/page.tsx`:

\`\`\`typescript
const cartaContent = `Tu mensaje personalizado aquí...`
\`\`\`

## 🎨 Personalización de Colores

### Colores disponibles para canciones:
- **Rosa/Pink**: `from-rose-400 to-pink-500`
- **Púrpura/Violet**: `from-purple-400 to-violet-500`
- **Azul/Cyan**: `from-blue-400 to-cyan-500`
- **Verde/Teal**: `from-emerald-400 to-teal-500`
- **Ámbar/Orange**: `from-amber-400 to-orange-500`
- **Índigo**: `from-indigo-400 to-blue-500`
- **Rojo**: `from-red-400 to-rose-500`

### Editar colores globales:
Modifica `tailwind.config.js` para cambiar la paleta general.

## 🛠️ Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y animaciones
- **Lucide React** - Iconos hermosos
- **Dropbox** - Almacenamiento de archivos multimedia

## 📱 Características

- ✅ **Totalmente responsive** - Se ve perfecto en móvil y desktop
- ✅ **Reproductor de música avanzado** - Con colores dinámicos y controles profesionales
- ✅ **Galería de fotos interactiva** - Carrusel con navegación fluida
- ✅ **Reproductor de videos** - Soporte para múltiples formatos
- ✅ **Carta con sobre animado** - Animación de apertura realista
- ✅ **Contador de cumpleaños** - Con mensajes personalizados por edad
- ✅ **Animaciones fluidas** - Efectos visuales suaves y elegantes
- ✅ **Colores dinámicos** - Cada canción tiene su propia paleta
- ✅ **Elementos flotantes** - Corazones, mensajes y partículas animadas
- ✅ **Navegación intuitiva** - Menú responsive con iconos

## 🎵 Funciones del Reproductor de Música

- **Reproductor fijo** - No se mueve al hacer scroll
- **Colores dinámicos** - Cambia según la canción actual
- **Contador de tiempo** - Muestra tiempo transcurrido/restante
- **Barra de progreso interactiva** - Haz clic para saltar a cualquier parte
- **Control de volumen** - Slider personalizado
- **Significado de canciones** - Modal con el significado especial
- **Navegación por teclado** - Controles accesibles
- **Efecto vinilo** - Animación de disco giratorio

## 🚀 Comandos Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start           # Inicia el servidor de producción

# Calidad de código
npm run lint        # Ejecuta el linter para revisar el código
\`\`\`

## 🌐 Despliegue

### Vercel (Recomendado)
1. Sube tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Despliega automáticamente

### Netlify
1. Ejecuta `npm run build`
2. Sube la carpeta `.next` a Netlify

### Servidor propio
\`\`\`bash
npm run build
npm start
\`\`\`

## 📝 Notas Importantes

### Dropbox URLs
- **Para música**: Cambia `?dl=0` por `?dl=1`
- **Para fotos/videos**: Cambia `?dl=0` por `?raw=1`
- **Límite de tamaño**: 2GB por archivo (cuenta gratuita)

### Formatos soportados
- **Música**: MP3, WAV, M4A
- **Fotos**: JPG, PNG, GIF, WEBP
- **Videos**: MP4, MOV, AVI, MKV

### Rendimiento
- Optimiza las imágenes antes de subirlas
- Usa videos en resolución 1080p o menor
- Comprime archivos de audio para mejor carga

## 🆘 Solución de Problemas

### Error de CORS con Dropbox
Asegúrate de usar `?raw=1` para fotos/videos y `?dl=1` para música.

### Archivos no cargan
Verifica que los enlaces de Dropbox sean públicos y estén bien formateados.

### Problemas de audio
Algunos navegadores requieren interacción del usuario antes de reproducir audio.

### Estilos no se aplican
Ejecuta `npm run build` para regenerar los estilos de Tailwind.

## 🤝 Contribuir

Si encuentras algún error o quieres mejorar algo:

1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de modificarlo según tus necesidades.

---

**Hecho con ❤️ para preservar momentos especiales y crear recuerdos digitales hermosos.**

### 💝 Dedicatoria

*"Algunos adioses son para siempre, pero los recuerdos hermosos nunca se van."*

Este sitio web es un tributo a los momentos especiales que compartimos con las personas que amamos. Cada página, cada animación, cada detalle está diseñado para honrar esos recuerdos y mantenerlos vivos en nuestros corazones.

---

## 📞 Soporte

Si necesitas ayuda con la configuración o personalización, no dudes en crear un issue en el repositorio.

¡Disfruta creando tu sitio web de recuerdos! ✨
