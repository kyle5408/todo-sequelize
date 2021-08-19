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

app.post('/users/login', (req, res) => {
  res.redirect('/')
})

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
    .then(salt => { bcrypt.hash(passwprd, salt)})
    .then(hash => {
      User.create({
        name,
        email,
        password: hash
      })
    })
    .then(()=>{res.render('/')})
    .cathch(err => console.log(err))
  })
})

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})