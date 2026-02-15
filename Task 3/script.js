const chatService = 'wss://echo-ws-service.herokuapp.com';

const input = document.querySelector('.header__input input');
const btnMessage = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.messages_user');
const serverMessages = document.querySelector('.messages_server');
const containerMessage = document.querySelector('.chat__container_message');

function writeToScreen(message) {
    userMessages.innerHTML += `<p class='messages' style"'align-self: flex-end'>${message}</p>`;
}

let websocket = new WebSocket(chatService);

websocket.onopen = function (event) {
    writeToScreen(`<span style='color: forestgreen'>CONNECTED</span>`);
};

websocket.onmessage = function (event) {
    writeToScreen(`Ответ сервера: ${event.data}`, 'flex-start');
};

websocket.onerror = function (event) {
    writeToScreen(`server: ${event.data}`, 'flex-start');
}

btnMessage.addEventListener('click', () => {
    const message = input.value;
    websocket.send(message);
    writeToScreen(`Вы: ${message}`);
    input.value = '';
});

websocket.onclose = function () {
    writeToScreen(`<span style='color: red'>DISCONNECTED</span>`);
    websocket = null;
};

const error = () => {
    const textError = 'Невозможно определить ваше местоположение';
    writeToScreen(textError);
};

const successGeo = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToScreen(`<a href='${geoLink}' target='_blank'>Ваша геолокация</a>`);
};

btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(successGeo, error);
    }
});

serverMessages.addEventListener('click', () => {
    userMessages.innerHTML = '';
});