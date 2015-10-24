<?php
$fp = fopen('mydata.csv', 'r');

while ( !feof($fp) )
{
    $line = fgets($fp, 2048);

    $someCondition = someConditionToDetermineTabOrComma();

    $delimiter = $someCondition ? "," : "\t";
    $data = str_getcsv($line, $delimiter);

    doSomethingWithData($data);
}                              

fclose($fp);
?>