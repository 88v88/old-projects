<?php

/* Opens the game with necessary values and remembers which game is being opened */

$data = json_decode(file_get_contents('php://input'), true);
$level = $data["level"];
$board = $data["board"];
$path = json_encode($data["path"]);
$code = $data["code"];

$hostess = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");

$sql = $hostess->prepare("INSERT INTO games(level, board, path, code) VALUES (:level, :board, :path, :code)");
$sql->bindParam(":level",$level);
$sql->bindParam(":board",$board);
$sql->bindParam(":path",$path);
$sql->bindParam(":code",$code);
$sql->execute();

$sql2 = $hostess->prepare("SELECT id FROM games WHERE (code = :code)");
$sql2->bindParam(":code",$code);
$sql2->execute();
$result = $sql2->fetch(PDO::FETCH_ASSOC);
echo $result["id"];


?>