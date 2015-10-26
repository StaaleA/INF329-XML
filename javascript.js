/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/


/*
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
================================================================================
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
================================================================================
*/
function searchJson(input) {
	//document.getElementById('livesok').getElementsByTagName('input')[0].onkeyup = tastetrykk;
    document.onkeydown = tastetrykk;
    var funnet = false;
    var i = 0;
    var url;
    var teller = 0;
    var hint = '';
    var søkefelt = document.getElementById('livesok');
    // søkefelt.style.border = '1px solid #A5ACB2';
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
==============================================================================
*/
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

function tastetrykk(e) {
    var event = window.event ? window.event : e;
    tallkode = event.keyCode;
    // Her legger vi alle søkeforlag i en liste
    var divs = document.getElementById('livesok').getElementsByTagName('div');
    valgDiv = 0;
    i = 0;

    for(i = 0; i < divs.length; i++) {
    	divs[i].onclick = (function(i) {
	    	return function() {
		        divs[selectedDiv].style.backgroundColor = '';
		        selectedDiv = i;
		        divs[selectedDiv].style.backgroundColor = '#68F';
	    	}
    	})(i);
    }
    divs[selectedDiv].style.backgroundColor = '#68F';
    var x = 0;

    if (tallkode == 40) {
    	// Pil ned
    	x = 1;
    } else if (tallkode == 38) {
    	// Pil opp
    	x = -1;
    }
    else
        return;
    divs[selectedDiv].style.backgroundColor = '';
    selectedDiv = ((selectedDiv + x) % divs.length);
    selectedDiv = selectedDiv < 0 ?
        divs.length + selectedDiv : selectedDiv;
    divs[selectedDiv].style.backgroundColor = '#68F';
}


// var divs = document.getElementById('livesok').getElementsByTagName('div'),
//     selectedDiv = 0,
//     i;

// for (i = 0; i < divs.length; i++)
// //alert(divs[i].innerHTML);
//     divs[i].onclick = (function(i) {
//     return function() {
//         divs[selectedDiv].style.backgroundColor = '';
//         selectedDiv = i;
//         divs[selectedDiv].style.backgroundColor = '#68F';
//     }
// })(i);
// // alert(divs[selectedDiv].innerHTML);
// divs[selectedDiv].style.backgroundColor = '#68F';

// document.getElementById('livesok').getElementsByTagName('input')[0].onkeyup = function(e) {
//     var x = 0;
//     if (e.keyCode == 38)
//         x = -1;
//     else if (e.keyCode == 40)
//         x = 1;
//     else
//         return;
//     divs[selectedDiv].style.backgroundColor = '';
//     selectedDiv = ((selectedDiv + x) % divs.length);
//     selectedDiv = selectedDiv < 0 ?
//         divs.length + selectedDiv : selectedDiv;
//     divs[selectedDiv].style.backgroundColor = '#68F';
// };