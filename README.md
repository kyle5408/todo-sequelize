# todo-sequelize
<br>

在node.js搭配express框架下，使用sequelize操作MySQL

* 測試帳號：root@example.com 
* 測試密碼：12345678

<br>

## 專案功能 Features

1.  使用者可以註冊帳號
2.  使用者可以輸入帳號密碼登入
3.  使用者可以透過 Facebook 登入
4.  使用者可以透過 Google 登入
4.  使用者必須登入後才能使用專案相關功能
5.  使用者可以在首頁瀏覽所有待辦事項
6.  使用者可以新增待辦事項
7.  使用者可以勾選已完成的待辦事項
8.  使用者可以修改待辦事項
9.  使用者可以刪除待辦事項

<br>
https://imgur.com/koSRK9w
## 畫面預覽 Preview
![登入](https://imgur.com/koSRK9w)

![首頁](https://imgur.com/0QtESA5)

<br>

## 建置環境 Environment

<br>

- "bcryptjs": "^2.4.3",
- "body-parser": "^1.19.0",
- "connect-flash": "^0.1.1",
- "dotenv": "^10.0.0",
- "express": "^4.17.1",
- "express-handlebars": "^5.3.3",
- "express-session": "^1.17.2",
- "method-override": "^3.0.0",
- "mysql2": "^2.3.0",
- "passport": "^0.4.1",
- "passport-facebook": "^3.0.0",
- "passport-google-oauth20": "^2.0.0",
- "passport-local": "^1.0.0",
- "sequelize": "^6.6.5",
- "sequelize-cli": "^6.2.0"


<br>

## 安裝流程 Install

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/kyle5408/todo-sequelize.git
```
2. 進入專案資料夾
```
cd todo-sequelize
```
3. 安裝套件
```
npm install
```
4. 引入環境變數

<br>

* 將 .env.example 改為 .env
* Facebook Login: 需要在 [Facebook for Developers](https://developers.facebook.com/) 建立應用程式，並將應用程式編號與應用程式密鑰分別代入 FACEBOOK_ID 及 FACEBOOK_SECRET 
* Google Login: 需要在 [Google Developers Console](https://console.cloud.google.com/apis/dashboard) 建立憑證，並將用戶端編號及密碼分別代入 GOOGLE_CLIENT_ID 及 GOOGLE_CLIENT_SECRET

<br>

5. 建立資料庫

<br>

打開 MySQL workbench 並連線至本地資料庫，輸入下列指令建立資料庫 

```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```


<br>

6. 建立資料庫欄位
```
npx sequelize db:migrate
```

7. 建立種子資料
```
npx sequelize db:seed:all
```
可使用
```
select * from todos;
select * from users;
```
確認種子資料建立(注意不可執行到前面的drop database if exists todo_sequelize)

8. 啟動網頁伺服器
```
npm run dev
```
9. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

App is running on http://localhost:3000
