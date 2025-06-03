
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY não configurada');
    }

    console.log('Enviando mensagem para OpenAI:', message);

    // Construir o histórico de mensagens para contexto
    const messages = [
      {
        role: 'system',
        content: `Você é o StudyFlow AI, um assistente de estudos inteligente e especializado em educação. Sua missão é:

1. Ajudar estudantes a aprender de forma eficaz e didática
2. Explicar conceitos complexos de maneira simples e clara
3. Fornecer exemplos práticos e analogias úteis
4. Incentivar o pensamento crítico e a curiosidade
5. Adaptar suas explicações ao nível do estudante

Características do seu comportamento:
- Seja sempre didático e paciente
- Use exemplos do dia a dia quando possível
- Divida explicações complexas em etapas simples
- Faça perguntas para verificar o entendimento
- Seja encorajador e motivador
- Use emojis ocasionalmente para tornar a conversa mais agradável
- Responda sempre em português brasileiro

Você tem conhecimento em todas as áreas acadêmicas e pode ajudar com:
- Matemática, Física, Química, Biologia
- História, Geografia, Literatura
- Idiomas, Filosofia, Sociologia
- Programação, Tecnologia
- Métodos de estudo e organização
- Preparação para vestibulares e concursos

Sempre termine suas respostas perguntando se o estudante tem dúvidas ou se gostaria de explorar algum aspecto específico do tema.`
      },
      // Adicionar histórico de conversas anteriores
      ...history,
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta recebida da OpenAI');

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na função ai-chat:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
