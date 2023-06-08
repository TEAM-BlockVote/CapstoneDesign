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
  console.log(req.user.verificationStatus);
  
  if(req.user.verificationStatus === "true") {
    res.redirect('http://52.78.93.185/');
  } else {
    res.redirect('http://52.78.93.185/additionalInfo');
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


router.post('/qnaposts', async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: '제목과 내용을 모두 입력해주세요.' });
    return;
  }
  const name = '2019*****'; // 작성자 이름 일단 설정 
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const date = `${year}-${month}-${day} ${hours}:${minutes}`;
  const view = 128; // 조회수를 128으로 초기화
  const insertQuery = 'INSERT INTO qna (title, name, date, view, content) VALUES (?, ?, ?, ?, ?)';

  try {
    await new Promise((resolve, reject) => {
      pool.query(insertQuery, [title, name, date, view, content], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json({ message: '글 작성이 완료되었습니다.' });
  } catch (error) {
    console.error('글 작성 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '글 작성 중 오류가 발생했습니다.' });
  }
});
// 게시물 목록을 가져오는 API
router.get('/qnaposts', async (req, res, next) => {
  const selectQuery = 'SELECT * FROM qna';

  try {
    const tableposts = await new Promise((resolve, reject) => {
      pool.query(selectQuery, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json({ tableposts });
  } catch (error) {
    console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
  }
});

// 게시물을 가져오는 API
router.get('/qnaposts/:id', async (req, res, next) => {
  const { id } = req.params;
  const selectQuery = 'SELECT * FROM qna WHERE id = ?';

  try {
    const tablepost = await new Promise((resolve, reject) => {
      pool.query(selectQuery, [id], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (tablepost) {
      res.status(200).json({ post: tablepost });
    } else {
      res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
