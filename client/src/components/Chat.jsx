import { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat(props) {
  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('/api/chat/' + props.event._id);
      const messagesData = await response.json();
      setMessages(messagesData);
    }
    fetchMessages();

    //const socket = io('ws://localhost:3000', { transports: ["websocket"] });
    const socket = io('ws://10.44.6.124:3000', { transports: ["websocket"] });
    socket.emit('connectToRoom', props.event._id);
    setSocket(socket);

    socket.on('chat', (message) => {
      setMessages(messages => {
        const updatedMessages = structuredClone(messages);
        updatedMessages.push(message);
        return updatedMessages
      });
    });

    return () => {
      socket.close();
    }
  }, []);

  function handleSendMessage(e) {
    if (e.key === 'Enter' && e.target.value !== '') {
      //e.target.disabled = 'true';
      //setTimeout(() => {e.target.disabled = ''}, 3000);
      socket.emit('chat', { senderid: localStorage.getItem('userId'), eventid: props.event._id, message: e.target.value, name: localStorage.getItem('name') });
      e.target.value = '';
    }
  }

  return (
    <div className="Chat">
      <div>
        {messages && messages.map((message, index) => (
          <p key={Date.now() + index.toString()} style={{ marginLeft: '1vw' }}>{message.name + ': '}<b>{message.message}</b></p>
        ))}
      </div>
      <input onKeyDown={handleSendMessage} />
    </div>
  )
}

export default Chat;
