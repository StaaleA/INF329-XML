<?php
$url =  "http://data.ssb.no/api/v0/dataset/96307.json?lang=no";
	
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_ENCODING, "UTF-8" ); 
$body = curl_exec($ch);
curl_close($ch);

$json = json_encode($body);
echo $json;

?>