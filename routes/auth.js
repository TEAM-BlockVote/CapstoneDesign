const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {isLogin} = require('../middlewares/index');
const {localLogin, kakaoLogin} = require('../controllers/auth');
const pool = require('../server/Router/pool');

router.post('/localLogin', isLogin, localLogin);
router.get('/isLoggedIn', (req, res, next)=>{
  res.send(req.isAuthenticated());
});

router.get('/logout', (req, res, next)=>{
  req.logOut(() => {
    res.redirect('/');
  })
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
  const insertUserSql = 'INSERT INTO users VALUES (?, ?, ?, ?, ?)';
  
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
    console.log(error);
    return next(error);
  };
  return res.send("<script>alert('회원가입 완료!');location.href='/';</script>");
});

module.exports = router;
