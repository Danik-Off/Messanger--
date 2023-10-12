<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/php-jwt-master/src/JWT.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/libs/DataBase.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/mainfile.php";

function ParseToken($token)
{
  global $dbi;

  $account = get_account($dbi);

  if ($account != "") {
    $result = [
      "id" => $account["account_id"],
    ];
  }

  return $result;
}

?>
