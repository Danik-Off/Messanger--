<?php
class Dialog
{
    public int $peer_id;
    public bool $isGroupChat;
    public string $title;
    public array $participants;
    public string $createdAt;
    public string $updatedAt;
    public string $accessControl;
    public array $adminUsers;
    public ?string $description;

    public function __construct(
        int $id =0,
        bool $isGroupChat,
        ?string $title = null,
        array $participants,
        string $createdAt,
        string $updatedAt,
        ?string $accessControl,
        ?array $adminUsers,
        ?string $description = null
    ) {
        $this->peer_id = $id;
        $this->isGroupChat = $isGroupChat;
        $this->title = $title;
        $this->participants = $participants;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->accessControl = $accessControl;
        $this->adminUsers = $adminUsers;
        $this->description = $description;
    }

    // Геттеры и сеттеры по необходимости
}

?>
