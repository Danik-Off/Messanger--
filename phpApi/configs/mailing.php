<?php
function UserNotification($user_id,$text)
{
 smtpmail('Имя получателя', 'email-получателя@mail.ru', 'Тема письма', 'HTML или обычный текст письма');
}

?>