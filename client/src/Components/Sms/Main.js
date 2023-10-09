import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [voteList, setVoteList] = useState([]);
  const [checkItems, setCheckItems] = useState(new Set());
  const [checkvoteCode, setCheckvoteCode] = useState("");
  
  useEffect(() => {
    axios.get(`/sms/user`)
    .then((res) => {
      setUsers(res.data.users);
      setVoteList(res.data.voteList);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const checkItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkItems.add(id) 
      setCheckItems(checkItems)
      console.log(checkItems)
    } else if (!isChecked) {
      checkItems.delete(id)
      setCheckItems(checkItems)
      console.log(checkItems)
    }
  }

  const checkHandled = ({ target }) => {
    checkItemHandler(target.id, target.checked);
  }

  const submitMessage = () => {
    const telNumbers = [...checkItems];
    axios.post(`/sms/sendSms`, {
      "telNumbers": telNumbers,
      "voteCode": checkvoteCode,
    })
    .then((res) => {
      if (res.status === 200) {
        alert("전송완료!");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleCheckVote = (e) => {
    setCheckvoteCode(e.target.value);
  }

  return (
    <div style={{margin: '5% 10% 0% 10%'}}>
      <button onClick={submitMessage}> 문자보내기! </button>
      {voteList && <select className="qna-form__input" onChange={handleCheckVote}>
        <option value=""> 보낼 투표를 선택해주세요 </option>
        {voteList.map((vote, index) => (
          <option key={index} value={vote.voteCode}>
            { `${vote.voteCode} / ${vote.title}` }
          </option>
        ))}
      </select>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>학번</th>
            <th>이름</th>
            <th>학과</th>
            <th>핸드폰 번호</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{ index }</td>
              <td>{user.studentNumber}</td>
              <td>{user.name}</td>
              <td>{user.dep}</td>
              <td>{user.telNumber}</td>
              <td> <input type="checkbox" id={user.telNumber} onChange={(e) => checkHandled(e)}/> </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Main;