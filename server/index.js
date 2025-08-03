
// const io = require('socket.io')(3000)

// const users = {}

// io.on('connection', socket => {
//     socket.on('new-user', nickname => {
//         users[socket.id] = nickname
//         socket.broadcast.emit('user-connected', nickname)
//     })
//     socket.on('send-chat-message', note => {
//         socket.broadcast.emit('chat-message', { message: note, nickname: users[socket.id] })
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', users[socket.id])
//         delete users[socket.id]
//     })
// })

const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')));

const users = {};

io.on('connection', socket => {
    socket.on('new-user', nickname => {
        users[socket.id] = nickname
        socket.broadcast.emit('user-connected', nickname)
    })
    socket.on('send-chat-message', note => {
        socket.broadcast.emit('chat-message', { message: note, nickname: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});