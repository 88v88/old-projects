var playing = 0;
var squID;
var gameID;
var hostSend;
document.getElementById("topbar").addEventListener("mouseover",function(){document.getElementById("topbar").style.top = "0"});
document.getElementById("topbar").addEventListener("mouseout",function(){document.getElementById("topbar").style.top = "-58px"});
document.getElementById("playbutton").addEventListener("click",configHost);
