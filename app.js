const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrode = require('method-override')
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
app.use(methodOverrode('_method'))

// 設定路由&監聽
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  res.render('index')
})

app.get('/todos/detail', (req, res) => {
  res.render('detail')
})

app.get('/todos/edit', (req, res) => {
  res.render('edit')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})