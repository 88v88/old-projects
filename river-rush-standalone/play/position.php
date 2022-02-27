<?php

/* Sends position to host */

$player = $_POST["player"];
$position = $_POST["pos"];
$playtime = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $playtime->prepare("UPDATE players SET position = :position WHERE (id = :player)");
$sql->bindParam(":player",$player);
$sql->bindParam(":position",$position);
$sql->execute();

?>