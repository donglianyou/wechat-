<?php 
header("Content-type:text/html;charset=utf8");
// 获取文件的编码
$error=$_FILES['file']['error'];
if ($error == 0) {
    move_uploaded_file($_FILES['file']['tmp_name'],'./img/'.$_FILES['file']['name']);
}
?>