import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); // url et port idem

function Chat() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessage = (msg) => {
        setMessages((messages) => [...messages, msg]); // corrige la gestion des messages
    };

    useEffect(() => {
        socket.on('chat message', handleMessage); // écoute de l'événement

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => {
            socket.off('chat message', handleMessage);
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message && name) {
            const msg = { name, message };
            socket.emit('chat message', msg);  // envoie du message au serveur
            setMessage('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Envoyer</button>

            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.name}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;