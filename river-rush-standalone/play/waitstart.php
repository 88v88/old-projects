<?php

/* Waits for starting time */

$game = $_POST["game"];
$playtime = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $playtime->prepare("SELECT time FROM games WHERE (id = :game)");
$sql->bindParam(":game",$game);
$sql->execute();
$result = $sql->fetch(PDO::FETCH_ASSOC);
echo $result["time"];

?>