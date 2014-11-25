<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

function url_get_contents ($Url) {
    if (!function_exists('curl_init')){ 
        die('CURL is not installed!');
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $Url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_PROXY, null);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
    $output = curl_exec($ch);

    if(curl_errno($ch)){
	    echo 'Curl error: ' . curl_error($ch);
	}
    curl_close($ch);
    return $output;
}

$locationEat = explode(";", $_GET['q']);
$eat = $locationEat[0];
$location = $locationEat[1];

$request_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
$request_url .= "key=" . "AIzaSyBnabShsSbFKZR8WU68BIB4IfFYP4JoHQ4";
$request_url .= "&query=" . urlencode ($eat) . "food+in+" . urlencode ($location);

$url_contents = url_get_contents($request_url);
echo $url_contents;
