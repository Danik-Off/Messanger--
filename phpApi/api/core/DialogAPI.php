<?php
header("Content-Type: application/json; charset=utf-8");

include_once "objects/dialog.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/configs/user.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/DataBase.php";

$user = new User();

class DialogAPI
{
  private $dialogs = [];
  private $db;
  public function __construct()
  {
    $this->db = new DataBase();
  }

  public function getAllDialogs($user_id)
  {
    $sql =
      "SELECT `user_dialog`.peer_id, `dialogs`.title, `dialogs`.`description`, dialogs.adminUsers,dialogs.creator,dialogs.isGroupChat
          FROM `user_dialog` LEFT JOIN `dialogs`
          ON `user_dialog`.`dialog_id`= `dialogs`.`id`
          WHERE `user_dialog`.`user_id` = " . $user_id;

    $result = $this->db->queryWithoutFetch($sql);

    $this->dialogs = [];

    if ($result) {
      foreach ($result as $row) {
        $dialog = new Dialog(
          $row["peer_id"],
          $row["isGroupChat"],
          $row["title"],
          [], // Нужно добавить участников, это можно получить из другого запроса
          "", // Нужно получить из базы данных
          "", // Нужно получить из базы данных
          "access", // Нужно получить из базы данных
          json_decode($row["adminUsers"]), // Преобразуем строку в массив администраторов
          $row["description"] == 0 ? "" : $row["description"]
        );

        $this->dialogs[] = $dialog;
      }
    }

    return $this->dialogs;
  }

  public function getDialogById($peer_id,$user_id)
  {
    $sql =
      "SELECT *
      FROM `dialogs` 
      LEFT JOIN `user_dialog`
      ON `user_dialog`.`dialog_id`= `dialogs`.`id`
      WHERE `dialogs`.`id`= " . $peer_id." AND `user_dialog`.`user_id` = " . $user_id;

    $result = $this->db->queryWithoutFetch($sql);

    $this->dialogs = [];

    if ($result) {
      $row = $result->fetch_array();
      $dialog = new Dialog(
        $peer_id,
        $row["isGroupChat"],
        $row["title"],
        [], // Нужно добавить участников, это можно получить из другого запроса
        $row["createdAt"], // Нужно получить из базы данных
        $row["updatedAt"], // Нужно получить из базы данных
        "access", // Нужно получить из базы данных
        json_decode($row["adminUsers"]), // Преобразуем строку в массив администраторов
        $row["description"]
      );

      foreach ($result as $row) {
        $dialog->participants[] = $row["user_id"];
      }
      $this->dialogs[] = $dialog;
      return $this->dialogs;
    }
    return null;
  
  }

  public function createDialog($title)
  {
    $newDialog = new Dialog(
      count($this->dialogs) + 1,
      true, // Пример значения для isGroupChat (можете изменить по своему усмотрению)
      $title,
      [], // Пример значения для participants (можете изменить по своему усмотрению)
      date("Y-m-d H:i:s"), // Пример значения для createdAt
      date("Y-m-d H:i:s"), // Пример значения для updatedAt
      "access", // Пример значения для accessControl (можете изменить по своему усмотрению)
      [], // Пример значения для adminUsers (можете изменить по своему усмотрению)
      "" // Пример значения для description (можете изменить по своему усмотрению)
    );
    $this->dialogs[] = $newDialog;
    return $newDialog;
  }

  public function getDialogMessages($dialogId)
  {
    $dialog = $this->getDialogById($dialogId);
    if ($dialog) {
      return $dialog["messages"];
    }
    return null;
  }

  public function addMessageToDialog($dialogId, $text)
  {
    $dialog = $this->getDialogById($dialogId);
    if ($dialog) {
      $newMessage = ["id" => count($dialog["messages"]) + 1, "text" => $text];
      $dialog["messages"][] = $newMessage;
      return $newMessage;
    }
    return null;
  }
}
?>

