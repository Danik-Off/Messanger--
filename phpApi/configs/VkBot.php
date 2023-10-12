<?php

if (!isset($_REQUEST)) {
    return;
}

//Строка для подтверждения адреса сервера из настроек Callback API
$confirmationToken = 'ed834e55';

//Ключ доступа сообщества
$token = 'vk1.a.7-klVhL9S--KmyT2jIbD0VB0cJVBfpI7a6L_Q4HfLVxsqIksnurLUeurRFRNsdshV1Mfg7-ALBv9dgRe7oKsl2Lefw75nwFzC-7KcG5SSvCquobBfdouAZAgQXtOkY-8ZX-5mqGOQlVEjWCF3Fbk5OMPfsCKjW0eCApjqZdJJoDYzHpxom9Pp4MSBzQzyWOaduOiFpCbpDxGktTJQ8fJyg';



//Получаем и декодируем уведомление
$data = json_decode(file_get_contents('php://input'));

// проверяем secretKey
//Проверяем, что находится в поле "type"
switch ($data->type) {
    //Если это уведомление для подтверждения адреса сервера...
    case 'confirmation':
        //...отправляем строку для подтверждения адреса
        echo $confirmationToken;
        break;
   $peer_id =  $data->object->message->peer_id;
   $user_id =  $data->object->message->user_id;
    //Если это уведомление о новом сообщении...
    case 'message_new':
      $filename = 'example.log';
     
        //...получаем id его автора
      //  $userId = $data->object->from_id;message
        //затем с помощью users.get получаем данные об авторе
        //$userInfo = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids={$userId}&v=5.0"));

        //и извлекаем из ответа его имя
       // $user_name = $userInfo->response[0]->first_name;
       //https://api.vk.com/method/messages.send?user_id=6269901&message=habrahabr&v=5.37&access_token=
        //С помощью messages.send и токена сообщества отправляем ответное сообщение
        $request_params = array(
          'message' => "test",
          'random_id' => rand(1, 999999),
          'user_id' => $user_id,
          'access_token' => $token,
          'v' => '5.103'
        );
        $get_params = http_build_query($request_params);
        file_get_contents("https://api.vk.com/method/messages.send?". $get_params);
        //Возвращаем "ok" серверу Callback API
        echo('ok');

        break;

    // Если это уведомление о вступлении в группу
    case 'group_join':
        //...получаем id нового участника
        $userId = $data->object->user_id;

        //затем с помощью users.get получаем данные об авторе
        $userInfo = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids={$userId}&v=5.0"));

        //и извлекаем из ответа его имя
        $user_name = $userInfo->response[0]->first_name;

        //С помощью messages.send и токена сообщества отправляем ответное сообщение
        $request_params = array(
            'message' => "Добро пожаловать в наше сообщество МГТУ им. Баумана ИУ5 2016, {$user_name}!<br>" .
                            "Если у Вас возникнут вопросы, то вы всегда можете обратиться к администраторам сообщества.<br>" .
                            "Их контакты можно найти в соответсвующем разделе группы.<br>" .
                            "Успехов в учёбе!",
            'user_id' => $userId,
            'access_token' => $token,
            'v' => '5.0'
        );

        $get_params = http_build_query($request_params);

        file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);

        //Возвращаем "ok" серверу Callback API
        echo('ok');

        break;
}
?>