const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chat = document.getElementById('chat');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  scrollToBottom();

  // Simulation de réponse IA
  addTyping();

  setTimeout(() => {
    removeTyping();
    addMessage("Voici une réponse simulée par l'IA.", 'ai');
    scrollToBottom();
  }, 1500);
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chat.appendChild(msg);
}

function addTyping() {
  const typing = document.createElement('div');
  typing.id = 'typing';
  typing.classList.add('message', 'ai', 'typing');
  typing.textContent = 'L’IA écrit...';
  chat.appendChild(typing);
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}


