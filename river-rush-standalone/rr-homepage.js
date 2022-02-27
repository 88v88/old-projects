bkgInfo = createBoard(5,9,3);
document.getElementById("board").innerHTML = bkgInfo[1];
const c = ["Grass.png", "Grass.png", "Grass.png", "GrassV0.png", "GrassV0.png", "GrassV1.png"];
for (var i = 0; i < document.getElementsByClassName("BoardTile").length; i++){
	var k = document.getElementsByClassName("BoardTile")[i];
	if(k.className.length == 9){
		k.style.backgroundImage = "url(" + c[Math.floor(Math.random()*6)] + ")";
	}
}

function moveBkg(){
	document.getElementById("board").style.transformOrigin = Math.floor(Math.random()*100) + "% " + Math.floor(Math.random()*100) + "% 0px";
	setTimeout(moveBkg,10000); 
}

moveBkg();