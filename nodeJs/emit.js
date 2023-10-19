const axios = require('axios');

axios.post('http://localhost:3000/api/data', { message: 'Hello, WebSocket!' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });