<?php
require_once 'config.inc.php';

if (!isset($_GET['code']) || empty($_GET['code'])) {
    header("location: $HOME_URL");
    exit;
}

$linkCode = $_GET['code'];
$dataByCodeSql = "SELECT * FROM temp_verf WHERE code = ?";
$dataByCodeStmt = $conn->prepare($dataByCodeSql);
$dataByCodeStmt->bind_param("s", $linkCode);
$dataByCodeStmt->execute();
$dataByCodeResult = $dataByCodeStmt->get_result();

if ($dataByCodeResult->num_rows > 0) {
    while ($dataByCodeRow = $dataByCodeResult->fetch_assoc()) {
        $expires = $dataByCodeRow['expires'];
        if (time() >= $expires) {
            deleteTemp($conn, $dataByCodeRow['id']);
            header("location: $HOME_URL/forgot-password?&e=codeExpired");
            exit;
        }

        $uid = $dataByCodeRow['uid'];
        $pwd = $dataByCodeRow['pwd'];
        $updatePwdSql = "UPDATE users SET pwd = ? WHERE uid = ?";
        $updatePwdStmt = $conn->prepare($updatePwdSql);
        $updatePwdStmt->bind_param("ss", $pwd, $uid);
        $updatePwdStmt->execute();

        deleteTemp($conn, $dataByCodeRow['id']);
        header('location: https://bank.impreent.com/auth?f=login&e=pwd-changed');
        exit;
    }

    $dataByCodeStmt->close();
    $conn->close();
} else {
    $dataByCodeStmt->close();
    $conn->close();
    header('location: https://bank.impreent.com/forgot-password?e=codeExpired');
    exit;
}

function deleteTemp($conn, $id) {
    $sql = "DELETE FROM temp_verf WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}