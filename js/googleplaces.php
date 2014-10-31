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

$request_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
$request_url .= "key=AIzaSyBnabShsSbFKZR8WU68BIB4IfFYP4JoHQ4"; // home server
// $request_url .= "key=AIzaSyBWoanUfWRf0BPB7anB6wacn4gw3ELVsdY"; // online server
$request_url .= "&query=restaurants+in+Seattle";

$url_contents = url_get_contents($request_url);
echo $url_contents;
