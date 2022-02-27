<?php

/* Sends time */

$game = $_POST["game"];
$time = $_POST["time"];

$hostess = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");

$sql = $hostess->prepare("UPDATE games SET time = :time WHERE (id = :game)");
$sql->bindParam(":game",$game);
$sql->bindParam(":time",$time);
$sql->execute();

?>