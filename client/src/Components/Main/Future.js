import turnout from "./images/turnout.png";
import event from "./images/event.png";
import easy from "./images/easy.png";
import security from "./images/security.png";

import './Future.css'
const DATA = [
  {
    title: "과거보다 더 높은 투표율!",
    content:
      "매년 낮은 투표율로 인해 재투표 걱정과 총학생회 부재 걱정을 날려버리세요!",
    img: turnout,
  },
  {
    title: "손쉬운 이벤트 개최!",
    content:
      "투표를 하면 로또 당첨이?! 투표를 끝마친 학생들을 대상으로 추첨을 통해 1등부터 10등까지 푸짐한 선물을 드립니다!",
    img: event,
  },
  {
    title: "후보자의 공약을 더 쉽게!",
    content:
      "매번 어떤 후보자가 어떤 공약을 냈는지 찾아보기 힘드셨죠? BlockVote만의 특별한 나후찾 기능을 통해 간단히 자신의 성향에 맞는 후보자를 알려드립니다!",
    img: easy,
  },
  {
    title: "더욱 강화된 보안 시스템!",
    content:
      "데이터 위변조가 불가능한 블록체인 기술을 적용하여 한층 강화된 시스템으로 투표기능을 제공합니다 유권자의 정보는 암호화 시키고 투표정보는 블록체인화 시켜 저장합니다.",
    img: security,
  },
];

const Future = () => {
  return (
    <div className="future-wrapper">
      {DATA.map((element, index) => (
        <div className="future-info" key={index}>
          <img className="future-img" src={element.img} alt="logo" />
          <h5 className="future-title"> {element.title} </h5>
          <div className="future-written">{element.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Future;
