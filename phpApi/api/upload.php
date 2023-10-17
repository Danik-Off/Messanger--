<?php
include_once $_SERVER['DOCUMENT_ROOT'] .'/libs/jsonStandartAnswer.php';
include_once $_SERVER['DOCUMENT_ROOT'] .'/configs/attachments.php';
 
$a = new Attachments();
$file = $_FILES['userfile']['name'];
$time = time();
$uploadfile =$_SERVER['DOCUMENT_ROOT'] ."/uploads/attachments/".$time."|".$file ;
$user_id = 0;
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
   $a->addFile($file,"/uploads/attachments/".$time."|".$file,$user_id);
   $a->EchoR();
   

} 
else
{
    echo "error";
}

function ru2Lat($string)
{
$rus = array('ё','ж','ц','ч','ш','щ','ю','я','Ё','Ж','Ц','Ч','Ш','Щ','Ю','Я');
$lat = array('yo','zh','tc','ch','sh','sh','yu','ya','YO','ZH','TC','CH','SH','SH','YU','YA');
$string = str_replace($rus,$lat,$string);
$string = strtr($string,
     "АБВГДЕЗИЙКЛМНОПРСТУФХЪЫЬЭабвгдезийклмнопрстуфхъыьэ",
     "ABVGDEZIJKLMNOPRSTUFH_I_Eabvgdezijklmnoprstufh_i_e");
return($string);
}
  
?>
