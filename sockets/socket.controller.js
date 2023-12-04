const TicketControl = require("../models/ticket-contol");

const ticketControl = new TicketControl;

const socketController = socket => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-state', ticketControl.lastFour);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    });

    socket.on('attend-ticket', ({desktop}, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.attendTicket(desktop);

        socket.broadcast.emit('actual-state', ticketControl.lastFour);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket,
                pendingTickets: ticketControl.tickets.length
            });
        }
    });
};

module.exports = {
    socketController,
};
