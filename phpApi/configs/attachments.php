<?php
include_once $_SERVER['DOCUMENT_ROOT'] .'/libs/jsonStandartAnswer.php';
class Attachments
{
    private $j;
    public $json ="";

    public $data = array(); 

    function __construct()
    {
        $this->j = new Json();
    }
   
    function Read($json)
    {
        $this->data = json_decode( $json);
        $this->json = $json; 
    }

    function addFile($_name,$_src,$user_id)
    {
        $f = new File();
        $f->name = $_name;
        $f->src = $_src;
        $f->from_id = $user_id;
        array_push($this->data,$f);
       $this ->json =  preg_replace_callback('/\\\\u(\w{4})/', function ($matches) {
        return html_entity_decode('&#x' . $matches[1] . ';', ENT_COMPAT, 'UTF-8');
    }, json_encode($this->data));
    }

    function addContact($_data,$user_id)
    {
        $c = new Contact();
        $c->data = $_data;
        $c->from_id = $user_id;
        array_push($this->data,$c);
        $this ->json =  preg_replace_callback('/\\\\u(\w{4})/', function ($matches) {
            return html_entity_decode('&#x' . $matches[1] . ';', ENT_COMPAT, 'UTF-8');
        }, json_encode($this->data));
    }
   
    

    function EchoR()
    {
        $this->j->Data = $this->data;
        $this->j->EchoJson();
    }
    
}
class Suppreq
{
    public $from_id = "" ;
    public $type = "suppreq";
    public $id;
}

class Contact
{
    public $from_id = "" ;
    public $type = "contact";
    public $data;
}

class File
{
    public $from_id = "" ;
    public $type = "file";
    public $name;
    public $src;
}
?>
