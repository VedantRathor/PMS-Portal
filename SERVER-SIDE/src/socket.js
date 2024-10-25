const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

module.exports = {
    init: (server) => {
        io = socketIO(server, {
            cors: {
                origin: 'http://localhost:5173', // Change this based on your frontend URL
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            }
        });

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // Listening for 'chat-message' from any client
            socket.on('chat-message',(data)=>{
                console.log('listened from io io ', data);
                // socket.emit('chat-message',data);
                data.projectMembers.map((user)=>{
                    socket.broadcast.emit(`receive-chat-message/${user.user_id}`,data.message);
                });
                //perform entry in db:
            })

            socket.on('disconnect', () => {
                console.log('A user disconnected:', socket.id);
            });
        });

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};
