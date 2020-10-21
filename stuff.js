
    $("#the_dog").click(mainDogClick);

    $("body").on("mouseover",".fallingImg",remElemDOC);
    $("body").on("mouseover",".fallingImg",beginDigesting);

    $("body").on("mouseover",".excrement",function (e) { ateExcrement(e,2+(friends*2)); } );

    $("body").on("click","#bird",clickedBird);
    $("body").on("click","#bird0",clickedBird0);

    //Main tracker variables
    var barks=0,fxTracker=0,upgradeBoxTracker=14,friends=0,dogFood=0,megaphones=0,dogToys=0,birdHuntingGroups=0,robotDogs=0,
        clinics=0,
        experiencedPoisonGas=false,guiLocked=false,experiencedBirdHunting=false;

    //Incrementors
    var mainDogIncrementor=1,alertCtr=0;

    //Unlocks
    var unlockedUpgradesBox=false,unlockedDogFood=false,unlockedMegaphone=false,unlockedBirdHuntingP=false,unlockedBirdHunting=false,unlockedRobotDog=false,unlockedClinic=false;

    //Constants
    const milestone0=10,milestone1=75,milestone2=200,milestone3=600,milestone4=3000,milestone5=15000,
    friendCost=50,dogFoodCost=150,megaphoneCost=500,birdHuntingCost=2000,robotDogCost=10000,clinicCost=25000;

    //Elements
    var boxElem,boxTitle,upgrade_friend,upgrade_dogFood,upgrade_megaphone,upgrade_birdHunting,upgrade_robotDog,upgrade_clinic;
    
    //Other
    var clinicItems = [];

    function mainDogClick (hardFx=true) {

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
                    Human mind control machine (later in game probably, maybe makes everything cheaper by /2 per purchase apart from itself, unlock casino as side effect and execute in way similar to clinic, also 25% chance to fail, if it does fail 50/50 to: mind control unexpected behaviour, humans went insane or mind control didn't work, humans are mad)
                    Robot dog (Auto bark? very slow, high increase in price and ignore any events like toxic gas. 10k?)
                    Take over veterinarian clinic (Drops medicine occasionally, including LSD)
        */

        //Also TODO:: add a question mark symbol that when hovered over or clicked shows the user information about the item.
        //Also TODO:: make upgrades more expensive overtime?
        //Also TODO:: disable selecting elements on screen
        //Also TODO:: add a box with z-index 1 higher than pink alert text over the dog, with cursor:pointer, transparent and make that be the thing you click to bark
        //Also TODO:: add multiplier like buy 1x 2x 10x 50x 100x at a time, at purchase add while loop
        //Also TODO:: bird hunting reward needs to be reevaluated.. sometimes way too high sometimes way too low, also make birds appear slightly more often

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

    function chkEffects (hardFx) {

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
                    var ctDown=setInterval(function () {

                        if (pos==140) { 
                            clearInterval(ctDown);
                            imgs.forEach(function(img) { try{ document.body.removeChild(img); } catch{/*already gone*/} });
                        }

                        if (pos<91)
                            imgs.forEach(function(img) { img.style.top=pos.toString()+"%"; });

                        ++pos;

                    },17);

                }
            }


        }

        if ((fxTracker%50==0)&&(birdHuntingGroups>0)) {
            
            if (!(experiencedBirdHunting)&&!(hardFx)) {

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

        var originalFood=dogFood*2;
        var gainedBarks=10+(originalFood-friends);
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

        bark(-barks);//:(

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

        tmr=setInterval(function () {

            if (i==110) {

                clearInterval(tmr);
                try { document.body.removeChild(document.getElementById("bird")); }
                catch { /* already gone */ }

            }

            bird.style.left=(i*0.81).toString()+"%";
            bird.style.top=(i/4).toString()+"%";

            ++i;

        },19);

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
        
        setInterval (mainDogClick(false),10000);
        
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
        
        var overlay=document.createElement("div"),x=document.createElement("img");
        overlay.setAttribute("id","clinic_overlay");
        x.setAttribute("src","x.webp");
        x.setAttribute("id","clinic_exit");
        
        document.body.appendChild(overlay);
        overlay.appendChild(x);
        
        $(x).click(exitClinic);
        
        addClinicItem("Oxycodone","This painkiller medicine will help clear up all pain and negative effects. Oxycodone will also make it easier for you to collect moving items. Oxycodone costs 100 friends on purchase.",purchaseOxycodone);
        addClinicItem();
        addClinicItem();
        addClinicItem();
        addClinicItem();
        
        //White border with z-index:3 height:100% width:100% top:0% left:0% is placed over screen
        //Drugs to buy are listed on left of screen with information on all permanent and temporary effects (except psychedeic/visual/negative effects)
        
        //Buy one of 5 medicines:
        //Oxycodone, xanax, acid, psilocybin, dimethyltryptamine
        
        //Make it cost things other than flat barks such as:
        //Friends,% of barks, % of bark income temporarily
            
        //Make some have permanent effects such as friends becoming cheaper
        
        //More clinics = cheaper drugs & better positives from effects slightly* (but intensity is always at 100%)
        
        //On buy click, it returns to the main screen and the drug drops down from a supply crate that crashes open when it reaches 90%
        //top, and it's height:10%. Then, the drug will be left at 90%top, 10% height and when clicked the effects will ensue.
        
        //Effects of oxy cotton (cheapest, costs friends):
        //Reduce negative effects/subtractions (such as subtracting by friends when collecting food)
        //Falling food & birds move slower
        //Everything on screen becomes slightly blurry
        //Can't visit pet shop, it will say "You decided to stay home where it is nice, warm and cozy."
        //If negative debuffs like pain are added (ie human mind control failure) then this will fix it
        
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
    	document.body.removeChild(document.getElementById("clinic_overlay"));
    	
    }
    
    function purchaseOxycodone () {
    	
    	exitClinic();
    	
    }