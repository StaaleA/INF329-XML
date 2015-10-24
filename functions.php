<?php

function parseXML($url){
$xml = simplexml_load_file($url);

//Hente ut lon og lat
$location = $xml->location->location; //Finner node "Location"

//Henter ut lat og long fra array
$latitude = $location["latitude"];
$longitude = $location["longitude"];

//Henter elevation fra kartverket basert på lat og long
$url = "http://openwps.statkart.no/skwms1/wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=[lat=".$latitude.";lon=".$longitude.";epsg=4326]";
$xmlKartverket = simplexml_load_file($url);
	if ($xmlKartverket->xpath('//wps:ExecuteResponse/wps:ProcessOutputs')) { //Sjekker at  det finnes en ProcessOutputs.  
		$output = $xmlKartverket->xpath('//wps:ExecuteResponse/wps:ProcessOutputs')[0]; 
        $elivation = round((float)$output->xpath('wps:Output[ows:Identifier/text()="elevation"]/wps:Data/wps:LiteralData')[0]);
    } 
    	else { echo "Noe gikk galt med følgende url: " + $url; };

//Bearbeiding av XML-dokumentet
$locationNode = $xml->location[0]; //Finner noden "Location" i XML-dokumentet fra YR
$locationNode->addChild('elevation',$elivation ); //Legger til en node under Location

//$xml->asXML('varsel.xml'); //Lagre objektet som XML
return $xml->asXML(); //Returnerer en velformet XML string basert på SimpleXML elementet

}
	
print_r(parseXML("http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml"));

?>