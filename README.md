# OpenAI Assistant Chat Interface

## 🌞 Descripción
Un chatbot web moderno y receptivo construido con Next.js que se integra con la API de OpenAI Assistants. Este proyecto proporciona una interfaz de usuario pulida y profesional para interactuar con cualquier asistente personalizado de OpenAI, similar a la interfaz web oficial de OpenAI.

## 🎯 Características Principales
- Interfaz de chat moderna y responsive
- Integración completa con OpenAI Assistants API
- Personalización completa del asistente
- Soporte para markdown en respuestas
- Sistema de sugerencias de preguntas inicial
- SEO optimizado y meta tags configurables
- Soporte para compartir en redes sociales

## 🚀 Características Técnicas
- Diseño responsive optimizado para móvil y escritorio
- Indicador de escritura animado
- Soporte completo para markdown en respuestas
- Scroll automático a nuevos mensajes
- Manejo de errores y estados de carga
- Personalización completa de estilos y tema
- Sistema de componentes modular

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
cd openai-assistant-chat
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
proyecto/
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

### Asistente
Ajusta `config/gpt-config.js` para:
- Nombre del asistente
- Descripción
- Avatar
- Sugerencias de preguntas
- Meta tags y SEO

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

## 📈 Características de Desarrollo
- Hot Reloading
- Manejo de errores detallado
- Logging de interacciones
- Optimización de rendimiento
- TypeScript ready

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
Desarrollado por [@luisdiazvenero](mailto:luisdiazvenero@gmail.com)

## 🆘 Soporte
Para soporte o consultas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## 🔄 Actualizaciones
Ver [CHANGELOG.md](./CHANGELOG.md) para detalles de cambios en cada versión.
