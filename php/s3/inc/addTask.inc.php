<?php

require_once 'sqlib.inc.php';
require_once 'config.inc.php';

$name = $_POST['name'];
$done = 1;

// writeTo($conn, 'tasks', [
//   'name' => $name,
//   'done' => $done,
// // ]);

// select($conn, 'tasks', '*', ['done' => 1]);

// sql("INSERT INTO tasks (name, done) VALUES ($name, $done)");
// sql("writeTo tasks name=$name; done=$done");
// sql($conn, "SELECT * FROM tasks WHERE done <= 1");
// $insertTask = s3($conn, "INSERT INTO tasks (name, done) VALUES (?, ?)", [
//     'si' => [$name, $done]
// ]);

// s3($conn, "INSERT INTO tasks (name) VALUES (?)", ['s' => $name]);
// s3($conn, "INSERT INTO tasks (name, done) VALUES (?, ?)", ['si' => [$name, $done]]);
// s3($conn, "INSERT INTO tasks (name, done) VALUES (?, ?)", 'si', [$name, $done]);
print_r(s3($conn, 'SELECT * FROM tasks')['result']);