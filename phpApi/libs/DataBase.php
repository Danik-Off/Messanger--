<?php
class DataBase{
      function __construct()
      {   
         include_once($_SERVER['DOCUMENT_ROOT'] .'/includes/sql/mysql_config.php');
          //  $this->link = mysqli_connect(dbhost,dbuname,dbpass,dbname);    
           $this->link = mysqli_connect(dbhost,"lamabomn_ll_test","lspu-test22","lamabomn_ll_test");    
           mysqli_set_charset($this->link, "utf8");
      }
    function query($sql)
    {
      $result = mysqli_query($this->link, $sql);
      $arResult = mysqli_fetch_array($result);
       return $arResult;
    }
    function queryWithoutFetch($sql)
    {
      $result = $this->link->query($sql);
       return $result;
    }
      function testconnect(){
          if ( $this->link == false){
              print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
          }
          else {
              print("Соединение установлено успешно");
          }
      }
    }

?>