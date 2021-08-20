const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  return Todo.findAll({
    //使用raw: true處理資料庫回傳物件中的可操作function
    raw: true,
    nest: true,
    where: { userId: req.user.id }
  })
  .then(todos => {
    res.render('index', { todos })
  })
    .catch(error => { return res.status(422).json(error) })
})


// app.get('/', (req, res) => {

//   return Todo.findAll({
//     //使用raw: true處理資料庫回傳物件中的可操作function
//     raw: true,
//     nest: true
//   })
//     .then(todos => {
//       res.render('index', { todos })
//     })
//     .catch(error => { return res.status(422).json(error) })
// })



module.exports = router