<?php
require_once 'config.inc.php';

if (!isset($_GET['code']) || empty($_GET['code'])) {
    header("location: $HOME_URL");
    exit;
}

$linkCode = $_GET['code'];
$sql = "SELECT * FROM temp_verf WHERE code = ?";
$stmt1 = $conn->prepare($sql);
$stmt1->bind_param("s", $linkCode);
$stmt1->execute();
$result1 = $stmt1->get_result();

if ($result1->num_rows > 0) {
    while ($row1 = $result1->fetch_assoc()) {
        $uid = $row1['uid'];
        $sql2 = "SELECT * FROM users WHERE uid = ?";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("s", $uid);
        $stmt2->execute();
        $result2 = $stmt2->get_result();

        if ($result2->num_rows > 0) {
            $stmt2->close();
            header('location: https://bank.impreent.com/auth?f=signup&e=uidExists');
            exit;
        }

        $expires = $row1['expires'];
        if (time() >= $expires) {
            deleteTemp($conn, $row1['id']);
            header('location: https://bank.impreent.com/auth?f=signup&e=codeExpired');
            exit;
        }

        $pwd = $row1['pwd'];
        $email = $row1['email'];
        $sql3 = "INSERT INTO users (uid, pwd, email) VALUES (?, ?, ?)";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param("sss", $uid, $pwd, $email);
        $stmt3->execute();
        $stmt3->close();
        deleteTemp($conn, $row1['id']);

        session_start();
        $_SESSION['uid'] = $uid;
        header('location: https://bank.impreent.com/thanks?r=signup');
        exit;
    }

    $stmt1->close();
    $conn->close();
} else {
    $stmt1->close();
    $conn->close();
    header('location: https://bank.impreent.com/auth?f=signup&e=codeExpired');
    exit;
}

function deleteTemp($conn, $id) {
    $sql = "DELETE FROM temp_verf WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}