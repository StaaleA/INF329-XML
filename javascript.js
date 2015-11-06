/*
== This page is developed by Christian Rennemo, last time changed: 30th of October 2015
== This page was initiated 23rd of October 2015.
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
// var xmlhttp = new XMLHttpRequest();
// var url = "readfile.php";

// xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//          liste = JSON.parse(xmlhttp.responseText);

//     }
// }
// xmlhttp.open("GET", url, true);
// xmlhttp.send();
// var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
/*
== TAR i mot URL fra søk
====================================================================================
*/
function senderURL (obj) {
	getMelding(obj);
}


