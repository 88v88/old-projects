var dp;
var dps;
// all characters and speech bubbles

var step = 0; 
// step dialogue marker

var analyses = ["<div><p>In Frankenstein, Mary Shelley illustrates Victor’s disregard for ethics and the creature’s decisions before creating the monster, proving that scientists who alter an organism’s autonomy do not treat their subjects as rational beings anymore.</p><p>In the above passage from Chapter 2, Victor states his disinterest for the humanities, which are the origins of ethics. He then contrasts himself with Clerval, who exudes ethics by showing compassion and interest in morals. This contrast, coupled with Victor’s elaboration on his interest in the “secrets of the world”, implies that Victor does not care about morals and is even proud of it. Although Victor tells Robert at the end of the book that his talents could benefit humanity, he denigratingly calls them “fellow creatures” and says that he is elevated from the rest of society. From his manner of speech, it is inferred that Victor is truly not interested in the effects his works would have on society. </p></div>","<div><p>The article 'Exposing Smart Cities and Eco-Cities' analyzes Frankenstein-like the social and environmental harm that urban experimental projects intending the opposite have caused, proving that neglecting the effects of the experimental zone’s tenants’ social autonomy causes conflict within the city at large.</p><p>This article analyzes a different science which is larger-scale and more human- oriented than biology: urban planning, which can also learn from Frankenstein. Social units such as experimental urban zones also have autonomy which are more difficult to control than single creatures, especially when money-related ulterior motives are added to the equation. The article describes tensions between the projects’ rich benefactors and poor neighbors who are prevented from enjoying the projects’ benefits that the authors predicted would spread to the less fortunate, just as the monster disserviced humans when Victor thought humans would benefit from the monster. The paper cites the same reason for the projects’ failures as the monster’s turn to evil: prioritizing personal gain (money for the Abu Dhabi project’s initiators/knowledge for Victor) over societal benefit, which causes them to neglect their creation’s behavior in relation to society.</p></div>","<div><p>In the article 'A Spark of Being: Anesthesiology and Frankenstein', an anesthesiologist contrasts her profession’s motives with those of the outwardly similar Frankenstein, proving that the subject’s autonomy is to be prioritized when altering it.</p><p>The article connects Frankenstein extensively with not only modern science and medicine, but also examples of her personal leadership in ethics of medicine. She highlights how members of her organization Frankenstein@200 are an antithesis to Victor by publicizing medical research instead of hiding it because freedom of information improves society by giving more information to help decision-making. Audrey Shafer also analyzes Frankenstein, explicitly stating that Victor’s rejection of the creature caused the monster to become criminal rather than some wrathful religious reason. The article shows Frankenstein’s influence on scientific ethics by showcasing Audrey Shafer’s antitheses of compassionate anesthesiologists to antisocial Victor, showing that doctors actively try to avoid the book’s situation.</p></div>","<div><p>The article 'How a Horror Story Haunts Science' presents scientists’ insights on Frankenstein in relation to modern science to emphasize that treating the monster as a mindless test subject rather than an equal violated ethics, proving that it is immoral for scientists to neglect the subject’s autonomy.</p><p>The article revealed opinions of both sides from the scientific community which has been influenced by Frankenstein. Although Jon Cohen concludes that Mary Shelley was only superficially inspired by the science of the day and more by her personal emotions and nightmares, the fact can teach scientists to treat their biological subjects—human or not—like an impressionable child that needs care instead of an inanimate object. Even bacteria can infect and kill people if not given a more attractive food source. The author and scientists wrote positively about the fact that there are now institutional review boards to prevent unethical experiments, showing the lessons they learned to prevent the book from happening in real life and disproving the popular conception that Victor could not have controlled the monster. He could have used his effort to care for the monster and suffered as a result of choosing to focus on other frivolities, just as bacteria can cause a pandemic if a doctor focuses on schmoozing with patients instead of taking the effort to following standard operating procedures to prevent the spread of germs.</p></div>"]; 
// full analyses

var execution = 0;
// 0 = c = coffee, 1 = u = wedgie

var chat = [0,"Hey, beautiful human... (Press X to continue.)","Modern scientists reflect on the impact of Frankenstein on the development of ethical standards in science in the two centuries since the book was authored, (Press X to continue.)","proving that Mary Shelley’s main purpose for writing it was emphasis of respecting an autonomous being rather than divine wrath or feminism. (Press X to continue.)","Hold down the space bar during each scene to read its literary analysis. I've convinced the judge to believe me, and I have a newfound will to live. (Press X to prosecute Victor.)",0,0,"'I learned that the possessions most esteemed by your fellow creatures were high and unsullied descent united with riches. A man might be respected with only one of these advantages, but without either he was considered, except in very rare instances, as a vagabond and a slave, doomed to waste his powers for the profits of the chosen few![1]'"," Even poor people’s autonomy should be respected, even if they do not have money as a tool of influence. When the wealthy do not treat their less-monied counterparts as such, they resort to violent revolt, just as I did when Victor stopped acknowledging me shortly after my birth.","Quit roasting me!","I grew up on a farm, worked hard, and became the man I am today! You have no excuses, you Parisian who squandered your wealth! You don’t deserve to be rich, you frivolous twat who gave up your livelihood for a random girl!","You will inevitably go from riches to rags with that arrogance of yours, just like me!","No, I won't!","Yes, you will!","Shut up, both of you!",0,"We need to build the perfect city of our dreams, so that the world will look up to us! You, rich guy, will finance the construction.There will be electric cars with chargers spread around the district, and businesses will flock here to make you richer through property taxes. You will also get richer by selling and renting these cool apartments which don’t smell musty like the rest of Geneva!",0,"What can I do in this town?","You can take that barrel of yours and sail down Niagara Falls!","Calm down!","De Lacey can buy something in the shop every once in a while. He might not own an electric car, but gasoline will be banned soon to protect our famously pristine land and air. We’ve scientifically calculated the whole outcome of the Generation Eva Initiative with our huge team of expert analysts, economists, and leaders in public policy."," Silly! City districts aren’t made of stone like their buildings. A group of people is autonomous like a person. The initiative will inevitably vote public funds to itself when other, impoverished districts need them more. And the poverty of the poor districts, despite the historical buildings, will contrast in a ugly way.","Like me! They call it “Frankenstein urbanism”[2]. Victor chose the most beautiful eyes, hair, and teeth, but look at me. Ug-ly! Urban projects that do not consider the autonomous interaction within the city are bound to fail.","I'm not corrupt, so back to the drawing board...","Dang it!",0,0,0,"Victor is accused of two counts of first degree manslaughter, one count of second degree manslaughter, one count of destruction of private property, one count of arson, one count of child abuse, one count of forgery, and two counts of assault.","Hey magistrate! You were supposed to believe me, not that inhuman piece of shit!","That is no way to behave in a court. Go on, human.","'I was soon introduced into the presence of the magistrate, an old benevolent man with calm and mild manners. He looked upon me, however, with some degree of severity, and then, turning towards my conductors, he asked who appeared as witnesses on this occasion.[1]'","I knew what I saw with my own eyes, so I am right and you must give up your false sense of autonomy and believe me.","Aww, that was flattering. But I wasn’t talking to you.","'Accursed creator! Why did you form a monster so hideous that even you turned from me in disgust? God, in pity, made man beautiful and alluring, after his own image; but my form is a filthy type of yours, more horrid even from the very resemblance. Satan had his companions, fellow devils, to admire and encourage him, but I am solitary and abhorred.[1]'","'Your evil passions will be renewed, and you will then have a companion to aid you in the task of destruction. This may not be; cease to argue the point, for I cannot consent.[1]' Since your creation, I’ve always known that you would be evil.","'I was benevolent and good; misery made me a fiend.[1]' You were the one who made me miserable with your neglect. You could have chosen to ignore that bimbo Elizabeth and focus on me, fresh to the world and in need of guidance!","De Lacey told me earlier,'To be friendless is indeed to be unfortunate, but the hearts of men, when unprejudiced by any obvious self-interest, are full of brotherly love and charity.[1]' You are brimming with primal self-interest and completely ignored mine!","You’re just a subhuman monster whose 'interests' are to be deferred in favor of the interests of superior humans like my loving Elizabeth that you took away from me.","Clunk clunk! Victor is guilty to all charges.","Press C to sentence Victor to coffee-spraying by firing squad. Press U to hang Victor from a flagpole by the underpants.","Douse him!|Give him that atomic wedgie!","It is decided. Guards, take him away!","No! What has the justice system become, favoring that thing over me?",0,0,0,0,0,0,0,0,"Haha, Doc, he is so ugly! How could Elizabeth stand do look at him? No wonder he caused so many deaths. I’ve gained a lot of skills in the simulation lab, so let me sew his hands onto his eyes so that he may not prejudice ever again.","No way! Although Victor was a twat, we’ve taken the Hippocratic oath and the duty to try to save anyone, even twats. Even terrorists, for the matter. We must not be like Victor and ignore the human behind the skull[3].","Aww, dude! Give me a chance. He won’t survive execution anyway. I’ve helped you save so many patients by creating the automatic AED that patients can use on themselves a split second after cardiac arrest.","Stop fooling around and hand me the curved scissors. We have a job to do, and Victor didn’t. He didn’t treat his creation with human rights, and we do, no matter how mangled they look.",0,0,"Victor has died of bleeding from abdominal laceration, but his limbs are intact. In fact, they are healthier than average, having been strengthened by mountain climbing and sledding.","I told you he would die!","That’s not my point. I will chop them off and transplant them on amputees from the war.","Something smells familiar...","Me? I care about ethics, unlike Victor. My plans were already approved by the institutional review board, and I’ve already gotten signed consent from our honorable veterans, who all deserve a complete, functioning body. And I will follow up on them if they run into any problems, unlike Victor who ran away from his monster’s requests for help[4].","Fair enough. At least you respect the autonomy of your living patients.","Thanks. I'm the nicest girl around! I don't believe in semiautomatic lifeforms, because you can never ethically take away a patient's autonomy.",0]; 
// dialogue strings. Replace 0 with commands of animation.

var chatchar = [9,0,0,0,0,9,9,0,0,1,2,1,2,1,3,9,3,9,1,2,3,3,1,0,3,2,9,9,9,4,5,4,5,5,4,0,5,0,0,5,4,4,0,4,5,9,9,9,9,9,9,9,9,7,6,7,6,9,9,8,7,8,7,8,7,8,9]; 
// speaker of dialogue strings html object reference

document.addEventListener("mousemove",para);
document.addEventListener("keyup",contue);
document.addEventListener("keydown",watching);

function watching(e){
	if(e.code == "Space"){
		document.getElementById("analiz").style.opacity = 1;
	}
}

function para(e){
	p = document.getElementById("background");
	p.style.top = (e.clientY/window.innerHeight-0.99) * 45 + "%";
	p.style.left = (e.clientX/window.innerWidth - 1) * 5 + "%";
}

function contue(e){
	if(e.code == "KeyX" && chatchar[step] != 9 && step != 41){
		stepup();
	}
	if(e.code == "KeyC" && step == 41){
		chat[42] = "Douse him!";
		stepup();
	}
	if(e.code == "KeyU" && step == 41){
		execution = 1;
		chat[42] = "Give him that atomic wedgie!";
		stepup();
	}
	if(e.code == "Space"){
		document.getElementById("analiz").style.opacity = 0;
	}
}

var imgs = document.images,
    len = imgs.length,
    counter = 0;

[].forEach.call( imgs, function( img ) {
    img.addEventListener( 'load', incrementCounter, false );
} );

function incrementCounter() {
    counter++;
    if ( counter === len ) {
        prep();
    }
}

function prep(){
	document.getElementById("textinfo").innerHTML = "Unethical Alterations of Biological Autonomy in <i>Frankenstein</i>";
	document.getElementById("analiz").innerHTML = analyses[0];
	dp = document.getElementsByClassName("character");
	dps = document.getElementsByClassName("speech");
	if(step == 0 && document.getElementById("bullshit").style.display == "none"){
		dp[0].style.opacity = 1;
		dp[0].style.left = "10vw";
		setTimeout(function(){dp[2].style.top = "26vw";setTimeout(stepup,1000)},300);
	}
}

function stepup(){
	step++;

	for (var k = 0; k < 9; k++){
		dps[k].style.opacity = 0;
		dps[k].style.innerText = "";
	}	

	if(chat[step] != 0){
		dps[chatchar[step]].style.opacity = 1;
		dps[chatchar[step]].innerText = chat[step];
	}

	if(step == 5){
		document.getElementById("background").style.opacity = 0;
		setTimeout(stepup,500);
	}
	if(step == 6){
		document.getElementById("analiz").innerHTML = analyses[1];
		document.getElementById("textinfo").innerHTML = "Environs of Geneva, Switzerland";
		document.getElementById("titlebkg").style.opacity = 0;
		document.getElementById("mountainbkg").style.opacity = 1;
		dp[0].style.left = "25vw";
		dp[1].style.opacity = 1;
		dp[1].style.left = "0";
		dp[2].style.opacity = 1;
		dp[2].style.left = "45vw";
		dp[3].style.opacity = 1;
		dp[3].style.left = "65vw";
		document.getElementById("background").style.opacity = 1;
		setTimeout(stepup,1000);
	}
	if(step == 15){
		document.getElementById("drawing").style.opacity = 1;
		setTimeout(stepup,500);
	}
	if(step == 17){
		document.getElementById("drawing").style.opacity = 0;
		setTimeout(stepup,500);
	}
	if(step == 26){
		document.getElementById("background").style.opacity = 0;
		setTimeout(stepup,500);
	}
	if(step == 27){
		document.getElementById("textinfo").innerHTML = "Court of Geneva, Switzerland";
		document.getElementById("mountainbkg").style.opacity = 0;
		document.getElementById("courtin").style.opacity = 1;
		document.getElementById("courtout").style.opacity = 1;
		dp[0].style.opacity = 0;
		dp[1].style.opacity = 0;
		dp[2].style.opacity = 0;
		dp[3].style.opacity = 0;
		document.getElementById("background").style.opacity = 1;
		setTimeout(stepup,1000);
	}
	if(step == 28){
		document.getElementById("courtout").style.transform = "scale(9)";
		document.getElementById("courtout").style.left = "-900vw";
		setTimeout(stepup,3000);
	}
	if(step == 29){
		dp[4].style.opacity = 1;
		dp[4].style.left = "40vw";
		dp[5].style.opacity = 1;
		dp[5].style.left = "70vw";
		dp[0].style.opacity = 1;
		dp[0].style.left = "10vw";
		document.getElementById("courtout").style.opacity = 0;
	}
	if(step == 45){
		document.getElementById("background").style.opacity = 0;
		setTimeout(stepup,500);
	}
	if(step == 46){
		document.getElementById("courtin").style.opacity = 0;
		if(execution){
			document.getElementById("textinfo").innerHTML = "Victor is Executed by Flagpole Wedgie";
			document.getElementById("wedgie").style.opacity = 1;
		} else {
			document.getElementById("textinfo").innerHTML = "Victor is Executed by Coffee Firing Squad";
			document.getElementById("coffeeload").style.opacity = 1;	
		}
		dp[0].style.opacity = 0;
		dp[4].style.opacity = 0;	
		dp[5].style.opacity = 0;
		document.getElementById("background").style.opacity = 1;
		setTimeout(stepup,2000);
	}
	if(step == 47){
		if(execution){
			document.getElementById("wedgie").style.filter = "sepia(100%)";
		} else {
			document.getElementById("coffeeload").style.filter = "sepia(100%)";	
		}
		setTimeout(stepup,2000);
	}
	if(step == 48){
		document.getElementById("background").style.opacity = 0;
		if(execution){
			document.getElementById("wedgie").style.opacity = 0;
		} else {
			document.getElementById("coffeeload").style.opacity = 0;	
		}
		setTimeout(stepup,500);
	}
	if(step == 49){
		if(execution){
			document.getElementById("flagpole").style.opacity = 1;
		} else {
			document.getElementById("coffeeshoot").style.opacity = 1;	
		}
		document.getElementById("background").style.opacity = 1;
		setTimeout(stepup,2000);
	}
	if(step == 50){
		if(execution){
			document.getElementById("flagpole").style.filter = "sepia(100%)";
		} else {
			document.getElementById("coffeeshoot").style.filter = "sepia(100%)";	
		}
		setTimeout(stepup,2000);
	}
	if(step == 51){
		document.getElementById("background").style.opacity = 0;
		if(execution){
			document.getElementById("flagpole").style.opacity = 0;
		} else {
			document.getElementById("coffeeshoot").style.opacity = 0;	
		}
		setTimeout(stepup,500);
	}
	if(step == 52){
		document.getElementById("analiz").innerHTML = analyses[2];
		document.getElementById("textinfo").innerHTML = "Hospital of Switzerland";
		document.getElementById("surgery").style.opacity = 1;
		document.getElementById("background").style.opacity = 1;
		dp[6].style.opacity = 1;
		dp[6].style.left = "30vw";
		dp[7].style.opacity = 1;
		dp[7].style.left = "70vw";
		setTimeout(stepup,500);
	}
	if(step == 57){
		document.getElementById("surgery").style.opacity = 0;
		document.getElementById("background").style.opacity = 0;
		setTimeout(stepup,500);
	}
	if(step == 58){
		document.getElementById("analiz").innerHTML = analyses[3];
		document.getElementById("textinfo").innerHTML = "Morgue of Switzerland";
		document.getElementById("autopsy").style.opacity = 1;
		dp[6].style.opacity = 0;
		dp[7].style.left = "30vw";
		dp[8].style.opacity = 1;
		dp[8].style.left = "70vw";
		document.getElementById("background").style.opacity = 1;
		setTimeout(stepup,500);
	}
	if(step == 66){
		document.getElementById("analiz").innerHTML = "";
		document.getElementById("ref").style.opacity = 1;
		document.getElementById("textinfo").innerHTML = "And so was the fate of Victor at the hands of the <i>Semiautomatic Lifeform</i>.";
		document.getElementById("autopsy").style.opacity = 0;
		dp[8].style.opacity = 0;
		dp[7].style.opacity = 0;
	}
}