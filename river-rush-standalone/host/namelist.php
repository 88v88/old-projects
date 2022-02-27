<?php

/* Fills list with names and return avatars */

$game = $_POST["game"];
$hostess = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $hostess->prepare("SELECT name,animal,color FROM players WHERE (game = :game)");
$sql->bindParam(":game",$game);
$sql->setFetchMode(PDO::FETCH_ASSOC);
$sql->execute();
$result = $sql->fetchAll();
$result0 = array();
$result1 = array();
$result2 = array();
foreach($result as $row){
	array_push($result0,$row["name"]);
	array_push($result1,$row["animal"]);
	array_push($result2,$row["color"]);
}

echo json_encode($result0)."@".json_encode($result1)."@".json_encode($result2);


?>