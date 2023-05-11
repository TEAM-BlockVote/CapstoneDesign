function JoinCompTel (userTelNum) {
    if (!userTelNum) {
        return "전화번호를 입력하세요.";
    }

    if (!userTelNum.length === 11) {
        return "전화번호는 11자입니다.";
    }

    return null;
}
export default JoinCompTel;