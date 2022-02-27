<?php

/* Checks for available game  */
$code = $_POST["code"];
$playtime = new PDO("mysql:host=localhost;dbname=50188", "50188", "SjauA!!QPN9Hhv4");
$sql = $playtime->prepare("SELECT id FROM games WHERE (code = :code)");
$sql->bindParam(":code",$code);
$sql->execute();
$result = $sql->fetch(PDO::FETCH_ASSOC);
echo $result["id"];

?>