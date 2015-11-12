<?php
// This page is developed by Ståle Andre Volden, last time changed: 12th of November 2015
// Page controlled by Ståle Andre Volden, last time 12th of November
$stedsnavn = $_GET["stedsnavn"];
$url =  "https://no.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exchars=300&exintro=&explaintext=&titles=".$stedsnavn;
	
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$data = curl_exec($ch);

//Feilhåndtering
if (!$data) {
  exit('cURL Error: '.curl_error($ch));
}

$arr = json_decode($data,true); //Gjør dataen om til array

if(array_key_exists('-1', $arr['query']['pages'])){
	exit('Dette stedet har ikke en Wikipedia-artikkel. <a href="https://no.wikipedia.org/wiki/'.$stedsnavn.'"">Kanskje du kan lage en?</a>');
}

$output_details = reset($arr['query']['pages']); //Velger første element da id er dynamisk. http://php.net/manual/en/function.reset.php
echo $output_details['extract']; // Henter ut teksten
echo "<br><a href='https://no.wikipedia.org/wiki/".$stedsnavn."'>Les mer på Wikipedia</a>";

?>