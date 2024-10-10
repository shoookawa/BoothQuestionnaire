<?php
header('Access-Control-Allow-Origin: https://cloverfes.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$correctPassword = 'KingGnu2024';  // 毎年変更する

// POSTリクエストからパスワードを取得
$data = json_decode(file_get_contents('php://input'), true);
$inputPassword = $data['password'] ?? '';

// パスワードを比較
if ($inputPassword === $correctPassword) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'パスワードが間違っています。']);
}
?>
