<?php
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=utf-8");
define("SPAIZ_CODE", true);

include_once "objects/dialog.php";
include_once "core/DialogAPI.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/tokenParse.php";

$userID = ParseToken("");
$userID = $userID["id"];

$user = new User();
$user->Get($userID);

$db = new DataBase();

$api = new DialogAPI();
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
  case "GET":
    if (isset($_GET["peer_id"])) {
      $id = intval($_GET["peer_id"]);
      $dialog = $api->getDialogById($id, $userID);
      if ($dialog) {
        header("Content-Type: application/json");
        echo json_encode($dialog, JSON_UNESCAPED_UNICODE);
      } else {
        http_response_code(404);
        echo json_encode(
          ["error" => "Диалог не найден"],
          JSON_UNESCAPED_UNICODE
        );
      }
    } else {
      $dialogs = $api->getAllDialogs($userID);
      header("Content-Type: application/json");
      echo json_encode($dialogs, JSON_UNESCAPED_UNICODE);
    }
    break;

  case "POST":
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["title"])) {
      $newDialog = $api->createDialog($data["title"]);
      header("Content-Type: application/json");
      echo json_encode($newDialog);
    } else {
      http_response_code(400);
      echo json_encode(["error" => "Отсутствует заголовок диалога"]);
    }
    break;
  case "PATCH":
    break;
  case "DELETE":
    break;

  default:
    http_response_code(405);
    echo json_encode(["error" => "Метод не поддерживается"]);
    break;
}
?>

