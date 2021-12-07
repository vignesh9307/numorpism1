<?php
if(isset($_POST['submit'])){
$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];
$subject = $_POST['subject'];

$mailhead = "From: ".$name;
$mailto = "vickyrowxz6@gmail.com";

mail($mailto,$subject,$message,$mailhead);
}

