const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FaceBookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  //本地登入策略
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

  //FaceBook登入策略
  passport.use(new FaceBookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    function (accessToken, refreshToken, profile, done) {
      const { name, email } = profile._json
      User.findOne({ where: { email } })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ));

  //設定Google登入策略
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ where: { email } })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }
  ))




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