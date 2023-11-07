<?php
class Atachments
{
  private $attachments = [];

  public function __construct()
  {
  
  }
  public function getAttachments()
  {
    return $this->attachments;
  }
  public function setAttachments($attachments)
  {
    $this->attachments = $attachments;
  }
  public function addAttachment($attachment)
  {
    $this->attachments[] =$attachment;
  }
  public function removeAttachment($attachment)
  {
    $this->attachments = array_diff($this->attachments, [$attachment]);
  }
  public function getAttachmentsCount()
  {
    return count($this->attachments);
  }
  public function getJson()
  {
    return json_encode($this->attachments);
  }
}
class File
{
  public string $name;
  public string $path;
  public string $type = "file";
  function __construct(string $name, string $path)
  {
    $this->path = $path;
    $this->name = $name;
  }
}

class Photo extends File
{
  public string $type = "photo";
}
class HtmlAttachment
{
  public string $name;
  public string $data;
  public string $type = "html";
}

?>
