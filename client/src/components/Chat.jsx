import { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('/api/chat/' + props.event._id);
      const messagesData = await response.json();
      setMessages(messagesData);
    }
    fetchMessages();
  }, []);

  const socket = io('ws://localhost:3000', { transports: ["websocket"] });
  socket.emit('connectToRoom', props.event._id);

  socket.on('chat', (message) => {
    const updatedMessages = structuredClone(messages);
    updatedMessages.push(message);
    setMessages(updatedMessages);
  });

  function handleSendMessage(e) {
    if (e.key === 'Enter' && e.target.value !== '') {
      socket.emit('chat', {senderid: localStorage.getItem('userId'), eventid: props.event._id, message: e.target.value});
      e.target.value = '';
    }
  }

  return (
    <div className="Chat">
      <div>
        {messages && messages.map((message) => (
          <p key={message.senderid + message.eventid}>{message.message}</p>
        ))}
      </div>
      <input onKeyDown={handleSendMessage} />
    </div>
  )
}

export default Chat;
