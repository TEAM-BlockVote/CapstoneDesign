import { useState, useEffect, useRef } from 'react';
import JoinClassNum from './JoinClassNum';
import JoinDep from './JoinDep';
import JoinTel from './JoinTel';
import axios from 'axios';
import { depDataArray } from './depDataArray';
import "./JoinPage.css";

const AdditionalInfo = () => {
  const [userStudentNum, setUserStudentNum] = useState("");
  const [userStudentNumError, setUserStudentNumError] = useState("");
  const [userDepError, setUserDepError] = useState("");
  const [userTelNumError, setUserTelNumError] = useState("");

  const [userTelNum, setTelNum] = useState("");
  const [userDep22, setDep22] = useState("testt2222");
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const dropdownRef = useRef();
  const studentNumberRef = useRef(null);
  const [hasStudentNumber, setHasStudentNumber] = useState(null);

  const getStudentNumber = () => {
    const element = studentNumberRef.current;      
    axios.get(`/auth/hasStudentNumber?studentNumber=${element.value}`)
    .then((res) => {
      if(res.data) { //학생이 존재하면 true
        setHasStudentNumber(res.data);
      } else {
        setHasStudentNumber(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleSearch = (event) => {
    setSelectedItem(false);
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);

    const filtered = depDataArray.filter(item => item.includes(inputValue));
    if(filtered.length > 0) {
      
      setFilteredData(filtered);
      setDep22("testt2222-active");
    } else {
      setDep22("testt2222");
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchValue('');
    setFilteredData([]);
  };
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredData([]);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const LoginSubmit = (event) => {
    event.preventDefault();
    const studentNumberError = JoinClassNum(userStudentNum);
    const depError = JoinDep(selectedItem);
    const telNumberError = JoinTel(userTelNum);
    if (studentNumberError) {
      return setUserStudentNumError(studentNumberError);
    } else {
      setUserStudentNumError("");
    }
    if (depError) {
      return setUserDepError(depError);
    } else {
      setUserDepError("");
    }
    if (telNumberError) {
      return setUserTelNumError(telNumberError);
    } else {
      setUserTelNumError("");
    }
    return event.target.submit();
  }
  
  return (
    <div className="update-user-data">
    <form className="update-user-form" onSubmit={LoginSubmit} action="/auth/update" method="post">
      <span style={{display: 'flex', justifyContent: 'center'}}>추가 정보 입력</span>
      <div className="login_labelstart">학번</div>
      <div className="login_div">
        <input ref={studentNumberRef} onBlur={getStudentNumber} name="studentNumber" className="login_input" type="text" maxLength={9} value={userStudentNum} onChange={(e) => setUserStudentNum(e.target.value)} placeholder="학번을 입력하세요."/>
      </div>
      {hasStudentNumber && <span style={{color: 'red'}} > 이미 존재하는 학번입니다. </span>}
      <div className='join_error'>
        {userStudentNumError && <div>{userStudentNumError}</div>}
      </div>
      <div className="login_labelstart">학과</div>
      <div className="login_div">
        <input name="dep" type="text" value={selectedItem ? selectedItem : searchValue } className='join_input' onChange={handleSearch} placeholder="학과를 입력하세요"/>
      </div>
      <div className='join_error'>
        {userDepError && <div>{userDepError}</div>}
      </div>
      <div className='dep-card' style={{width: '100%', zIndex: 999}}>
      {filteredData.length > 0 && (
        <ul ref={dropdownRef} className={`${userDep22}`}>
          {filteredData.map((item, index) => (
            <li key={index} onClick={() => {handleSelectItem(item); setDep22("testt2222");}}>
              {item}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className='join_label'>
        전화번호
      </div>
      <div className='join_div'>
        <input id='telNumber' name='telNumber' className='join_input' type='tel' maxLength={11} value={userTelNum} onChange={(e) => setTelNum(e.target.value)} placeholder='전화번호를 입력하세요.'></input>
      </div>
      <div className='join_error'>
        {userTelNumError && <div>{userTelNumError}</div>}
      </div>
      <button type="submit" className="login_button">
        정보수정
      </button>
    </form>
    </div>
  );
};

export default AdditionalInfo;
