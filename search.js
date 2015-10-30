/*
== This page is developed by Christian Rennemo, last time changed: 30th of October 2015
== This page was initiated 27th of October 2015.
==
*/
// class steder {
//   constructor(navn, url) {
//     this.navn = navn;
//     this.url = url;
//   }
// }
 steder = [];

function Sted(navn, kommune, fylke, stedstype, url) {
  this.navn = navn;
  this.kommune = kommune;
  this.fylke = fylke;
  this.stedstype = stedstype;
  this.url = url;
}
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
        
         selectedDiv = 0;
        if (input.length !== 0) {

            input = input.toUpperCase();
            steder = [];
            for (i = 0; i < liste.length; i++) {
                var sokDenne = liste[i].navn.toUpperCase();
                if (sokDenne.indexOf(input, 0) === 0 && teller < 9) {

                    // Prøver objekter
                    // var sted = {
                    //     navn: liste[i].navn,
                    //     url: liste[i].url
                    // };
                    var etsted = new Sted(liste[i].navn, liste[i].kommune, liste[i].fylke, liste[i].stedstype, liste[i].url);
                    steder.push(etsted);

                    
                    // url = liste[i].url;
                    // Tar vekk URL, lag heller klasse, lettere å hente ut etterpå
                    // hint = hint + '<div class="forslag" id=' + teller + '><a href=' + 
                    //url + '>' + liste[i].navn + '</a></div>';
                    hint = hint + '<div class="forslag" id=' + teller + '>' + etsted.navn + ' - ' + etsted.stedstype +'<br><span class="info">' + etsted.kommune + ' / ' + etsted.fylke + '</span></div>';
                    søkefelt.innerHTML = hint;
                   
                    søkefelt.getElementsByTagName('div')[0].style.backgroundColor = '#68F';
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
            selectedDiv = 1;
            i;
        document.getElementById('instantsearch').getElementsByTagName('div')[0].style.backgroundColor = "";

        divs[selectedDiv].style.backgroundColor = '#68F';
        document.getElementById('sok').onkeyup = function(e) {
              document.getElementById('instantsearch').getElementsByTagName('div')[0].style.backgroundColor = "";
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
== Tøm forslags-listen
====================================================================================
*/
function clearForslag() {
    var fjernMeg = document.getElementsByClassName('forslag');
    while(fjernMeg[0]) {
        fjernMeg[0].parentNode.removeChild(fjernMeg[0]);
    }
}

function celarID() {
    var node = document.getElementById('instantsearch');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function refresh() {
    var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
            selectedDiv = 0,
            i;
    for (i = 0; i < divs.length; i++)
            divs[i].style.backgroundColor = '';
            divs[i] = null;
            divs[selectedDiv].style.backgroundColor = '#68F';
            divs[i].onkeyup = (function(i) {
                return function() {
                    divs[selectedDiv].style.backgroundColor = '';
                    selectedDiv = i;
                    divs[selectedDiv].style.backgroundColor = '#68F';
                }
            })(i);
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

    else if (!(e == 40 || e == 38)) { 
        // om bruker skriver OG divs[selectedDiv] er satt
        if(x) {
            clearForslag();
            // celarID();
            // refresh();
            searchDivs(sokeord, event);
        }
    }
    else if(e==13) {
        // trykk på ENTER
        x = searchDivs.getSelected();
       
        document.getElementById('sok').innerHTML = x;
        document.getElementById('stedsok').submit();
    }
        if (sokeord=="") {
            searchDivs('a', event);
        }
}

/*
== KONTROLL før sending
====================================================================================
== Ulike funksjoner som foretar kontroll som sørger for at vi sender riktig info
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
*/

function send(x) {
    document.getElementById('sok').value = x.navn;
    document.getElementById('formStedstype').value = x.stedstype;
    //document.getElementById('stedsok').submit();
}

/*
== sjekk()
====================================================================================
*/
function sjekk () {
    var divs = document.getElementById('instantsearch').getElementsByTagName('div');

    // Sjekker om du har valgt et forslag
    var funnet = false;
    var i = 0;
    while(i < divs.length && !funnet) {
        farge = divs[i].style.backgroundColor;
        if(farge === 'rgb(102, 136, 255)') {
            funnet = true;
        }
        i++;
    }

    // Forslag er brukt
    if(funnet) {
        //x = searchDivs.getSelected();
        var obj = steder[i-1];
        senderURL(obj);

        send(obj);
    } else {
        // Ingen forslag - utfører ENKELT søk
        var ord = document.getElementById('sok').value;
        var res = simpleSearch(ord);
        var url = getURL(res);
        senderURL(url);
        send(url);
    }
    // x = searchDivs.getSelected();
    // send(x.innerHTML);
    return true;
}

// Enkel søkefunksjon som kun søker på inputfelt
function simpleSearch (string) {
    var funnet = false;
    var i = 0;
    var soktreff;
    while(!funnet) {
        if(liste[i].navn.includes(string)) {
            funnet = true;
            return liste[i].navn;
        }
        i++;
    }
}

function simpleSearch2 (sted, stedstype) {
    var funnet = false;
    var i = 1;
    var soktreff;

    while(!funnet) {
        if(liste[i].navn == sted && liste[i].stedstype == stedstype) {
            funnet = true;

            return liste[i];
        }
        i++;
    }
}

function getURL (sted) {
    var funnet = false;
    var i = 0;
    while(!funnet) {
        if(liste[i].navn.includes(sted)) {
            funnet = true;
            return liste[i].url;
        }
        i++;
    }
}

