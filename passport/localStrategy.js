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
        const result = await bcrypt.compare(password, exUser.password);
        if(result) {
          done(null, exUser); //성공유저 
        } else {
          done(null, false, {message: '비밀번호가 일치하지 않습니다.'}); //로직실패
        }
      } else {
        done(null, false, {message: '가입되지않은 학생입니다.'});
      }
    } catch (error) {
      done(error); //서버실패
    }
  }))
}