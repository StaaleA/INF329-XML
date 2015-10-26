/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/

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

/*
====================================================================================
Om php-filen hadde ligget på en online-server kunne vi ha brukt XMLHttpRequest 
til å hente json-filen, og fått en "renere" kode. Men JavaScript tillater ikke
å hente filer lokalt på grunn av sikkerhetshensyn. Derfor har vi lagt json-filen
vår i en JavaScript-variabel på index.php som vi henter.
====================================================================================
Dette kunne blitt noe fint...
*/
var xmlhttp = new XMLHttpRequest();
var url = "localhost:8888/INF329-XML/readfile.php";

xmlhttp.onreadystatechange=function() {
	alert("j");
    if (xmlhttp.readyState == 4 || xmlhttp.status == 200) {
        hentJson(xmlhttp.responseText);
        alert("hei");
    }
    //alert("ikke ready state... :(");
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function hentJson(response) {
    var arr = JSON.parse(response);
    var i;
    var ut = "<table>";

    for(i = 0; i < arr.length; i++) {
        ut += "<tr><td>" +
        arr[i].navn +
        "</td><td>" +
        arr[i].url +
        "</td></tr>";
    }
    ut += "</table>";
    document.getElementById("ut").innerHTML = ut;
}