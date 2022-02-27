<?php 
	$myPDO = new PDO("mysql:host=localhost;dbname=words", "root", ""); // CHANGE TO DATABASE NAME, USERNAME, AND PASSWORD!
	session_start();
	session_destroy();
?>

<!DOCTYPE html>
<html>
<head>
<title>The CMU Pronouncing Dictionary</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width" initial-scale="1">
<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
<link href="pretty.css" rel="stylesheet">
<link href="icon.ico" rel="icon">

</head>
<body>

<a href="index.php"><img id="Logo" src="Logo.png"></img></a>
<div id="top"><form method="GET">
  <input id="mainsearch" name="word" maxlength="32" type="text" placeholder="How do you pronounce..."></input>
  <input type="submit" style="display:none" />
</form></div>

<div id="show">

<?php 
	if(isset($_GET["word"])){
		$word = $_GET["word"]; 
		$searchword = "SELECT pronunciation FROM dictionary WHERE word LIKE :search";
		$q = $myPDO->prepare($searchword);
		$q->execute(array(':search'=>$word)); 
		$results = $q->fetch();
		$new = $results[0];

		if($new != ""){
 			echo "<br /><h1>";
  			echo $word; echo "</h1><p>is pronounced</p><h1>";
			echo $new; echo "</h1>";
		} else {
			echo "<br /><br /><h3>The word '";
			echo $word;
			echo "' was not found. Try another one.</h3>";
		}
	}

?>

</div>

<div id="info">
  <h1>About CMUdict</h1>
  <p>The <b>Carnegie Mellon University Pronouncing Dictionary</b> is an open-source machine-readable pronunciation dictionary for North American English that contains over 134,000 words and their pronunciations. CMUdict is being actively maintained and expanded. We are open to suggestions, corrections and other input. Find an error? Please contact the maintainers! We will check it out.</p>
  <p>The current phoneme set has 39 phonemes. To indicate lexical stress, vowels are marked with 0 (no stress), 1 (primary stress), or 2 (secondary stress). This phoneme set, or more accurately, phone set is based on the <a href="https://en.wikipedia.org/wiki/ARPABET">ARPAbet</a> symbol set developed for speech recognition uses.</p>

<h3 id="arh3">ARPAbet</h3>
<div id="aroutside">
  <div class="phoneme">AA<br />AE<br />AH<br />AO<br />AW<br />AY<br />B<br />CH<br />D<br />DH<br />EH<br />ER<br />EY</div>
  <div class="example"><b>o</b>dd<br /><b>a</b>t<br />h<b>u</b>t<br /><b>ou</b>ght<br />c<b>ow</b><br />h<b>i</b>de<br /><b>b</b>e<br /><b>ch</b>eese<br /><b>d</b>ee<br /><b>th</b>ee<br />sh<b>e</b>d<br />h<b>ur</b>t<br /><b>a</b>te</div>
  <div class="phoneme">F<br />G<br />HH<br />IH<br />IY<br />JH<br />K<br />L<br />M<br />N<br />NG<br />OW<br />OY</div>
  <div class="example"><b>f</b>ee<br /><b>g</b>reen<br /><b>h</b>e<br /><b>i</b>t<br /><b>ea</b>t<br /><b>g</b>entle<br /><b>k</b>ey<br /><b>l</b>ie<br /><b>m</b>e<br /><b>kn</b>ee<br />ki<b>ng</b><br />sh<b>ow</b><br />t<b>oy</b></div>
  <div class="phoneme">P<br />R<br />S<br />SH<br />T<br />TH<br />UH<br />UW<br />V<br />W<br />Y<br />Z<br />ZH</div>
  <div class="example"><b>p</b>ee<br /><b>r</b>ead<br /><b>s</b>ea<br /><b>sh</b>e<br /><b>t</b>ea<br /><b>th</b>ank<br />h<b>oo</b>d<br />t<b>oo</b><br /><b>v</b>an<br /><b>w</b>e<br /><b>y</b>am<br />la<b>z</b>y<br />sei<b>z</b>ure</div>
</div>

  <h1>Download the dictionary</h1>
  <p>The dictionary can be found at <a href="http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict">SourceForge</a> and <a href="https://github.com/Alexir/CMUdict">Github</a>, or it can be downloaded below. We have a variety of formats, so take your pick. 

<?php 
	echo "CMUdict was last updated on "; 
	$getdate = "SELECT lastupdated FROM info"; 
	$p = $myPDO->prepare($getdate); 
	$p->execute(); 
	$newdate = $p->fetch(); 
	echo $newdate[0]; 	echo "."; 
?></p>

<div style="text-align:center">
  <a href="cmudict.txt"><div class="bobby"><img src="TXTRL.png" class="type" />Fixed Width <br /><h1>.TXT</h1></div></a>
  <a href="cmudict.csv"><div class="bobby"><img src="CSVRL.png" class="type" />Comma Separated <h1>.CSV</h1></div></a>
</div>



</div>
<div id="footer">
  <a href="https://www.cs.cmu.edu/" id="logolink"><img src="https://www.cs.cmu.edu/sites/all/themes/scs2013/images/cmu-logo.png" /></a>
  <div id="link1">The CMU Pronouncing Dictionary</div>
  <div id="link2"><a href="edit.php">Log In</a></div>
</div>

<script src="script.js"></script>
</body>
</html>
