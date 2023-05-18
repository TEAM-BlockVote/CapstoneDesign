const express = require('express');
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


router.post('/signup', (req, res) => {
  const param = [req.body.studentNumber, req.body.name, req.body.dep, req.body.password, req.body.telNumber];

  console.log(req.body);
  pool.query('INSERT INTO users(`studentNumber`, `name`, `dep`, `password`, `telNumber`) VALUES (?, ?, ?, ?, ?)', param, (err, row) =>{
    if(err) console.log(err);
  });
  res.redirect('/');
});

module.exports = router;