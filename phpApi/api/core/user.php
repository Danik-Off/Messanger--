<?php
  include_once($_SERVER['DOCUMENT_ROOT'] .'/libs/DataBase.php');
  include_once $_SERVER['DOCUMENT_ROOT'] .'/configs/configToken.php';
  include_once $_SERVER['DOCUMENT_ROOT'] .'/libs/php-jwt-master/src/JWT.php';  
  use Firebase\JWT\JWT;
class User
{
    
    public $id;
    public $fio;
  

    private $password;
    private $rights;
    private $data;

    public function Get($id) {
        $url = 'https://lspu-lipetsk.ru/api/user.get.php?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNC0wNS0wNyAxODo1MzoyOSIsImRhdGEiOnsiYWNjb3VudF9sb2dpbiI6ImxwbnpuZiIsIm5pY2siOiIiLCJhY2NvdW50X3BlcnNfaWQiOiIwIiwibG9jYWxfYWNjb3VudCI6Ii0xNzE1OTI2MDIiLCJhY2NvdW50X3R5cGUiOiJzb3RydWRuaWsiLCJhY2NvdW50X2lkIjoiMzQ1MzU4NDM0IiwiYWNjb3VudF9yaWdodHMiOiIxQyIsImlkIjoiMzQ1MzU4NDM0In19.HTgGUiDf6rgtPdkBPzmVCCIECyFs2JSCI7Wy1tGMfwk&id='.$id;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Error: ' . curl_error($ch);
            curl_close($ch);
            return null;
        }

        curl_close($ch);
        $user = json_decode($response, true);

        if (is_array($user)) {
            foreach ($user as $key => $value) {
                $this->$key = $value;
            }
        }
    }


//public function Get($id)
//{
//$db = new DataBase();
//$sql ="SELECT * FROM `lgpu_cms_accounts`  WHERE `account_id`=".$id;
//$result = mysqli_fetch_array( $db->link->query($sql));
//$this->id = $result['account_id'];
//$this->type = $result['account_type'];
//$local_id = $result['local_account'];
//switch ($this->type)
//{
//    case"prepod":
//        $this->GetPrepod($local_id);
//        break;
//    case"sotrudnik":
//        $this->GetSotrudnik($local_id);
//        break;
//    case"student":
//        $this->GetStudent($local_id);
//        break;
//}
//}
private function GetStudent($local_id)
{
$db = new DataBase();
$sql ="SELECT * FROM `lgpu_cms_students` WHERE `id`=".$local_id;
$result = mysqli_fetch_array( $db->link->query($sql));
$this->fio = $result['fio'];
}
private function GetPrepod($local_id)
{
$db = new DataBase();//SELECT * FROM `lgpu_cms_prepod` WHERE 1 
$sql ="SELECT * FROM  `lgpu_cms_prepod`  WHERE `id`=".$local_id." ORDER BY `rang` LIMIT 1";
$result = mysqli_fetch_array( $db->link->query($sql));
$this->fio = $result['fio'];
$this->job_title = $result['dolzhnost'];
$this->rang = $result['rang'];
}

private function GetSotrudnik($local_id)
{
$db = new DataBase();
$sql ="SELECT * FROM  `lgpu_cms_sotr`  WHERE `id`=".$local_id;
$result = mysqli_fetch_array( $db->link->query($sql));
$this->fio = $result['fio'];
$this->podr_type = $result['podr_type'];
$this->job_title = $result['dolzhnost'];
$this->podr_id = $result['podr_id'];
$this->podr_name = $result['podr_name'];
}

public  function GetRights($id)
{
  $db = new DataBase();
  $sql ="SELECT * FROM `lgpu_cms_accounts` LEFT JOIN `lgpu_cms_sotr` on `lgpu_cms_accounts`.`local_account` = `lgpu_cms_sotr`.`id` WHERE `account_id`=".$id;
  $result = mysqli_fetch_array( $db->link->query($sql));
  return $result["rights"];
}
public function GetUserByToken($token)
{
    
    try{
        $data = ParseToken($token);
        $userT = $data->data;
    }
    catch(Error $error)
    {
        echo("недействительный токен");
        exit;
    }
    $_id =$userT->id;
    $this->Get($_id);

}


public function AuthByLoginAndPassword($login,$_password)
{
 if($this->LoginExists($login))
 {  
  
   if($_password==$this->password ){
   
    $date_formated = date('Y-m-d H:i:s', time());
    $token = array(
      "date"=>$date_formated,
      "data" => $this);



   // создание jwt 
   $jwt = JWT::encode($token, key);
 


   return $jwt;
   }
   else
   {

   }
 }else
 {

 }
}
  private function LoginExists($login){
  $db = new DataBase();
  // запрос, чтобы проверить, существует ли электронная почта 
  $sql = "SELECT * FROM `lgpu_cms_accounts` LEFT JOIN `lgpu_cms_sotr` on `lgpu_cms_accounts`.`local_account` = `lgpu_cms_sotr`.`id` 
  WHERE `login` = '$login'";
$result =   $db->queryWithoutFetch($sql);
//echo ;
$result = mysqli_fetch_array( $db->link->query($sql));
    $this->id = $result['account_id'];
    $this->fio = $result['fio'];
    $this->podr_type = $result['podr_type'];
    $this->podr_id = $result['podr_id'];
    $this->job_title = $result['dolzhnost'];
    $this->type = $result['account_type'];
    $this->rights = $result['account_rights'];
    $this->password = $result['password'];
    $this->data = $result;
      return true;
  

  // вернём 'false', если адрес электронной почты не существует в базе данных 
  return false;
}
}
?>