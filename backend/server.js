import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chatting-app-frontend-of7f.onrender.com",
        methods: ["GET", "POST"]
    }
});

const ROOM = 'group';

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async (userName) => {
        console.log(`${userName} joined the group`);
        await socket.join(ROOM);
        socket.to(ROOM).emit('roomNotice', userName);
    });

    socket.on('chatMessage', (msg) => {
        socket.to(ROOM).emit('chatMessage', msg);
    });

    socket.on('typing', (userName) => {
        socket.to(ROOM).emit('typing', userName);
    });

    socket.on('stopTyping', (userName) => {
        socket.to(ROOM).emit('stopTyping', userName);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Socket.IO Chat Backend Running</h1>');
});

const PORT = process.env.PORT || 1000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});