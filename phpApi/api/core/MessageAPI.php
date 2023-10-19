<?php
// header("Content-Type: application/json; charset=utf-8");

include_once "objects/dialog.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/configs/user.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/DataBase.php";
include_once "objects/msg.php";
$user = new User();
class MessageAPI
{
  private $messages = [];
  private $db;

  public function __construct()
  {
    $this->db = new DataBase();
  }

  public function getAllMessages($peer_id, $user_id)
  {
    $sql =
      "SELECT `msgs`.`id`,`user_dialog`.`peer_id`,`msgs`.`text`,`msgs`.`from_id`,`msgs`.`attachment`,`msgs`.`createdAt`,msgs.updatedAt,msgs.isRead
      FROM `msgs`
      LEFT JOIN `user_dialog`
      ON user_dialog.dialog_id = msgs.dialog_id
      WHERE `user_dialog`.`peer_id` = " .
      $peer_id .
      " AND `user_dialog`.`user_id` = " .
      $user_id;

    $result = $this->db->queryWithoutFetch($sql);

    $this->messages = [];

    if ($result) {
      foreach ($result as $row) {
        
       
        $dialog = new Msg(
          $row["id"], // id
          $row["peer_id"],
          $row["text"], // text
          ($row["from_id"]==$user_id)?0:$row["from_id"], // from
          json_decode($row["attachment"]) ?? [], // attachments (массив прикрепленных файлов)
          $row["updatedAt"],
          $row["isRead"] // isRead (флаг прочтения сообщения)
        );

        $this->messages[] = $dialog;
      }
    }

    return $this->messages;
  }

  public function getMessageById($id)
  {
    foreach ($this->messages as $message) {
      if ($message["id"] == $id) {
        return $message;
      }
    }
    return null;
  }

  public function createMessage($peer_id, $user_id, $text)
  {
    //,$attachment
    $ip = $_SERVER["REMOTE_ADDR"];
    $sql =
      "INSERT INTO `msgs`  (`dialog_id`, `text`, `from_id`, `attachment`, `isRead`, `ip`)
    SELECT 
        `dialog_id`,        
         '" .
      $text .
      "'  ,         
        `user_id`,        
        '[]',          
        0,          
        '" .
      $ip .
      "'     
    FROM `user_dialog`
    WHERE `user_dialog`.`peer_id` = " .
      $peer_id .
      " AND `user_dialog`.`user_id` = " .
      $user_id;
    $result = $this->db->queryWithoutFetch($sql);

    $newMessage = new Msg(
      0, // id
      $peer_id,
      $text, // text
      $user_id, // from
      [], // attachments (массив прикрепленных файлов)
      date("Y-m-d H:i:s"), // createdAt
      date("Y-m-d H:i:s"),
      false // isRead (флаг прочтения сообщения)
    );

    $this->messages[] = $newMessage;
    // отправляем в ws
    const data = ['type'=>'msg', $newMessage]
    sendPostRequest($data,$user_id);

    return $this->messages;
  }

  public function updateMessage($id, $text)
  {
    foreach ($this->messages as &$message) {
      if ($message["id"] == $id) {
        $message["text"] = $text;
        return $message;
      }
    }
    return null;
  }

  public function deleteMessage($id)
  {
    foreach ($this->messages as $key => $message) {
      if ($message["id"] == $id) {
        unset($this->messages[$key]);
        return true;
      }
    }
    return false;
  }
}
?>
