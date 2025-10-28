export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected to ", socket.id);

        socket.on("draw", (data) => {
            socket.broadcast.emit("draw", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected ", socket.id);
        });
    });
}