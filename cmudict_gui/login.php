<?php 

// username = cookie 
// password = S4nTA12H^n8rY!

	session_start();

if (isset($_POST["login"]) && !empty($_POST["username"]) && !empty($_POST["password"])) {
	$myPDO = new PDO("mysql:host=localhost;dbname=words", "root", ""); // CHANGE TO DATABASE NAME, USERNAME, AND PASSWORD!
	$user = $_POST["username"];
	$pass = $_POST["password"];
	$find = "SELECT username, password FROM info";
	$logon = $myPDO->prepare($find);
	$logon->execute();
	$up = $logon->fetchAll();
	$newuser = $up[0][0];
	$newpass = $up[0][1];
}
	
         
?>

<!DOCTYPE html>
<html>
<head>
<title>Log In CMU Pronouncing Dictionary</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width" initial-scale="1">
<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
<link href="pretty.css" rel="stylesheet">
<link href="icon.ico" rel="icon">

</head>
<body>

<a href="index.php"><img id="Logo" src="Logo.png"></img></a>
<div id="top">
	<h1 class="topheader">Log in to maintain CMUdict</h1>
</div>

<div id="login">
	<form name="logging" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
		<input name="username" autocomplete="off" type="text" maxlength="32" placeholder="Username"></input><br /><br />
		<input name="password" autocomplete="off" type="password" maxlength="32" placeholder="Password"></input><br /><br />
		<input type="text" style="display:none">
		<input type="password" style="display:none">
		<input type="submit" name="login" value="Log In"></input>
	</form>
	<p><?php if (isset($_POST["login"]) && !empty($_POST["username"]) && !empty($_POST["password"])) {		
		if (strtoupper(hash("SHA256",$_POST["username"])) == $newuser && strtoupper(hash("SHA256",$_POST["password"])) == $newpass) {
			$_SESSION["login"] = $_POST["login"];
			$_SESSION["timeout"] = time();
			header("Location: edit.php");
			exit;
		}else {
			echo "Wrong username or password";
		}
	}
	?></p>

</div>

<div id="footer">
  <a href="https://www.cs.cmu.edu/" id="logolink"><img src="https://www.cs.cmu.edu/sites/all/themes/scs2013/images/cmu-logo.png" /></a>
  <div id="link1">The CMU Pronouncing Dictionary</div>
  <div id="link2"><a href="edit.php">Log In</a></div>
</div>

<script src="script.js"></script>
</body>
</html>
