const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require("http").createServer(app);

const { addUser } = require('./action.js');

const { removeUser } = require('./action.js');
const { getUsersInRoom } = require('./action.js');

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.PORT || 2000;

const userss = {};


// app.use(express.static('./Frontend/build'));


io.on("connection", socket => {
    socket.on('joined', userr => {
        userss[socket.id] = userr;
        socket.broadcast.emit('userJoined', userr);
        io.emit('user-list', userss);
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { userr: userss[id], message, id });
    });
    socket.on('typing', names => {
        socket.broadcast.emit('typing', names);
    });
    socket.on('canceltyping', names => {
        socket.broadcast.emit('canceltyping', names);
    });




    // For Users in Room
    const { room, name } = socket.handshake.query;
    const { user } = addUser({ id: socket.id, name: name, room: room });
    if (room) {
        socket.join(user.room);

        io.in(user.room).emit('allUsersData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

    }
    socket.on("send message", (data) => {
        io.in(user.room).emit("send message", data);
    });
    socket.on("start typing message", (data) => {
        io.in(user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", (data) => {
        io.in(user.room).emit("stop typing message", data);
    });
    socket.on("disconnect", () => {
        if (room) {
            removeUser(socket.id);
            io.in(user.room).emit("user leave chat", user.name);
            socket.leave(user.room);
        }
        socket.broadcast.emit('leave', userss[socket.id]);
        delete userss[socket.id];
        io.emit('user-list', userss)
    });

});


server.listen(port, () => {
    console.log(port)
});