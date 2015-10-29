/*
== This page is developed by Christian Rennemo, last time changed: 27th of October 2015
== This page was initiated 27th of October 2015.
==
*/

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
function searchDivs(input, event) {


    var e = event.which || event.keyCode;
    if (e != 40) {
        var funnet = false;
        var url;
        var teller = 0;
        var hint = '';
        var søkefelt = document.getElementById('instantsearch');
        søkefelt.innerHTML = hint;
        if (input.length != 0) {
            input = input.toUpperCase()
            for (i = 1; i < liste.length; i++) {
                var sokDenne = liste[i].navn.toUpperCase();
                if (sokDenne.includes(input) && teller < 10) {
                    url = liste[i].url;
                    hint = hint + '<div class="forslag" id=' + teller + '><a href=' + url + '>' + liste[i].navn + '</a></div>';
                    søkefelt.innerHTML = hint;
                    teller++;
                }
            }
            if (teller === 0) {
                søkefelt.innerHTML = 'ingen treff';
            }
        } else {
            søkefelt.innerHTML = '';
            // divs[selectedDiv].style.backgroundColor = '#68F';
        }

            var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
            selectedDiv = 0,
            i;
             for (i = 0; i < divs.length; i++)
            divs[i].onclick = (function(i) {
                return function() {
                    divs[selectedDiv].style.backgroundColor = '';
                    selectedDiv = i;
                    divs[selectedDiv].style.backgroundColor = '#68F';
                }
            })(i);
            divs[selectedDiv] = 0;
            alert(divs[selectedDiv].innerHTML);

    } else {


        // Innhentet kode som kan navigere blant div'er

        var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
            selectedDiv = 0,
            i;


        for (i = 0; i < divs.length; i++)
            divs[i].onclick = (function(i) {
                return function() {
                    divs[selectedDiv].style.backgroundColor = '';
                    selectedDiv = i;
                    divs[selectedDiv].style.backgroundColor = '#68F';
                }
            })(i);

        divs[selectedDiv].style.backgroundColor = '#68F';

        document.getElementById('sok').onkeyup = function(e) {
        var x = 0;
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
        
        alert(divs[selectedDiv].innerHTML);

    }
    function getSelected() {
            return divs[selectedDiv];
        }
        searchDivs.getSelected = getSelected;
    
    }
    // if(e == 27) {
    //     alert("est");
    //     document.getElementById('instantsearch').innerHTML = "";
    // }
}
// function send (x) {
            
//             return x;
//         }
function sendValgt(args) {
            // body...
             return hentValgt.apply(this, arguments);
        }

/*
== Polyfill for String.includes()
====================================================================================
*/
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

/*
== Setter fokus til søk-feltet ved innlastning
====================================================================================
*/
document.getElementById('sok').focus();

/*
== EVENT 
====================================================================================
*/

// document.getElementById("instantsearch").addEventListener("click", noe);

// function noe () {
//     // body...
//     var classname = document.getElementsByClassName("forslag");
//     var myFunction = function() {
//         // var attribute = this.getAttribute("data-myattribute");
//         // alert(attribute);
//         alert("heiee");
//     };

//     for(var i=0;i<classname.length;i++){
//         classname[i].addEventListener('onkeyup', myFunction, false);
//     }
// }

// document.getElementById('sok').addEventListener("keyup", test2);

// function test2 () {
//     document.onkeyup = function(event) {
//         var el = event.which || event.keyCode;
//         alert(el);
//     };
// }

// Sjekker at bruker har begynt å søke
document.getElementById('sok').addEventListener("keyup", skrik);

function skrik(event) {
    var e = event.which || event.keyCode;
 // alert(e);
 // var nybokstav = String.fromCharCode(e);
 // alert(nybokstav);
// sokeord+= e;
var n = document.getElementById('sok').value;
// alert(n);
var x = searchDivs.getSelected(); 

// alert(x.innerHTML);
// alert(n);
// var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
//             selectedDiv = 0,
//             i;

var sokeord = document.getElementById('sok').value;
// alert(sokeord);
    
    if(e==8){
searchDivs(sokeord, event);
    }

    else if(!(e == 40 || e == 38)) {
            if(x) {
                //x = x[0];
                document.getElementById('sok').focus();

                // alert(sokeord);
                document.getElementById('instantsearch').innerHTML = '';
                searchDivs(sokeord, event);
                
                // alert(x);
                // x = null;
                // alert(x);
            }

            //document.getElementById('instantsearch').innerHTML = '';
        } 
        if(sokeord==="") {
            searchDivs(sokeord, event);
        }

        // alert(n);
        
        // alert("riktig");
        // var divs = document.getElementById('instantsearch').getElementsByTagName('div'),
        //     selectedDiv = 0,
        //     i;

        // for (i = 0; i < divs.length; i++)
        //     divs[i].onclick = (function(i) {
        //         return function() {
        //             divs[selectedDiv].style.backgroundColor = '';
        //             selectedDiv = i;
        //             divs[selectedDiv].style.backgroundColor = '#68F';
        //         }
        //     })(i);
        //     alert(divs[3].innerHTML);

       



    // alert("hei");
}


// var n = divs[selectedDiv];


// function displayDate() {
 
// }

// function keyEvent(event) {
//   alert("Location of key pressed: " + event.location);
// }

// document.addEventListener("click", function (e) {
//   alert("Location of key pressed: " + e.location);
// });

// document.addEventListener("click", function (e) {
//   var level = 0;
//   for (var element = e.target; element; element = element.parentNode) {
//     if (element.id === 'instantsearch') {
//         document.getElementById("out").innerHTML = (level ? "inner " : "") + "x clicked";
//       return;
//     }
//     level++;
//   }
//   document.getElementById("out").innerHTML = "not x clicked";
// });

// function keyEvent(event) {
//   console.log("Location of key pressed: " + event.location);
// }




