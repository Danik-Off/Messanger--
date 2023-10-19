<?php

function sendPostRequest( $data,$user_id)
{ 
  const secret_key = "";

  const data = json_encode( $data );
  $data = ['secret_key'=>secret_key,'data'=> data,'user_id'=> $user_id ];
//   $data = [" secret_key, data, user_id"];
  $url = "http://localhost:3000/api/data"
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($ch);

  if ($response === false) {
    // Обработка ошибок cURL
    return "cURL error: " . curl_error($ch);
  } else {
    // Возвращаем ответ от сервера
    return $response;
  }

  curl_close($ch);
}

?>