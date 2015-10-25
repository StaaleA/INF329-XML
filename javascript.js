/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/


/*
== Henter ut JSON fra PHP-filen: readfile.php
===========================================================================
*/

/*
Om php-filen hadde ligget på en online-server kunne vi ha brukt XMLHttpRequest 
til å hente json-filen, og fått en "renere" kode. Men JavaScript tillater ikke
å hente filer lokalt på grunn av sikkerhetshensyn. Derfor har vi lagt json-filen
vår i en JavaScript-variabel på index.php som vi henter.
*/

function searchJson(input) {

	// alert(liste[2].navn);
	// var lengde = liste.length();
	//alert("he");
	//alert(liste[1643].url);
	var obj = JSON.parse(liste);
	alert(obj.steder[2].navn + " " + obj.steder[2].url);
}

// alert("ikke");
// alert(liste[3].navn);
// // var obj = JSON.parse(text);
// var stedObjekt = JSON.parse(nyliste);
// alert(stedObjekt.steder[4].navn);


// Dette kunne blitt noe fint...
var xmlhttp = new XMLHttpRequest();
var url = "readfile.php";

xmlhttp.onreadystatechange=function() {
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
        arr[i] +
        "</td><td>" +
        arr[i].Country +
        "</td></tr>";
    }
    ut += "</table>";
    document.getElementById("ut").innerHTML = ut;
}


/*
== File API from HTML5 - An attemt to test out the new File API from HTML5
===========================================================================
*/

