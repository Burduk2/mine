<?php 
require_once 'config.inc.php';

if (isset($_POST['login'])) {
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    $uidType = (strpos($uid, '@') !== false) ? 'email' : 'uid';

    $checkUidSql = "SELECT * FROM users WHERE $uidType = ?";
    $checkUidStmt = $conn->prepare($checkUidSql);
    $checkUidStmt->bind_param('s', $uid);
    $checkUidStmt->execute();
    $checkUidResult = $checkUidStmt->get_result();
    if ($checkUidResult->num_rows > 0) {
        $checkUidRow = $checkUidResult->fetch_assoc();
        if (password_verify($pwd, $checkUidRow['pwd'])) {
            session_start();
            $_SESSION['uid'] = $checkUidRow['uid'];
            header('location: https://bank.impreent.com');
        } else {
            header('location: https://bank.impreent.com/auth?f=login&e=pwd');
        }
        $checkUidStmt->close();
        $conn->close();
        exit;
    } else {
        $checkUidStmt->close();
        $conn->close();
        header("location: https://bank.impreent.com/auth?f=login&e=$uidType");
        exit;
    }
} else {
    header('location: https://bank.impreent.com');
    exit;
}