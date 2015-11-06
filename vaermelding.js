var liste;
var vars = {};
function getUrlVars() {
var uri = decodeURI(window.location.href); //Håndtere spesial characters
var parts = uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {

value = value.split("+").join(" ");
value = value.split("%2C").join(",");

vars[key] = value;
console.log(vars);
});
return vars;
}

function getMelding(StedObj){
var ukedag = new Array(7);
ukedag[0]=  "Søndag";
ukedag[1] = "Mandag";
ukedag[2] = "Tirsdag";
ukedag[3] = "Onsdag";
ukedag[4] = "Torsdag";
ukedag[5] = "Fredag";
ukedag[6] = "Lørdag";

var maaned = new Array(11);
maaned[0]=  "jan";
maaned[1] = "feb";
maaned[2] = "mar";
maaned[3] = "apr";
maaned[4] = "mai";
maaned[5] = "jun";
maaned[6] = "jul";
maaned[7] = "aug";
maaned[8] = "sep";
maaned[9] = "okt";
maaned[10] = "nov";
maaned[11] = "des";

var http = new XMLHttpRequest();
var url = "nyxml.php";

http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	document.getElementById("laster").innerHTML = ''; 
        

        //Overskrift
        document.getElementById("overskrift").innerHTML = liste.stedsnavn;

        //Dagens dato (navn)
        var dagensdato = new Date(liste.melding.detaljert.tidspunkt[0]["@attributes"].fratid);
        document.getElementById("dagensdato").innerHTML = ukedag[dagensdato.getDay()];
        //Dagens tekstvarsel
       document.getElementById("vaerikonnaa").innerHTML = "<img src='b100/" + liste.melding.detaljert.tidspunkt[0].symbol["@attributes"].nr + ".png'/>";
       document.getElementById("gradernaa").innerHTML = liste.melding.detaljert.tidspunkt[0].temperatur;
       document.getElementById("gradernaasymbol").innerHTML = "&#8451";
  	   document.getElementById("dagenstekst").innerHTML = liste.melding.tekst.tidspunkt[0].tekst;
var utTekst = "";
for ( var i = 0; i < liste.melding.detaljert.tidspunkt.length; i++) {
		var obj = liste.melding.detaljert.tidspunkt[i];
		if (obj["@attributes"].periode == 2){
		divstart = "<div class='dag'>";
		divslutt ="</div>";
		fratid = new Date(obj["@attributes"].fratid);
  	 	dagsymbol = "<img src='b38/"+obj.symbol["@attributes"].nr +".png'><br>"
  	 	daggrader = obj.temperatur + "&#8451;";
  	 	utTekst += divstart + "<b>" + ukedag[fratid.getDay()] + "</b><br> " + fratid.getDate() + ". " + maaned[1] + ".<br>" + dagsymbol + daggrader + divslutt;

  	 }

  	 }
  	 document.getElementById("dagvarsel").innerHTML = utTekst;
  
    }
}



http.open("GET", url+"?url="+StedObj.url, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.send(null);
}