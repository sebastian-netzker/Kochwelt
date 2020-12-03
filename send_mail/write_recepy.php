<?php
$file = "../js/recepy.json";
$redirect = "../uploadsuccess.html";
$myfile = fopen($file, "r") or die("Unable to open file!");

$recepy = fread($myfile,filesize($file));
fclose($myfile);
$arr = json_decode($recepy, true);

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    
    case ("POST"):
        //header("Access-Control-Allow-Origin: *");
        if(count($_POST['recepy']) !=0){
            $newrecepy = $_POST['recepy'];
            $newfile  =  time(). $_FILES['recepy']['name']['image'];
            if (!empty($_FILES)) {
                
                $newrecepy['image'] ="img/".$newfile;
                array_push($arr,$newrecepy);
                $txt = json_encode($arr);
                $myfile = fopen($file, "w");
                fwrite($myfile, $txt);
                fclose($myfile);
                move_uploaded_file($_FILES['recepy']['tmp_name']['image'], "../img/".$newfile);
            }
        }
        header("Location: " . $redirect); 
        exit;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}

?>


Array
(
    [recepy] => Array
        (
            [name] => Array
                (
                    [image] => header.jpeg
                )

            [type] => Array
                (
                    [image] => image/jpeg
                )

            [tmp_name] => Array
                (
                    [image] => /tmp/phpg5EErv
                )

            [error] => Array
                (
                    [image] => 0
                )

            [size] => Array
                (
                    [image] => 257170
                )

        )

)