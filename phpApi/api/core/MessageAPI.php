<?php
header("Content-Type: application/json; charset=utf-8");
define("SPAIZ_CODE", true);

include_once "objects/msg.php";

class MessageAPI
{
  private $messages = [];

  public function __construct()
  {
    $this->messages[] = new Msg(
      1, // id
      1, // peer_id
      "Текст сообщения", // text
      0, // from
      ["прикрепление1", "прикрепление2"], // attachments (массив прикрепленных файлов)
      "2023-10-10 10:00:00", // createdAt
      "2023-10-10 10:30:00", // updatedAt
      true // isRead (флаг прочтения сообщения)
    );
  }

  public function getAllMessages()
  {
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

  public function createMessage($text)
  {
    $newMessage = ["id" => count($this->messages) + 1, "text" => $text];
    $this->messages[] = $newMessage;
    return $newMessage;
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
