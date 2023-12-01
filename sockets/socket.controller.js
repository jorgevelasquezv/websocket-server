const socketController = socket => {
    console.log('Cliente conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('message-to-server', (data, callback) => {
        const id = 123456;
        console.log(data);
        callback(id);

        socket.broadcast.emit('message-from-server', data);
    });
};

module.exports = {
    socketController,
};
