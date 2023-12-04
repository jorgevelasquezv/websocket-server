// Referencias HTML
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnGenerateTicket = document.querySelector('#btnGenerateTicket');

const socket = io();

socket.on('connect', () => {
    btnGenerateTicket.disabled = false;

});

socket.on('disconnect', () => {
    btnGenerateTicket.disabled = true;
});

socket.on('message-from-server', data => {
    console.log(data);
});

socket.on('last-ticket', last => {
    lblNewTicket.innerText = 'Ticket ' + last;
});

btnGenerateTicket.addEventListener('click', () => {
    socket.emit('next-ticket', null, ticket => {
        lblNewTicket.innerText = ticket;
    });
});