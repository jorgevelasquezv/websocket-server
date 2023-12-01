const socketController = socket => {

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
