<?php
//Denne siden er utviklet av Ståle Andre Volden siste gang endret 25.10.2015
//Denne siden er kontrollert av Ståle Andre Volden, siste gang 25.10.2015
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
        $elevation = round((float)$output->xpath('wps:Output[ows:Identifier/text()="elevation"]/wps:Data/wps:LiteralData')[0]);
        //$ssrid     = (int)$output->xpath('wps:Output[ows:Identifier/text()="ssrid"]/wps:Data/wps:LiteralData')[0]; //$ssrid brukes opp mot Faktaark
    } 
    	else { echo "Noe gikk galt med følgende url: " + $url; };

//Bearbeiding av XML-dokumentet
$locationNode = $xml->location[0]; //Finner noden "Location" i XML-dokumentet fra YR
$locationNode->addChild('elevation',$elevation ); //Legger til en node under Location

//Lager link node til google maps
$link = $xml->addChild('googlemap');
$link->addAttribute('type', 'bilde');
$link->addAttribute('url', 'http://maps.google.com/?q='.$latitude.','.$longitude);
$link->addAttribute('tekst', 'Google Maps');

//Lager link node til norgeskart
$link = $xml->addChild('norgeskart');
$link->addAttribute('type', 'iframe');
$link->addAttribute('url', 'http://www.norgeskart.no/statisk.html#12/'.$latitude.'/'.$longitude.'/+embedMaskLayer/+embed.box');
$link->addAttribute('tekst', 'Norgeskart');

//Benytter en XSL-fil for å lage den sammensatte xml-fila
$xsl = simplexml_load_file("varsel.xsl");
$xslt = new XSLTProcessor();
$xslt->importStylesheet($xsl);
$xslt->transformToURI($xml,'varsel.xml');
$nyxml = $xslt->transformToXML($xml);

//Faktaark om sted fra KARTVERKET
//$url = "http://faktaark.statkart.no/SSRFakta/faktaarkfraobjektid?enhet=".$ssrid."&format=xml";
//$xmlFaktaarkSted = simplexml_load_file($url);

$nyxml2 = simplexml_load_string($nyxml);
return $nyxml2; //Returnerer et SimpleXMLElement basert på den nye XML-fila

}

function getGoogleStaticMap($lat,$long){
$url = "http://maps.google.com/?q=".$lat.",".$long;	
return "<a href='".$url."'><img src='http://maps.google.com/maps/api/staticmap?center=".$lat.",".$long."&zoom=14&size=300x200&maptype=roadmap&sensor=false' width='300' height='200'></a>";
}

function getNorgeskart($lat,$long){
$kart = "http://www.norgeskart.no/statisk.html#12/".$lat."/".$long."/+embedMaskLayer/+embed.box";
$url = "http://www.norgeskart.no/#12/".$lat."/".$long;
$iframe = "<div style='position:relative;''><iframe src='".$kart."' width='300' height='200' frameBorder='0'></iframe><a href=".$url." style='position:absolute; top:0; left:0; display:inline-block; width:300px; height:200px; z-index:5;''></a></div>";
return $iframe;
}


//print_r(parseXML("http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml"));

// echo "<h2>Google Maps</h2>";
// echo getGoogleStaticMap("64.8654946456349","11.6046459447957");	
// echo "<h2>Norgeskart</h2>";
// echo getNorgeskart("64.8654946456349","11.6046459447957");

?>