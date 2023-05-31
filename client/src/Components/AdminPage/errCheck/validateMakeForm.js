export const validateMakeVoteForm = (formData, setTitleError, setTypeError, setdateError, onSubmit) => {
  if(!formData.title) return setTitleError("투표 제목을 입력하세요!");
  setTitleError("");
  if(formData.type === "notSelc") return setTypeError("투표 종류를 선택해주세요");
  setTypeError("");
  //이름 체크
  //공약 체크
  if(!formData.startDate)return setdateError("투표 시작일을 입력하세요");
  if(!formData.endDate) return setdateError("투표 종료일을 입력하세요");
  if(formData.startDate > formData.endDate) return setdateError("투표 기간이 올바르지 않습니다.");
  setdateError("");

  onSubmit(formData);
};