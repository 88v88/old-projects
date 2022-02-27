<?php

/* Checks for winners and updates positions  */

$game = $_POST["game"];
$hostess = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $hostess->prepare("SELECT position FROM players WHERE (game = :game)");
$sql->bindParam(":game",$game);
$sql->execute();
$result = $sql->fetchAll(PDO::FETCH_COLUMN);
echo json_encode($result);

?>