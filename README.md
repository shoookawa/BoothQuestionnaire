ブランチ
・main：本番環境
・production：本番開発環境
・local：ローカル開発環境（同期されていない）

開発方法(本番環境ブランチproduction)

1.好きなディレクトリを開く

2.以下をクローンする
https://github.com/shoookawa/BoothQuestionnaire

3.ブランチをproductionに変更

4.ターミナルで、「cd backend」実行

5.ターミナルで、「npm install」実行

6.ターミナルで、「npm start」実行

7.新しいターミナルで、「cd フロントエンド」実行

8.ターミナルで、「npm install」実行

9.ターミナルで、「npm run dev」実行

10.srcフォルダ内で開発

11.backendはxserver内にデプロイされている「submit.php」「results.php」を変更

12.変更の横の＋を押す、メッセージを入力してコミット

13.プッシュ

14.問題なければ、mainにマージ


アンケート内容の変更
・qustion.jsでアンケート内容を変更する
・submit.jsのスキーマの定義を変更する
・ResultsPage.vueのアンケート結果部分を変更する
・xserverのデータベース（ サーバ： mysql804b.xserver.jp データベース: doclover13_boothquestion テーブル: booth_questionnaire）のテーブルのスキーマを変更

デプロイ方法
1.新しいターミナルで、「cd フロントエンド」実行

2.ターミナルで、「npm run build」実行

3.ターミナルで、「npm run preview」実行、問題なく動けば

4.distフォルダ内とbackendのphpファイルをxserver内（/cloverfes.com/public_html/booth_questionnaire）のファイルと入れ替える