export const socketHandler = (io) => {
    // const rooms = new Map();
    const rooms = {};

    io.on("connection", (socket) => {
        console.log("Connected to ", socket.id);

        socket.on("join-room", ({roomId, name}) => {
            console.log(`🟢 JOIN EVENT: room=${roomId}, name=${name}, socket=${socket.id}`);
            const room = io.sockets.adapter.rooms.get(roomId);

            if(!rooms[roomId]) {
                rooms[roomId] = [];
            }

            const existing = rooms[roomId].find((u) => u.socketId === socket.id);

            if(existing) {
                if(!existing.name && name) {
                    existing.name = name;
                }
            } else {      //Check for ducplicates
                rooms[roomId].push({socketId: socket.id, name: name});
            }

            if(!room) {
                socket.emit("error-message", {message: `Room ID: ${roomId} not found.`});
                return;
            }

            socket.join(roomId);
            console.log(`User ${socket.id} joined room `, roomId);

            io.to(roomId).emit("joined-room", {
                roomId,
                people: rooms[roomId],
            });
        });

        socket.on("create-room", ({roomId}) => {
            const room = io.sockets.adapter.rooms.get(roomId);

            if(room) {
                socket.emit("error-message", {message: `Room ID: ${roomId} already exists`});
                return;
            }
            
            socket.join(roomId);

            rooms[roomId] = [];

            socket.emit("created-room", ({roomId}));
        });

        socket.on("send-message", ({roomId, sender, message, timestamp}) => {
            console.log(`📨 Message received on backend: Room: ${roomId}, From: ${sender}, Msg: ${message}`);
            io.to(roomId).emit("receive-message", {sender, message, timestamp});
        })

        socket.on("draw", ({roomId, data}) => {
            socket.to(roomId).emit("draw", {roomId, data});
        });

        socket.on("leave-room", ({roomId}) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left the room ${roomId}`);
        })

        socket.on("disconnect", () => {
            console.log("User disconnected ", socket.id);

            for(const roomId in rooms) {
                const oldLen = rooms[roomId].length;
                rooms[roomId] = rooms[roomId].filter((u) => u.socketId !== socket.id);

                if(rooms[roomId].length !== oldLen) {
                    io.to(roomId).emit("joined-room", {
                        roomId,
                        people: rooms[roomId],
                    })
                }

                if(rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
            }
        });
    });
}