const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrode = require('method-override')
const bcrypt = require('bcryptjs')

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

app.get('/detail', (req, res) => {
  res.render('detail')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})