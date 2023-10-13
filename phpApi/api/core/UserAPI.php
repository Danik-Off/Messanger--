<?php
  include_once($_SERVER['DOCUMENT_ROOT'] .'/libs/DataBase.php');
class User
{
    
    public $id;
    public $fio;
    private $password;
    private $rights;
    private $data;
    
 
public function Get($id)
{
$db = new DataBase();
$sql ="SELECT * FROM `lgpu_cms_accounts`  WHERE `account_id`=".$id;
$result = mysqli_fetch_array( $db->link->query($sql));
$this->id = $result['account_id'];
$this->type = $result['account_type'];
$local_id = $result['local_account'];
switch ($this->type)
{
    case"prepod":
        $this->GetPrepod($local_id);
        break;
    case"sotrudnik":
        $this->GetSotrudnik($local_id);
        break;
    case"student":
        $this->GetStudent($local_id);
        break;
}
}
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


}
?>