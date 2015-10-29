/*
== This page is developed by Christian Rennemo, last time changed: 27th of October 2015
== This page was initiated 27th of October 2015.
==
*/

/*
== SØKE-funksjon som går igjennom JSON-filen
====================================================================================
== Ved denne funksjonen oppnår vi et livesøk, som lister ut et oppdatert søk på 
== hvert tastetrykk. Funksjonen blir kalt ved 'onkeyup' ved inputfeltet.
== For å ikke gjøre brukeropplevelsen treg, begrenser vi antall forslag til 10.
==
== String.prototype.includes() | Finn treff i filen
== Til å se etter treff mot JSON-filen vår har vi valgt å bruke en String.includes()
== Denne funksjonen returnerer true/false og passer glimmrende i vårt tilfelle. 
== String.includes() kom som standard API i ECMAScript2015(ES6), og er derfor ikke
== støttet i alle nettlesere enda. IE og Opera er ikke støttet, og derfor bruker 
== vi Polyfill. Alternativt kan vi bruke indexOf(), og teste om resultatet er -1.
==
== searchDivs(e) | forsøker å navigere i div'ene med kode fra jsfiddle
====================================================================================
== For gjøre brukeropplevelsen bedre for brukerne våre, ønsker vi at man kan navigere
== med pilene nedover mens man skriver inn søke ord. Slik at man slipper å enten bruke
== musen til å klikke med, eller skrive ferdig søker. Dette har vist seg å være ganske
== vansklig å få til uten å benytte seg av rammeverk som jQuery. Derfor har vi hentet
== et forslag fra jsfiddle. 
==
== Koden: sammen med hva som blir søkt på, sender vi også 'event', da kan vi finne ut
== hvilken taster brukeren har trykket på. Og ved trykke på opp eller ned-piltastene
== ønsker vi å la brukeren navigere ned lista. Her bruker vi altså koden fra jsfiddle.
== Kilde: http://jsfiddle.net/uEBSV/
====================================================================================
*/
function searchDivs(input, event) {
    var e = event.which || event.keyCode;
    if (e != 40) {
        var funnet = false;
        var url;
        var teller = 0;
        var hint = '';
        var søkefelt = document.getElementById('instantsearch');
        søkefelt.innerHTML = hint;
        if (input.length !== 0) {
            input = input.toUpperCase();
            for (i = 1; i < liste.length; i++) {
                var sokDenne = liste[i].navn.toUpperCase();
                if (sokDenne.includes(input) && teller < 10) {
                    url = liste[i].url;
                    // Tar vekk URL, lag heller klasse, lettere å hente ut etterpå
                    // hint = hint + '<div class="forslag" id=' + teller + '><a href=' + url + '>' + liste[i].navn + '</a></div>';
                    hint = hint + '<div class="forslag" id=' + teller + '>' + liste[i].navn + '</div>';
                    søkefelt.innerHTML = hint;
                    teller++;
                }
            }
            if (teller === 0) {
                søkefelt.innerHTML = 'ingen treff';
            }
        } else {
            søkefelt.innerHTML = '';
        }
    } else {
        // Innhentet kode som kan navigere blant div'er
        var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
            selectedDiv = 0,
            i;
        for (i = 0; i < divs.length; i++)
            divs[i].onkeyup = (function(i) {
                return function() {
                    divs[selectedDiv].style.backgroundColor = '';
                    selectedDiv = i;
                    divs[selectedDiv].style.backgroundColor = '#68F';
                }
            })(i);

        divs[selectedDiv].style.backgroundColor = '#68F';
        document.getElementById('sok').onkeyup = function(e) {
            if(!(e.keyCode == 38 || e.keyCode == 40)) {
                selectedDiv = 0;
                divs[selectedDiv].style.backgroundColor = '#68F';
            } else {
                if (e.keyCode == 38)
                    x = -1;
                else if (e.keyCode == 40)
                    x = 1;
                else
                    return;
                divs[selectedDiv].style.backgroundColor = '';
                selectedDiv = ((selectedDiv + x) % divs.length);
                selectedDiv = selectedDiv < 0 ?
                    divs.length + selectedDiv : selectedDiv;
                divs[selectedDiv].style.backgroundColor = '#68F';
            }
    }

    function getSelected() {
            return divs[selectedDiv];
        }
        searchDivs.getSelected = getSelected;
    }
}

/*
== Polyfill for String.includes()
====================================================================================
*/
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

/*
== Setter fokus til søk-feltet ved innlastning
====================================================================================
*/
document.getElementById('sok').focus();

/*
== EVENT LISTENER - Denne funksjonen skal erstatt kallet vi gjør i index.html 
====================================================================================
== Her har vi en god oversikt over hva vi sender vidre til funksjonen. 
====================================================================================
*/
// document.getElementById('sok').addEventListener("keyup", function(){searchDivs(this.value, event)});
// document.getElementById('stedsok').onsubmit = function() {return false;}

// Sjekker at bruker har begynt å søke
//document.getElementById('sok').addEventListener("keyup", nyInput);

function nyInput(event) {
    var e = event.which || event.keyCode;
    var sokeord = document.getElementById('sok').value;
    var x;

    if(e==8){
        // trykk på <- knappen
        searchDivs(sokeord, event);
    } 
    else if (e==27) {
        // Trykk på 'esc'
        document.getElementById('sok').focus();
        document.getElementById('instantsearch').innerHTML = '';
        searchDivs('', event);
    }
    else if(e==13) {
        // trykk på ENTER
        x = searchDivs.getSelected();
        document.getElementById('sok').innerHTML = x;
        document.getElementById('stedsok').submit();
        alert(x);
    }
    else if(e == 40 || e == 38) {
        // Om piltastene er brukt, oppdaterer vi valg forslag
        searchDivs(sokeord, event);
    }
    else if(x && !(e==40 || e==38)) {
        // Om forslag er satt, og vi skriver
        alert("heu");
    }
    else {
        searchDivs(sokeord, event);
    }
}


/*
== DET FØRSTE FORSØKET - SOM NESTEN GIKK... 
== Her funker alt bortsett fra å nullstille divs[selecteDiv] når vi skriver noe nytt
====================================================================================
*/

document.getElementById('sok').addEventListener("keyup", skrik);

function skrik(event) {
    var e = event.which || event.keyCode;
    var x = searchDivs.getSelected(); 
    var sokeord = document.getElementById('sok').value;
    // alert(sokeord);
    
    if (e==8) { // tilbake-knappen <-
        searchDivs(sokeord, event);
    }
    else if (e==27) {
        // Trykk på 'esc'
        searchDivs('', event);
    }
    else if (!(e == 40 || e == 38)) { 
        // om bruker skriver OG divs[selectedDiv] er satt
        if(x) {
            document.getElementById('sok').focus();
            document.getElementById('instantsearch').innerHTML = '';
            searchDivs(sokeord, event);
        }
    }
    else if(e==13) {
        // trykk på ENTER
        x = searchDivs.getSelected();
        alert(x);
        document.getElementById('sok').innerHTML = x;
        document.getElementById('stedsok').submit();
        alert(x);
    }
        if (sokeord==="") {
            searchDivs(sokeord, event);
        }
}

function send () {
    x = searchDivs.getSelected();
        alert(x.innerHTML);
        document.getElementById('sok').value = x.innerHTML;
        document.getElementById('stedsok').submit();
        alert(x);
}

function sjekk () {
    send();
    return true;
}

