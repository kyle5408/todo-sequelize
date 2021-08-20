const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const usePassport = require('./config/passport')


//判斷執行環境，決定是否使用環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const routes = require('./routes')
const PORT = process.env.PORT

// 引用套件
app.engine('hbs', exhbs({ defaultLayot: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定路由&監聽
app.use(routes)


app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})