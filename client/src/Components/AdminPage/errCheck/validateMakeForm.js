import axios from 'axios';

export const validateMakeVoteForm = (voteInfoData, candidateInfo,  setTitleError, setTypeError, setdateError, event, setIsBtnDisable) => {
  candidateInfo.map((formData, index) => {
    if(formData.imagePreview === null) {
      alert("후보정보가 필요합니다.");
    }
    return 0;
  });

  if(!voteInfoData.title) 
    return setTitleError("투표 제목을 입력하세요!");
  setTitleError("");

  if(voteInfoData.type === "notSelc") 
    return setTypeError("투표 종류를 선택해주세요");
  setTypeError("");
  
  if(!voteInfoData.startDate)
    return setdateError("투표 시작일을 입력하세요");
    setdateError("");
  if(!voteInfoData.endDate) 
    return setdateError("투표 종료일을 입력하세요");
    setdateError("");  
  if(voteInfoData.startDate > voteInfoData.endDate) 
    return setdateError("투표 기간이 올바르지 않습니다.");
  setdateError("");

  const postData = {
    voteInfoData: voteInfoData,
    candidateInfo: candidateInfo
  };

  setIsBtnDisable(true);  

  
  axios.post('/vote/write', postData)
  .then(function (response) {
    if(response.status === 200) {
      alert("성공적으로 등록되었습니다.");
      window.location.href='/AdminMain';
    }
  })
  .catch(function (error) {
    alert("헐 에러 발생했는데 어캄...?");
    console.error('에러 발생:', error);
  });

  // event.target.submit();
};