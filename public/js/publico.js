// Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');

const socket = io();

socket.on('actual-state', payload => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;

    if (ticket1) {
        lblTicket1.innerText = 'Ticket ' + ticket1.number;
        lblDesktop1.innerText = ticket1.desktop;
    }

    if (ticket2) {
        lblTicket2.innerText = 'Ticket ' + ticket2.number;
        lblDesktop2.innerText = ticket2.desktop;
    }

    if (ticket3) {
        lblTicket3.innerText = 'Ticket ' + ticket3.number;
        lblDesktop3.innerText = ticket3.desktop;
    }
    if (ticket4) {
        lblTicket4.innerText = 'Ticket ' + ticket4.number;
        lblDesktop4.innerText = ticket4.desktop;
    }

});
