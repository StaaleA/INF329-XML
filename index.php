 <?php 
        include("lagXMLsok.php");
        include("readfile.php");
        ?>
<!DOCTYPE html>
<html>

<head>
    <script type="text/javascript" src="javascript.js"></script>
    <script type="text/javascript" src="instantSearch.js"></script>
    <title>Hello</title>
</head>

<body>
    <h1>Hejsann alla i hopa</h1>
    <form>
    <input type="search" size="30" id="search" placeholder="søk her i JSON" onkeyup="searchJson(this.value)">
    <div id="ut"></div>
    </form>

    <br>
    <br>

    <form>
		<input type="text" size="30" placeholder="søk her i XML" onkeyup="showResult(this.value)">
		<div id="livesearch"></div>
	</form>
   	
   	<br>
   	<br>
   	  <script type="text/javascript">

        var liste = <?php echo json_encode($stedListe);?>;
        alert(JSON.stringify(liste)); //Here you go
        </script>

    <div>



    </div>
    <div id="test"></div>
 

</body>

</html>