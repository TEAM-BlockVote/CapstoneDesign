function JoinName (userName) {
    if (!userName) {
        return "이름을 입력하세요.";
    }

    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(userName)) {
        return "올바르지 않은 이름 형식입니다.";
    }

    return null;
}
export default JoinName;