<?php
header("Content-Type: application/json; charset=utf-8");

include_once "objects/dialog.php";
// include_once "sendToWS.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/configs/user.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/DataBase.php";

class DialogAPI
{
    private $dialogs = [];
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    function getParticipants($peer_id)
    {
        $sql =
            "SELECT user_id
      FROM user_dialog as ud1
      WHERE EXISTS (
        SELECT 1
        FROM `user_dialog` as ud2
        WHERE ud2.dialog_id = ud1.dialog_id
        AND ud2.peer_id = " . $peer_id . "
      );
      ";
        $db = new DataBase();
        $result = $db->link->query($sql);
        $participants = [];

        if ($result) {
            foreach ($result as $row) {
                $participants[] = $row["user_id"];
            }
            return $participants;
        }
        return [];
    }

    public function getAllDialogs($user_id)
    {

        $sql =
            "SELECT *
      FROM `dialogs` 
      LEFT JOIN `user_dialog`
      ON `user_dialog`.`dialog_id`= `dialogs`.`id`
      WHERE `user_dialog`.`user_id` = " . $user_id;


        $result = $this->db->queryWithoutFetch($sql);

        $this->dialogs = [];

        if ($result) {

            foreach ($result as $row) {
                $participants = $this->getParticipants($row["peer_id"]);

                $title = "";

                if (!$row["isGroupChat"]) {
                    $user = new User();

                        if ($participants[0] == $user_id) {
                            $user->Get($participants[1]);
                        } else {
                            $user->Get($participants[0]);
                        }

                        $title = $user->fio;

                } else {
                    $title = $row["title"];
                }

                $dialog = new Dialog(
                    $row["peer_id"],
                    $row["isGroupChat"],
                    "$title",
                    $participants, // Нужно добавить участников, это можно получить из другого запроса
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

    public function getDialogById(int $peer_id, int $user_id)
    {
        $sql =
            "SELECT *
      FROM `dialogs`
      LEFT JOIN `user_dialog`
      ON `user_dialog`.`dialog_id` = `dialogs`.`id`
      WHERE `dialogs`.`id` IN (
        SELECT `ud1`.`dialog_id`
        FROM `user_dialog` as ud1
        WHERE `ud1`.`peer_id` = " . $peer_id . " And  `ud1`.`user_id` = " . $user_id . "
      );";

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
            $title = "";
            if (!$row["isGroupChat"]) {
                $user = new User();

                    if ($dialog->participants[0] == $user_id) {
                        $user->Get($dialog->participants[1]);
                    } else {
                        $user->Get($dialog->participants[0]);
                    }
                    $dialog->title = $user->fio;

            }

            $this->dialogs[] = $dialog;
            return $this->dialogs;
        }
        return null;
    }

    public function createDialog(int $user_id, string $title, array $users, string $description)
    {
        echo("test");
        // Определение типа диалога (личный или групповой)
        $isGroupChat = (count($users) > 1) ? "true" : "false";


        // Экранирование строк для предотвращения SQL-инъекций

        $adminUsersJson = json_encode([$user_id]);


        // 1. Вставка новой записи в таблицу `dialogs`
        $sql = "INSERT INTO `dialogs` (`title`, `adminUsers`, `description`, `creator`, `isGroupChat`)
            VALUES ('$title', '$adminUsersJson', '$description', $user_id, $isGroupChat)";
        echo("line160");
        $result = $this->db->link->query($sql);
        echo("line163");
        // Проверка успешности выполнения запроса
        if (!$result) {
            echo('Ошибка при создании диалога: ' . $this->db->error);
        }
        echo("line167");
        echo(json_encode($this->db->link->insert_id));
        // Получение ID созданного диалога
        $dialogId = $this->db->link->insert_id;

        // добавляем создателя в чат
        $this->addUserToDialog($user_id, $dialogId);
        // 2. Вставка записей в таблицу `user_dialog` для участников диалога
        foreach ($users as $user) {
            $this->addUserToDialog($user, $dialogId);
        }

        // Создание объекта Dialog и возврат
        $dialog = new Dialog(
            $dialogId, // Предположим, что идентификатор диалога используется как peer_id
            $isGroupChat,
            $title,
            array_merge([$user_id], $users), // Участники диалога
            date('Y-m-d H:i:s'), // createdAt
            date('Y-m-d H:i:s'), // updatedAt
            "access", // Этот параметр нужно настроить
            [$user_id], // Администратор - создатель
            $description
        );

        $this->dialogs[] = $dialog;
        return $this->dialogs;
    }


    public function addUserToDialog(int $userId, int $dialogId, string $status = "inChat", int $addedBy = null)
    {
        $sql = "INSERT INTO `user_dialog`(`user_id`, `dialog_id`, `status`, `addedBy`)
            VALUES (" . $userId . "," . $dialogId . ",'" . $status . "','" . $addedBy . "')";
        echo("line160" . $sql);
        $result = $this->db->link->query($sql);
        echo("line163");
        // Проверка успешности выполнения запроса
        if (!$result) {
            echo('Ошибка при создании диалога: ' . $this->db->error);
        }
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

