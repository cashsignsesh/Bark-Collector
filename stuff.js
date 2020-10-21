
    $("#the_dog").click(mainDogClick);

    $("body").on("mouseover",".fallingImg",remElemDOC);
    $("body").on("mouseover",".fallingImg",beginDigesting);

    $("body").on("mouseover",".excrement",function (e) { ateExcrement(e,2+(friends*2)); } );

    $("body").on("click","#bird",clickedBird);
    $("body").on("click","#bird0",clickedBird0);
    
    $("body").arrive("*",newNode);

    //Main tracker variables
    var barks=0,fxTracker=0,upgradeBoxTracker=14,friends=0,dogFood=0,megaphones=0,dogToys=0,birdHuntingGroups=0,robotDogs=0,
        clinics=0,
        experiencedPoisonGas=false,guiLocked=false,experiencedBirdHunting=false,oxyCotton=false,adderall=false;

    //Incrementors
    var mainDogIncrementor=1,alertCtr=0,oxyCottonUses=0,adderallUses=0;

    //Unlocks
    var unlockedUpgradesBox=false,unlockedDogFood=false,unlockedMegaphone=false,unlockedBirdHuntingP=false,unlockedBirdHunting=false,unlockedRobotDog=false,unlockedClinic=false;

    //Constants
    const milestone0=10,milestone1=75,milestone2=200,milestone3=600,milestone4=3000,milestone5=15000,
    friendCost=50,dogFoodCost=150,megaphoneCost=500,birdHuntingCost=2000,robotDogCost=10000,clinicCost=25000;

    //Elements
    var boxElem,boxTitle,upgrade_friend,upgrade_dogFood,upgrade_megaphone,upgrade_birdHunting,upgrade_robotDog,upgrade_clinic;
    
    //Other
    var clinicItems = [];

    function mainDogClick (hardFx) {
		
        bark(mainDogIncrementor);
        ++fxTracker;
        chkEffects(hardFx);

    }

    function bark (increment) {

        barks+=((increment>0)?increment*(1+(megaphones/10)):increment);
        //TODO:: Play bark sound (maybe? lol)
        document.getElementById("barks").innerHTML=Math.floor(barks).toString();

        chkUpgradesUpdate();

    }

    function chkUpgradesUpdate () {

        if (barks>milestone0&&(!(unlockedUpgradesBox))) {

            unlockedUpgradesBox=true;   
            boxElem=document.createElement("div"),
            upgrade_friend=document.createElement("p"),
            boxTitle=document.createElement("p");
            boxTitle.setAttribute("class","upgradeTitle");
            boxTitle.innerHTML="Upgrades";
            boxElem.setAttribute("id","upgrades");
            upgrade_friend.setAttribute("class","upgradeTxt");
            upgrade_friend.setAttribute("onclick","buyFriend()");
            upgrade_friend.style.top="7%";
            upgrade_friend.innerHTML="Find friend ("+friendCost.toString()+" barks)";
            document.body.appendChild(boxElem);
            boxElem.appendChild(boxTitle);
            boxElem.appendChild(upgrade_friend);

        }

        if (barks>milestone1&&(!(unlockedDogFood))) {

            unlockedDogFood=true;

            addToUpgradeBox(upgrade_dogFood,"Beg for food",dogFoodCost,"buyDogFood()");

        }

        if (barks>milestone2&&(!(unlockedMegaphone))) {

            unlockedMegaphone=true;

            addToUpgradeBox(upgrade_megaphone,"Steal megaphone",megaphoneCost,"buyMegaphone()");

        }

        if ((!(unlockedBirdHunting))&&barks>milestone3&&megaphones>0) unlockedBirdHuntingP=true;

        if (!(unlockedBirdHuntingP)) return;

        if (!(unlockedBirdHunting)) {

            unlockedBirdHunting=true;

            addToUpgradeBox(upgrade_birdHunting,"Organize bird hunting",birdHuntingCost,"buyBirdHunting()");

        }

        if (barks>milestone4&&(!(unlockedRobotDog))) {

            unlockedRobotDog=true;

            addToUpgradeBox(upgrade_robotDog,"Craft robot dog",robotDogCost,"buyRobotDog()");

        }
        
        if (barks>milestone5&&(!(unlockedClinic))) {
            
            unlockedClinic=true;
            
            addToUpgradeBox(upgrade_clinic,"Take over veterinarian clinic",clinicCost,"buyClinic()");
            
        }

        /*
                    Ideas for future purchases:
                    Something for 100k, milestone at 30k
                    Human mind control machine (250k cost, maybe makes everything cheaper by /2 per purchase apart from itself, unlock casino as side effect and execute in way similar to clinic, also (unless first purchase) 25% chance to fail, if it does fail 50/50 to: mind control unexpected behaviour, humans went insane or mind control didn't work, humans are mad and taking 7% of your barks per second for 60 seconds)
        			Something for 2.5m,milestone at 300k
        			Something for 10m, adds semi often minigame where if you lose then you lose the game and are forced to restart(or set back far?), semi hard
        			Something for 100m, absurdly difficult minigame that occurs one bark after purchase and after that fxTracker%1000, and when you win you beat the game
        */
        
        //Also TODO:: add a question mark symbol that when hovered over or clicked shows the user information about the item.
        //Also TODO:: make upgrades more expensive overtime?
        //Also TODO:: disable selecting elements on screen
        //Also TODO:: add a box with z-index 1 higher than pink alert text over the dog, with cursor:pointer, transparent and make that be the thing you click to bark
        //Also TODO:: add multiplier like buy 1x 2x 10x 50x 100x at a time, at purchase add new func with while loop of buy whatever to include the difference for price increment
        //Also TODO:: bird hunting reward needs to be reevaluated.. sometimes way too high sometimes way too low, also make birds appear slightly more often
        //Also TODO:: maybe random chance 1%~ to spawn a gold nugget increasing barks by 10%(calculated at spawntime) every hardFx click?
		
        /*
                        Rough ideas for price increases:
                        Friend             *1.1 of original
                        Food               *1.1 of original
                        Megaphone          *1.5 of current
                        Robot dog          *3   of current
                        Clinic             *1.2 of original
                        Human mind control *10  of current
        */

    }

    function chkEffects (hardFx=true) {

        if (fxTracker%3==0) {

            if (friends!=0) {
                
                if (hardFx) bark(friends);
                else bark (friends/10);
                
                alert("Assistance recieved! ("+friends.toString()+" friend"+((friends==1)?"":"s")+" barked with you)");

            }
        }

        if (fxTracker%10==0) {

            if (dogFood!=0) {

                var ee = document.body.getElementsByClassName("fallingImg").length==0;

                if (ee) {

                    //dropZones can not be a constant supplied to dropZones0
                    var i=0,imgPtr=0,imgFn="",screenPtr=0,imgs=[],img=null,dropZonesPtr=0,dropZones0=[0,10,20,30,40,50,60,70,80,90],dropZonesCtr=10;

                    while (i!=(1+(Math.floor(dogFood/10)))) {

                        if (i==10)break;
                        imgPtr=Math.floor(Math.random()*3);
                        imgFn =((imgPtr==0?"cheese.png":(imgPtr==1?"chicken.png":"croissant.png")));

                        dropZonesPtr=Math.floor(Math.random()*dropZonesCtr);
                        screenPtr=dropZones0[dropZonesPtr];
                        dropZones0.splice(dropZonesPtr,1);

                        img=document.createElement("img");
                        img.setAttribute("src",imgFn);
                        img.setAttribute("class","fallingImg");
                        img.setAttribute("onmouseover","collectedDogFood()");

                        //The following line was a staple for a fixed old glitch but I am leaving it
                        if (screenPtr==null) screenPtr=(Math.floor(Math.random()*10))*10;

                        img.style.left=screenPtr.toString()+"%";
                        document.body.appendChild(img);

                        var pos=1;

                        ++i;
                        imgs.push(img);
                        --dropZonesCtr;

                    }
                    
                    var speed=((oxyCotton)?51:17);
                    if (adderall) speed*=0.5;
                    
                    var ctDown=setInterval(function () {

                        if (pos==140) { 
                            clearInterval(ctDown);
                            imgs.forEach(function(img) { try{ document.body.removeChild(img); } catch{/*already gone*/} });
                        }

                        if (pos<91)
                            imgs.forEach(function(img) { img.style.top=pos.toString()+"%"; });

                        ++pos;

                    },speed);

                }
            }


        }

        if ((fxTracker%50==0)&&(birdHuntingGroups>0)) {
            
            if (!(experiencedBirdHunting)&&hardFx) {

                experiencedBirdHunting=true;
                addOverlay();
                displayBox("You see a bird move out of the corner of your eye! A bird will appear at the top left or right of your screen, quickly click it to gain a large reward.","showBirds()");

            }
            else showBirds();

        }

        //maybe add FX EVENT at 1000 or something and if you lose then you lose the game and it hard resets (one time event?)

        if (fxTracker==300) {
            fxTracker=0;
            if (!(hardFx)) return;


            if (megaphones>0) {

                addOverlay();

                if (experiencedPoisonGas) displayBox("You smell something odd in the distance, and you instinctually begin to bark but you quickly stop yourself, as you realize it is the smell of poison gas! Quickly, escape to the safezone.","startGas()");
                else {

                    experiencedPoisonGas=true;
                    displayBox("You smell poison gas in the distance! Avoid touching poison gas on the screen with your mouse cursor (any growing green space) and reach the bright blue square on the screen with your cursor to survive the attack. If you don't survive, your barks will be set to 0. If you survive, your barks will be greatly increased!","startGas()");

                }

            }

        }

    }

    function buyFriend () {

        if (!(barks>(friendCost-1)))
            return;

        bark(-friendCost);

        ++friends;

    }

    function buyDogFood () {

        if (!(barks>(dogFoodCost-1)))
            return;

        bark(-dogFoodCost);

        ++dogFood;

    }

    function collectedDogFood () {

        var originalFood=dogFood*2,gainedBarks=0;
        
        if (oxyCotton) gainedBarks=10+(originalFood-(friends*(1/(clinics+1))));
        else gainedBarks=10+(originalFood-friends);
        
        if (gainedBarks<0)gainedBarks=0;
		
        alert("You barked "+originalFood.toString()+" times for your food, but had to share with "+friends.toString()+" friends!");

        bark(gainedBarks);

    }

    function alert (msg) {

        if (alertCtr==60) return;
        var alertMsg=document.createElement("p");
        alertMsg.setAttribute("class","alertMsg");
        alertMsg.innerHTML=msg;
        alertMsg.style.top=(alertCtr+30).toString()+"%";
        alertCtr+=5;
        document.body.appendChild(alertMsg);
        var ctDown=setTimeout(function () {
            document.body.removeChild(alertMsg);
            var nAlertCtr=parseInt(alertMsg.style.top)-30;
            if (nAlertCtr<alertCtr)
                alertCtr=nAlertCtr;
            clearTimeout(ctDown);

        },2500);

    }

    function remElemDOC (e) { document.body.removeChild(e.target); }

    function beginDigesting (e) { 

        var ctDown=setInterval(function () {

            clearInterval(ctDown);

            //Good that Math#random isn't time seed based like C# (I don't think?)
            var x=Math.floor(Math.random()*95).toString()+"%",y=Math.floor(Math.random()*95).toString()+"%";

            var elem = document.createElement("img");
            elem.setAttribute("src","excrement.png");
            elem.setAttribute("class","excrement");
            elem.style.top=y;
            elem.style.left=x;

            document.body.appendChild(elem);

        },4000);

    }

    function ateExcrement (e,i) {

        remElemDOC(e);
        if (i>0) bark(i);
        alert("You scared away the excrement by barking at it (and definitely did not eat it)");

    }

    function buyMegaphone () {

        if (!(barks>(megaphoneCost-1)))
            return;

        bark(-megaphoneCost);

        ++megaphones;

    }

    function addOverlay () {

        var overlay=document.createElement("div");
        overlay.setAttribute("id","overlay");
        document.body.appendChild(overlay);

    }

    function remOverlay () { 

        try { document.body.removeChild(document.getElementById("overlay")); }
        catch { /* no overlay */ }

    }

    function displayBox (str,funcStr) {

        var box=document.createElement("div"),txt=document.createElement("p"),btn=document.createElement("button");
        box.setAttribute("id","importantMsgBox");
        txt.setAttribute("id","importantMsgBoxText");
        txt.innerHTML=str;
        btn.setAttribute("id","importantMsgBoxButton");
        btn.setAttribute("onclick","onCloseBox(function(){"+funcStr+";})");
        btn.innerHTML="Close";
        box.appendChild(txt);
        box.appendChild(btn);
        document.body.appendChild(box);

    }

    function onCloseBox (func) {

        var boxElem=document.getElementById("importantMsgBox");
        boxElem.removeChild(document.getElementById("importantMsgBoxText"));
        boxElem.removeChild(document.getElementById("importantMsgBoxButton"));
        document.body.removeChild(boxElem);

        func();

    }

    function startGas () {

        remOverlay();
        alert("Poison gas engulfs your surroundings");
        var i=0,gasExpansion,escapeZone=document.createElement("div"),j=Math.random();

        escapeZone.setAttribute("id","gasSafezone");

        if (j>0.5) {

            escapeZone.style.left=Math.floor(Math.random()*30).toString()+"%";
            escapeZone.style.top=Math.floor(Math.random()*30).toString()+"%";

        }
        else {

            escapeZone.style.left=(Math.floor(Math.random()*35)+50).toString()+"%";
            escapeZone.style.top=(Math.floor(Math.random()*35)+50).toString()+"%";

        }

        $(escapeZone).mouseover(function () {

            document.body.removeChild(document.getElementById("gasSafezone"));
            var htmlCol=document.getElementsByClassName("gas");
            if (htmlCol.length==0) return;
            clearCollection(htmlCol);
            clearInterval(gasExpansion);
            bark(barks*0.5);
            alert("Scared the gas away by barking at it");

        });

        document.body.appendChild(escapeZone);

        while (i!=21) {


            var	x=Math.floor(Math.random()*95),y=Math.floor(Math.random()*95).toString()+"%";

            if (x>40&&x<50)
                x-=10;

            else if (x>50&&x<60)
                x+=10;

            x=x.toString()+"%";

            var elem=document.createElement("div");
            elem.setAttribute("class","gas");
            elem.setAttribute("id","gas_"+i.toString());
            elem.style.top=y;
            elem.style.left=x;

            $(elem).mouseover(function () {

                clearInterval(gasExpansion);
                touchedGas();

            });

            document.body.appendChild(elem);
            ++i;

        }

        gasExpansion=setInterval(function() {

            var i=0;

            while (i!=21) {

                var elem=document.getElementById("gas_"+i.toString());
                elem.style.height=((($(elem).height()/$(elem).parent().height()*100)+0.3)).toString()+"%"; 
                elem.style.width=((($(elem).width()/$(elem).parent().width()*100)+0.3)).toString()+"%";
                elem.style.left=((($(elem).position().left/($(elem).parent().width())*100)-0.15).toString()+"%");
                elem.style.top=((($(elem).position().top/($(elem).parent().height())*100)-0.15).toString()+"%");

                ++i;

            }

        },7);

    }

    function touchedGas () {

        var htmlCol=document.getElementsByClassName("gas");
        if (htmlCol.length==0) return;
        alert("You suffocated in gas!");
        clearCollection(htmlCol);
        document.body.removeChild(document.getElementById("gasSafezone"));
		
		if (oxyCotton) barks(-(barks/2));
        else bark(-barks);//:(

    }

    function clearCollection (htmlCol) {

        var i=htmlCol.length
        while (i!=0) {

            htmlCol[0].parentNode.removeChild(htmlCol[0]);
            --i;

        }

    }

    function addToUpgradeBox (elem,str,cost,funcStr) {

        elem=document.createElement("p");
        elem.setAttribute("class","upgradeTxt");
        elem.setAttribute("onclick",funcStr);
        elem.style.top=upgradeBoxTracker.toString()+"%";
        elem.innerHTML=str+" ("+cost.toString()+" barks)";
        boxElem.appendChild(elem);
        upgradeBoxTracker+=7;

    }

    function buyBirdHunting () {

        if (!(barks>(birdHuntingCost-1)))
            return;

        bark(-birdHuntingCost);

        ++birdHuntingGroups;

    }

    function showBirds () {

        remOverlay();
        var bird=document.createElement("img"),i=1,tmr,bird0=document.createElement("img"),tmr0,
            /*reusing i does not work, not even sure how this is multi-threaded*/i0=110;
        bird.setAttribute("class","bird");
        bird.setAttribute("id","bird");
        bird.setAttribute("src","bird.png");
        bird0.setAttribute("class","bird");
        bird0.setAttribute("id","bird0");
        bird0.setAttribute("src","bird.png");
        document.body.appendChild(bird);
        
        var speed=((oxyCotton)?57:19);
        if (adderall) speed*=0.5;

        tmr=setInterval(function () {

            if (i==110) {

                clearInterval(tmr);
                try { document.body.removeChild(document.getElementById("bird")); }
                catch { /* already gone */ }

            }

            bird.style.left=(i*0.81).toString()+"%";
            bird.style.top=(i/4).toString()+"%";

            ++i;

        },speed);

        if (birdHuntingGroups>4) {

            document.body.appendChild(bird0);

            tmr0=setInterval(function () {

                if (i0==-10) {

                    clearInterval(tmr0);
                    try { document.body.removeChild(document.getElementById("bird0")); }
                    catch { /* already gone */ }

                }

                bird0.style.left=(i0*0.81).toString()+"%";
                bird0.style.top=(i0/4).toString()+"%";

                --i0;

            },19);

        }

    }

    function clickedBird (e) {

        document.body.removeChild(document.getElementById("bird"));
        _clickedBird();

    }

    function clickedBird0 (e) {

        document.body.removeChild(document.getElementById("bird0"));
        _clickedBird();

    }

    function _clickedBird () { bark((birdHuntingGroups*3)*((friends/3)+((dogFood*2)*(megaphones/2)))); }

    function buyRobotDog () {
        
        if (!(barks>(robotDogCost-1)))
            return;
        
        bark(-robotDogCost);
        
        ++robotDogs;
        
        setInterval (mdF,10000);
        
    }

    function buyClinic () {
        
        if (!(barks>(clinicCost-1)))
            return;
        
        bark (-clinicCost);
        
        ++clinics;
        
        if (clinics==1) {
        	
            showClinic();
            
            addOverlay();
            displayBox("Look in the top right corner of your screen! There is a veterinarian clinic you can visit by clicking on the pet shop box.","remOverlay()");
            
        }
           
    }
              
    function showClinic () {
        
        var cl=document.createElement("img");
        cl.setAttribute("src","clinic.jpg");
        cl.setAttribute("id","clinic");
        document.body.appendChild(cl);
        
        $(cl).click(openClinicScreen);
        
        
            
    }

    function openClinicScreen () {
    	
    	if (oxyCotton) {
    		
    		addOverlay();
    		displayBox("You didn't feel like going to the clinic as you decided it was cozy and warm enough at home. (Under the effects of oxycodone)","remOverlay()");
    		return;
    		
    	}
        
        var overlay=document.createElement("div"),x=document.createElement("img");
        overlay.setAttribute("id","clinic_overlay");
        x.setAttribute("src","x.webp");
        x.setAttribute("id","clinic_exit");
        
        document.body.appendChild(overlay);
        overlay.appendChild(x);
        
        $(x).click(exitClinic);
        
        addClinicItem("Oxycodone","This painkiller medicine will help clear up all pain and negative effects. Oxycodone will also make it easier for you to collect moving items. Effects last 2 minutes. Potential temporary side effects. Oxycodone costs you 100 friends on purchase.",purchaseOxycodone);
        addClinicItem("Adderall","This stimulant medicine will make you get things done much quicker. Effects last 45 seconds. Potential temporary side effects. Adderall costs 1 megaphone on purchase and you will lose a small percentage of barks overtime during the effects.");
        addClinicItem("Acid","This hallucinogenic medicine will cause you to understand humand mind control better, causing any mind control devices you purchase to be more effective while you are under the effects of acid. Effects last 3 minutes. There are other temporary undisclosed effects. Acid requires you to eat 50 dog food on purchase.");
        addClinicItem("Psilocybin","This hallucinogenic medicine will cause clicking the main dog to be more effective. Effects last 3 minutes. There are other undisclosed temporary effects. Psilocybin requires you to eat 50 dog food on purchase.");
        addClinicItem("Dimethyltryptamine","Nobody knows much about dimethyltryptamine, so the dog secretaries are freely handing it out to anyone experienced who has taken all oxycodone, adderall, acid and psilocybin at least once.");
        
        //More clinics = cheaper drugs & better positives from effects slightly* (but intensity is always at 100%)
        
        //On buy click, it returns to the main screen and the drug drops down from a supply crate that crashes open when it reaches 90%
        //top, and it's height:10%. Then, the drug will be left at 90%top, 10% height and when clicked the effects will ensue.
        
        //Effects of oxy cotton (cheapest, costs 100 friends, 2 minute length):
        //Reduce negative effects/subtractions relative to total clinics (such as subtracting by friends when collecting food)
        //Falling food & birds move slower
        //Everything on screen becomes slightly blurry
        //Can't visit pet shop, it will say "You decided to stay home where it is nice, warm and cozy."
        //You only lose half of your barks when you die to gas
        //If negative debuffs like pain are added (ie human mind control failure) then this will fix it
        
        //Effects of adderall (costs 1 megaphone and you will lose 0.5% (1/200) of your current barks every second for the duration of the drug, 45 second length)
        //When you click the dog, he barks twice
        //Robot dogs work quicker relative to total clinics
        //Birds and falling food move twice as quick
        //Barking will cause the main dog to shake
        //Cracked eyes will pop out on top of the dogs eyes
        //Moving particles have wind trails behind them
        
        //Effects of acid (cost 50 food, 3 minute length)
        //Background smoothly changing colour gradient
        //Spaceships sometimes come by and if collected you gain friends relative to total clinics (100 friends * (total clinics/10))
        //Purchasing human mind control devices are more effective during the effects relative to total clinics
        
        //Effects of psilocybin (cost 50 food, 3 minute length)
        //Background smoothly changing between dark green/brown colours
        //Sometimes see earth monsters walking on the ground or witches flying around, you have to click them to reduce their health and if you defeat them your barks multiply relative to total clinics
        //While in combat, background loops between black/gray and red/dark red colours
        //Gain only half as many barks for collecting excrement/dog food
        //Clicking the main dog is twice as more effective during this time relative to total clinics
        //Effects happen quicker (fxTracker += 2).
        
        //Effects of dimethyltryptamine (free, requires you to have taken all oxy cotton, adderall, acid and psilocybin once, one-time use) 
        //Screen gets copied on itself (like 2 mirrors painting eachother)
        //Screen zooms into center copy
        //Temporarily enter dog heaven, can collect things like funky looking dogs, aliens, food to gain extremely high amounts of friends, barks and dog food respectively
        //After some time, it fades out somehow and returns to the main screen
        
    }
    
    function addClinicItem (name,description,purchaseFunc) {
    	
    	var overlay=document.getElementById("clinic_overlay"),itm=document.createElement("div"),title=document.createElement("p"),desc=document.createElement("p"),purchaseBtn=document.createElement("button");
    	itm.setAttribute("class","clinic_item");
    	title.setAttribute("class","clinic_item_title");
    	title.innerHTML=name;
    	desc.setAttribute("class","clinic_item_description");
    	desc.innerHTML=description;
    	purchaseBtn.setAttribute("class","clinic_item_purchase");
    	purchaseBtn.innerHTML="Purchase";
    	
    	$(purchaseBtn).click(purchaseFunc);
    	
    	overlay.appendChild(itm);
    	itm.appendChild(title);
    	itm.appendChild(desc);
    	itm.appendChild(purchaseBtn);
    	
    	clinicItems.push(itm);
    	
    }
    
    function clearClinicItems () {
    	
    	var overlay=document.getElementById("clinic_overlay");
    	if (overlay==null) return;
    	
    	clinicItems.forEach(function(e){overlay.removeChild(e);});
    	overlay.removeChild(document.getElementById("clinic_exit"));
    	
    	clinicItems=[];
    	
    }
    
    function exitClinic () {
    	
    	clearClinicItems();
    	try { document.body.removeChild(document.getElementById("clinic_overlay")); }
   		catch { /* doesn't exist */ }
    	
    }
    
    function purchaseOxycodone () {
    	
    	if (!(friends>99)) {
    		
    		displayBox("You were not able to afford the oxycodone! You need 100 friends","exitClinic()");
    		return;
    		
    	}
    	
    	exitClinic();
    	friends-=100;
    	
    	takeOxycodone();
    	
    }
    
    function mdF () { mainDogClick(false); }
    function setBlurry () { document.querySelectorAll("body *").forEach(setElemBlurry); }
    function remBlurry () { document.querySelectorAll("body *").forEach(remElemBlurry); }
    function setElemBlurry (elem) { elem.style.filter="blur(1.3px)"; }
    function remElemBlurry (elem) { elem.style.filter=""; }
    
    function newNode (elem) {
    	
    	if (oxyCotton) setElemBlurry(elem);
    	
    }
    
    function takeOxycodone () {
    	
    	if (oxyCotton) {
    		
            addOverlay();
            displayBox("The pill did nothing! You are already under the effects of oxycodone.","remOverlay()");
    		return;
    		
    	}
    	
    	oxyCotton=true;
    	setBlurry();
    	alert("You took oxycodone");
    	++oxyCottonUses;
        
    	var ctDown=setTimeout(function () {
            
            oxyCotton=false;
            remBlurry();
            alert("You can feel the oxycodone effects fade");
            
            clearTimeout(ctDown);

        },120000);
    	
    }
    
    function purchaseAdderall () {
    	
    	if (!(megaphone>0)) {
    		
    		displayBox("You were not able to afford the adderall! You need 1 megaphone.","exitClinic()");
    		return;
    		
    	}
    	
    	exitClinic();
    	--megaphone;
    	
    	takeAdderall();
    	
    }
    
    function takeAdderall () {
    	
    	if (adderall) {
    		
            addAdderall();
            displayBox("The pill did nothing! You are already under the effects of oxycodone.","remOverlay()");
    		return;
    		
    	}
    	
    	adderall=true;
    	alert("You took adderall");
    	++adderallUses;
        
    	var ctDown=setTimeout(function () {
            
            adderall=false;
            alert("You can feel the adderall effects fade");
            
            clearTimeout(ctDown);

        },45000);
    	
    }