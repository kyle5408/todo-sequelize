const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrode = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

// 引用套件
app.engine('hbs', exhbs({ defaultLayot: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverrode('_method'))

// 設定路由&監聽
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT,() => {
  console.log(`APP is running on http://localhost:${PORT}`)
})