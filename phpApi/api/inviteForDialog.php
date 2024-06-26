<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Приглашение в диалог</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        button {
            padding: 20px 40px;
            font-size: 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            outline: none;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<button onclick="postData()">Присоединиться</button>

<script>
    async function postData() {
        // Получение userID через асинхронный запрос или каким-либо другим способом




        const url = 'http://new.lspu-lipetsk.ru/api/dialogs.php';
        const data = {
            title: 'Group Chat Title',
            users: [345358434],
            description: 'This is a description for the group chat.'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': document.cookie // Передача cookie
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка HTTP: ' + response.status);
            }

            const responseData = await response.json();
            console.log('Ответ сервера:', responseData);
            alert('Ответ сервера: ' + JSON.stringify(responseData));

            // Редирект на другую страницу после успешного выполнения
            window.location.href = '/msg'; // Замените на путь к вашей странице успеха
        } catch (error) {
            console.error('Ошибка при выполнении POST запроса:', error);
            alert('Ошибка при выполнении POST запроса: ' + error.message);
        }
    }
</script>

</body>
</html>
