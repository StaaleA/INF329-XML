<html>
<header></header>
<body>
<style>
	
body{
font-family: arial,sans-serif;
color:grey;
margin-left:10px;
}
#idagnum{
font-size: 68px;
float:left;

margin-right:5px;
}
h1{
margin-bottom:1px;
}
#idagtekst{
	margin-bottom:20px;
font-size: 14px;
float:left;
width:300px;
clear:both;
}
.dag{
	font-size: 13px;
	text-align:center;
	/*background-color:#EEE;*/
	margin-right:5px;
	margin-bottom:5px;
	float:left;
	width:65px;
	height:85px;
	padding:5px;
}

#ikonnaa{
float:left;

}
#gradernaa{
margin-left:10px;
float:right;
	padding-top:20px;
	color:#333;
}
</style>
<?php
//Denne siden er utviklet av Ståle Andre Volden siste gang endret 25.10.2015
//Denne siden er kontrollert av Ståle Andre Volden, siste gang 25.10.2015

include('functions.php');

$sted = parseXML('http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml');
echo "<h1>".$sted->stedsnavn."</h1>";
$string = $sted->melding->detaljert->tidspunkt[0]["fratid"];
$timestamp = strtotime($string);
echo date("l", $timestamp);

echo "<div><div id='idagnum'><div id='ikonnaa'><img src='b100/".$sted->melding->detaljert->tidspunkt->symbol["nr"].".png'><div id='gradernaa'>";
echo $sted->melding->detaljert->tidspunkt->temperatur . "&#8451</div></div><div id='idagtekst'>";
echo $sted->melding->tekst->tidspunkt[0]->tekst;
echo "</div></div><div style='clear:both;'></div>";
foreach ($sted->melding->detaljert->tidspunkt as $melding){

	if($melding["periode"] == "2"){ //Viser kun periode to som dagsvarsel ref: http://om.yr.no/verdata/xml/spesifikasjon/
  	
$string = $melding["fratid"];
$timestamp = strtotime($string);

echo"<div class='dag'>";
echo date("D d", $timestamp)."<br>";

echo "<img src='b48/".$melding->symbol["nr"].".png'><br>";
	echo $melding->temperatur . "&#8451;</div>";
}
}
echo "<div style='clear:both;'><b>Linker:</b><br><a href='".$sted->credit['url']."'>".$sted->credit['tekst']."</a><br>";
?>

<a href="varsel.xml">Link til den nye XML-fila</a></div>

</body>
</html>