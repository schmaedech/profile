<?php
define('EMAIL_DEFAULT_FROM_ADDRESS', 'diego@schmaedech.com');
define('EMAIL_DEFAULT_FROM_NAME', 'Myself');
define('FORM_BLOCK_SENDER_EMAIL', EMAIL_DEFAULT_FROM_ADDRESS);
if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (isset($_POST['name']) AND isset($_POST['email']) AND isset($_POST['phone']) AND isset($_POST['message'])) {
        $to = 'dcartes@mail.ufsm.br';//please put ours.
        $from = 'diego@schmaedech.com';//please put ours.
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $subject = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);


        if (mail($to,'User: ' . $email . ' : ' . $subject , $message, 'From: ' . $from)) {
            echo 'Thanks '.$name.'. I will return as possible.';
        } else {
            echo 'Opps, '.$name.' some bug hapens and we can send you mail. Try contact via community. Thanks';
        }
    } else {
        echo 'Please, '. $name.' all Fields are required.';
    }
    return;
}
?>