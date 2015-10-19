<?php

$context  = stream_context_create(array('http' => array('header' => 'Accept: application/xml')));
$url = "http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml";
$xml = file_get_contents($url, false, $context);
$xml = simplexml_load_string($xml);

//$json = json_encode($xml); //Gjør om XML til json
//$array = json_decode($json,TRUE); //Gjør om json til array

echo $xml;

?>