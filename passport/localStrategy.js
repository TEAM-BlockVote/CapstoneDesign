const passport = require('passport');
const bcrypt = require('bcrypt');
const pool = require('../server/Router/pool')
const { Strategy: localStrategy } = require('passport-local');

module.exports = () => {
  passport.use(new localStrategy({
    usernameField : 'studentNumber',
    passwordField : 'password',
    passReqToCallback: false,
  }, async (studentNumber, password, done) => {
    const sql = "select * from users where studentNumber = ?;";
    try {
      const exUser = await new Promise((resolve, reject) => {
         pool.query(sql, [studentNumber], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      });

      if(exUser) {
        done(null, exUser); //성공유저 
      } else {
        done(null, false, {message: '비밀번호가 일치하지 않습니다'}); //로작실패
      }
    } catch (error) {
      console.log(error);
    }
  }))
}