/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 27th of October 2015.
==
*/


/* 
== Hvordan vi henter inn informasjon
====================================================================================
== Vi ønsker å kunne kommunisere med de ulike filene på serveren uten å gå via 
== grensesnittet når handlinger skal utføres. Vi henter derfor JSON-filen vi generer
== i PHP(readfile.php) via AJAX. Til dette bruker vi XMLHttpRequest som er en av 
== grunnpillarene i AJAX. Vi kan med XMLHttpRequest utføre handlinger uten å laste
== inn siden på nytt. Tidligere ville vi ha lagt ut resultatet fra PHP-filen på 
== index.html og henten den inn med JavaScript. Dette unngår vi nå.
== 
== Vi har også sett på mulighetene til å benytte oss av Fetch API som er en videre-
== føring av AJAX, som har til hensikt å gjøre koden lettere å bruke. Men ettersom
== Fetch ikke er støttet av verken Safari eller IE har vi valg å droppe det.
== Kilde: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
== Kilde: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
====================================================================================
*/
var xmlhttp = new XMLHttpRequest();
var url = "readfile.php";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        hentJson(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
var headers = xmlhttp.getAllResponseHeaders().toLowerCase();

function hentJson(response) {
    liste = JSON.parse(response);
}

/*
== SØKE-funksjon som går igjennom JSON-filen
====================================================================================
== Ved denne funksjonen oppnår vi et livesøk, som lister ut et oppdatert søk på 
== hvert tastetrykk. Funksjonen blir kalt ved 'onkeyup' ved inputfeltet.
== For å ikke gjøre brukeropplevelsen treg, begrenser vi antall forslag til 20.
==
== String.prototype.includes() | Finn treff i filen
== Til å se etter treff mot JSON-filen vår har vi valgt å bruke en String.includes()
== Denne funksjonen returnerer true/false og passer glimmrende i vårt tilfelle. 
== String.includes() kom som standard API i ECMAScript2015(ES6), og er derfor ikke
== støttet i alle nettlesere enda. IE og Opera er ikke støttet, og derfor bruker 
== vi Polyfill. Alternativt kan vi bruke indexOf(), og teste om resultatet er -1.
====================================================================================
*/
function searchJson(input) {
    var funnet = false;
    var i = 0;
    var url;
    var teller = 0;
    var hint = '';
    var søkefelt = document.getElementById('livesok');
    søkefelt.innerHTML = hint;
    if (!input.length == 0) {
        input = input.toUpperCase()
        for (i = 0; i < liste.length; i++) {
            var sokDenne = liste[i].navn.toUpperCase();
            if (sokDenne.includes(input) && teller < 20) {
                url = liste[i].url;
                hint = hint + '<div class="forslag" id=' + teller + '><a href=' + url + '>' + liste[i].navn + '</a></div>';
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
== searchDivs(e) | orsøker å navigere i div'ene med kode fra jsfiddle
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
        var i = 0;
        var url;
        var teller = 0;
        var hint = '';
        var søkefelt = document.getElementById('instantsearch');
        søkefelt.innerHTML = hint;
        if (!input.length == 0) {
            input = input.toUpperCase()
            for (i = 0; i < liste.length; i++) {
                var sokDenne = liste[i].navn.toUpperCase();
                if (sokDenne.includes(input) && teller < 20) {
                    url = liste[i].url;
                    hint = hint + '<div class="forslag" id=' + teller + '><a href=' + url + '>' + liste[i].navn + '</a></div>';
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
    }
    // Innhentet kode som kan navigere blant div'er
    var divs = document.getElementById('testID').getElementsByTagName('div'),
        selectedDiv = 0,
        i;

    for (i = 0; i < divs.length; i++)
        divs[i].onclick = (function(i) {
            return function() {
                divs[selectedDiv].style.backgroundColor = '';
                selectedDiv = i;
                divs[selectedDiv].style.backgroundColor = '#68F';
            }
        })(i);

    divs[selectedDiv].style.backgroundColor = '#68F';

    document.getElementById('testID').getElementsByTagName('input')[0].onkeydown = function(e) {
        var x = 0;
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

/*
== searchSteder(e) | Navigering med <datalist>
====================================================================================
== Et alternativ til å bruke div'er når vi lister ut resultater er <datalist>.
== Nytt i HTML5 er <datalist> som gir oss muligheten til å bestemme innholdet for
== den innebygde autocomplete-dropdown'en som finnes under <input>. 
== Ved denne metoden slipper vi unna å bruke andre rammeverk, og har full kontroll
== selv. Ulempen er at vi har lite muligheter til å bestemme designer til dropdown-
== elementet. 
== <datalist>-tagen ligger inder en <input> som fyller ut attributtet <list> og setter
== det lik til id'en på <datalist>. På den måten kan de kommunisere. Videre legger vi
== inn <option>-elementer i JavaScript som er forslagene brukeren ser. 
== Kilde: http://www.w3schools.com/tags/tag_datalist.asp
====================================================================================
*/
function searchSteder(input, event) {
    var x = event.which || event.keyCode;
    if (x != 40) {
        var datalist = document.getElementById('steder');
        var funnet = false;
        var i = 0;
        var url;
        var teller = 0;
        var søkefelt = document.getElementById('inputSok');
        if (!input.length == 0) {
            input = input.toUpperCase()
            for (i = 0; i < liste.length; i++) {
                var sokDenne = liste[i].navn.toUpperCase();
                if (sokDenne.includes(input) && teller < 20) {
                    var option = document.createElement('option');
                    option.value = liste[i].navn;
                    datalist.appendChild(option);
                    teller++;
                }
            }
            if (teller === 0) {
                søkefelt.innerHTML = 'ingen treff';
            }
        } else {
            søkefelt.innerHTML = '';
        }
    }
}