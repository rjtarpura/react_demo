<?php
/**
 * GO to php-api directory and rund following command to start php server
 * php -S localhost:3002 -t .
 * navigate to http://localhost:3002/api.php?fun=get_user
 */
$function_name = ($_GET['fun']) ? $_GET['fun'] : null;
sleep(10);
// Enable CORS
header("Access-Control-Allow-Origin: *");

function get_user(){
    echo json_encode([
        'status'=> false,
        "message"=>"user list",
        'users'=> [],
    ]);
}

if($function_name){
    call_user_func($function_name);
} else {
    echo json_encode([
        'status'=> false,
        'message'=> "Invalid function call.",
        'users'=> [],
    ]);
}



