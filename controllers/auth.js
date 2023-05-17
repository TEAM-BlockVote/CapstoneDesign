const passport = require('passport');

exports.localLogin = (req, res, next) => {
  console.log("asdasd");
  passport.authenticate('local', (authError, user, info) => {//로컬 스트레티지 호출 두번째 화살표 함수가 doen임.
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      return res.redirect(`/signIn?error=${info.message}`);
    }
    return req.login(user, (loginError) => { //=> req.로그인을 하면 passport/index.js의 시리얼라이즈유저가 실행된다.
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/?message=로그인됐습니다.');
    });
  })(req, res, next);//미들웨어 확장 패턴임.
}

exports.kakaoLogin = () => {

}