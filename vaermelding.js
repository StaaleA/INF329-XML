var arrayMelding;
var liste;
var sokeord;
var stedstype;
var vars = [];
var ut;
var fylke;
var kommune;

function onload() {
    var urlVars = getUrlVars();
    var xmlhttp = new XMLHttpRequest();
    var url = "steder.json";



    xmlhttp.open("GET", url, true);
    xmlhttp.overrideMimeType("application/json");
    xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                liste = JSON.parse(xmlhttp.responseText);

                //Hvis vars er satt (get fra url) så last inn værmeldingen
                if (urlVars["sok"] != null) {
                    sokeord = urlVars["sok"];
                    stedstype = urlVars["stedstype"];
                    kommune = urlVars["kommune"];
                    ut = getAtrSok(sokeord, stedstype, kommune);
                    fylke = ut.fylke;
                    document.getElementById("laster").innerHTML = '<img src="laster.gif" /><br>Laster inn værmeldingen';
                    send(ut);
                    getMelding(ut);
                } //vars 
                else {
                    // Om vars ikke er satt betyr det at vi er på startsiden, og vi setter fokus til søkefeltet
                    document.getElementById('sok').focus();
                }



            } //if
        } //onreadystatechange

    xmlhttp.send(null);

    var bildeurl;
    var xhrHentBilde = new XMLHttpRequest();
    sokeord = urlVars["sok"];
    kommune = sokeord = urlVars["kommune"];
    sokeord = sokeord.split(" ").join("");
    sokeord = sokeord.split(",").join("");
    var url = "hentbilde.php?sted=" + sokeord + "&kommune=" + kommune;


    xhrHentBilde.open("GET", url, true);
    xhrHentBilde.overrideMimeType("application/json");

    xhrHentBilde.onreadystatechange = function() {
            if (xhrHentBilde.readyState == 4 && xhrHentBilde.status == 200) {
                bildeurl = xhrHentBilde.responseText;
                console.log(bildeurl);
                document.getElementById("bilde").src = bildeurl;
            } //if
        } //onreadystatechange

    xhrHentBilde.send(null);
}

function getUrlVars() {
    var uri = decodeURI(window.location.href); //Håndtere spesial characters

    var parts = uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {

        value = value.split("+").join(" ");
        value = value.split("%2C").join(",");

        vars[key] = value;
        console.log(vars);
    });
    return vars;
}



function getMelding(StedObj) {    
    document.getElementById('sok').value = ''; // Nullstiller søkefelt
    var ukedag = new Array(7);
    ukedag[0] = "Søndag";
    ukedag[1] = "Mandag";
    ukedag[2] = "Tirsdag";
    ukedag[3] = "Onsdag";
    ukedag[4] = "Torsdag";
    ukedag[5] = "Fredag";
    ukedag[6] = "Lørdag";
    var maaned = new Array(11);
    maaned[0] = "jan";
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
            document.getElementById("stedsinfo").innerHTML = kommune + " (" + fylke + ")<br>" + arrayMelding.kordinater["@attributes"].elevation + " moh.";
            //Dagens dato (navn)
            var dagensdato = new Date(arrayMelding.melding.detaljert.tidspunkt[0]["@attributes"].fratid);
            document.getElementById("dagensdato").innerHTML = "<b>I dag</b> " + [dagensdato.getDate()] + ". " + maaned[dagensdato.getMonth()];
            //Dagens tekstvarsel
            document.getElementById("vaerikonnaa").innerHTML = "<img src='b100/" + arrayMelding.melding.detaljert.tidspunkt[0].symbol["@attributes"].nr + ".png'/>";
            document.getElementById("gradernaa").innerHTML = arrayMelding.melding.detaljert.tidspunkt[0].temperatur;
            document.getElementById("gradernaasymbol").innerHTML = "&#8451";
            document.getElementById("dagenstekst").innerHTML = arrayMelding.melding.tekst.tidspunkt[0].tekst;
            var utTekst = "";
            var antDager = 0;
            for (var i = 0; i < arrayMelding.melding.detaljert.tidspunkt.length; i++) {
                var obj = arrayMelding.melding.detaljert.tidspunkt[i];
                if (obj["@attributes"].periode == 2) {
                    antDager++;
                    divstart = "<div class='dag'>";
                    divslutt = "</div>";
                    fratid = new Date(obj["@attributes"].fratid);
                    dagsymbol = "<img src='b38/" + obj.symbol["@attributes"].nr + ".png'><br>";
                    daggrader = obj.temperatur + "&#8451;";
                    utTekst += divstart + "<b>" + ukedag[fratid.getDay()] + "</b><br> " + fratid.getDate() + ". " + maaned[fratid.getMonth()] + ".<br>" + dagsymbol + daggrader + divslutt;

                }
            }
            document.getElementById("melding").style.display = "block";
            document.getElementById("dagvarsel").innerHTML = utTekst;

            // Vi kan ha både 9 og 10 dager - Vi må sette riktig bredde utifra hvor mange dager det er. 9=71 og 10=64
            var alleDager = document.querySelectorAll(".dag");
            if (antDager == 10) {
                for (var i = 0; i < alleDager.length; i++) {
                    alleDager[i].className = "dagTi";
                }
            }
            // Kilde http://stackoverflow.com/questions/14094697/javascript-how-to-create-new-div-dynamically-change-it-move-it-modify-it-in

            //Lager link til linkboksene
            yrLink = arrayMelding.credit['@attributes'].url;
            lat = arrayMelding.kordinater['@attributes'].latitude;
            lon = arrayMelding.kordinater['@attributes'].longitude;
            googlelink = arrayMelding.linker.googlemap["@attributes"].linkurl;
            norgeskartIframeLink = arrayMelding.linker.norgeskart["@attributes"].bildeurl;
            norgeskartLink = arrayMelding.linker.norgeskart["@attributes"].linkurl;
            googlemapbilde = arrayMelding.linker.googlemap["@attributes"].bildeurl;

            document.getElementById("yrLink").href = yrLink;
            document.getElementById("googleLink").href = googlelink;
            document.getElementById("norgeskartLink").href = norgeskartLink;
            document.getElementById("utLinker").style.display = "block";
            document.getElementById("overskriftUtLinker").style.display = "block";
            document.getElementById("norgeskartIframe").src = norgeskartIframeLink;
            document.getElementById("googleBoks").style.backgroundImage = "url("+googlemapbilde+")";
            document.getElementById("credits").innerHTML = "<a href='" + yrLink + "'>" + arrayMelding.credit['@attributes'].tekst + "</a> <br><a href='varsel.xml' id='xmllink'>Link til XML-dokument</a>";

            wikipedialink = arrayMelding.wikipedia["@attributes"].url;
            document.getElementById("wikipedia").style.display = "block";
            document.getElementById("wikipedia").innerHTML = "<h3>Info om " +arrayMelding.stedsnavn+ " fra Wikipedia</h3>" + arrayMelding.wikipedia.tekst + "<br><a href='"+wikipedialink+"' target='_blank'>Les mer på Wikipedia</a>";


            document.getElementById("credits").style.display = "block";
            document.getElementById('linkWrapper').style.visibility = 'visible';
            googleMap(); // Henter ut interaktivt kart
            window.focus();
        }
    }
    document.getElementById("laster").innerHTML = '<img src="laster.gif" /><br>Laster inn værmeldingen';
    http.open("GET", url + "?url=" + StedObj.url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(null);
}

function senderURL(obj) {
    getMelding(obj);
}