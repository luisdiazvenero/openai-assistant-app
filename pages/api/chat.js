// pages/api/chat.js
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificación de variables de entorno
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY no está configurada');
    return res.status(500).json({ error: 'OPENAI_API_KEY no está configurada' });
  }

  if (!process.env.ASSISTANT_ID) {
    console.error('ASSISTANT_ID no está configurada');
    return res.status(500).json({ error: 'ASSISTANT_ID no está configurada' });
  }

  // Verificación del mensaje
  if (!req.body.message) {
    return res.status(400).json({ error: 'El mensaje es requerido' });
  }

  try {
    console.log('Iniciando solicitud con OpenAI...');
    console.log('Assistant ID:', process.env.ASSISTANT_ID);
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    // Crear un nuevo thread
    console.log('Creando nuevo thread...');
    const thread = await openai.beta.threads.create();
    console.log('Thread creado:', thread.id);

    // Agregar mensaje al thread
    console.log('Agregando mensaje al thread...');
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: req.body.message
    });

    // Ejecutar el asistente
    console.log('Ejecutando el asistente...');
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID
    });
    console.log('Run creado:', run.id);

    // Esperar la respuesta
    console.log('Esperando respuesta...');
    let runStatus;
    let attempts = 0;
    const maxAttempts = 30; // 30 segundos máximo de espera

    do {
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log('Estado actual:', runStatus.status);
      
      if (runStatus.status === 'failed') {
        console.error('Run falló:', runStatus);
        throw new Error(`Run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
      }
      
      if (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }

      if (attempts >= maxAttempts) {
        throw new Error('Timeout esperando respuesta del asistente');
      }
    } while (runStatus.status !== 'completed');

    // Obtener mensajes
    console.log('Obteniendo mensajes...');
    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find(msg => msg.role === 'assistant');

    if (!assistantMessage) {
      throw new Error('No se recibió respuesta del asistente');
    }

    console.log('Respuesta recibida. Enviando al cliente...');
    res.status(200).json({ 
      message: assistantMessage.content[0].text.value,
      threadId: thread.id
    });

  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}