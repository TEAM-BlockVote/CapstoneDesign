const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy');
const pool = require('../server/Router/pool');

module.exports = () => {
  passport.serializeUser((user, done) => { //user === exUser임.
    done(null, user.studentNumber);
    //세션 { 123123123 : 1 } {세션쿠키 : 유저아이디} -> 메모리 저장
  });

  passport.deserializeUser( async (studentNumber, done) => {
    const sql = "select * from users where studentNumber = ?";

    pool.query(sql, [studentNumber], (error, results, fields) => {
      if(!error) {
        done(null, results[0]);
      } else {
        done(error);
      }
    });
  });
  local();
  kakao();
  google();
}