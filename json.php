<?php
$legitFiles = array();
foreach (scandir('.') as $file) {
    if (substr($file,-3) == 'mp3') {
      $obj = new stdClass();
      $split = split("_", $file);

      $category = $split[0];
      $name = substr($split[1], 0, -4);
      if ($name == false) {
        $name = substr($category, 0, -4);;
        $category = "Misc";
      }
      $url = "http://fredrik.hajkep.se/soundboard/" . $file;

      $obj->category = $category;
      $obj->name = $name;
      $obj->url = $url;

    	$legitFiles.array_push($legitFiles, $obj);
    }
}

$json = json_encode($legitFiles);

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo $json;
exit();
?>