import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Message from '../components/Message';
import { gptConfig, seoConfig } from '../config/gpt-config';
import Image from 'next/image';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input.trim());
  };

  const sendMessage = async (message) => {
    setInput('');
    setError(null);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      const response = await axios.post('/api/chat', { message }, {
        timeout: 60000 // 60 segundos
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (err) {
      console.error('Error detallado:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      const errorMessage = err.response?.data?.details || 
                          err.response?.data?.error || 
                          err.message || 
                          'Error desconocido';
      
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh]">
    <Head>
      <title>{seoConfig.title}</title>
      <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
      {/* Favicon básico */}
      <link rel="icon" href="/favicon-palmerabot.ico" />
      
      {/* Favicons para diferentes dispositivos/plataformas */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#e15200" />

      {/* Meta tags para SEO */}
      <meta name="robots" content="index, follow" />
        <meta name="author" content={seoConfig.author} />
        <meta name="language" content="Spanish" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.url} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.imageUrl} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoConfig.url} />
        <meta property="twitter:title" content={seoConfig.title} />
        <meta property="twitter:description" content={seoConfig.description} />
        <meta property="twitter:image" content={seoConfig.imageUrl} />
        
        {/* Meta tags adicionales */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#e15200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoConfig.url} />
    </Head>

    {/* Header */}
    <header className="bg-white shadow-sm">
        <div className="container mx-auto max-w-4xl px-4 py-3 sm:py-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
          
          <div className="relative w-12 h-12 flex-shrink-0">
            
            <div className="relative w-full h-full  overflow-hidden border-2 border-white">
              <Image
                src={gptConfig.imageUrl}
                alt={gptConfig.name}
                width={48}
                height={48}
                className="object-cover "
                priority
              />
            </div>
          </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{gptConfig.name}</h1>
              <p className="text-sm sm:text-base text-gray-600 truncate">{gptConfig.description}</p>
            </div>
          </div>
        </div>
      </header>

    {/* Main */}
    <main className="flex-1 container mx-auto max-w-4xl p-2 sm:p-4 overflow-hidden flex flex-col">
        {/* Sugerencias iniciales - solo se muestran si no hay mensajes */}
        {messages.length === 0 && (
          <div className="mb-2 sm:mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 hidden sm:block">Sugerencias de preguntas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {gptConfig.quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(prompt.prompt)}
                  className="text-left p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-custom-orange transition-all duration-200"
                >
                  <div className="font-medium text-gray-900">{prompt.title}</div>
                  <div className="text-sm text-gray-500">{prompt.prompt}</div>
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Chat box */}
      <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col min-h-0">
          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
            {messages.map((msg, idx) => (
              <Message key={idx} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

        {/* Área de entrada con sugerencias rápidas */}
          <div>
            {/* Sugerencias rápidas - se muestran cuando hay mensajes */}
            {messages.length > 0 && (
              <div className="px-2 pt-4 pb-0 flex space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {gptConfig.quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(prompt.prompt)}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-sm font-medium text-gray-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-custom-orange transition-all duration-200"
                  >
                    {prompt.title}
                  </button>
                ))}
              </div>
            )}
            
            {/* Formulario de entrada */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-2 sm:p-4 max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-grow p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 placeholder-gray-500 border border-transparent hover:border-gray-300 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 bg-custom-orange text-white rounded-lg hover:bg-custom-orange-dark focus:outline-none focus:ring-2 focus:ring-custom-orange disabled:opacity-50 transition-colors duration-200 flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
          </div>
          
        </div>
      </main>

    {/* Footer */}
    <footer className="py-2 sm:py-4 bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center text-sm text-gray-600">
          Desarrollado por{' '}
          <a 
            href="http://ramirezcorzo.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-orange hover:text-custom-orange-dark font-medium transition-colors duration-200"
          >
            @ramirezcorzo
          </a>
        </div>
      </div>
    </footer>
  </div>
  );
}