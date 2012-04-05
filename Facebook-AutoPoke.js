// ==UserScript==
// @name       Facebook AutoPoke
// @namespace  https://github.com/joneschrisan/Facebook-AutoPoke
// @version    0.2.1
// @description  Atomaticaly pokes people who poke you on facebook
// @match      http://www.facebook.com/pokes
// @copyright  2012+, Chris 'CJ' Jones
// ==/UserScript==

function do_poke() {
    if(document.getElementById("AutoPokeCounterOnOff").checked == true) {
        var AutoPokeATags = document.getElementsByTagName("a");
        for(i = 0; i < AutoPokeATags.length; i++) {
            if(AutoPokeATags[i].innerHTML.match(/<img[a-z|A-Z|:|\/|=|\"|0-9|_| |.|;|]*>Poke back/gi)) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !AutoPokeATags[i].dispatchEvent(evt);
            }
        }
        if(document.getElementById("AutoPokeDeletePokesOnOff").checked == true) {
            var AutoPokeCloseButtons = pagelet_pokes.getElementsByTagName("a");
            for(i = 0; i < AutoPokeCloseButtons.length; i++) {
                if(AutoPokeCloseButtons[i].title == "Remove") {
                    var evt2 = document.createEvent("MouseEvents");
                    evt2.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    var canceled = !AutoPokeCloseButtons[i].dispatchEvent(evt2);
                    AutoPokeNumPokes++;
                    var AutoPokePokesCounter = document.getElementById("AutoPokePokes");
                    AutoPokePokesCounter.innerHTML = AutoPokeNumPokes;
                }
            }
        }
    }
}

function start_AutoPoke() {
    AutoPokePasses = 0;
    AutoPokeNumPokes = 0;
    
    AutoPokeH2Tags = document.getElementsByTagName("h2");
    for(i = 0; i < AutoPokeH2Tags.length; i++) {
        if(AutoPokeH2Tags[i].innerHTML.match(/<img[a-z|A-Z|:|\/|=|\"|0-9|_| |.|]*>Pokes/gi)) {
            var AutoPokeTitle = AutoPokeH2Tags[i];
        }
    }
    
    var AutoPokeContainer = document.createElement("h3");
    
    var AutoPokePokesText = document.createElement("span");
    AutoPokePokesText.innerHTML = "Pokes back: ";
    
    var AutoPokePokes = document.createElement("span");
    AutoPokePokes.type = "text";
    AutoPokePokes.id = "AutoPokePokes";
    AutoPokePokes.innerHTML = "0";
    
    var AutoPokeBR = document.createElement("br");
    
    var AutoPokeDeletePokesText = document.createElement("span");
    AutoPokeDeletePokesText.innerHTML = "Delete pokes after poke back: ";
    
    var AutoPokeDeletePokesOnOff = document.createElement("input");
    AutoPokeDeletePokesOnOff.type = "checkbox";
    AutoPokeDeletePokesOnOff.id = "AutoPokeDeletePokesOnOff";
    AutoPokeDeletePokesOnOff.checked = "checked";
    
    var AutoPokeBR2 = document.createElement("br");
    
    var AutoPokeOnOffText = document.createElement("span");
    AutoPokeOnOffText.innerHTML = "AutoPoke On: ";
    
    var AutoPokeCounterOnOff = document.createElement("input");
    AutoPokeCounterOnOff.type = "checkbox";
    AutoPokeCounterOnOff.id = "AutoPokeCounterOnOff";
    
    AutoPokeContainer.appendChild(AutoPokePokesText);
    AutoPokeContainer.appendChild(AutoPokePokes);
    AutoPokeContainer.appendChild(AutoPokeBR);
    AutoPokeContainer.appendChild(AutoPokeDeletePokesText);
    AutoPokeContainer.appendChild(AutoPokeDeletePokesOnOff);
    AutoPokeContainer.appendChild(AutoPokeBR2);
    AutoPokeContainer.appendChild(AutoPokeOnOffText);
    AutoPokeContainer.appendChild(AutoPokeCounterOnOff);
    
    AutoPokeTitle.appendChild(AutoPokeContainer);
    
    AutoPokeTimeOutId = self.setInterval(do_poke, 5000);
}

var AutoPokeTimeOutId;

var AutoPokePasses;
var AutoPokeNumPokes;
var AutoPokeH2Tags;

var pagelet_pokes;

window.onload = function() {
    pagelet_pokes = document.getElementById("pagelet_pokes");
    start_AutoPoke()
}