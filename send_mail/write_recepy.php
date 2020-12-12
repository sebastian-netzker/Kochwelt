<?php
$file = "../js/recepy.json";
$myfile = fopen($file, "r") or die("Unable to open file!");

$recepy = fread($myfile, filesize($file));
fclose($myfile);
$arr = json_decode($recepy, true);
$allowed_files = [
    'image/jpeg' => 'jpg',
    'image/gif' => 'gif',
    'image/png' => 'png'
];

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"):
        //header("Access-Control-Allow-Origin: *");
        if (count(json_decode($_POST['recipe'], true)) != 0) {
            $newrecepy = json_decode($_POST['recipe'], true);
            $newfile  =  time() . $_FILES['image']['name'];
            if (!empty($_FILES)) {
                $type = $_FILES['image']['type'];
                if (isset($allowed_files[$type]) & $allowed_files[$type] < 5242880) {
                    $newrecepy['image'] = "img/" . $newfile;
                    array_push($arr, $newrecepy);
                    $txt = json_encode($arr);
                    $myfile = fopen($file, "w");
                    fwrite($myfile, $txt);
                    fclose($myfile);
                    move_uploaded_file($_FILES['image']['tmp_name'], "../img/" . $newfile);
                    echo "Rezept erfolgreich gespeichert!";
                }
                else {
                    echo "Bildformat darf nur jpg, gif oder png und nicht größer als 5 MB sein!";
                };
            }
        }
        exit;

    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        echo "Fehler beim Speichern";
        exit;
}
