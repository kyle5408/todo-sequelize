const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
// 載入設定檔，會用到session要寫在 express-session 以後
const passport = require('passport')
const usePassport = require('./config/passport')
const bcrypt = require('bcryptjs')
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
app.get('/', (req, res) => {

  return Todo.findAll({
    //使用raw: true處理資料庫回傳物件中的可操作function
    raw: true,
    nest: true
  })
    .then(todos => {
      res.render('index', { todos })
    })
    .catch(error => { return res.status(422).json(error) })
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  res.render('index')
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

app.get('/todos/edit', (req, res) => {
  res.render('edit')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 reqest 登入狀態
app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => { bcrypt.hash(passwprd, salt) })
        .then(hash => {
          User.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => { res.render('/') })
        .cathch(err => console.log(err))
    })
})

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})