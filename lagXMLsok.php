<?php
/*
== This page is developed by Christian Rennemo, last time changed: 23rd of October 2015
== This page was initiated 23rd of October 2015.
=======================================================================================
== Her oppretter vi et XML-dokument basert på tekstfilen vår fra yr.no
== Deretter lagrer vi den på serveren som stedliste.xml
== Kilde: http://docs.php.net/manual/en/domdocument.save.php
=======================================================================================
*/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$dokument = new DOMDocument('1.0');
$dokument->formatOutput = true;

$root = $dokument->createElement('yr');
$root = $dokument->appendChild($root);
$teller=0;
if (($leseFil = fopen("noreg.txt", "r")) !== FALSE) {
    // Funksjon som lever ulike tekstfiler, er anngir vi i parametere hva det skal skiller på
    // Kilde: http://php.net/manual/en/function.fgetcsv.php
    while (($innData = fgetcsv($leseFil, 0, "\t")) !== FALSE) {
    	// if($teller < 6) {
        $stednavn = $innData[1];
        $url      = $innData[12];

        // Bytter ut ubruklige tegn
        //$stednavn = str_replace("&", "og",$stednavn,2);

        // Legger dataen inn i dokumentet vårt
        $sted = $dokument->createElement("sted");
		$sted = $root->appendChild($sted);
		$teller++;
        $sted->appendChild($dokument->createElement('navn', $stednavn));
        $sted->appendChild($dokument->createElement('url', $url));
    // }
    } // next
    fclose($leseFil);
} // end if
echo 'Skrev: ' . $dokument->save("stedliste.xml") . ' bytes'; // 1mb
?>