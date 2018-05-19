<?php 
header("Content-type:text/html;charset=utf8");
$dir = "img";
$files = scandir($dir);
foreach ($files as $key => $value) {
    if ($value == "." || $value =="..") {
        unset($files[$key]);
    }
}

echo json_encode($files);
?>