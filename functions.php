<?php
//Denne siden er utviklet av Ståle Andre Volden siste gang endret 21.11.2015
//Denne siden er kontrollert av Ståle Andre Volden, siste gang 21.11.2015

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
parseXML("http://www.yr.no/sted/Norge/Hedmark/Hamar/Treh%C3%B8rningen/varsel.xml");

//print_r(parseXML("http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml"));

// echo "<h2>Google Maps</h2>";
// echo getGoogleStaticMap("64.8654946456349","11.6046459447957");	
// echo "<h2>Norgeskart</h2>";
// echo getNorgeskart("64.8654946456349","11.6046459447957");

?>