<?php
header('Access-Control-Allow-Origin: https://cloverfes.com'); // 特定のオリジンのみ許可
header('Access-Control-Allow-Methods: POST'); // POST メソッドのみ許可
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // 許可するヘッダー

// データベース接続設定
$host = 'mysql804b.xserver.jp'; // Xserverのホスト名
$dbname = 'doclover13_boothquestion'; // データベース名
$user = 'doclover13_booth'; // ユーザー名
$password = 'KingGnu2024'; // パスワード

// データベース接続
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("データベース接続失敗: " . $e->getMessage());
}

// リクエストのボディを取得
$data = json_decode(file_get_contents('php://input'), true);

// データを挿入
try {
    $stmt = $pdo->prepare("INSERT INTO booth_questionnaire (format, satisfaction, reason_satisfaction, support, reason_support, advertisement, other_advertisement, opportunity, dissatisfaction, garbage, amount, nextyear, reason_nextyear, comment, year) VALUES (:format, :satisfaction, :reason_satisfaction, :support, :reason_support, :advertisement, :other_advertisement, :opportunity, :dissatisfaction, :garbage, :amount, :nextyear, :reason_nextyear, :comment, :year)");
    
    $stmt->execute([
        ':format' => $data['format'],
        ':satisfaction' => $data['satisfaction'],
        ':reason_satisfaction' => $data['reason_satisfaction'],
        ':support' => $data['support'],
        ':reason_support' => $data['reason_support'],
        ':advertisement' => $data['advertisement'],
        ':other_advertisement' => $data['other_advertisement'],
        ':opportunity' => $data['opportunity'],
        ':dissatisfaction' => $data['dissatisfaction'],
        ':garbage' => $data['garbage'],
        ':amount' => $data['amount'],
        ':nextyear' => $data['nextyear'],
        ':reason_nextyear' => $data['reason_nextyear'],
        ':comment' => $data['comment'],
        ':year' => $data['year']
    ]);
    
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
