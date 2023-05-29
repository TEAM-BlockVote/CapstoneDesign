function dateCheck(voteStartDate, voteEndDate) {

  if(!voteStartDate) {
    return "투표 시작일을 입력하세요"
  }

  if(!voteEndDate) {
    return "투표 종료일을 입력하세요"
  }

  if(voteStartDate > voteEndDate) {
    return "투표 기간을 다시 설정하세요"
  }

  return null;

}
export default dateCheck;