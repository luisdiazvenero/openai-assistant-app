import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Message from '../components/Message';
import { gptConfig } from '../config/gpt-config';
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
      const response = await axios.post('/api/chat', { message });
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
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Head>
      <title>{gptConfig.name}</title>
      <meta name="description" content={gptConfig.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* Header con estilos responsivos */}
    <header className="bg-white shadow-sm">
      <div className="container mx-auto max-w-4xl px-4 py-3 sm:py-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-100">
            <Image
              src={gptConfig.imageUrl}
              alt={gptConfig.name}
              width={48}
              height={48}
              className="object-cover rounded-full"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{gptConfig.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 truncate">{gptConfig.description}</p>
          </div>
        </div>
      </div>
    </header>

    <main className="flex-grow container mx-auto max-w-4xl p-4">
      {messages.length === 0 && (
        <div className="mb-6">
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

      <div className="bg-white rounded-lg shadow-lg h-[60vh] sm:h-[60vh] flex flex-col">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
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

        <div className="border-t p-3 sm:p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-orange"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-custom-orange text-white rounded-lg hover:bg-custom-orange-dark focus:outline-none focus:ring-2 focus:ring-custom-orange disabled:opacity-50 transition-colors duration-200"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="py-4">
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