function JoinTel (userTelNum) {
    if (!userTelNum) {
        return "전화번호를 입력하세요.";
    }

    if (!userTelNum.length === 11) {
        return "전화번호는 11자입니다.";
    }

    const telRegix = /^\d{3}\d{3,4}\d{4}$/;
    if (!telRegix.test(userTelNum)) {
        return "전화번호 양식에 맞지 않습니다.";
    }

    return null;
}
export default JoinTel;