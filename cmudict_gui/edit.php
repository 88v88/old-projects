<?php 

session_start();
if(loggedIn()) {
	if(isset($_SESSION["timeout"]) && time() - $_SESSION["timeout"] > 900){
		session_destroy();
        }
} else {
	header("Location: login.php");
	exit;
}

function loggedIn() {
	if(isset($_SESSION["login"]) && $_SESSION["login"] != ""){
		return true;
	} else {
		return false;
	}
}

$myPDO = new PDO("mysql:host=localhost;dbname=words", "root", ""); // CHANGE TO DATABASE NAME, USERNAME, PASSWORD!

if(isset($_POST["change"]) && isset($_GET["word"])){
	if($_POST["change"] == "1"){
		$delword = "DELETE FROM dictionary WHERE word LIKE :searches";
		$prepdel = $myPDO->prepare($delword);
		$prepdel->execute(array(':searches'=>$_GET["word"]));
	}
}

if(isset($_POST["addword"]) && isset($_POST["addpron"])){
	$addwords = strtoupper($_POST["addword"]);
	$addpronun = strtoupper($_POST["addpron"]);
	$addinto = "INSERT INTO dictionary (word, pronunciation) VALUES (:addword, :addpron)";
	$prepadd = $myPDO->prepare($addinto);
	$prepadd->execute(array(':addword'=>$addwords,':addpron'=>$addpronun)); 
}

if(isset($_POST["editword"]) && isset($_POST["editpron"]) && isset($_POST["change"]) && $_POST["change"] == "0" && isset($_GET["word"])){
	$edword = strtoupper($_POST["editword"]);
	$edpron = strtoupper($_POST["editpron"]);
	$edit = "UPDATE dictionary SET word = :eddword, pronunciation = :eddpron WHERE word LIKE :searched";
	$prepped = $myPDO->prepare($edit);
	$prepped->execute(array(':eddword'=>$edword,':eddpron'=>$edpron, ':searched'=>$_GET["word"])); 
}

if(isset($_GET["word"])){
	$word = $_GET["word"]; 
	$searchword = "SELECT pronunciation FROM dictionary WHERE word LIKE :search";
	$prepsearch = $myPDO->prepare($searchword);
	$prepsearch->execute(array(':search'=>$word)); 
	$results = $prepsearch->fetch();
	$new = $results[0];
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Editing CMUdict</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width" initial-scale="1">
<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
<link href="pretty.css" rel="stylesheet">
<link href="icon.ico" rel="icon">

</head>
<body>

<a href="index.php"><img id="Logo" src="Logo.png"></img></a>
<div id="top">
  <h1 class="topheader">Editing CMUdict</h1>
</div>

<div id="info">
  <h1>Add entry</h1>

  <form name="addword" method="POST">
    <input type="text" maxlength="32" placeholder="Word" name="addword"></input><br /><br />
    <input type="text" maxlength="64" placeholder="Pronunciation" name="addpron"></input><br /><br />
    <input type="submit"></input>
  </form>
  
  <h1>Search entry</h1>
  
  <form name="editsearch" method="GET">
    <input name="word" type="text" maxlength="32" placeholder="Search for a word..."></input>
  </form>

  <form name="options" method="POST" onkeypress="return event.keyCode != 13;">
    <h1 id="wordsearch">Modify Entry</h1>
    <label for="editword">Word</label><input type="text" name="editword" maxlength="32" 
	
<?php 
	if(isset($_GET["word"])){
		if($new != ""){
			echo "value='"; 
			echo $word; 
			echo "'";
		} else {
			if(isset($_POST["change"])){
				if($_POST["change"] == "0"){
					echo " placeholder='Word changed.' ";
				} 
				if($_POST["change"] == "1"){
					echo " placeholder='Word deleted.' ";
				}
			} else {
				echo " placeholder='Word not found.' ";
			}
		}
	} 
?>

></input><br /><br />
    <label for="editpron">Pronunciation</label><input type="text" name="editpron" maxlength="64" 

<?php 
	if(isset($_GET["word"])){ 
		if($new != ""){
			echo "value='"; 
			echo $new; 
			echo "'";
		} else {
			echo " placeholder='Try another one.' ";
		}
	} 
?>

></input><br /><br />
    <input type="hidden" value="-1" id="change" name="change"></input>
    <input type="submit" onclick="document.getElementById('change').value = '0'" value="Modify Entry"></input><br /><br />
    <input type="submit" onclick="document.getElementById('change').value = '1'" value="Delete Entry"></input>
  </form><br />



  <br />

  <h1>File Management</h1>
  <p>

<?php 
	echo "Last updated on "; 
	$getdate = "SELECT lastupdated FROM info"; 
	$p = $myPDO->prepare($getdate); 
	$p->execute(); 
	$newdate = $p->fetch(); 
	echo $newdate[0]; 
	echo "."; 
?>

</p>
    <div id="updatefiles" onclick="updatefile()">Update Files</div>

</div>
<div id="footer">
  <a href="https://www.cs.cmu.edu/" id="logolink"><img src="https://www.cs.cmu.edu/sites/all/themes/scs2013/images/cmu-logo.png" /></a>
  <div id="link1">The CMU Pronouncing Dictionary</div>
  <div id="link2"><a href="edit.php">Log In</a></div>
</div>
<script>
function updatefile() {
	document.getElementById("updatefiles").textContent = "Updating...";
	var file = new XMLHttpRequest();
	file.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var scroll = document.body.scrollTop;
			document.getElementById("updatefiles").textContent = "Files Updated";
			document.body.scrollTop = scroll;
		}
	}
	file.open("POST","updfile.php");
	file.send();
}

<?php

if(isset($_POST["change"]) || isset($_GET["word"])){
	echo "document.getElementById('wordsearch').scrollIntoView();";
}

?>

</script>
</body>
</html>
