<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (isset($_POST['name']) AND isset($_POST['email']) AND isset($_POST['subject']) AND isset($_POST['message'])) {
        $to = 'schmaedech@gmail.com';

        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);


        if (mail($to, $subject, $message, 'From: ' . $email)) {
            echo 'success|Thanks. We will return as possible.';
        } else {
            echo 'erro|Opps, some bug hapens and we can send you mail. Try contact via community. Thanks';
        }
    } else {
        echo 'error|All Fields are required';
    }
    return;
}
?>