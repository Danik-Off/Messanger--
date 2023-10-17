<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
header("Content-Type: application/json");
define("SPAIZ_CODE", true);

include_once "core/MessageAPI.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/tokenParse.php";
// Обработка запроса

$userID = ParseToken("");

$userID = $userID["id"];

$api = new MessageAPI();
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
  case "GET":
    if (isset($_GET["id"])) {
      $id = intval($_GET["id"]);
      $message = $api->getMessageById($id);
      if ($message) {
        echo json_encode($message);
      } else {
        http_response_code(404);
        echo json_encode(["error" => "Сообщение не найдено"]);
      }
    } else {
      $messages = $api->getAllMessages($_GET["peer_id"], $userID);

      echo json_encode($messages, JSON_UNESCAPED_UNICODE);
    }
    break;

  case "POST":
    if (isset($_POST["text"])) {
      $newMessage = $api->createMessage(
        $_REQUEST["peer_id"],
        $userID,
        $_POST["text"]
      );

      echo json_encode($newMessage);
    } else {
      http_response_code(400);
      echo json_encode(
        ["error" => "Отсутствует текст сообщения"],
        JSON_UNESCAPED_UNICODE
      );
    }
    break;

  case "PUT":
    // Реализация обновления сообщения по вашим требованиям
    break;

  case "DELETE":
    // Реализация удаления сообщения по вашим требованиям
    break;

  default:
    http_response_code(405);
    echo json_encode(
      ["error" => "Метод не поддерживается"],
      JSON_UNESCAPED_UNICODE
    );
    break;
}
?>
