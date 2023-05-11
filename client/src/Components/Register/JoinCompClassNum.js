function JoinCompClassNum(userClassNum) {
    if (!userClassNum) {
        return "학번을 입력하세요.";
    }

    if(userClassNum.length !== 9) {
        return "학번은 9자리 입니다.";
    }
    
    return null;
}
export default JoinCompClassNum;