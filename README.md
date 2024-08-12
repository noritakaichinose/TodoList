# Todoアプリケーション

このリポジトリは、フロントエンドとバックエンドが連携したシンプルなTodoリストアプリケーションを提供します。フロントエンドはReactとTypeScriptで、バックエンドはNode.jsとExpressで構築されています。認証機能を実装しており、ユーザーごとにTodoリストを管理できます。

## デモ
未着手

## 機能

- ユーザー登録とログイン
- ユーザーごとのTodoリスト管理
- Todoの追加、編集、削除
- 完了したTodoのフィルタリング
- アカウント情報の更新と削除

## 技術スタック

- **フロントエンド**: React, TypeScript, MUI (Material-UI)
- **バックエンド**: Node.js, Express, MongoDB (Mongoose)
- **認証**: JSON Web Tokens (JWT)
- **デプロイ**: GitHub

## セットアップ

### 1. リポジトリのクローン

まず、このリポジトリをローカルにクローンします。

```bash
git clone https://github.com/あなたのユーザー名/Todoアプリ.git
cd Todoアプリ
```

### 2. 環境変数の設定
バックエンド（backフォルダ）内に.envファイルを作成し、以下のように環境変数を設定します。

```bash
MONGODB_URI=あなたのMongoDB接続URI
JWT_SECRET=あなたのJWTシークレットキー
PORT=5000
```

### 3. 依存関係のインストール

```bash
# フロントエンド
cd front
npm install

# バックエンド
cd ../back
npm install
```

### 4. ローカル開発サーバーの起動
以下のコマンドを使用して、フロントエンドとバックエンドの開発サーバーを起動します。

```bash
# フロントエンド
cd front
npm start

# バックエンド
cd ../back
npm run dev
```

フロントエンドは http://localhost:3000
バックエンドは http://localhost:5000
でアクセス可能です。
