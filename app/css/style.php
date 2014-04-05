<?php 
header("Content-type: text/css"); 
function data_uri($file, $mime) {
    $contents = file_get_contents($file);
    $base64 = base64_encode($contents);
    return "data:" . $mime . ";base64," . $base64;
}
$pageBG = 'url('.data_uri( $_SERVER['DOCUMENT_ROOT'] . '/img/d.jpg', 'image/jpg').');';
?>
html {
 background-image:<?=$pageBG?>; 
}

 