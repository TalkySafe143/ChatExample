const socketIo = require('socket.io');
const socket = {};

const connect = server => {
    socket.io = socketIo(server, {
        cors: {
            origin: "null",
            methods: ["GET", "POST"],
        }
    })
}

module.exports = { connect, socket }