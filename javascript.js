/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/


/*
====================================================================================
Benytter 
Om php-filen hadde ligget på en online-server kunne vi ha brukt XMLHttpRequest 
til å hente json-filen, og fått en "renere" kode. Men JavaScript tillater ikke
å hente filer lokalt på grunn av sikkerhetshensyn. Derfor har vi lagt json-filen
vår i en JavaScript-variabel på index.php som vi henter.
====================================================================================
*/
var xmlhttp = new XMLHttpRequest();
var url = "readfile.php";

xmlhttp.onreadystatechange=function() {
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
================================================================================
*/
function searchJson(input) {
	var funnet = false;
	var i = 0;
	var teller = 0;
	var hint ="";
	var søkefelt = document.getElementById("livesok");
	søkefelt.style.border="1px solid #A5ACB2";
	søkefelt.innerHTML=hint;
	if(!input.length==0) {
		for(i = 0; i < liste.length; i++) {
			var sokDenne = liste[i].navn;
			if(sokDenne.includes(input) && teller<20) {
				url = liste[i].url;
				 hint = hint + "<a href=" + url + ">" + sokDenne + "</a><br>";
				søkefelt.innerHTML=hint;
				teller++;
			}
		}
	} else {
		søkefelt.innerHTML="";
	}
}