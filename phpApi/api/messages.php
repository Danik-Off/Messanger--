<?php
include_once "../core/MessageAPI.php";
// Обработка запроса
$api = new MessageAPI();
$requestMethod = $_SERVER['REQUEST_METHOD'];

switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $message = $api->getMessageById($id);
            if ($message) {
                header('Content-Type: application/json');
                echo json_encode($message);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Сообщение не найдено']);
            }
        } else {
            $messages = $api->getAllMessages();
            header('Content-Type: application/json');
            echo json_encode($messages,JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['text'])) {
            $newMessage = $api->createMessage($data['text']);
            header('Content-Type: application/json');
            echo json_encode($newMessage);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Отсутствует текст сообщения'],JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'PUT':
        // Реализация обновления сообщения по вашим требованиям
        break;

    case 'DELETE':
        // Реализация удаления сообщения по вашим требованиям
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
        break;
}
?>
