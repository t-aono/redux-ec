# Redux-EC

`React` - `Redux` を使って EC サイトを構築

## 実装した機能

- ログイン、ログアウト
- 商品情報の管理機能
- カート機能、お気に入り機能
- 注文履歴の管理機能

## バックエンドは Firebase を利用

- Firestore
- Storage
- Hosting

## ローカルサーバー起動

`npm start`

## デプロイ

`npm run build`  
`firebase deploy --only hosting,storage,firestore`  
Functions は無料枠だとデプロイできないのでそれ以外を指定する

## 画面イメージ

![M0rFUjdiUTDbtWSqDo6a1653885118-1653885146](https://user-images.githubusercontent.com/46856574/170917773-c40a0940-3bf5-4934-b587-d19be2ff4130.gif)

## 教材

**[日本一わかりやすい React-Redux 入門](https://www.youtube.com/playlist?list=PLX8Rsrpnn3IWavNOj3n4Vypzwb3q1RXhr)**
