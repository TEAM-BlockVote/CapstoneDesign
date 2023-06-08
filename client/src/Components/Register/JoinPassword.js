function JoinPassword(userPass, userPassChk) {
    if (userPass !== userPassChk) {
        return "비밀번호가 일치하지 않습니다.";
    }

    if (!userPass) {
        return "비밀번호를 입력하세요.";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    if (!passwordRegex.test(userPass)) {
        return "8~20 영문, 숫자를 사용하세요.";
    }

    return null;
}
export default JoinPassword; 