<?php 

$serverName = 'localhost';
$dBUsername = 'impreent_main';
$dBPassword = '5nCMOiTC2TeCsws3';
$dBName = 'impreent_bank';

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection failed " . mysqli_connect_error());
}

$HOME_URL = 'https://bank.impreent.com';
$KEY = '68a1f9b8c3726e5d7b9a0ca44e03d2bc';