import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 8080;
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
})

app.use(cors({ origin: 'http://localhost:3000' }));

const serveur = app.listen(port, () => {
    console.log(`Le serveur écoute sur ${port}`);
});

const io = new Server(serveur, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});