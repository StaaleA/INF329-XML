<?php
/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
==
*/

/*
========================================================================================
== Her leser vi fra en tab-separert fil med over 10 000 linjer med informasjon
== fra ulike steder i Norge. Dette er den største filen med info vi kan få fra
== yr.no uten å betale for det. Vi skal her hente ut stedsnavn og url og legge
== denne informasjonen i en JSON-fil, som så skal bli grunnlaget for søket brukere
== senere skal gjøre.
==
== For å skape en oversiktlig struktur har vi valgt å lage en liten klasse for
== værdataen som vi legger i en JSON.  
========================================================================================
*/ 
class Yrdata
{
    public $navn = "";
    public $url = "";
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$row = 0;
$stedListe = array();

// Leser filen php sine innebygde funksjoner for lesing av fil
if (($leseFil = fopen("noreg.txt", "r")) !== FALSE) {
	// Funksjon som lever ulike tekstfiler, er anngir vi i parametere hva det skal skiller på
	// Kilde: http://php.net/manual/en/function.fgetcsv.php
    while (($innData = fgetcsv($leseFil, 0, "	")) !== FALSE) {
        $num = count($innData);
        $row++;
        $sted = $innData[1];
        $url = $innData[12];
        $liste = new Yrdata();
        $liste->navn = $sted;
        $liste->url  = $url;
        array_push($stedListe, $liste);
    } // next
    fclose($leseFil);
} // end if
?>

