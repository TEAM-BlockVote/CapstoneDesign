const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/index');
const {localLogin, kakaoLogin} = require('../controllers/auth');
const pool = require('../server/Router/pool');
const passport = require("passport");

router.post('/localLogin', isNotLoggedIn, localLogin);
router.post('/kakaoLogin', passport.authenticate('kakao'));
router.get('/kakaoLogin/callback', passport.authenticate('kakao', {
  successRedirect: '/auth/additionalInfo',
  failureRedirect: '/?loginErr=카카오로그인에러',
}), (req, res) => {
  
  res.send('/');
});

router.get('/additionalInfo', isLoggedIn, (req, res, next) => {
  console.log(req.user.verificationStatus);
  
  if(req.user.verificationStatus === "true") {
    res.redirect('http://localhost:3000/');
  } else {
    res.redirect('http://localhost:3000/additionalInfo');
  }
});

router.get('/isLoggedIn', (req, res, next)=>{
  res.send(req.isAuthenticated());
});

router.get('/logout', (req, res, next)=>{
  req.logOut(() => {
    res.redirect('/');
  })
});

router.post('/update', isLoggedIn, async (req, res, next)=>{
  const {studentNumber, dep, telNumber} = req.body;
  const sql = "update users set studentNumber = ?, dep = ?, telNumber = ?, verificationStatus = ? where snsId = ?";
  if(req.user.verificationStatus === "false") {
    await new Promise( (resolve, reject) => {
      pool.query(sql, [studentNumber, dep, telNumber, 'true', req.user.snsId], (err, results, fields) => {
        if(err) 
          console.log(reject(err));
        else 
          console.log(resolve(results));
      });
      req.logOut(() => {
        res.redirect('/');
      })
    });  
  } else {
    res.redirect('/');
  }
});

router.get('/hasStudentNumber', async (req, res, next)=>{
  const studentNumber = req.query.studentNumber;
  const sql = 'select * from users where studentNumber = ?';
  const isUser = await new Promise( (resolve, reject) => {
    pool.query(sql, studentNumber, (err, results, fields) => {
      if(err) 
        reject(err);
      else 
        resolve(results);
    });
  });
  isUser.length ? res.send('true') : res.send('false');
});

router.post('/signup', async (req, res, next) => {
  const {studentNumber, name, dep, password, telNumber} = req.body;
  const hasUserSql = 'select * from users where studentNumber = ?';
  const insertUserSql = 'INSERT INTO users (studentNumber, name, dep, password, telNumber) VALUES (?, ?, ?, ?, ?)';
  
  try {
    const isUser = await new Promise( (resolve, reject) => {
      pool.query(hasUserSql, studentNumber, (err, results, fields) => {
        if(err) 
          reject(err);
        else 
          resolve(results);
      });
    });
  
    if(isUser.length) 
      return res.send("<script>alert('이미 존재하는 학번입니다. 다시 회원가입 해주세요');location.href='/';</script>");
  
    const hashPassword = await bcrypt.hash(password, 12);

    pool.query(insertUserSql, [studentNumber, name, dep, hashPassword, telNumber], (err, results, fields) =>{
      if(err) console.log(err);
    });
  } catch (error) {
    next(error);
  };
  return res.send("<script>alert('회원가입 완료!');location.href='/';</script>");
});

module.exports = router;
