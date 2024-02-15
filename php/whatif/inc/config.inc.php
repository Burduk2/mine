<?php

$serverName = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'whatif';

$conn = mysqli_connect($serverName, $dbUsername, $dbPassword, $dbName);
if (!$conn) die('Connection failed' . mysqli_connect_error());

$HOME_URL = 'http://localhost/tomoon';
$LEGO_URL = "$HOME_URL/lego.php";
$LOTTERY_URL = "$HOME_URL/lottery.php";
$BITCOIN_URL = "$HOME_URL/bitcoin.php";
$ABOUT_URL = "$HOME_URL/info.php#about";
$TERMS_URL = "$HOME_URL/info.php#terms";
$PRIVACY_URL = "$HOME_URL/info.php#privacy";
$DONATIONS_URL = "$HOME_URL/donations.php";
$DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=RE435ZUHVYXK2";

$getMoneyAmtSql = "SELECT balance FROM vault";
$getMoneyAmtStmt = $conn->prepare($getMoneyAmtSql);
$getMoneyAmtStmt->execute();
$getMoneyAmtRes = $getMoneyAmtStmt->get_result();
$getMoneyAmtRow = $getMoneyAmtRes->fetch_assoc();
$moneyAmt = $getMoneyAmtRow['balance'];
$moneyAmtOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($moneyAmt, 2));
$getMoneyAmtStmt->close();


$ACCESS_TOKEN = 'A21AAJHT3r8hWiQ1bDZRKK5XetKMMkmCC9DlX9A1GiQRX0ZITxQ7eXiDfJDM1QArzxnGPKSqIMWnpSeVFUPljG-fPF1oFzKEg';