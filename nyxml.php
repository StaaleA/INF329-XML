<?php
//Denne siden er utviklet av Ståle Andre Volden siste gang endret 29.11.2015
//Denne siden er kontrollert av Christian Rennemo, siste gang 29.11.2015

$url= $_GET["url"];
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
    } 
    	else { echo "Noe gikk galt med følgende url: " + $url; };

//Bearbeiding av XML-dokumentet
$locationNode = $xml->location[0]; //Finner noden "Location" i XML-dokumentet fra YR
$locationNode->addChild('elevation',$elevation ); //Legger til en node under Location

//Lager link node til google maps
$link = $xml->addChild('googlemap');
$link->addAttribute('type', 'bilde');
$link->addAttribute('linkurl', 'http://maps.google.com/?q='.$latitude.','.$longitude);
$link->addAttribute('bildeurl', "https://maps.googleapis.com/maps/api/staticmap?center=" . $latitude . "," . $longitude . "&zoom=10&size=250x150");
$link->addAttribute('tekst', 'Google Maps');

//Lager link node til norgeskart
$link = $xml->addChild('norgeskart');
$link->addAttribute('type', 'iframe');
$link->addAttribute('linkurl', "http://www.norgeskart.no/#12/" . $latitude . "/" . $longitude);
$link->addAttribute('bildeurl', 'http://www.norgeskart.no/statisk.html#10/'.$latitude.'/'.$longitude.'/+embedMaskLayer/+embed.box');
$link->addAttribute('tekst', 'Norgeskart');

//Henter wikipedia artikkel om sted
$stedsnavn = $xml->location->name;
$url =  "https://no.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exchars=300&exintro=&explaintext=&titles=".$stedsnavn;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

$data = curl_exec($ch);

//Feilhåndtering
if (!$data) {
  $wikipediatekst = "Noe gikk galt ved henting av wikipedia-tekst.";
  $wikipediaurl = "";
} else { //hvis alt ok med henting av data

$arr = json_decode($data,true); //Gjør dataen om til array

if(array_key_exists('-1', $arr['query']['pages'])){
	$wikipediatekst = 'Dette stedet har ikke en Wikipedia-artikkel. <a href="https://no.wikipedia.org/wiki/'.$stedsnavn.'"">Kanskje du kan lage en?</a>';
	$wikipediaurl = "";
}else{ //hvis tekst om stedet finnes

$output_details = reset($arr['query']['pages']); //Velger første element da id er dynamisk. Kilde: http://php.net/manual/en/function.reset.php
$wikipediatekst = $output_details['extract']; // Henter ut teksten
$wikipediaurl = "https://no.wikipedia.org/wiki/".$stedsnavn;
	}
}

//Lager element til wikipedia
$xml->addChild('wikipediatekst', $wikipediatekst);
$xml->addChild('wikipediaurl', $wikipediaurl);

//Benytter en XSL-fil for å lage den sammensatte xml-fila
$xsl = simplexml_load_file("varsel.xsl");
$xslt = new XSLTProcessor();
$xslt->importStylesheet($xsl);
$xslt->transformToURI($xml,"varsel.xml"); //lagrer til fil
$nyxml = $xslt->transformToXML($xml);
$xml = simplexml_load_string($nyxml);

$json = json_encode($xml);
echo $json; //Returnerer et SimpleXMLElement basert på den nye XML-fila
?>