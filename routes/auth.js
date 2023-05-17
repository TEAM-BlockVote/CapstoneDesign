const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/index');

const {localLogin, kakaoLogin} = require('../controllers/auth')

router.post('/localLogin', isLogin, localLogin);
router.get('/isLoggedIn', (req, res, next)=>{
  res.send(req.isAuthenticated());
});

module.exports = router;