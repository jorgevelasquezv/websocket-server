// Referencias HTML
const lblTitleOne = document.querySelector('#lblTitleOne');
const lblAttendingTicket = document.querySelector('#lblAttendingTicket');
const btnAttendTicket = document.querySelector('#btnAttendTicket');
const divAlertTicket = document.querySelector('#divAlertTicket');
const lblPendingTickets = document.querySelector('#lblPendingTickets');

const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const desktop = searchParams.get('escritorio');
lblTitleOne.innerText = desktop;

divAlertTicket.style.display = 'none';

socket.on('connect', () => {
    btnAttendTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAttendTicket.disabled = true;
});

socket.on('message-from-server', data => {
    console.log(data);
});

socket.on('last-ticket', last => {
    // lblTitleOne.innerText = 'Ticket ' + last;
});

socket.on('pending-tickets', pendingTickets => {
    if (pendingTickets === 0) {
        lblPendingTickets.style.display = 'none';
    } else {
        lblPendingTickets.style.display = '';
        lblPendingTickets.innerText = pendingTickets;
    }
});

btnAttendTicket.addEventListener('click', () => {
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblAttendingTicket.innerText = 'Nadie. ';
            divAlertTicket.style.display = '';
            return;
        }
        lblAttendingTicket.innerText = 'Ticket ' + ticket.number;
    });
});
