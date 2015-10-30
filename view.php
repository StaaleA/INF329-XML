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

<script>
var http = new XMLHttpRequest();
var url = "nyxml.php";

http.onreadystatechange=function() {
    if (http.readyState == 4 && http.status == 200) {
        hentJson(http.responseText);
    }
}

var XMLurl = "http://www.yr.no/sted/Norge/Nord-Tr%C3%B8ndelag/N%C3%A6r%C3%B8y/Kolvereid/varsel.xml";

http.open("GET", url+"?url="+XMLurl, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.send(null);

function hentJson(response) {
    liste = JSON.parse(response);
}
</script>


<a href="varsel.xml">Link til den nye XML-fila</a></div>

</body>
</html>