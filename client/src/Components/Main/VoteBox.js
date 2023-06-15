const VoteBox = () => {
  return (
    <div className='votebox-wrapper'>
      <div className='votebox-info'>
        <div className='votebox-tit'>
          <span>1900-2322</span>
        </div>
        <div className='votebox-desc'>
          홍길동님, 투표가 시작되었습니다.
          <br/>
          아래의 주소로 접속하여 투표 바랍니다.
        </div>
        <div className='votebox-link'>
          <span>http://52.78.93.185/</span>
          <span className='pass-box'>*******</span>
        </div>
        <div className='votebox-dan'>
          <span>링크 주소 마지막 7자리 문자를<br/>확인하여 입력해주세요.</span>
        </div>
      </div>
    </div>
  )
}

export default VoteBox;