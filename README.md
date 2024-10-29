# PalmeraBot - Asistente Virtual de Protección Laboral

## 🌞 Descripción
PalmeraBot es un asistente virtual especializado en asesorar a empresas sobre la protección solar y control de mosquitos para empleados que trabajan al aire libre. Desarrollado con Next.js y la API de OpenAI Assistants, ayuda a las organizaciones a cumplir con la Ley 30102 mientras optimiza la selección de productos Palmera según sus necesidades específicas.

## 🎯 Objetivos Principales
- Asesorar sobre protección solar y repelentes según cantidad de trabajadores
- Recomendar productos basados en condiciones climáticas y riesgos locales
- Facilitar el cumplimiento de la Ley 30102
- Promover soluciones Palmera disponibles en [palmera.pe](https://palmera.pe)

## 🚀 Características
- Interfaz de chat intuitiva y responsiva
- Respuestas personalizadas basadas en el contexto
- Sugerencias de preguntas frecuentes
- Soporte para markdown en respuestas
- Diseño optimizado para móviles y escritorio
- SEO optimizado para mejor visibilidad

## 🛠 Tecnologías
- **Frontend:** Next.js 14, React 18
- **Estilos:** TailwindCSS, Typography Plugin
- **API:** OpenAI Assistants API
- **Markdown:** React-Markdown con plugins GFM
- **HTTP Client:** Axios
- **Fuente:** Outfit (Google Fonts)

## 📋 Requisitos Previos
- Node.js 18.x o superior
- NPM o Yarn
- Cuenta en OpenAI con acceso a Assistants API

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd palmerabot
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
Crear archivo `.env.local`:
```env
OPENAI_API_KEY=tu-api-key
ASSISTANT_ID=tu-assistant-id
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## 🌐 Estructura del Proyecto
```
palmerabot/
├── config/
│   ├── gpt-config.js     # Configuración del asistente y SEO
│   └── theme.js          # Configuración de tema y estilos
├── components/
│   └── Message.js        # Componente de mensajes
├── pages/
│   ├── _app.js          # Configuración global
│   ├── _document.js     # Document personalizado
│   ├── api/
│   │   └── chat.js      # Endpoint para OpenAI
│   └── index.js         # Página principal
└── styles/
    └── globals.css      # Estilos globales
```

## 🎨 Personalización
### Tema
Modifica `config/theme.js` para cambiar:
- Colores principales
- Tipografía
- Pesos de fuente

### Contenido
Ajusta `config/gpt-config.js` para:
- Nombre del bot
- Descripción
- Sugerencias de preguntas
- Meta tags

## 📱 Responsive Design
- Mobile First
- Breakpoints principales:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🔍 SEO
- Meta tags optimizados
- Open Graph
- Twitter Cards
- Canonical URLs
- Sitemap automático

## 📈 Monitoreo y Analytics
- Logs detallados de interacciones
- Tracking de errores
- Métricas de uso

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

## 👥 Créditos
Desarrollado por [@ramirezcorzo](http://ramirezcorzo.pe/)

## 🆘 Soporte
Para soporte o consultas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## 🔄 Actualizaciones
Ver [CHANGELOG.md](./CHANGELOG.md) para detalles de cambios en cada versión.
