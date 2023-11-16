<?php
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);
include_once "core/attachments.php";

function uploadFile($file, $user_id)
{
  if (empty($file["name"]) || empty($file["tmp_name"])) {
    echo "Ошибка: Файл не выбран.";
    return;
  }

  // Директория для загрузки файлов
  $uploadDirectory = $_SERVER["DOCUMENT_ROOT"] . "/uploads/attachments/";

  if (!file_exists($uploadDirectory)) {
    mkdir($uploadDirectory, 0777, true);
  }

  $filename = basename($file["name"]);
  $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION)); // Получаем расширение и переводим в нижний регистр
  $time = time();
  $safeFilename = $time . "_" . ru2Lat($filename);

  $uploadFilePath = $uploadDirectory . $safeFilename;

 
  if (move_uploaded_file($file["tmp_name"], $uploadFilePath)) {
    $a = new Atachments();

    // Определите тип вложения в зависимости от расширения
    $attachmentType = "file"; // По умолчанию считаем, что это файл
   
    if (in_array($extension, ["jpg", "jpeg", "png", "gif"])) {
      $attachmentType = "photo";
    } elseif (in_array($extension, [])) {
      $attachmentType = "video";
    }

    switch ($attachmentType) {
      case "photo":
        $a-> addAttachment(new Photo($file["name"], "/uploads/attachments/" . $safeFilename));
        break;
      case "file":
        $a->addAttachment(new File($file["name"], "/uploads/attachments/" . $safeFilename));
        break;
    }
   
    echo($a->getJson());
  } else {
    echo "Ошибка при загрузке файла.";
  }
}

function ru2Lat($string)
{
    $transliteration = array(
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'kh', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D',
        'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I',
        'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N',
        'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
        'У' => 'U', 'Ф' => 'F', 'Х' => 'Kh', 'Ц' => 'Ts', 'Ч' => 'Ch',
        'Ш' => 'Sh', 'Щ' => 'Sch', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '',
        'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya'
    );

    return strtr($string, $transliteration);
}


// Проверка и загрузка файла
if (isset($_FILES["userfile"])) {
  uploadFile($_FILES["userfile"], 0); // Здесь 0 - это user_id, замените на нужное значение
}

?>
