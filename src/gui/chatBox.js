const createChatBox = () => {
    const chatBoxContainer = document.createElement('div');
    chatBoxContainer.id = 'chat-box';
    chatBoxContainer.style.position = 'absolute';
    chatBoxContainer.style.bottom = '0';
    chatBoxContainer.style.left = '0';
    chatBoxContainer.style.width = 'calc(100% - 225px)'; // Adjust based on your GUI width
    chatBoxContainer.style.height = '150px';
    chatBoxContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    chatBoxContainer.style.border = '2px solid #5D4E3C';
    chatBoxContainer.style.color = '#fff';
    chatBoxContainer.style.fontFamily = 'Arial, sans-serif';
    chatBoxContainer.style.fontSize = '14px';
    chatBoxContainer.style.padding = '10px';
    chatBoxContainer.style.overflowY = 'scroll';

      // Prevent click-through
  chatBoxContainer.addEventListener('mousedown', (event) => {
    event.stopPropagation();
  });

  
    const chatLog = document.createElement('div');
    chatLog.id = 'chat-log';
  
    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.placeholder = 'Type your message...';
    chatInput.style.width = 'calc(100% - 10px)';
    chatInput.style.marginTop = '10px';
    chatInput.style.padding = '5px';
    chatInput.style.backgroundColor = '#5D4E3C';
    chatInput.style.border = 'none';
    chatInput.style.color = '#fff';
  
    chatBoxContainer.appendChild(chatLog);
    chatBoxContainer.appendChild(chatInput);
  
    // Basic chat functionality
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = chatInput.value;
        if (message) {
          const messageElement = document.createElement('p');
          messageElement.textContent = message;
          chatLog.appendChild(messageElement);
          chatInput.value = '';
          chatLog.scrollTop = chatLog.scrollHeight;
        }
      }
    });
  
    return chatBoxContainer;
  };
  
  export { createChatBox };