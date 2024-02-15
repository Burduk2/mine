<?php
require_once 'config.inc.php';

if (isset($_POST['forgot-pwd'])) {
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    $uidType = (strpos($uid, '@') !== false) ? 'email' : 'uid';

    $checkUidSql = "SELECT * FROM users WHERE $uidType = ?";
    $checkUidStmt = $conn->prepare($checkUidSql);
    $checkUidStmt->bind_param('s', $uid);
    $checkUidStmt->execute();
    $checkUidResult = $checkUidStmt->get_result();
    if ($checkUidResult->num_rows > 0) {
        if (strlen($pwd) < 8 || strlen($pwd) > 128) {
            $checkUidStmt->close();
            $conn->close();
            header("location: $HOME_URL/forgot-password?e=pwd&uid=$uid");
            exit;
        }

        if ($uidType === 'uid') {
            $getEmailSql = "SELECT * FROM users WHERE uid = ?";
            $getEmailStmt = $conn->prepare($getEmailSql);
            $getEmailStmt->bind_param('s', $uid);
            $getEmailStmt->execute();
            $getEmailResult = $getEmailStmt->get_result();
            if ($getEmailResult->num_rows > 0) {
                $getEmailRow = $getEmailResult->fetch_assoc();
                $email = $getEmailRow['email'];
                $getEmailStmt->close();
            }
        }

        function getVerfCode() {
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            $result = '';
            for ($i = 0; $i < 8; $i++) $result .= $chars[mt_rand(0, 9)];
            return $result;
        }
        $verfCode = getVerfCode();
        
        $subject = "Restore Your Password - Impreent Community Bank";
        $message = "
            <p style='text-align:center'>Hello, $uid!</p>
            <p style='text-align:center'>Confirm changing your password by clicking this button:</p>
            <br><br>
            <p style='text-align:center'>
                <a href='$HOME_URL/inc/change-pwd.inc.php?code=$verfCode'
                    style='background-color:#3cab5a;padding: 10px 20px;
                    text-decoration:none;color:#eee;border-radius: 5px;font-size: 22px;margin-top: 0px'>Change My Password</a>
            </p><br><br>
            Best regards,<br>Impreent Team
        ";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mailSent = mail($email, $subject, $message, $headers);
        if (!$mailSent) {
            header("location: https://bank.impreent.com/forgot-password?e=mailNotSent&uid=$uid");
            $conn->close();
            exit;
        }
    
        $expiration = time() + 180;
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
    
        $sql = "INSERT INTO temp_verf (uid, pwd, code, expires) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $uid, $pwd, $verfCode, $expiration);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        header("location: $HOME_URL/forgot-password?e=verify&vemail=$email");
    } else {
        $checkUidStmt->close();
        $conn->close();
        header("location: $HOME_URL/forgot-password?e=$uidType&uid=$uid");
        exit;
    }
} else {
    header("location: $HOME_URL");
    exit;
}