const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chat = document.getElementById('chat');

// ⚠️ Clé API à stocker côté serveur (jamais dans le front-end !)
const OPENAI_API_KEY = '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'; // <- Remplace ici **temporairement** en dev (jamais en prod)

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  scrollToBottom();

  addTyping();

  try {
    const aiResponse = await getAIResponse(message);
    removeTyping();

    if (!aiResponse) {
      addMessage("L'IA n'a pas pu générer de réponse.", 'ai');
    } else {
      addMessage(aiResponse, 'ai');
    }

    scrollToBottom();
  } catch (err) {
    removeTyping();
    addMessage("Erreur lors de la réponse de l’IA.", 'ai');
    console.error(err);
  }
});

async function getAIResponse(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  const data = await response.json();

  return data?.choices?.[0]?.message?.content?.trim() || null;
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.innerText = text; // Prévention XSS
  chat.appendChild(msg);
}

function addTyping() {
  const typing = document.createElement('div');
  typing.id = 'typing';
  typing.classList.add('message', 'ai', 'typing');
  typing.innerText = 'L’IA écrit...';
  chat.appendChild(typing);
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}
