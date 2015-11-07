var arrayMelding;
var liste;
var sokeord;
var stedstype;
var vars = [];
var ut;

function onload(){
var urlVars = getUrlVars();
var xmlhttp = new XMLHttpRequest();
var url = "steder.json";
        


xmlhttp.open("GET", url, true);
xmlhttp.overrideMimeType("application/json");
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {  

       liste = JSON.parse(xmlhttp.responseText);

//Hvis vars er satt (get fra url) så last inn værmeldingen
if(urlVars["sok"] != null){
     sokeord = urlVars["sok"];
     stedstype = urlVars["stedstype"];
     ut = simpleSearch2(sokeord, stedstype)
    document.getElementById("laster").innerHTML = '<img src="laster.gif" /><br>Laster inn værmeldingen';
    send(ut);
    getMelding(ut);
  } //vars



    } //if
} //onreadystatechange

xmlhttp.send(null);
}

function getUrlVars() {
var uri = decodeURI(window.location.href); //Håndtere spesial characters

var parts = uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {

value = value.split("+").join(" ");
value = value.split("%2C").join(",");

vars[key] = value;

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
        arrayMelding = JSON.parse(http.responseText);
        //Overskrift
        document.getElementById("overskrift").innerHTML = arrayMelding.stedsnavn;
        document.getElementById("stedsinfo").innerHTML = arrayMelding.kordinater["@attributes"].elevation + " moh.";
        //Dagens dato (navn)
        var dagensdato = new Date(arrayMelding.melding.detaljert.tidspunkt[0]["@attributes"].fratid);
        document.getElementById("dagensdato").innerHTML = "<b>I dag</b> " + [dagensdato.getDate()] + ". " + maaned[dagensdato.getMonth()];
        //Dagens tekstvarsel
       document.getElementById("vaerikonnaa").innerHTML = "<img src='b100/" + arrayMelding.melding.detaljert.tidspunkt[0].symbol["@attributes"].nr + ".png'/>";
       document.getElementById("gradernaa").innerHTML = arrayMelding.melding.detaljert.tidspunkt[0].temperatur;
       document.getElementById("gradernaasymbol").innerHTML = "&#8451";
       document.getElementById("dagenstekst").innerHTML = arrayMelding.melding.tekst.tidspunkt[0].tekst;
var utTekst = "";
for ( var i = 0; i < arrayMelding.melding.detaljert.tidspunkt.length; i++) {
    var obj = arrayMelding.melding.detaljert.tidspunkt[i];
    if (obj["@attributes"].periode == 2){
    divstart = "<div class='dag'>";
    divslutt ="</div>";
    fratid = new Date(obj["@attributes"].fratid);
      dagsymbol = "<img src='b38/"+obj.symbol["@attributes"].nr +".png'><br>"
      daggrader = obj.temperatur + "&#8451;";
      utTekst += divstart + "<b>" + ukedag[fratid.getDay()] + "</b><br> " + fratid.getDate() + ". " + maaned[fratid.getMonth()] + ".<br>" + dagsymbol + daggrader + divslutt;
     }
     }
     document.getElementById("melding").style.display = "block";
     document.getElementById("dagvarsel").innerHTML = utTekst;

    //Lager link til linkboksene
    yrLink = arrayMelding.credit['@attributes'].url;
    lat = arrayMelding.kordinater['@attributes'].latitude;
    lon = arrayMelding.kordinater['@attributes'].longitude;

    googlelink = arrayMelding.linker.googlemap["@attributes"].url;
    norgeskartIframeLink = arrayMelding.linker.norgeskart["@attributes"].url;
    norgeskartLink = "http://www.norgeskart.no/#12/"+lat+"/"+lon;
    document.getElementById("yrLink").href = yrLink;
    document.getElementById("googleLink").href = googlelink;
    document.getElementById("norgeskartLink").href = norgeskartLink;
    document.getElementById("utLinker").style.display = "block";
    document.getElementById("overskriftUtLinker").style.display = "block"; 
    console.log(arrayMelding);
    document.getElementById("norgeskartIframe").src = norgeskartIframeLink;
    document.getElementById("googleBoks").style.backgroundImage = "url('https://maps.googleapis.com/maps/api/staticmap?center="+ lat + "," + lon +  "&zoom=10&size=250x150')";

  
    }
}
document.getElementById("laster").innerHTML = '<img src="laster.gif" /><br>Laster inn værmeldingen';
http.open("GET", url+"?url="+StedObj.url, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.send(null);
}