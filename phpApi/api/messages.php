<?php
header('Content-Type: application/json; charset=utf-8');

include_once "objects/msg.php";

class MessageAPI {
    private $messages = [];

    public function __construct() {
        
        $this->messages[] = new Msg(
            1,          // id
            1,                // peer_id
            'Текст сообщения',        // text
            0,            // from
            ['прикрепление1', 'прикрепление2'], // attachments (массив прикрепленных файлов)
            '2023-10-10 10:00:00',     // createdAt
            '2023-10-10 10:30:00',     // updatedAt
            true                       // isRead (флаг прочтения сообщения)
        );
       
    }

    public function getAllMessages() {
        return $this->messages;
    }

    public function getMessageById($id) {
        foreach ($this->messages as $message) {
            if ($message['id'] == $id) {
                return $message;
            }
        }
        return null;
    }

    public function createMessage($text) {
        $newMessage = ['id' => count($this->messages) + 1, 'text' => $text];
        $this->messages[] = $newMessage;
        return $newMessage;
    }

    public function updateMessage($id, $text) {
        foreach ($this->messages as &$message) {
            if ($message['id'] == $id) {
                $message['text'] = $text;
                return $message;
            }
        }
        return null;
    }

    public function deleteMessage($id) {
        foreach ($this->messages as $key => $message) {
            if ($message['id'] == $id) {
                unset($this->messages[$key]);
                return true;
            }
        }
        return false;
    }
}

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
