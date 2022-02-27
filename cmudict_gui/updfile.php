<?php

$myPDO = new PDO("mysql:host=localhost;dbname=words", "root", "");  // CHANGE TO DATABASE NAME, USERNAME, AND PASSWORD!

$getdate = "UPDATE info SET lastupdated = (DATE_FORMAT(CURDATE(),\"%e %M %Y\"))"; 
$p = $myPDO->prepare($getdate); 
$p->execute(); 

$ketdate = "SELECT lastupdated FROM info";
$k = $myPDO->prepare($ketdate); 
$k->execute(); 
$newdate = $k->fetch(); 

$textquery = "SELECT word, pronunciation FROM dictionary ORDER BY word";
$textpdo = $myPDO->prepare($textquery);
$textpdo->execute();
$textrow = $textpdo->fetchAll();

$TXTfile = fopen("cmudict.txt","w");
fwrite($TXTfile,";;; #\n;;; # ========================================================================\n;;; # Copyright (C) 1993-2015 Carnegie Mellon University. All rights reserved.\n;;; #\n;;; # Redistribution and use in source and binary forms, with or without\n;;; # modification, are permitted provided that the following conditions\n;;; # are met:\n;;; #\n;;; # 1. Redistributions of source code must retain the above copyright\n;;; #    notice, this list of conditions and the following disclaimer.\n;;; #    The contents of this file are deemed to be source code.\n;;; #\n;;; # 2. Redistributions in binary form must reproduce the above copyright\n;;; #    notice, this list of conditions and the following disclaimer in\n;;; #    the documentation and/or other materials provided with the\n;;; #    distribution.\n;;; #\n;;; # This work was supported in part by funding from the Defense Advanced\n;;; # Research Projects Agency, the Office of Naval Research and the National\n;;; # Science Foundation of the United States of America, and by member\n;;; # companies of the Carnegie Mellon Sphinx Speech Consortium. We acknowledge\n;;; # the contributions of many volunteers to the expansion and improvement of\n;;; # this dictionary.\n;;; #\n;;; # THIS SOFTWARE IS PROVIDED BY CARNEGIE MELLON UNIVERSITY ``AS IS'' AND\n;;; # ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,\n;;; # THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n;;; # PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL CARNEGIE MELLON UNIVERSITY\n;;; # NOR ITS EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n;;; # SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n;;; # LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n;;; # DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n;;; # THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n;;; # (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n;;; # OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n;;; #\n;;; # ========================================================================\n;;; #\n");
for($i = 0; $i < sizeof($textrow); $i++){
	fwrite($TXTfile,str_pad($textrow[$i][0],32));
	fwrite($TXTfile,str_pad($textrow[$i][1],64));
	fwrite($TXTfile,"\n");
}
fclose($TXTfile);

$CSVfile = fopen("cmudict.csv","w");
fwrite($CSVfile,";;; #\n;;; # ========================================================================\n;;; # Copyright (C) 1993-2015 Carnegie Mellon University. All rights reserved.\n;;; #\n;;; # Redistribution and use in source and binary forms, with or without\n;;; # modification, are permitted provided that the following conditions\n;;; # are met:\n;;; #\n;;; # 1. Redistributions of source code must retain the above copyright\n;;; #    notice, this list of conditions and the following disclaimer.\n;;; #    The contents of this file are deemed to be source code.\n;;; #\n;;; # 2. Redistributions in binary form must reproduce the above copyright\n;;; #    notice, this list of conditions and the following disclaimer in\n;;; #    the documentation and/or other materials provided with the\n;;; #    distribution.\n;;; #\n;;; # This work was supported in part by funding from the Defense Advanced\n;;; # Research Projects Agency, the Office of Naval Research and the National\n;;; # Science Foundation of the United States of America, and by member\n;;; # companies of the Carnegie Mellon Sphinx Speech Consortium. We acknowledge\n;;; # the contributions of many volunteers to the expansion and improvement of\n;;; # this dictionary.\n;;; #\n;;; # THIS SOFTWARE IS PROVIDED BY CARNEGIE MELLON UNIVERSITY ``AS IS'' AND\n;;; # ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,\n;;; # THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n;;; # PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL CARNEGIE MELLON UNIVERSITY\n;;; # NOR ITS EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n;;; # SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n;;; # LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n;;; # DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n;;; # THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n;;; # (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n;;; # OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n;;; #\n;;; # ========================================================================\n;;; #\n");
for($i = 0; $i < sizeof($textrow); $i++){
	fwrite($CSVfile,str_pad($textrow[$i][0],36));
	fwrite($CSVfile,",");
	fwrite($CSVfile,str_pad($textrow[$i][1],96));
	fwrite($CSVfile,"\n");
}
fclose($CSVfile);

?>