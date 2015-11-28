/*
//Denne siden er utviklet av Christian Rennemo siste gang endret av Ståle Andre Volden 28.11.2015
//Denne siden er kontrollert av Christian Rennemo, siste gang 28.11.2015
==
*/
steder = [];

function Sted(navn, kommune, fylke, stedstype, url) {
    this.navn = navn;
    this.kommune = kommune;
    this.fylke = fylke;
    this.stedstype = stedstype;
    this.url = url;
}
/*
== SØKE-funksjon som går igjennom JSON-filen
====================================================================================
== Ved denne funksjonen oppnår vi et livesøk, som lister ut et oppdatert søk på 
== hvert tastetrykk. Funksjonen blir kalt ved 'onkeyup' ved inputfeltet.
== For å ikke gjøre brukeropplevelsen treg, begrenser vi antall forslag til 10.
==
== String.prototype.includes() | Finn treff i filen
== Til å se etter treff mot JSON-filen vår har vi valgt å bruke en String.includes()
== Denne funksjonen returnerer true/false og passer glimmrende i vårt tilfelle. 
== String.includes() kom som standard API i ECMAScript2015(ES6), og er derfor ikke
== støttet i alle nettlesere enda. IE og Opera er ikke støttet, og derfor bruker 
== vi Polyfill. Alternativt kan vi bruke indexOf(), og teste om resultatet er -1.
==
== searchDivs(e) | forsøker å navigere i div'ene med kode fra jsfiddle
====================================================================================
== For gjøre brukeropplevelsen bedre for brukerne våre, ønsker vi at man kan navigere
== med pilene nedover mens man skriver inn søke ord. Slik at man slipper å enten bruke
== musen til å klikke med, eller skrive ferdig søker. Dette har vist seg å være ganske
== vansklig å få til uten å benytte seg av rammeverk som jQuery. Derfor har vi hentet
== et forslag fra jsfiddle. 
==
== Koden: sammen med hva som blir søkt på, sender vi også 'event', da kan vi finne ut
== hvilken taster brukeren har trykket på. Og ved trykke på opp eller ned-piltastene
== ønsker vi å la brukeren navigere ned lista. Her bruker vi altså koden fra jsfiddle.
== Kilde: http://jsfiddle.net/uEBSV/
====================================================================================
*/
var divs = [];

function searchDivs(input, event) {
    var e = event.which;

    if (e != 40) {

        var funnet = false;
        var url;
        var teller = 0;
        var hint = '';
        var søkefelt = document.getElementById('instantsearch');
        søkefelt.innerHTML = hint;

        selectedDiv = 0;
        if (input.length !== 0) {

            input = input.toUpperCase();
            steder = [];
            var sokDenne;
            var etSted;
            var antallEksakteMatch = 0;

            //Sjekker om søket gir eksakt match. Disse skal da legges øverst i forslagene
            //Legger ikke til maksantall her, da en må få opp alle eksakte treff. (tester ikke på teller < 10)
            for (i = 0; i < liste.length; i++) {
                sokDenne = liste[i];

                if (sokDenne.navn.toUpperCase() == input) {
                    etsted = new Sted(liste[i].navn, liste[i].kommune, liste[i].fylke, liste[i].stedstype, liste[i].url);
                    steder.push(etsted);

                    hint = hint + '<a href="?stedstype=' + etsted.stedstype + '&kommune=' + etsted.kommune + '&sok=' + etsted.navn + '"><div class="forslag" id=' + teller + '>' + etsted.navn + ' - ' + etsted.stedstype + '<br><span class="info">' + etsted.kommune + ' / ' + etsted.fylke + '</span></div></a>';
                    søkefelt.innerHTML = hint;

                    søkefelt.getElementsByTagName('div')[0].style.backgroundColor = '#68F';
                    teller++;
                    antallEksakteMatch++;
                }
            }

            //Itterer gjennom stedslista, og finne treff som begynner på inputfeltet
            for (i = 0; i < liste.length; i++) {
                sokDenne = liste[i];

                if (sokDenne.navn.toUpperCase().indexOf(input, 0) === 0 && teller < 10) {

                    //Sjekker om matchen allerede ligger i listen (eksakt match)
                    var finnesFraFoer = false;
                    for (x = 0; x < antallEksakteMatch; x++) {
                        if (sokDenne.url == steder[x].url) {
                            finnesFraFoer = true;
                        }
                    }
                    if (!finnesFraFoer) {
                        etsted = new Sted(liste[i].navn, liste[i].kommune, liste[i].fylke, liste[i].stedstype, liste[i].url);
                        steder.push(etsted);

                        hint = hint + '<a href="?stedstype=' + etsted.stedstype + '&kommune=' + etsted.kommune + '&sok=' + etsted.navn + '"><div class="forslag" id=' + teller + '>' + etsted.navn + ' - ' + etsted.stedstype + '<br><span class="info">' + etsted.kommune + ' / ' + etsted.fylke + '</span></div></a>';
                        søkefelt.innerHTML = hint;

                        søkefelt.getElementsByTagName('div')[0].style.backgroundColor = '#68F';

                    }
                    teller++;
                }

            }
            //Hvis det er flere enn 10 eksakte treff så settes det på scroll på alternativene
            if (teller > 10) {
                document.getElementById("instantsearch").style.overflowY = "scroll";
            } else {
                document.getElementById("instantsearch").style.overflow = "hidden";
            }
            
            if (teller === 0) {

                søkefelt.innerHTML = 'ingen treff';
            }
        } else {
            søkefelt.innerHTML = '';
        }
    } else {

        // Navigasjon blant forslagene. Ved pil opp og ned så blir forslag markert, og bagrunnsfarge forandres.
        divs = document.getElementById('instantsearch').getElementsByTagName('div');
        selectedDiv = 1;
        document.getElementById('instantsearch').getElementsByTagName('div')[0].style.backgroundColor = "";

        divs[selectedDiv].style.backgroundColor = '#68F';
        document.getElementById('sok').onkeyup = function(e) {
            document.getElementById('instantsearch').getElementsByTagName('div')[0].style.backgroundColor = "";
            if (!(e.keyCode == 38 || e.keyCode == 40)) {
                selectedDiv = 0;
                divs[selectedDiv].style.backgroundColor = '#68F';
            } else {
                if (e.keyCode == 38)
                    x = -1;
                else if (e.keyCode == 40)
                    x = 1;
                else
                    return;

                divs[selectedDiv].style.backgroundColor = '';
                selectedDiv = ((selectedDiv + x) % divs.length);
                selectedDiv = selectedDiv < 0 ?
                    divs.length + selectedDiv : selectedDiv;
                divs[selectedDiv].style.backgroundColor = '#68F';
            }
        };


    }
}

function getSelected() {
    return divs[selectedDiv];
}

/*

====================================================================================
*/

document.getElementById('sok').addEventListener("keyup", skrik);

function skrik(event) {
    document.getElementById("instantsearch").style.display = "block";
    var e = event.which || event.keyCode;
    var x = getSelected();
    var sokeord = document.getElementById('sok').value;
    if (e == 27) {
        document.getElementById("instantsearch").style.display = "none";
    }
    if (e == 8) { // tilbake-knappen <-
        searchDivs(sokeord, event);
    } else if (!(e == 40 || e == 38)) {
        // om bruker skriver OG divs[selectedDiv] er satt
        if (x) {
            searchDivs(sokeord, event);
        }
    } else if (e == 13) {
        // trykk på ENTER
        x = getSelected();
        document.getElementById('sok').innerHTML = x;
        document.getElementById('stedsok').submit();
    }

    if (sokeord == "") {
        searchDivs('a', event);
    }
}

/*
== KONTROLL før sending
====================================================================================
== Funksjoner som sørger for at vi sender riktig info
====================================================================================
*/

function send(x) {
    document.getElementById('sok').value = x.navn;
    document.getElementById('formStedstype').value = x.stedstype;
    document.getElementById('formKommune').value = x.kommune;
}

/*
== sjekk()
====================================================================================
*/
function sjekk() {
    var divs = document.getElementById('instantsearch').getElementsByTagName('div');

    // Sjekker om du har valgt et forslag
    var funnet = false;
    var i = 0;
    while (i < divs.length && !funnet) {
        farge = divs[i].style.backgroundColor;
        if (farge === 'rgb(102, 136, 255)') {
            funnet = true;
        }
        i++;
    }

    // Forslag er brukt
    if (funnet) {
        //x = searchDivs.getSelected();
        var obj = steder[i - 1];
        senderURL(obj);

        send(obj);
    } else {
        // Ingen forslag - utfører ENKELT søk
        var ord = document.getElementById('sok').value;
        var res = simpleSearch(ord);
        var url = getURL(res);
        senderURL(url);
        send(url);

    }
    // x = searchDivs.getSelected();
    // send(x.innerHTML);
    return true;
}

// Enkel søkefunksjon som kun søker på inputfelt
function simpleSearch(string) {
    var funnet = false;
    var i = 0;
    var soktreff;
    while (!funnet) {
        if (liste[i].navn.includes(string)) {
            funnet = true;
            return liste[i].navn;
        }
        i++;
    }
}

function getAtrSok(sted, stedstype, kommune) {
    var funnet = false;
    var i = 1;
    var soktreff;

    while (!funnet) {
        if (liste[i].navn == sted && liste[i].stedstype == stedstype && liste[i].kommune == kommune) {
            funnet = true;
            return liste[i];
        }
        i++;
    }
}

function getURL(sted) {
    var funnet = false;
    var i = 0;
    while (!funnet) {
        if (liste[i].navn.includes(sted)) {
            funnet = true;
            return liste[i].url;
        }
        i++;
    }
}
