<?php

/* Sends name, animal, and color to host. Then download the game board. */

$name = $_POST["name"];
$game = $_POST["game"];
$animal = $_POST["animal"];
$color = $_POST["color"];

$playtime = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $playtime->prepare("INSERT INTO players(name,game,animal,color,position) VALUES (:name,:game,:animal,:color,0)");
$sql->bindParam(":name",$name);
$sql->bindParam(":game",$game);
$sql->bindParam(":animal",$animal);
$sql->bindParam(":color",$color);
$sql->execute();
$newID = $playtime->lastInsertId();

$sql2 = $playtime->prepare("SELECT level,board,path FROM games WHERE (id = :game)");
$sql2->bindParam(":game",$game);
$sql2->execute();
$result = $sql2->fetch(PDO::FETCH_ASSOC);

echo $result["level"]."@".$result["board"]."@".$result["path"]."@".$newID;

?>