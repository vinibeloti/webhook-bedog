
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const WASCRIPT_TOKEN = process.env.WASCRIPT_TOKEN;

async function responderWhatsApp(mensagem, numero) {
  const resposta = await gerarRespostaOpenAI(mensagem);
  
  await axios.post('https://api-whatsapp.wascript.com.br/sendMessage', {
    token: WASCRIPT_TOKEN,
    numero,
    mensagem: resposta
  });
}

async function gerarRespostaOpenAI(mensagem) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: mensagem }]
  }, {
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
  });

  return response.data.choices[0].message.content;
}

// Simulação de execução
const numero = '+55xxxxxxxxxxx';
const mensagem = 'Como posso adestrar meu cachorro?';

responderWhatsApp(mensagem, numero).then(() => {
  console.log('Resposta enviada!');
}).catch(console.error);
