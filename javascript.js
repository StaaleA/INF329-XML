/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/

function lesSteder() {
	var leseFil = new XMLHttpRequest();
	leseFil.open("GET", "noreg.txt", true);
	leseFil.onreadystatechange = function() {
		if(leseFil.readyState === 4) {
			if(leseFil.status === 200 || leseFil.status == 0) {
				var lestTekst = leseFil.responseText;
				document.getElementById("ut").innerHTML = lestTekst;
			}
		}
	} 
}