function JoinPassword(userPass, userPassChk) {
    if (userPass !== userPassChk) {
        return "비밀번호가 일치하지 않습니다.";
    }

    if (!userPass) {
        return "비밀번호를 입력하세요.";
    }

    if (userPass.length < 4 || userPass.length > 20) {
        return "비밀번호는 4~20 자리여야 합니다.";
    }

    return null;
}
export default JoinPassword; 