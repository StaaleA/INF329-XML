<?php

function parseXML($url){

$context  = stream_context_create(array('http' => array('header' => 'Accept: application/xml')));
$xml = file_get_contents($url, false, $context);
$xml = simplexml_load_string($xml);

//Hente ut lon og lat
$locationArray = $xml->xpath('location'); //Finner node "Location" Return:array
echo $xml->count();
print_r($locationArray);

foreach($locationArray as $res) {
	$latitude= $res['latitude'];
    $longitude = $res['longitude'];
}

//Bearbeiding av XML-dokumentet
$locationNode = $xml->location[0]; //Finner noden "Location" i XML-dokumentet fra YR
$elevation = $locationNode->addChild('elevation','567'); //Legger til en node under Location
$xml->asXML('varsel.xml'); //Lagre objektet som XML


}
	
parseXML("http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml");

?>