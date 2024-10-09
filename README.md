同志社クローバー祭　出店アンケート

2024年から運用開始

アンケート回答ページ https://cloverfes.com/booth_questionnaire/
出店団体用

アンケート確認ページ https://cloverfes.com/booth_questionnaire/admin-result 
クロ実用

ブランチ

・main：本番環境

・develop：本番開発環境

・local：ローカル開発環境（同期されていない）

開発方法(本番環境ブランチdevelop)

1.好きなディレクトリを開く

2.以下をクローンする
https://github.com/shoookawa/BoothQuestionnaire

3.ブランチをdevelopに変更

4.新しいターミナルで、「cd フロントエンド」実行

5.ターミナルで、「npm install」実行

6.ターミナルで、「npm run dev」実行

7.srcフォルダ内で開発

8.backendはxserver内にデプロイされている「submit.php」「results.php」を変更

9.変更の横の＋を押す、メッセージを入力してコミットl

10.プッシュ

11.問題なければ、mainにマージ

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
