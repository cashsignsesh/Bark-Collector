
    $("#the_dog").click(mainDogClick);
    $("#the_dog").mousedown(mainDogAnim);
    $("#the_dog").mouseup(mainDogAnim0);
    $("#the_dog").mouseover(mainDogAnim1);
    $("#the_dog").mouseleave(mainDogAnim2);

    $("body").on("mouseover",".fallingImg",remElemDOC);
    $("body").on("mouseover",".fallingImg",beginDigesting);

    $("body").on("mouseover",".excrement",function (e) { ateExcrement(e,2+(friends*2)); } );

    $("body").on("click","#bird",clickedBird);
    $("body").on("click","#bird0",clickedBird0);
    
    $("body").arrive("*",newNode);

    //Main tracker variables
    var barks=0,fxTracker=0,upgradeBoxTracker=14,friends=0,dogFood=0,megaphones=0,dogToys=0,birdHuntingGroups=0,robotDogs=0,
        clinics=0,
        experiencedPoisonGas=false,guiLocked=false,experiencedBirdHunting=false,oxyCotton=false,adderall=false,seenUfo=false,
    	robotTasks=[];

    //Incrementors
    var mainDogIncrementor=1,alertCtr=0,oxyCottonUses=0,adderallUses=0,dog_rotate=7;

    //Unlocks
    var unlockedUpgradesBox=false,unlockedDogFood=false,unlockedMegaphone=false,unlockedBirdHuntingP=false,unlockedBirdHunting=false,unlockedRobotDog=false,unlockedClinic=false;

    //Constants
    const milestone0=10,milestone1=75,milestone2=200,milestone3=600,milestone4=3000,milestone5=15000,
    friendCost=50,dogFoodCost=150,megaphoneCost=500,birdHuntingCost=2000,robotDogCost=10000,clinicCost=25000;

    //Elements
    var boxElem,boxTitle,upgrade_friend,upgrade_dogFood,upgrade_megaphone,upgrade_birdHunting,upgrade_robotDog,upgrade_clinic;
    const the_dog=document.getElementById("the_dog");
    
    //Other
    var clinicItems = [],_no=false;

    function mainDogClick (hardFx) {
		
        bark(mainDogIncrementor);
        ++fxTracker;
        chkEffects(hardFx);
        
    }

    function bark (increment) {
		
        barks+=((increment>0)?increment*(1+(megaphones/10)):increment);
        if (adderall) {
        	barks+=((increment>0)?(increment/5):0);
        	the_dog.style.transform="rotate("+dog_rotate.toString()+"deg)";
        	dog_rotate+=(Math.random()>0.49)?7:-7;
        }
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
                    Something for 100k, milestone at 30k, unlocks upgrades facility with things like on click earn +1 and 10% of your friends and all upgrades increase in 1.5* in cost per purchase.
                    Human mind control machine (250k cost, maybe makes everything cheaper by /2 per purchase apart from itself, unlock casino as side effect and execute in way similar to clinic, also (unless first purchase) 25% chance to fail, if it does fail 50/50 to: mind control unexpected behaviour, humans went insane or mind control didn't work, humans are mad and taking 7% of your barks per second for 60 seconds)
        			Something for 2.5m,milestone at 300k
        			Something for 10m, adds semi often minigame where if you lose then you lose the game and are forced to restart(or set back far?), semi hard
        			Something for 100m, absurdly difficult minigame that occurs one bark after purchase and after that fxTracker%1000, and when you win you beat the game
        */
        
        //Also TODO:: add a question mark symbol that when hovered over or clicked shows the user information about the item.
        //Also TODO:: make upgrades more expensive overtime?
        //Also TODO:: disable selecting elements on screen, dragging elements & right clicking
        //Also TODO:: add a box with z-index 1 higher than pink alert text over the dog, with cursor:pointer, transparent and make that be the thing you click to bark
        //Also TODO:: add multiplier like buy 1x 2x 10x 50x 100x at a time, at purchase add new func with while loop of buy whatever to include the difference for price increment
        //Also TODO:: bird hunting reward needs to be reevaluated.. sometimes way too high sometimes way too low, also make birds appear slightly more often
        //Also TODO:: maybe random chance 1%~ to spawn a gold nugget increasing barks by 10%(calculated at spawntime) every hardFx click?
        //Also TODO:: add sound fx
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

        if (fxTracker%10==0||adderall) {

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
		
		if (birdHuntingGroups>0)
        if ((fxTracker%50==0)||(adderall&&fxTracker%5==0)) {
            
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

            },speed);

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
        
        robotTasks.push( setInterval ( mdF , 10000 ) );
        
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
        addClinicItem("Adderall","This stimulant medicine will make you get things done much quicker. Effects last 45 seconds. Potential temporary side effects. Adderall costs 1 megaphone on purchase and you will lose a small percentage of barks overtime during the effects.",purchaseAdderall);
        addClinicItem("Acid","This hallucinogenic medicine will cause you to understand humand mind control better, causing any mind control devices you purchase to be more effective while you are under the effects of acid. Effects last 3 minutes. There are other temporary undisclosed effects. Acid requires you to eat 50 dog food on purchase.",purchaseAcid);
        addClinicItem("Psilocybin","This hallucinogenic medicine will cause clicking the main dog to be more effective. Effects last 3 minutes. There are other undisclosed temporary effects. Psilocybin requires you to eat 50 dog food on purchase.");
        addClinicItem("Dimethyltryptamine","Nobody knows much about dimethyltryptamine, so the dog secretaries are freely handing it out to anyone experienced who has taken all oxycodone, adderall, acid and psilocybin at least once.");
        
        //More clinics = cheaper drugs & better positives from effects slightly* (but intensity is always at 100%)
        
        //On buy click, it returns to the main screen and the drug drops down from a supply crate that crashes open when it reaches 90%
        //top, and it's height:10%. Then, the drug will be left at 90%top, 10% height and when clicked the effects will ensue.
        
        //Effects of oxy cotton (cheapest, costs 100 friends, 2 minute length):
        //Reduce negative effects/subtractions relative to total clinics (such as subtracting by friends when collecting food) (Done)
        //Falling food & birds move slower (Done)
        //Everything on screen becomes slightly blurry (Done)
        //Can't visit pet shop, it will say "You decided to stay home where it is nice, warm and cozy." (Done)
        //You only lose half of your barks when you die to gas (Done)
        //If negative debuffs like pain are added (ie human mind control failure) then this will fix it
        
        //Effects of adderall (costs 1 megaphone and you will lose 0.5% (1/200) of your current barks every second for the duration of the drug, 45 second length)
        //Barking gives it's normal increase plus 20% disregarding megaphones (Done)
        //Robot dogs work quicker relative to total clinics (Done)
        //Birds and falling food move twice as quick (Done)
        //Barking will cause the main dog to shake (Done)
        //Cracked eyes will pop out on top of the dogs eyes (Done)
        //Moving particles have wind trails behind them 
        //Dog food and birds come quicker regarding fxTracker (Done)
        
        //Effects of acid (cost 50 food, 3 minute length)
        //Background smoothly changing colour gradient (Done)
        //UFO's sometimes come by and if collected you gain friends relative to total clinics (100 friends * (total clinics/10))
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
    	
    	if (!(megaphones>0)) {
    		
    		displayBox("You were not able to afford the adderall! You need 1 megaphone.","exitClinic()");
    		return;
    		
    	}
    	
    	exitClinic();
    	--megaphones;
    	
    	takeAdderall();
    	
    }
    
    function takeAdderall () {
    	
    	if (adderall) {
    		
            addAdderall();
            displayBox("The pill did nothing! You are already under the effects of adderall.","remOverlay()");
    		return;
    		
    	}
    	
    	adderall=true;
    	alert("You took adderall");
    	++adderallUses;
    	the_dog.setAttribute("src","the adderall dog.png");
    	
    	var kys = [];
    	
    	robotTasks.forEach(function(t) {
    		
    		clearInterval(t);
    		mdF();
    		kys.push( setInterval ( mdF , Math.floor ( 10000 / ( Math.ceil ( clinics * 0.33 ) + 1 ) ) ) );
    		
    	});
    	
    	robotTasks=[];
    	
    	var ee=0;
        
    	var ctDown=setInterval(function () {
            
            bark(-(barks*0.005));
            
            if (ee==45) {
            
	            adderall=false;
	            alert("You can feel the adderall effects fade");
	            the_dog.style.transform="";
	            the_dog.style.top="calc(50% - 160px)";
	            the_dog.style.left="calc(50% - 240px)";
	    		the_dog.setAttribute("src","the dog.png");
	            dog_rotate=7;
	            
	            kys.forEach(function(t) {
	            	
	            	clearInterval(t);
	            	robotTasks.push( setInterval ( mdF , 10000 ) );
	            	
	            });
	            
	            clearTimeout(ctDown);
	            
        	}
        	
        	++ee;

        },1000);
    	
    }
    
    //TODO:: add background, like outside or something, and make overall game look nice
    function mainDogAnim (e) {
    	
    	if(e.which!=1)return;
    	if($(the_dog).is(':animated')) { _no=true; return; }
    	
    	$(the_dog).animate({
    		
    		width:520,
    		height:350,
    		top:"+=10px",
    		left:"+=6px"
    		
    	},33,null);
    	
    }
    
    function mainDogAnim0 () {
    	
    	if (_no) { _no=false; return; }
    	
    	$(the_dog).animate({
    		
    		width:540,
	        height:360,
	        top:"-=10px",
	        left:"-=6px"
    		
    	},33,null);
    	
    }
    
    function mainDogAnim1 () {
    	
    	//make bigger
    	$(the_dog).animate({
    		width:540,
    		height:360,
    		left:"-=14",
    		top:"-=9.5"
    	},250,null);
    	
    }
    
    function mainDogAnim2 () {
    	
    	//make smaller
    	$(the_dog).stop(true,true);
    	var dogWidth=parseInt(the_dog.style.width),dogHeight=parseInt(the_dog.style.height);
    	$(the_dog).animate({
	    	
	        width:512,
	        height:341,
	        top:"+="+((dogHeight-341)/2).toString(),
	        left:"+="+((dogWidth-512)/2).toString()
    		
    	},250,null);
    	
    	the_dog.style.width="512px",the_dog.style.height="341px";
    	
    }
    
    function purchaseAcid () {
    	
    	 if (!(food>49)) {
    		
    		displayBox("You were not able to afford the acid! You need 50 dog food (Beg for food)","exitClinic()");
    		return;
    		
    	}
    	
    	exitClinic();
    	food-=50;
    	
    	takeAcid();
    	
    }
    
    function takeAcid () {
    	
    	var r=0,g=0,b=0;
    	
    	alert("You dropped acid");
    	
    	var bgC = setInterval (function () {
    	
			if (r <= 255 && g == 0 && b == 0) ++r;
			if (r == 255 && b == 0 && g <= 255) ++g;
			if (r == 255 && g == 255 && b <= 255) ++b;
			if (b == 255 && g == 255 && r > 0) --r;
			if (r == 0 && b == 255 && g > 0) --g;
			if (r == 0 && g == 0 && b > 0) --b;
			
			document.body.style.background="rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
			
		},2);
		
		var innerUfoIt,alienDropping,alienWalking,ufoIt = setInterval (function () {
			
			var ufo=document.createElement("img");
			ufo.setAttribute("src","ufo.png");
			ufo.setAttribute("id","ufo");
			document.body.appendChild(ufo);
			
			if (!(seenUfo)) {
				
				seenUfo=true;
				
	            addOverlay();
	            displayBox("A UFO has appeared on your screen! Run your mouse over it to capture it.","remOverlay()");
				
			}
			
			$(ufo).mouseover(function () {
				
				var exp=document.createElement("img"),down=parseInt(ufo.style.top)+6,alien=document.createElement("img"),x=parseInt(ufo.style.left);
				exp.setAttribute("id","ufo_explosion");
				exp.setAttribute("src","explosion.png");
				exp.style.left=parseInt(ufo.style.left).toString()+"%";
				exp.style.top=parseInt(ufo.style.top).toString()+"%";
				
				document.body.removeChild(ufo);
				document.body.appendChild(exp);
				alert("You hear a UFO crash into the ground in the distance");
				
				var clearExpTm = setTimeout (function () {
					
					document.body.removeChild(exp);
					clearInterval(innerUfoIt);
					clearTimeout(clearExpTm);
					
				},1000);
				
				alien.setAttribute("class","ufo_alien");
				alien.setAttribute("src","roger_smith_parachute.png");
				alien.style.top=(down-6).toString()+"%";
				alien.style.left=x.toString()+"%";
				$(alien).click(function () {
					
					var friendsEarned=Math.floor(Math.random()*45)+15;
					friends+=friendsEarned;
		            addOverlay();
		            displayBox("An ancient alien just brought you "+friendsEarned.toString()+" of his alien dogs in return for you letting him go back to his planet (+"+friendsEarned.toString()+" friends)","remOverlay()");
		            alert("You welcome your new alien dog friends");
		            clearInterval(alienDropping);
		            document.body.removeChild(alien);
					
				});
				document.body.appendChild(alien);
				
				alienDropping = setInterval (function () {
					
					if (down>83) { 
						clearInterval(alienDropping);
						alien.setAttribute("src","roger_smith.png");
						alien.style.top="84%";
						alien.style.transform="scaleX(-1)";
						var alienX=parseInt(alien.style.left),direction=0,alienY=parseInt(alien.style.top);
						alienWalking = setInterval (function () {
							
							//0=right
							//1=up
							//2=left
							//3=down
							
							switch (direction) {
								
								case 0:
									alienX+=0.33;
									alien.style.left=alienX.toString()+"%";
									if (alienX>89) {
										++direction;
										alien.style.transform="rotate(270deg) scaleX(-1)";
									}
									break;
								
								case 1:
									alienY-=0.33;
									alien.style.top=alienY.toString()+"%";
									if (alienY<1) {
										
										++direction;
										alien.style.transform="rotate(180deg) scaleX(-1)";
										
									}
									break;
								
								case 2:
									alienX-=0.33;
									alien.style.left=alienX.toString()+"%";
									if (alienX<1) {
										++direction;
										alien.style.transform="rotate(90deg) scaleX(-1)";
									}
									break;
								
								case 3:
									alienY+=0.33;
									alien.style.top=alienY.toString()+"%";
									if (alienY>84) {
										direction=0;
										alien.style.transform="scaleX(-1)";
									}
									break;
								
								default:
									break;
								
							}
							
						},17);
						
					}
					
					alien.style.top=down.toString()+"%";
					
					++down;
					
				},17);
				
			});
			
			var stageCtr=0,subCtr=0,subCtr0=0,subCtr1=0,radians;
			
			innerUfoIt = setInterval (function () {
				
				if (stageCtr<50) {
					
					ufo.style.left=(100-(stageCtr*1.2)).toString()+"%";
					ufo.style.top=(70-(stageCtr/5)).toString()+"%";
										
				}
				else if (stageCtr<100) {
					
					++subCtr;
					ufo.style.left=(41.2+(subCtr*0.5)).toString()+"%";
										
				}
				else if (stageCtr<220) {
					
					subCtr0+=0.5;
					ufo.style.top=(parseInt(ufo.style.top)-subCtr0).toString()+"%";
					
				}
				else if (stageCtr<320) {
					
					++subCtr1;
					radians=subCtr1*(Math.PI/180);
					ufo.style.left=(77.2*Math.cos(radians)).toString()+"%";
					ufo.style.top=(70.2*Math.sin(radians)).toString()+"%";
					
				}
				else if (stageCtr==321) {
					
					clearInterval(innerUfoIt);
					document.body.removeChild(ufo);
					return;
					
				}
				
				++stageCtr;
				
			},16.7);
			
		},18000);
		
		var tmt = setTimeout (function () {
			
			clearInterval(bgC);
			clearInterval(ufoIt);
			document.body.style.background="#FFFFFF";
			clearTimeout(tmt);
			
		},180000);
		
	}