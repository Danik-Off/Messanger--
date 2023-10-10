<?php

include_once "objects/dialog.php";

class DialogAPI {
    private $dialogs = [];

    public function __construct() {
     
        $this->dialogs[] = new Dialog(
            1,                    // id
            true,                 // isGroupChat
            'Название диалога',   // title
            [0,1, 40], // participants (это массив и может содержать имена участников)
            '2023-10-10 10:00:00', // createdAt
            '2023-10-10 10:30:00', // updatedAt
            'access',              // accessControl
            [1], // adminUsers
            'Описание диалога'     // description
        );
        $this->dialogs[] = new Dialog(
            2,                    // id
            false,                 // isGroupChat
            'Kbxy',   // title
            [0, 40], // participants (это массив и может содержать имена участников)
            '2023-10-10 10:00:00', // createdAt
            '2023-10-10 10:30:00', // updatedAt
            'access',              // accessControl
            [], // adminUsers
            'Описание'     // description
        );
    
        
    }

    public function getAllDialogs() {
        return $this->dialogs;
    }

    public function getDialogById($peer_id) {
        foreach ($this->dialogs as $dialog) {
            if ($dialog->peer_id == $peer_id) {
                return $dialog;
            }
        }
        return null;
    }

    public function createDialog($title) {
        $newDialog = new Dialog(
            count($this->dialogs) + 1,
            true, // Пример значения для isGroupChat (можете изменить по своему усмотрению)
            $title,
            [], // Пример значения для participants (можете изменить по своему усмотрению)
            date('Y-m-d H:i:s'), // Пример значения для createdAt
            date('Y-m-d H:i:s'), // Пример значения для updatedAt
            'access', // Пример значения для accessControl (можете изменить по своему усмотрению)
            [], // Пример значения для adminUsers (можете изменить по своему усмотрению)
            '' // Пример значения для description (можете изменить по своему усмотрению)
        );
        $this->dialogs[] = $newDialog;
        return $newDialog;
    }

    public function getDialogMessages($dialogId) {
        $dialog = $this->getDialogById($dialogId);
        if ($dialog) {
            return $dialog['messages'];
        }
        return null;
    }

    public function addMessageToDialog($dialogId, $text) {
        $dialog = $this->getDialogById($dialogId);
        if ($dialog) {
            $newMessage = ['id' => count($dialog['messages']) + 1, 'text' => $text];
            $dialog['messages'][] = $newMessage;
            return $newMessage;
        }
        return null;
    }
}

// Обработка запроса
$api = new DialogAPI();
$requestMethod = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json; charset=utf-8');

switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['peer_id'])) {
            $id = intval($_GET['peer_id']);
            $dialog = $api->getDialogById($id);
            if ($dialog) {
                header('Content-Type: application/json');
                echo json_encode($dialog);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Диалог не найден']);
            }
        } else {
            $dialogs = $api->getAllDialogs();
            header('Content-Type: application/json');
            echo json_encode($dialogs);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['title'])) {
            $newDialog = $api->createDialog($data['title']);
            header('Content-Type: application/json');
            echo json_encode($newDialog);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Отсутствует заголовок диалога']);
        }
        break;
        case "PATCH":
            break;
    case "DELETE":
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Метод не поддерживается']);
        break;
}
?>

