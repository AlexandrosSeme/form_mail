<?php
if (isset($_POST['message'])){

    $data =json_decode($_POST['message']);

    foreach($data as $value) {
        if (empty(trim($value))){
            echo "Error: All fields are Required";
            exit();

        }
    }

    $firstname=$data->name;
    $surname=$data->surname;
    $email=$data->email;
    $message=$data->message;

    if (!filter_var($email,FILTER_VALIDATE_EMAIL)){
        echo "Error: Please enter a valid email";
        exit();
    }

    $to = "alexandros.seme@gmail.com";
    $subject = $firstname . "has question for you";
    
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .="From: " . $email . "\r\n";

    $send = mail($to, $subject, $message, $headers);

    if(!$send){
        echo "Error: Message not send. Please try again";
    }else{
        echo "Message was send Successfuly";
    }

}

