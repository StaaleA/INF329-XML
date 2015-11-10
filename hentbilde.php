<?php
//Denne siden er utviklet av Ståle Andre Volden siste gang endret 25.10.2015
//Denne siden er kontrollert av Ståle Andre Volden, siste gang 25.10.2015

$sted = $_GET["sted"];

$url =  "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=".$sted;
	
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_ENCODING, "UTF-8" ); 
$body = curl_exec($ch);
curl_close($ch);

$json = json_decode($body);
echo $json->responseData->results[0]->url;

?>