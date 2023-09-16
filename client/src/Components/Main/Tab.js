import mask from "./images/mask.png";
import idCardNonColor from "./images/id-card.png";
import waiting from "./images/waiting.png";
import location from "./images/location.png";
import absent from "./images/absent.png";
import man from "./images/man.png";
import candidate from "./images/candidate.png";
import promotion from "./images/promotion.png";

import './Tab.css';

const DATA = [
  [
    {
      title: "공강으로 인한 불참",
      content: "투표기간이 하루밖에 안돼 투표하지 못했던 문제.",
      img: absent,
    },
    {
      title: "질병",
      content: "질병이나 사고등 코로나에 걸려 투표하지 못했던 문제.",
      img: mask,
    },
    {
      title: "피치못할 개인 사정",
      content: "개인 사정으로 인해 등교하지 못해 투표하지 못했던 문제.",
      img: man,
    },
  ],
  [
    {
      title: "학교내 홍보 부족",
      content: "벽면 게시판외 캠퍼스내에서 홍보가 부족했던 문제.",
      img: promotion,
    },
    {
      title: "후보자 정보 부족",
      content:
        "후보자의 공약을 볼 수 있는 접근성이 떨어져 공약을 모른채 투표를 진행했던 문제.",
      img: candidate,
    },
  ],
  [
    {
      title: "지정장소 투표문제",
      content:
        "정보가 전산화 되어있지 않아 종이 명단을 사용했기 때문에 지정된 장소에서 투표 할 수 밖에 없었던 문제.",
      img: location,
    },
    {
      title: "기표 투표 대기시간",
      content:
        "정보가 전산화 되어있지 않아 일일이 명단에서 이름을 찾아 수기할 수 밖에 없어 대기시간이 늘어났던 문제.",
      img: waiting,
    },
    {
      title: "신분증 문제",
      content:
        "정보가 전산화 되어있지 않아 신분증이나 학생증을 가져오지 않았을때 투표를 하지 못했던 문제.",
      img: idCardNonColor,
    },
  ],
];

const Tab = ({ index }) => {
  return (
    <div className="row row-cols-2 tab_content_container">
      {DATA[index].map((element, index) => (
        <div className="col" key={index}>
          <div className="tab_contnet">
            <img className="tab_contnet_img" src={element.img} alt="img" />
            <div className="tab_contnet_title">
              <div className="content_title">{element.title}</div>
              <div>{element.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;
