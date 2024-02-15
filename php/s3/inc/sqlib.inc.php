<?php
/*/
/*  SIMPLE SAFE SQL
/*/
function s3($conn, $sql, $bind_vars=false) {
    try { $stmt = $conn->prepare($sql); } 
    catch (Exception $e) { return ['error_text' => $e, 'error' => 'prepare', 'success' => false]; }

    if ($bind_vars) {
        try {
            $types = array_keys($bind_vars)[0];
            $values = reset($bind_vars);
            $bindParams = [$types];
            if (is_array($values)) { foreach ($values as &$value) { $bindParams[] = &$value; } } 
            else { $bindParams[] = &$values; }
            call_user_func_array([$stmt, 'bind_param'], $bindParams);
        } catch (Exception $e) {
            return ['error_text' => $e, 'error' => 'bind_param', 'success' => false];
        }
    }

    $stmt->execute();
    if ($stmt->errno) return ['error_text' => $stmt->error, 'error' => 'execute', 'success' => false];

    if (explode(' ', trim($sql))[0] === 'SELECT') {
        $res = $stmt->get_result();
        $stmt->close();
        return ['result' => $res, 'error_text' => '', 'error' => false, 'success' => true];
    } else {
        $stmt->close();
        return ['error_text' => '', 'error' => false, 'success' => true];
    }
}