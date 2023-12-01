const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/socket.controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        //Middlewares
        this.middleware();

        //Rutas de mi aplicación
        this.routes();

        // Configuraciones de sockets
        this.sockets();
    }

    middleware() {
        // Cors
        this.app.use(cors());

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        //        this.app.use(this.paths.users, require('../routes/user.routes'));
    }

    sockets() {
        this.io.on('connection', socketController);
    } 

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
