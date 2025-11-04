export const socketHandler = (io) => {
    // const rooms = new Map();

    io.on("connection", (socket) => {
        console.log("Connected to ", socket.id);

        socket.on("join-room", ({roomId}) => {
            const room = io.sockets.adapter.rooms.get(roomId);

            if(!room) {
                socket.emit("error-message", {message: `Room ID: ${roomId} not found. Creating one.....`});
            }

            socket.join(roomId);
            console.log(`User ${socket.id} joined room `, roomId);

            socket.emit("joined-room", ({roomId}));
        });

        socket.on("create-room", ({roomId}) => {
            const room = io.sockets.adapter.rooms.get(roomId);

            if(room) {
                socket.emit("error-message", {message: `Room ID: ${roomId} already exists`});
                return;
            }
            
            socket.join(roomId);

            socket.emit("created-room", ({roomId}));
        });

        socket.on("draw", ({roomId, data}) => {
            socket.to(roomId).emit("draw", {roomId, data});
        });

        socket.on("disconnect", () => {
            console.log("User disconnected ", socket.id);
        });
    });
}