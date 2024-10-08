<?php
header('Access-Control-Allow-Origin: https://cloverfes.com');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$host = 'mysql804b.xserver.jp';
$dbname = 'doclover13_boothquestion';
$user = 'doclover13_booth';
$password = 'KingGnu2024';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("データベース接続失敗: " . $e->getMessage());
}

try {
    $stmt = $pdo->query("SELECT * FROM booth_questionnaire");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'クエリ実行エラー: ' . $e->getMessage()]);
}
?>
