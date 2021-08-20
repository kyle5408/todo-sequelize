const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  })
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    //findByPk method obtains only a single entry from the table, using the provided primary key.
    User.findByPk(id)
      .then(user => {
        //toJSON() 將資料轉成plain object
        // console.log(user)
        user = user.toJSON()
        // console.log(user)
        done(null, user)
      }).catch(err => done(err, null))
  })
}