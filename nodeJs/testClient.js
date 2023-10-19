const WebSocket = require('ws');
const socketToken = 'yourSecretToken'; // Замените на свой токен

const socket = new WebSocket(`ws://localhost:3000/${socketToken}`);

socket.onmessage = event => {
  console.log(`Received from WebSocket: ${event.data}`);
};

socket.onopen = () => {
  console.log('WebSocket connection opened');
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};
