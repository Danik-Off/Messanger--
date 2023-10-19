const axios = require('axios');

// Замените URL на адрес вашего сервера
const serverURL = 'http://45.9.40.44:3000/api/data';

// Данные, которые вы хотите отправить
const postData = {
  secret_key: 'data', // Замените на вашу секретную ключевую фразу
  data: { someData: 'exampleData' },
  user_id: '345358434', // Замените на ID пользователя
};

axios.post(serverURL, postData)
  .then((response) => {
    console.log('Сервер ответил:', response.data);
  })
  .catch((error) => {
    console.error('Произошла ошибка при выполнении POST-запроса:', error);
  });
