<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$row = 0;
$stedListe = array();
if (($leseFil = fopen("noreg.txt", "r")) !== FALSE) {
    while (($innData = fgetcsv($leseFil, 0, "	")) !== FALSE) {
        $num = count($innData);
        $row++;
        for ($i=0; $i < $num; $i++) {
            if($row > 1) {
	        	$sted = $innData[1];
	            $url = $innData[12];
	            $stedListe[$innData[1]] = $innData[12];
        	} // end if
        } // next 
    } // next
    fclose($leseFil);
} // end if
// foreach($stedListe as $x => $x_value) {
//     echo "Sted=" . $x . ", URL=" . $x_value;
//     echo "<br>";
// }
?>

