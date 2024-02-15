<?php

if (isset($_POST['take'])) {
  require_once 'config.inc.php';
  session_start();
  if (!$_SESSION['uid']) {
    header('location: $HOME_URL/auth?f=signup');
    exit;
  }

  $amt = (int)$_POST['amt'];
  $reason = $_POST['reason'];
  $ipAddress = $_SERVER['REMOTE_ADDR'];
  $uid = $_SESSION['uid'];
  $pm = $_POST['pm'];
  
  $checkUidSql = "SELECT * FROM users WHERE uid = ?";
  $checkUidStmt = $conn->prepare($checkUidSql);
  $checkUidStmt->bind_param('s', $uid);
  $checkUidStmt->execute();
  $checkUidResult = $checkUidStmt->get_result();
  $checkUidRow = $checkUidResult->fetch_assoc();
  $email = $checkUidRow['email'];
  $checkUidStmt->close();
  $conn->close();

  if ($amt !== 10 && $amt !== 50) {
    header("location: $HOME_URL");
    exit;
  } else if (strlen($reason) < 100 || strlen($reason) > 750) {
    header("location: $HOME_URL");
      exit;  
    } else if (strlen($pm) > 320) {
      header("location: $HOME_URL");
      exit;
    }

    $botToken = '6344248652:AAG3955pwfrKgHvrIslDvreEjC1dthGA9gY';
    $chatId = '1773718260';
    $message = "Take <b>$$amt</b>\n<i>$reason</i>\n\nIP: <code>$ipAdress</code>\nUsername: <code>$uid</code>
  Email: <code>$email</code>\nPm: <code>$pm</code>
  <a href='$HOME_URL/inc/ban.inc.php?uid=$uid&k=$KEY'>[🚫BAN]</a> | <a href='$HOME_URL/inc/denyTake.inc.php?email=$email&k=$KEY'>[❌DENY]</a> | <a href='$HOME_URL/inc/acceptTake.inc.php?email=$email&k=$KEY'>[✅ACCEPT]</a>
    ";
    $apiUrl = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&parse_mode=HTML&text=" . urlencode($message);

  $response = file_get_contents($apiUrl);

  header("location: $HOME_URL/thanks?r=take");
  exit;
} else {
  header("location: $HOME_URL");
  exit;
}
