// ==UserScript==
// @name       Facebook AutoPoke
// @namespace  https://joneschrisan@github.com/joneschrisan/Facebook-AutoPoke
// @version    0.1
// @description  Atomaticaly pokes people who poke you on facebook
// @match      http://www.facebook.com/pokes
// @copyright  2012+, Chris 'CJ' Jones
// ==/UserScript==

function do_poke() {
    if(AutoPokeCounterOnOff.checked == true) {
        AutoPokePasses++;
        var AutoPokeATags = document.getElementsByTagName("a");
        //alert(atags);
        for(i = 0; i < AutoPokeATags.length; i++) {
            //alert(atags[i].innerHTML);
            if(AutoPokeATags[i].innerHTML.match(/<img[a-z|A-Z|:|\/|=|\"|0-9|_| |.|;|]*>Poke back/gi)) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !AutoPokeATags[i].dispatchEvent(evt);
                if(canceled) {
                  //alert("canceled");
                } else {
                  //alert("not canceled");
                }
            }
        }
        AutoPokeCounter.innerHTML = AutoPokePasses;
    }
}

//alert("Facebook AutoPoke started");
var AutoPokePasses = 0;

var AutoPokeH2Tags = document.getElementsByTagName("h2");
for(i = 0; i < AutoPokeH2Tags.length; i++) {
    if(AutoPokeH2Tags[i].innerHTML.match(/<img[a-z|A-Z|:|\/|=|\"|0-9|_| |.|]*>Pokes/gi)) {
        var AutoPokeTitle = AutoPokeH2Tags[i];
    }
}

var AutoPokeContainer = document.createElement("h3");

var AutoPokePassesText = document.createElement("span")
AutoPokePassesText.innerHTML = "AutoPoke Passes: ";

var AutoPokeCounter = document.createElement("span");
AutoPokeCounter.id = "AutoPokeCounter";
AutoPokeCounter.innerHTML = "0";

var AutoPokeBR = document.createElement("br");

var AutoPokeOnOffText = document.createElement("span");
AutoPokeOnOffText.innerHTML = "AutoPoke On: ";

var AutoPokeCounterOnOff = document.createElement("input");
AutoPokeCounterOnOff.type = "checkbox";
AutoPokeCounterOnOff.checked = "checked";
AutoPokeCounterOnOff.id = "AutoPokeCounterOnOff";

AutoPokeContainer.appendChild(AutoPokePassesText);
AutoPokeContainer.appendChild(AutoPokeCounter);
AutoPokeContainer.appendChild(AutoPokeBR);
AutoPokeContainer.appendChild(AutoPokeOnOffText);
AutoPokeContainer.appendChild(AutoPokeCounterOnOff);

AutoPokeTitle.appendChild(AutoPokeContainer);

var AutoPokeTimeOutId = self.setInterval(do_poke, 5000);