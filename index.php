<?php 
   include("lagXMLsok.php");
   include("readfile.php");
   ?>
<!DOCTYPE html>
<html>
   <head>
      <script type="text/javascript">
         var liste = <?php echo json_encode($stedListe);?>;
         // alert(JSON.stringify(liste)); //Here you go
         // alert(liste.length);
      </script>
      <script type="text/javascript" src="javascript.js"></script>
      <script type="text/javascript" src="instantSearch.js"></script>
      <style>
      	a{
      		color:black;
      	}
      </style>
      <title>Hello</title>
   </head>
   <body>
      <h1>Hejsann alla i hopa</h1>
      <div id="boks" style="width:30;">
	      <form autocomplete="off">
	         <input type="search" style="width:250px;" id="search" placeholder="søk her i JSON" onkeyup="searchJson(this.value)">
	         <div id="livesok" style="width:250px;"></div>
	         <div id="ut"></div>
	      </form>
      </div>
      <br>
      <br>
      <form>
         <input type="text" size="30" placeholder="søk her i XML" onkeyup="showResult(this.value)">
         <div id="livesearch"></div>
      </form>
      <br>
      <br>
   </body>
</html>