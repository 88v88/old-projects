// RIVER RUSH for WATERCOOKIES
//...._,_,_,_.....
//...|..\^../.....
//....\__\_/......
//...|\_|.|_/|....
//...\..|.|../....
//....\_|_|_/.....
//    by 

// Don't spoil the kids' fun!

function open(e) {
    if (e.target.className.length > 13)
        for (e.target.className = "menuopen", i = 0; i < 5; i++) document.getElementsByClassName("topl")[i].className = "toplinks topl";
    else
        for (e.target.className = "menuopen menuopened", i = 0; i < 5; i++) document.getElementsByClassName("topl")[i].className = "toplinks topl toplinksopen"
}

if(document.getElementsByClassName("menuopen")[0]){
	document.getElementsByClassName("menuopen")[0].addEventListener("click", open);
}

function configHost(e) {
    if (document.getElementById("Audio").loop = !0, document.getElementById("Audio").play(), "playbutton" == e.target.id) return e.target.style.left = "100vw", e.target.parentNode.children[0].style.left = "100vw", void setTimeout(function() {
        e.target.style.left = "0", e.target.parentNode.children[0].style.left = "0", e.target.parentNode.children[0].textContent = "What grades are playing?.", e.target.outerHTML = "<div style='left:20%; width:150px' id='easy'>K-3</div><div style='right:20%; width:150px' id='hard'>4-7</div>", document.getElementById("easy").addEventListener("click", configHost), document.getElementById("hard").addEventListener("click", configHost)
    }, 500);
    if ("K-3" == e.target.textContent) var t = createBoard(3, 3, 3);
    else t = createBoard(5, 7, 5);
    var a = 1e5 + Math.floor(899999 * Math.random()),
        n = (document.getElementById("board").innerHTML, {
            level: t[0],
            board: t[1],
            path: t[2],
            code: a
        });
    squID = t[2];
    var o = new XMLHttpRequest;
    o.open("POST", "opengame.php", !0), o.responseType = "text", o.onload = function() {
        o.readyState == o.DONE && 200 == o.status && (gameID = o.response, e.target.parentNode.className = "ColorAnim", e.target.parentNode.innerHTML = "<br /><b>Have your players join watercookies.org/play and enter this code.</b><b id='nameholder'></b><h1>" + a + "</h1><b id='launchgame'>Start</b>", document.getElementById("launchgame").addEventListener("click", function() {
            playing = 1
        }), nameCatcher())
    }, o.setRequestHeader("Content-Type", "application/json"), o.send(JSON.stringify(n))
}

function createBoard(e, t, a) {
    var n = [],
        o = [],
        s = e,
        r = t,
        l = a,
        i = Math.floor(6 * Math.random()) + 2;
    s % 2 != 1 && s++, r % 2 != 0 && r++, l % 2 != 1 && l++;
    var d = s + l,
        m = r + i;
    const c = ["../Grass.png", "../Grass.png", "../Grass.png", "../GrassV0.png", "../GrassV0.png", "../GrassV1.png"];
    for (var u = 0; u < m; u++) {
        n.push([]);
        for (var g = 0; g < d; g++) n[u].push(""), document.getElementById("board").innerHTML += "<div class='BoardTile' style='top:" + 128 * (d - g - 1) + "px; left:" + 128 * u + "px;'></div>"
    }
    n[m - 1][0] = 0;
    var h = 0,
        p = [],
        y = m;
    for (u = 0; u < s - 1; u++) p.push(Math.floor(Math.random() * (y - 1)) + 2), y = m - y + p[u];
    var f = m - 1,
        w = -1;
    for (u = 0; u < s - 1; u++) {
        w = u % 2 == 1 ? 1 : -1;
        for (g = 0; g < p[u]; g++) {
            n[f + w * g][u] = h, o.push((f + w * g) * d + u);
            var v = document.getElementsByClassName("BoardTile")[u + (f + w * g) * d];
            0 == g || g == p[u] - 1 ? (v.className += " RBend", 0 == g && u % 2 == 0 && (v.style.transform = "rotate(180deg)"), 0 == g && u % 2 == 1 && (v.style.transform = "rotate(90deg)"), g == p[u] - 1 && u % 2 == 1 && (v.style.transform = "rotate(-90deg)")) : (v.className += " RStraight", v.innerHTML += "<div class='Flow" + (1 + w) + "'></div>"), h++
        }
        f += w * (p[u] - 1)
    }
    for (g = f; g > -1; g--) {
        n[g][u] = h, o.push(u + g * d);
        v = document.getElementsByClassName("BoardTile")[u + g * d];
        g == f || 0 == g ? (g == f && (v.style.transform = "rotate(180deg)"), v.className += " RBend") : (v.className += " RStraight", v.innerHTML += "<div class='Flow0'></div>"), h++
    }
    p = [], y = l;
    for (u = 0; u < r - 1; u++) p.push(Math.floor(Math.random() * (y - 1) + 2)), y = l - y + p[u];
    f = s, w = 1;
    for (u = 0; u < r - 1; u++) {
        w = u % 2 == 1 ? -1 : 1;
        for (g = 0; g < p[u]; g++) {
            n[u][f + w * g] = h, o.push(f + w * g + u * d);
            v = document.getElementsByClassName("BoardTile")[f + w * g + u * d];
            0 == g || g == p[u] - 1 ? (v.className += " RBend", 0 == g && u % 2 == 0 && (v.style.transform = "rotate(-90deg)", 0 == u && (v.className = "BoardTile RStraight", v.style.transform = "rotate(90deg)", v.innerHTML += "<div class='Flow" + (2 + w) + "'></div>")), 0 == g && u % 2 == 1 && (v.style.transform = "rotate(180deg)"), g == p[u] - 1 && u % 2 == 0 && (v.style.transform = "rotate(90deg)")) : (v.className += " RStraight", v.style.transform = "rotate(90deg)", v.innerHTML += "<div class='Flow" + (2 + w) + "'></div>"), h++
        }
        f += w * (g - 1)
    }
    for (g = f; g > s - 1; g--) {
        n[u][g] = h, o.push(g + u * d);
        v = document.getElementsByClassName("BoardTile")[g + u * d];
        g == f || g == s ? (v.className += " RBend", g == f && (v.style.transform = "rotate(180deg)")) : (v.className += " RStraight", v.style.transform = "rotate(90deg)", v.innerHTML += "<div class='Flow1'></div>"), h++
    }
    p = [];
    for (y = i, u = 0; u < s - 1; u++) p.push(Math.floor(Math.random() * (y - 1)) + 2), y = i - y + p[u];
    f = r, w = 1;
    for (u = 0; u < l - 1; u++) {
        w = u % 2 == 1 ? -1 : 1;
        for (g = 0; g < p[u]; g++) {
            n[f + w * g][u + s] = h, o.push(u + s + (f + w * g) * d);
            v = document.getElementsByClassName("BoardTile")[u + s + (f + w * g) * d];
            0 == g || g == p[u] - 1 ? (v.className += " RBend", 0 == g && u % 2 == 0 && (v.style.transform = "rotate(90deg)", 0 == u && (v.className = "BoardTile RStraight", v.style.transform = "rotate(0deg)", v.innerHTML += "<div class='Flow" + (1 + w) + "'></div>")), 0 == g && u % 2 == 1 && (v.style.transform = "rotate(180deg)"), g == p[u] - 1 && u % 2 == 0 && (v.style.transform = "rotate(-90deg)")) : (v.className += " RStraight", v.innerHTML += "<div class='Flow" + (1 + w) + "'></div>"), h++
        }
        f += w * (p[u] - 1)
    }
    for (g = f; g < m; g++) {
        n[g][u + s] = h, o.push(u + s + g * d);
        v = document.getElementsByClassName("BoardTile")[u + s + g * d];
        g == f || g == m - 1 ? (v.className += " RBend", g == f && (v.style.transform = "rotate(90deg)"), g == m - 1 && (v.style.transform = "rotate(-90deg)")) : (v.className += " RStraight", v.innerHTML += "<div class='Flow2'></div>"), h++
    }
    for (u = 0; u < m; u++)
        for (g = 0; g < d; g++) {
            var T = document.getElementsByClassName("BoardTile")[u * d + g];
            "BoardTile" == T.className && (T.style.backgroundImage = "url(" + c[Math.floor(Math.random() * c.length)] + ")")
        }
    Math.floor(4 * Math.random());
    var B = !1,
        C = 0;
    do {
        var E = Math.floor(Math.random() * m * d),
            M = document.getElementsByClassName("BoardTile")[E],
            b = document.getElementsByClassName("BoardTile")[E + 1];
        (B = M.className.includes("RStraight") && b.className.includes("RStraight") && M.style.left == b.style.left && !M.style.transform.includes("90deg")) && (b.innerHTML += "<div class='LogBridge'></div>"), C++
    } while (!B || C > 100);
    if (e == t) var N = 0;
    else N = 1;
    return [N, document.getElementById("board").innerHTML, o]
}

function nameCatcher() {
    setTimeout(function() {
        var e = new XMLHttpRequest;
        e.open("POST", "namelist.php", !0), e.responseType = "text", e.onload = function() {
            if (e.readyState == e.DONE && 200 == e.status) {
                var t = e.responseText.split("@", 3),
                    a = JSON.parse(t[0]),
                    n = JSON.parse(t[1]),
                    o = JSON.parse(t[2]);
                document.getElementById("nameholder").innerHTML = "";
                for (var s = 0; s < a.length; s++) document.getElementById("nameholder").innerHTML += "<div class='names'>" + a[s] + "</div>";
                if (0 == playing) nameCatcher();
                else {
                    document.getElementById("config").style.left = "100vw", document.getElementsByClassName("BoardTile")[squID[0]].scrollIntoView({
                        behavior: "smooth"
                    });
                    for (s = 0; s < a.length; s++) {
                        document.getElementById("board").innerHTML += "<div class='playersava'><b class='playerlabel'>" + a[s] + "</b></div>";
                        var r = document.getElementsByClassName("playersava")[s];
                        r.style.left = document.getElementsByClassName("BoardTile")[squID[0]].style.left, r.style.top = document.getElementsByClassName("BoardTile")[squID[0]].style.top, r.style.backgroundImage = "url(" + avatarList[n[s]] + ")", r.style.backgroundColor = o[s]
                    }
                    initializeGame()
                }
            }
        }, e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send("game=" + gameID)
    }, 2e3)
}

function initializeGame() {
    var e = Date.now() + 7e3,
        t = new XMLHttpRequest;
    t.open("POST", "startgame.php", !0), t.responseType = "text", t.onload = function() {
        setTimeout(checkPos, 8e3)
    }, t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.send("game=" + gameID + "&time=" + e), setTimeout(function() {
        document.getElementById("announcer").style.opacity = 1, document.getElementById("announcer").textContent = 5, setTimeout(function() {
            document.getElementById("announcer").textContent = 4, setTimeout(function() {
                document.getElementById("announcer").textContent = 3, setTimeout(function() {
                    document.getElementById("announcer").textContent = 2, setTimeout(function() {
                        document.getElementById("announcer").textContent = 1, setTimeout(function() {
                            document.getElementById("announcer").style.opacity = 0
                        }, 1e3)
                    }, 1e3)
                }, 1e3)
            }, 1e3)
        }, 1e3)
    }, 2e3)
}

function checkPos() {
    setTimeout(function() {
        var e = new XMLHttpRequest;
        e.open("POST", "gameboard.php", !0), e.responseType = "text", e.onload = function() {
            for (var t = JSON.parse(e.response), a = 0; a < document.getElementsByClassName("playersava").length; a++) - 1 == t[a] ? (document.getElementById("announcer").textContent.style.opacity = 1, document.getElementById("announcer").textContent = document.getElementsByClassName("playersava")[a].textContent + "finished River Rush!", setTimeout(document.getElementById("announcer").textContent.style.opacity = 0, 2e3), document.getElementsByClassName("playersava")[a].style.left = document.getElementsByClassName("BoardTile")[squID[t[a]]].style.opacity = 0) : (document.getElementsByClassName("playersava")[a].style.left = document.getElementsByClassName("BoardTile")[squID[t[a]]].style.left, document.getElementsByClassName("playersava")[a].style.top = document.getElementsByClassName("BoardTile")[squID[t[a]]].style.top)
        }, e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send("game=" + gameID), 1 == playing && checkPos()
    }, 2e3)
}

function joinCode(e) {
    if (13 == e.keyCode && 0 == step) {
        var t = new XMLHttpRequest;
        t.open("POST", "joincode.php", !0), t.responseType = "text", t.onload = function() {
            if (t.readyState == t.DONE && 200 == t.status) {
                if (validCode = t.response, validCode > 0) return step++, e.target.style.left = "100vw", e.target.parentNode.children[0].style.left = "100vw", void setTimeout(function() {
                    e.target.parentNode.children[0].textContent = "Your name, please.", e.target.placeholder = "Bob", e.target.maxLength = "32", e.target.value = "", e.target.style.left = 0, e.target.parentNode.children[0].style.left = 0
                }, 500);
                e.target.value = "", e.target.placeholder = "Not found"
            }
        }, t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.send("code=" + e.target.value)
    }
    if (13 == e.keyCode && 1 == step) {
        var a = Math.floor(Math.random() * avatarList.length),
            n = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")",
            o = new XMLHttpRequest;
        o.open("POST", "joinname.php", !0), o.responseType = "text", o.onload = function() {
            if (o.readyState == o.DONE && 200 == o.status) return step++, e.target.style.left = "100vw", e.target.parentNode.children[0].style.left = "100vw", setTimeout(function() {
                e.target.parentNode.children[0].outerHTML = "<div id='ownavatar' style='background-color:" + n + ";background-image:url(" + avatarList[a] + ")'></div><p>" + avatarFact[a] + "</p>", e.target.parentNode.children[0].style.left = 0, ava.push(document.getElementById("ownavatar").style.backgroundColor), ava.push(document.getElementById("ownavatar").style.backgroundImage), e.target.outerHTML = ""
            }, 500), varList = o.responseText.split("@", 4), level = varList[0], boardHTML = varList[1], squID = JSON.parse(varList[2]), playerID = varList[3], void listenCountdown()
        }, o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send("name=" + e.target.value + "&game=" + validCode + "&animal=" + a + "&color=" + n)
    }
}

function listenCountdown() {
    var e = new XMLHttpRequest;
    e.open("POST", "waitstart.php", !0), e.responseType = "text", e.onload = function() {
        e.readyState == e.DONE && 200 == e.status && (e.responseText.length > 2 ? setTimeout(countdown, 2e3) : setTimeout(listenCountdown, 2e3))
    }, e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send("game=" + validCode)
}

function countdown() {
    var e = ["The average American uses nearly three times much water as the average Chinese.", "The word for water in the Zayse-Zergulla language of Ethiopia is 'Watse'.", "An acre of corn evaporates 4000 gallons of water every day.", "Six billion gallons of water are wasted through leaky pipes every day in the USA.", "One leaky tap can waste as much as 34 gallons per day.", "Water is densest at 4°C.", "Water has been found on the moon and Mars.", "Most household water is used in the bathroom.", "On average, a person sweats away half a gallon every day.", "Drinking enough water can prevent cancer by allowing more immune cells to reach damaged ones.", "Water makes up 80% of a newborn baby.", "It takes about 20000 gallons of water to build a car.", "Every two minutes, a major water pipe breaks in the USA.", "Water"];
    document.getElementById("funfact").innerHTML = "<span style='position:absolute;bottom:0;width:100%;text-align:center;left:0;'>" + e[Math.floor(Math.random() * e.length)] + "</span>", document.getElementById("signup").style.left = "100vw", setTimeout(function() {
        document.getElementById("signup").outerHTML = ""
    }, 500), document.getElementById("spinner").className = "spinner", setTimeout(function() {
        document.getElementById("counter").textContent = "4", setTimeout(function() {
            document.getElementById("counter").textContent = "3", setTimeout(function() {
                document.getElementById("counter").textContent = "2", setTimeout(function() {
                    document.getElementById("counter").textContent = "1", setTimeout(function() {
                        document.getElementById("countdown").outerHTML = "", startGame()
                    }, 1e3)
                }, 1e3)
            }, 1e3)
        }, 1e3)
    }, 1e3)
}

function startGame() {
    document.getElementById("board").innerHTML += boardHTML;
    var e = ava[0],
        t = ava[1],
        a = ["What is the biggest rainforest in the world?", "What kind of water body dries up every year during the summer?", "What is a good way to save water at home?", "What is the most common groundwater pollutant?", "What is the tallest waterfall in the world?", "What are twig catfish unique for eating?", "Which of the following is about as big as the heart of a great blue whale?", "Where can evaporation happen?", "Where does the energy come from to power the water cycle?", "What is the state of water when it's falling from the sky?", "How many people do not have regular access to clean water?", "How much water does it take to fill the average swimming pool?", "How much water is evaporated from an uncovered swimming pool every month?", "How much of Earth's water is salty?", "What is the percentage of water in an adult human body?", "What is the percentage of water in a baby's body?", "Which way can you use less toilet water?", "Which product uses the most water to make?"],
        n = ["Amazon Rainforest", "Southeast Asian Rainforest", "Pacific Temperate Rainforest", "Monteverade Rainforest", "Vernal pool", "Freshwater lake", "Tidal pool", "Wetland lake", "Fix a leaky tap", "Water the lawn", "Use the air conditioner", "Take a bubble bath", "Fertilizer", "Plastic bags", "Soda cans", "Toilet paper", "Angel Falls, Venezuela", "Kjelfossen, Norway", "Niagara Falls, USA/Canada", "Snow Creek Falls, USA", "Wood", "Plastic", "Rocks", "Cat food", "Car", "Bus", "Trailer", "SUV", "All the others", "Oceans", "Rivers", "Ponds", "Sun", "Moon", "Wind", "Clouds", "Precipitation", "Evaporation", "Condensation", "Runoff", "880 million", "250 million", "50 million", "1 million", "22,000 gallons", "2,500 gallons", "50,000 gallons", "75,000 gallons", "100-900 gallons", "0-100 gallons", "1,000-5,000 gallons", "More than 5,000 gallons", "97%", "75%", "50%", "33%", "66%", "33%", "75%", "90%", "75%", "90%", "50%", "33%", "All the others", "Buy a water-saving toilet", "Put a brick in the water tank", "Don't flush the pee", "Cotton t-shirt", "Hamburger", "Cup of coffee", "Microchip"],
        o = ["How much of the US’s coastal wetlands are in the Mississippi river delta?", "What is the biggest type of aquatic ecosystem on Earth?", "What is the maximum amount of  water an old toilet can use per flush?", "What caused lead contamination in the Flint water crisis?", "Why does water take longer to boil on the top of a mountain?", "Why does water boil at a lower temperature on the top of a mountain?", "How long can hellbenders, America’s largest salamanders, live in the wild?", "In which stage of the water cycle do clouds form?", "Which substance can exist as a liquid, gas, or solid in nature?", "Where does some water from the water cycle collect underground?", "Rain, snow, hail, and sleet are all examples of which stage of the water cycle?", "What part of the water cycle is mountain snow melting into a creek which soon reaches the ocean?", "Which is not a type of cloud?", "How much water does it take to produce a serving of poultry, including transportation?", "How many times water does it take to wash dishes by hand than using a dishwasher?", "Which way can you save water in the garden?", "Where should you never reuse greywater that came from showers, baths, and sinks?"],
        s = ["40%", "85%", "20%", "5%", "Marine ecosystem", "Freshwater ecosystem", "Wetland ecosystem", "Riparian ecosystem", "7 gallons", "1.6 gallons", "5 gallons", "3 gallons", "Chloride-rich river water corroded lead pipes", "Flint river water was rich in lead", "Lead was added during water treatment", "Lead was illegally dumped into pipes", "Lower air pressure", "Mountain air is colder", "Smaller stoves are used", "Mountain water contains minerals that raise the boiling point", "The air pressure is lower", "The mountain air is colder", "Less water is boiled on mountains", "Lower humidity on mountains", "25 years", "7 years", "3 years", "12 years", "Condensation", "Precipitation", "Evaporation", "Transpiration", "Water", "Methane", "Nitrogen", "Ammonia", "Aquifers", "Caves", "Topsoil", "Volcanoes", "Precipitation", "Evaporation", "Condensation", "Runoff", "Runoff", "Condensation", "Precipitation", "Evaporation", "Strombus", "Cirrus", "Cumulus", "Stratus", "145 gallons", "90 gallons", "25 gallons", "5 gallons", "5 times", "0.5 times", "2 times", "13 times", "All the others", "Mulch the garden", "Drip irrigate instead of spraying water", "Use soil wetting agents or water crystals", "Raw vegetables", "Flowers", "Lawns", "Seedlings"];

    function r() {
        if (document.getElementsByClassName("BoardTile")[squID[pos]].scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            }), document.getElementById("playerava").style.left = document.getElementsByClassName("BoardTile")[squID[pos]].style.left, document.getElementById("playerava").style.top = document.getElementsByClassName("BoardTile")[squID[pos]].style.top, 1 == level) {
            var e = Math.floor(Math.random() * o.length),
                t = o[e];
            (m = []).push(s[4 * e]), m.push(s[4 * e + 1]), m.push(s[4 * e + 2]), m.push(s[4 * e + 3]);
            var r = [];

            function i(e) {
                for (var t, a, n = e.length; 0 !== n;) a = Math.floor(Math.random() * n), t = e[n -= 1], e[n] = e[a], e[a] = t;
                return e
            }
            r = i(m);
            for (var d = 0; d < 4; d++) r[d] == s[4 * e] && (correct = d)
        } else {
            var m;
            e = Math.floor(Math.random() * a.length), t = a[e];
            (m = []).push(n[4 * e]), m.push(n[4 * e + 1]), m.push(n[4 * e + 2]), m.push(n[4 * e + 3]);
            r = [];

            function i(e) {
                for (var t, a, n = e.length; 0 !== n;) a = Math.floor(Math.random() * n), t = e[n -= 1], e[n] = e[a], e[a] = t;
                return e
            }
            r = i(m);
            for (d = 0; d < 4; d++) r[d] == n[4 * e] && (correct = d)
        }
        tapTime = Date.now();
        for (d = 0; d < 4; d++) document.getElementsByClassName("answer")[d].style.backgroundColor = "#eff";
        document.getElementById("question").textContent = t, document.getElementsByClassName("answer")[0].textContent = "A. " + r[0], document.getElementsByClassName("answer")[1].textContent = "B. " + r[1], document.getElementsByClassName("answer")[2].textContent = "C. " + r[2], document.getElementsByClassName("answer")[3].textContent = "D. " + r[3], document.getElementById("QandA").style.opacity = "1";
        for (d = 0; d < 4; d++) document.getElementsByClassName("answer")[d].addEventListener("click", l);
        document.getElementById("waterlevel").className = "wateranimation"
    }

    function l(e) {
        0 == answered && (answered = 1, document.getElementById("waterlevel").className = "", "A" == e.target.textContent.slice(0, 1) && 0 == correct || "B" == e.target.textContent.slice(0, 1) && 1 == correct || "C" == e.target.textContent.slice(0, 1) && 2 == correct || "D" == e.target.textContent.slice(0, 1) && 3 == correct ? (tapTime = Date.now() - tapTime, function() {
            document.getElementById("QandA").style.opacity = "0", tapTime < 5e3 ? newPos = Math.floor(Math.random() * ((5e3 - tapTime) / 1e3) + 1) : newPos = 1;
            if (document.getElementById("dice").innerHTML = "<div class='spinnumber' style='background-color:rgb(" + Math.floor(100 * Math.random()) + "," + Math.floor(150 * Math.random()) + ", 240)'></div><b class='spinnumber'>" + newPos + "</b>", correct = -1, pos + newPos >= squID.length) t = 0, document.getElementById("interact").innerHTML = 0 == t ? "<h1 style='width:100%;text-align:center;color:#fff;'>You won River Rush!</h1>" : "<h1 style='width:100%;text-align:center;color:#fff;'>Sorry, the waters didn't flow your way!</h1>", pos = -1;
            else {
                pos += newPos;
                var e = new XMLHttpRequest;
                e.open("POST", "position.php", !0), e.responseType = "text", e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send("player=" + playerID + "&pos=" + pos)
            }
            var t;
            setTimeout(function() {
                document.getElementById("dice").innerHTML = "", answered = 0, setTimeout(r, 500)
            }, 2e3)
        }()) : function() {
            for (var e = 0; e < 4; e++) correct == e ? document.getElementsByClassName("answer")[e].style.backgroundColor = "#cfc" : document.getElementsByClassName("answer")[e].style.backgroundColor = "#fcc";
            correct = -1, setTimeout(function() {
                document.getElementById("QandA").style.opacity = "0", answered = 0, setTimeout(r, 500)
            }, 2e3)
        }())
    }
    document.getElementById("playerava").style.backgroundColor = e, document.getElementById("playerava").style.backgroundImage = t, r()
}
var avatarList = ["../dolphin.png", "../duck.png", "../eel.png", "../fish.png", "../frog.png", "../hellbender.png", "../otter.png", "../piranha.png", "../ray.png", "../turtle.png"];