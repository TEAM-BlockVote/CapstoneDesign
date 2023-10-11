exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인 해주세요.');
    res.redirect(`/?error=${message}`);
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`); //localhost?error=message
  }
};

exports.authenticatedUser = (req, res, next) => {
  const authenticatedUser = ['201903959', '201903961', '202103639', '201903984'];
  if (authenticatedUser.includes(req.user.studentNumber)) {
    next();
  } else {
    const errorMessage = "관리자만 투표 등록이 가능합니다.";
    res.status(403).send(errorMessage);
  }
};
