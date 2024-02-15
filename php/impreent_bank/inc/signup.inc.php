<?php
require_once 'config.inc.php';

if (isset($_POST['signup'])) {
    $uid = $_POST['uid'];
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];

    $pattern = '/^[a-zA-Z0-9_-]+$/';
    if (empty($uid) || mb_strlen($uid) > 128 || preg_match($pattern, $uid) === 0) {
        header("location: https://bank.impreent.com/auth?f=signup&e=badUid&uid=$uid&email=$email");
        exit;
    }
    $sql = "SELECT * FROM users WHERE uid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $stmt->close();
        $conn->close();
        header("location: https://bank.impreent.com/auth?f=signup&e=uidExists&uid=$uid&email=$email");
        exit;
    }

    if (strlen($pwd) < 8 || strlen($pwd) > 128) {
        header("location: https://bank.impreent.com/auth?f=signup&e=pwd&uid=$uid&email=$email");
        exit;
    }
        
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $stmt->close();
        $conn->close();
        header("location: https://bank.impreent.com/auth?f=signup&e=emailExists&uid=$uid&email=$email");
        exit;
    }

    $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
    if (preg_match($pattern, $email) === 0) {
        header("location: https://bank.impreent.com/auth?f=signup&e=wrongEmail&uid=$uid&email=$email");
        $stmt->close();
        $conn->close();
        exit;
    }
    function getVerfCode() {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $result = '';
        for ($i = 0; $i < 8; $i++) $result .= $chars[mt_rand(0, 9)];
        return $result;
    }
    $verfCode = getVerfCode();
    
    $subject = "Verify Your Email - Impreent Community Bank";
    $message = "
        <p style='text-align:center'>Hello, $uid!</p>
        <p style='text-align:center'>Verify your email by clicking this button:</p>
        <br><br>
        <p style='text-align:center'>
            <a href='bank.impreent.com/inc/verify.inc.php?code=$verfCode'
                style='background-color:#3cab5a;padding: 10px 20px;
                text-decoration:none;color:#eee;border-radius: 5px;font-size: 22px;margin-top: 0px'>Verify my email</a>
        </p><br><br>
        Best regards,<br>Impreent Team
    ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $mailSent = mail($email, $subject, $message, $headers);
    if (!$mailSent) {
        header("location: https://bank.impreent.com/auth?f=signup&e=mailNotSent&uid=$uid&email=$email");
        exit;
    }

    $expiration = time() + 180;
    $pwd = password_hash($pwd, PASSWORD_DEFAULT);

    $sql = "INSERT INTO temp_verf (uid, pwd, email, code, expires) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $uid, $pwd, $email, $verfCode, $expiration);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    header("location: https://bank.impreent.com/auth?f=signup&e=verify&vemail=$email");
    exit;
} else {
    header('location: https://bank.impreent.com');
    exit;
}