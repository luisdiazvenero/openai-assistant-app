// config/gpt-config.js
export const gptConfig = {
    name: "Chatbot Palmera",
    description: "Tu asistente para Protección Solar y Prevención de Dengue para Empresas - Ley 30102.",
    imageUrl: "/bot-image.png", // Asegúrate de agregar esta imagen en la carpeta public
    quickPrompts: [
      {
        title: "☀️ Precio del Bloqueador",
        prompt: "¿Cuánto cuesta el Bloqueador de 110ml?"
      },
      {
        title: "🦟 Precio del Repelente",
        prompt: "Cuánto cuesta el Repelente de 120ml?"
      },
      {
        title: "⚖️ Cómo cumplir Ley 30102",
        prompt: "Ley 30102 para empresas y trabajadores"
      },
      {
        title: "📦 Comprar al por mayor",
        prompt: "¿Cómo hacer compras al por mayor?"
      }
    ]
  };

  export const seoConfig = {
    title: "Chatbot Palmera -  Protección Polar y Prevención de Dengue de Palmera",
    description: "Tu asistente para Protección Polar y Prevención de Dengue para Empresas, cumpliendo con la Ley 30102.",
    url: "https://chatbot.palmera.pe",
    imageUrl: "https://chatbot.palmera.pe/favicon-192x192.png",
    author: "@ramirezcorzo",
    keywords: "Palmera, bloqueador solar, repelente, Ley 30102, asistente virtual, AI, chatbot, inteligencia artificial, OpenAI"
  };