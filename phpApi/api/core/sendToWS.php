<?php
const secret_key = "data";
function sendPostRequest( $data_m,$peer_id)
{ 
 
// Задайте URL вашего сервера
$serverURL = 'http://45.9.40.44:3000/api/data';

$users = getParticipants($peer_id);


foreach( $users as $user )
{
  $postData = array(
    'secret_key' => 'data', // Замените на вашу секретную ключевую фразу
    'data' => array('msg' => $data_m[0]),
    'user_id' => $user, // Замените на ID пользователя
);
  PostRequest($serverURL, $postData);
}
// PostRequest($serverURL, $postData);
}


function PostRequest($url, $data) {
    // Преобразуйте данные в формат JSON
    $dataJSON = json_encode($data);

    // Настройте опции для запроса
    $options = array(
        'http' => array(
            'header' => "Content-type: application/json\r\n",
            'method' => 'POST',
            'content' => $dataJSON,
        ),
    );

    // Создайте контекст для запроса
    $context = stream_context_create($options);

    // Выполните POST-запрос
    $response = file_get_contents($url, false, $context);

    if ($response === false) {
        // Обработка ошибки
        return 'Произошла ошибка при выполнении POST-запроса';
    } else {
        // Вернуть успешный ответ
        return $response;
    }
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
      AND ud2.peer_id = ".$peer_id."
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


?>