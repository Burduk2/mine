<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'config.inc.php';

$jsonData = json_decode(file_get_contents('php://input'), true);

echo json_encode(array('status' => 'success', 'data' => $jsonData));

// $donationAmt = rand(1, 50);
// $date = time();
// $lotteryEvent = doLottery($donationAmt);
// $donationInBtc = floatval(convertDonationToBtc($donationAmt));

// // insert notf
// $insertNotfSql = "INSERT INTO vault_notf (donation_amt, lottery, btc, date) VALUES (?, ?, ?, ?)";
// $insertNotfStmt = $conn->prepare($insertNotfSql);
// $insertNotfStmt->bind_param('ssss', $donationAmt, $lotteryEvent, $donationInBtc, $date);
// $insertNotfStmt->execute();

// // get data from db
// $getLotteryBalSql = "SELECT lottery_balance FROM vault";
// $getLotteryBalStmt = $conn->prepare($getLotteryBalSql);
// $getLotteryBalStmt->execute();
// $getLotteryBalRes = $getLotteryBalStmt->get_result();
// $getLotteryBalRow = $getLotteryBalRes->fetch_assoc();
// $lotteryBal = $getLotteryBalRow['lottery_balance'] + $lotteryEvent;
// $getLotteryBalStmt->close();

// // insert the money amt from donation to db
// $moneyAmt += $donationAmt;

// function doLottery($amt) {
//     $chance = rand(1, 150_000_000);
//     return $chance === 3 ? 1_000_000_000 : $amt * -1;
// }

// function convertDonationToBtc($amt) {
//     $url = "https://blockchain.info/tobtc?currency=USD&value=$amt";
//     $res = file_get_contents($url);
//     if ($res === FALSE) {
//         return "Error fetching data";
//     }
//     return $res;
// }

// function getBtcBal($conn) {
//     $sql = "SELECT btc_balance FROM vault";
//     $stmt = $conn->prepare($sql);
//     $stmt->execute();
//     $res = $stmt->get_result();
//     $row = $res->fetch_assoc();
//     $bal = $row['btc_balance'];
//     $stmt->close();
//     return $bal;
// }

// $btcBal = getBtcBal($conn) + $donationInBtc;
// updateVault($conn, $moneyAmt, $lotteryBal, $btcBal);

// function updateVault($conn, $moneyAmt, $lotteryBal, $btcBal) {
//     $sql = "UPDATE vault SET balance = ?, lottery_balance = ?, btc_balance = ?";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param('sss', $moneyAmt, $lotteryBal, $btcBal);
//     $stmt->execute();
//     $stmt->close();
// }

// $conn->close();

