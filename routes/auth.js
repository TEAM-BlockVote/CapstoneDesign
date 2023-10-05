const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/index');
const {localLogin, kakaoLogin} = require('../controllers/auth');
const pool = require('../server/Router/pool');
const passport = require("passport");
const sendEther = require('../payment/sendPayment');

router.post('/localLogin', isNotLoggedIn, localLogin);
router.post('/kakaoLogin', passport.authenticate('kakao'));
router.get('/kakaoLogin/callback', passport.authenticate('kakao', {
  successRedirect: '/auth/additionalInfo',
  failureRedirect: '/?loginErr=카카오로그인에러',
}), (req, res) => {
  res.send('/');
});

router.post('/googleLogin', passport.authenticate('google', { scope: ['profile', 'email'] })) ;
router.get('/googleLogin/callback', passport.authenticate('google', {
  successRedirect: '/auth/additionalInfo',
  failureRedirect: '/?loginErr=구글로그인에러',
}), (req, res) => {
  res.send('/');
});

// router.post('/naverLogin', passport.authenticate('naver')) ;
// router.get('/naverLogin/callback', passport.authenticate('naver', {
//   successRedirect: '/auth/additionalInfo',
//   failureRedirect: '/?loginErr=네이버로그인에러',
// }), (req, res) => {
//   res.send('/');
// });

// router.post('/facebookLogin', passport.authenticate('facebook')) ;
// router.get('/facebookLogin/callback', passport.authenticate('facebook', {
//   successRedirect: '/auth/additionalInfo',
//   failureRedirect: '/?loginErr=페이스북로그인에러',
// }), (req, res) => {
//   res.send('/');
// });

router.get('/additionalInfo', isLoggedIn, (req, res, next) => {
  if(req.user.verificationStatus === "true") {
    res.redirect('http://52.78.93.185/');
  } else {
    res.redirect('http://52.78.93.185/additionalInfo');
  }
});

router.get('/isLoggedIn', async(req, res, next)=>{
  if(req.user) {
    const weiBalance = await req.web3.eth.getBalance(req.user.walletAddr);
    const etherBalance = parseFloat(req.web3.utils.fromWei(weiBalance, 'ether')).toFixed(5);
    res.json({
      isLoggedIn:req.isAuthenticated(),
      user: req.user.name,
      studentNumber: req.user.studentNumber,
      walletAddr: req.user.walletAddr,
      etherBalance: etherBalance,
    });
  } else {
    res.json({
      isLoggedIn:req.isAuthenticated()
    });
  }
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
    try {
      await new Promise( (resolve, reject) => {
        pool.query(sql, [studentNumber, dep, telNumber, 'true', req.user.snsId], (err, results, fields) => {
          if(err) 
            console.log(reject(err));
          else 
            console.log(resolve(results));
        });
        req.logOut(() => {
          console.log("로그아웃");
          res.redirect('/');
        })
      });  
    } catch (error) {
      console.log(error);
    }
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
  const insertUserSql = 'INSERT INTO users (studentNumber, name, dep, password, telNumber, walletAddr, walletPrivateKey) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const privateKey = await req.web3.eth.accounts.create().privateKey;
  const address = await req.web3.eth.accounts.privateKeyToAccount(privateKey).address;
  const checkUser = async(studentNumber) => {
    try {
      const queryResult = await new Promise( (resolve, reject) => {
        pool.query(hasUserSql, studentNumber, (err, results, fields) => {
          if(err) 
            reject(err);
          else 
            resolve(results);
        });
      });
      return queryResult;
    } catch (error) {
      console.log(error);
    }
  };

  try {
    const userExists = await checkUser(studentNumber);
    if(userExists.length > 0) return res.send("<script>alert('이미 존재하는 학번입니다. 다시 회원가입 해주세요');location.href='/';</script>");
    const hashPassword = await bcrypt.hash(password, 12);
    await new Promise((resolve, reject) => {
      pool.query(insertUserSql, [studentNumber, name, dep, hashPassword, telNumber, address, privateKey], (err, results, fields) =>{
        if(err) 
          reject(err);
        else 
        resolve(results);
      });
    });      
    const user = await checkUser(studentNumber);
    sendEther(req.web3, user[0]);
  } catch (error) {
    console.log(error);
  }
  return res.send("<script>alert('회원가입 완료!');location.href='/';</script>");
});

module.exports = router;
