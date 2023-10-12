<?php
class Json{
  public  $Data=array();
  public $codeAnswer;
  public $method;
function addData($var)
{
    if(is_array($var)){
        array_push($this->Data,$var);
    }
    else
    {
        array_push($this->Data,$var);
    }
}
function addDataWithName($name,$var)
{
        array_push($this->Data,$var);
    
}
function var_name($var) {
    foreach($GLOBALS as $var_name => $value) {
        if ($value === $var) {
            return $var_name;
        }
    }

    return false;
}
function addMethod($var)
{
    $this->method = $var;
}
function addCodeAnswer($var)
{
    $this->codeAnswer = $var;
}
function checkArray($key,$volue)
{
    
    foreach($this->Data as $item) {
     
        if($item[$key]==$volue)
        {
            return true;
        } 
    }
    return false;
    
}

function EchoJson($other='null')
{
$jsArray=
array(
    'method'=>$this->method,
    'data'=>$this->Data,
    'answer'=>$this->codeAnswer
);
if($other!='null')
{
 array_push($jsArray,$other);
}
$unescaped = preg_replace_callback('/\\\\u(\w{4})/', function ($matches) {
    return html_entity_decode('&#x' . $matches[1] . ';', ENT_COMPAT, 'UTF-8');
}, json_encode($jsArray));

echo $unescaped;
}

function ReturnJson($other)
{
    $jsArray=
array(
    'method'=>$this->method,
    'data'=>$this->Data,
    'answer'=>$this->codeAnswer
);
if($other!='null')
{
 array_push($jsArray,$other);
}
$unescaped = preg_replace_callback('/\\\\u(\w{4})/', function ($matches) {
    return html_entity_decode('&#x' . $matches[1] . ';', ENT_COMPAT, 'UTF-8');
}, json_encode($jsArray));

return $unescaped;
}
}
?>