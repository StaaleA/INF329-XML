/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/

function lesSteder() {
	var leseFil = new XMLHttpRequest();
	alert("hei");
	leseFil.open("GET", "/noreg.txt", false);
	alert("hei igjen");
	leseFil.onreadystatechange = function() {
		alert("inne i funksjonen");
		if(leseFil.readyState === 4) {
			alert("readyState er lik 4.");
			if(leseFil.status === 200 || leseFil.status == 0) {
				alert("status er 200 eller 0, og det bør bli skrevet ut");
				var lestTekst = leseFil.responseText;
				document.getElementById("ut").innerHTML = lestTekst;
			}
		}
	} 
	leseFil.send(null);
	alert("siste");
}