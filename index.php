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
        alert("h");
        var liste = '<?php echo json_encode($stedListe);?>';
        alert("kom hit");
        </script>

    <div>
<?php echo json_encode($stedListe); ?>
       <script>
  //Convert JSON String to JavaScript Object
 
  var JSONString = '[{"navn":"Stadnamn","url":"Bokm\u00e5l"},{"navn":"Asak kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Asak_kirke\/varsel.xml"},{"navn":"Berg kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Berg_kirke\/varsel.xml"},{"navn":"Brekke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Brekke~35224\/varsel.xml"},{"navn":"Br\u00f8dl\u00f8s","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Br\u00f8dl\u00f8s\/varsel.xml"},{"navn":"Demma","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Demma\/varsel.xml"},{"navn":"Ertehytta","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Ertehytta\/varsel.xml"},{"navn":"Gr\u00f8vet","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Gr\u00f8vet\/varsel.xml"},{"navn":"Halden","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Halden\/varsel.xml"},{"navn":"Halden postkontor","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Halden_postkontor\/varsel.xml"},{"navn":"Haugtjernhytta","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Haugtjernhytta\/varsel.xml"},{"navn":"Holtet","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Holtet\/varsel.xml"},{"navn":"Idd","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Idd\/varsel.xml"},{"navn":"Idd kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Idd_kirke\/varsel.xml"},{"navn":"Immanuels kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Immanuels_kirke\/varsel.xml"},{"navn":"Isebakke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Isebakke\/varsel.xml"},{"navn":"Kitter\u00f8d","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Kitter\u00f8d\/varsel.xml"},{"navn":"Knardal","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Knardal\/varsel.xml"},{"navn":"Kornsj\u00f8","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Kornsj\u00f8\/varsel.xml"},{"navn":"Lerdalen","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Lerdalen\/varsel.xml"},{"navn":"Prestebakke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Prestebakke~23368\/varsel.xml"},{"navn":"Prestebakke kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Prestebakke_kirke\/varsel.xml"},{"navn":"Rokke kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Rokke_kirke\/varsel.xml"},{"navn":"Skogskroken","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Skogskroken\/varsel.xml"},{"navn":"Sponvika","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Sponvika\/varsel.xml"},{"navn":"S\u00f8ndre Enningdalen kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/S\u00f8ndre_Enningdalen_kirke\/varsel.xml"},{"navn":"Tistedal","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Tistedal\/varsel.xml"},{"navn":"Tistedal kirke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/Tistedal_kirke\/varsel.xml"},{"navn":"\u00c5rbakke","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Halden\/\u00c5rbakke\/varsel.xml"},{"navn":"Bellevue","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Bellevue\/varsel.xml"},{"navn":"Bev\u00f8ya","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Bev\u00f8ya\/varsel.xml"},{"navn":"Dilling\u00f8ya","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Dilling\u00f8ya\/varsel.xml"},{"navn":"Fiske","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Fiske\/varsel.xml"},{"navn":"Framnes","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Framnes\/varsel.xml"},{"navn":"Gjerrebogen","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Gjerrebogen\/varsel.xml"},{"navn":"Grindvoll","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Grindvoll\/varsel.xml"},{"navn":"Gullholmen","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Gullholmen\/varsel.xml"},{"navn":"Hopperen","url":"http:\/\/www.yr.no\/sted\/Norge\/\u00d8stfold\/Moss\/Hopperen\/varsel.xml"}]';
  var JSONObject = JSON.parse(JSONString);
  alert(JSONObject[0]["navn"]); // Access Object data
  alert(JSON.stringify(JSONObject));
</script>

    </div>
    <div id="test"></div>
 

</body>

</html>