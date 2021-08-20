const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
// 載入設定檔，會用到session要寫在 express-session 以後
const passport = require('passport')
const usePassport = require('./config/passport')
const bcrypt = require('bcryptjs')
const routes = require('./routes')
const db = require('./models')
const Todo = db.Todo
const User = db.User


const app = express()
const PORT = 3000

// 引用套件
app.engine('hbs', exhbs({ defaultLayot: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// 設定路由&監聽
app.use(routes)


app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})