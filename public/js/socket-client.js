// Referencias HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const textMessage = document.querySelector('#textMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

btnSend.addEventListener('click', () => {
    const message = textMessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime(),
    };

    socket.emit('message-to-server', payload, id => {
        console.log('Desde el server', id);
    });
});

socket.on('message-from-server', data => {
    console.log(data);
});
