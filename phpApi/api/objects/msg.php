
<?php
class Msg
{
    public int $id;
    public int $peer_id;
    public string $text;
    public int $from;
    public array $attachments;
    public string $createdAt;
    public string $updatedAt;
    public bool $isRead;
 

    public function __construct(
        int $id,
        int $peer_id,
        string $text,
        int $from,
        array $attachments,
        string $createdAt,
        string $updatedAt,
        bool $isRead
    ) {
        $this->id = $id;
        $this->peer_id = $peer_id;
        $this->text = $text;
        $this->from = $from;
        $this->attachments = $attachments;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->isRead = $isRead;
    }

    // Геттеры и сеттеры по необходимости
}
?>