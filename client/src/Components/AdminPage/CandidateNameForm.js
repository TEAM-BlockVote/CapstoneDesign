import './candidateNameForm.css';

const CandidateNameForm = () => {
  
  const func123  = (e) => {
    console.log(e.target.value);
  }
  return (
    <input className="candidate-name-input" onChange={func123} placeholder="팀원 이름"></input>
  );
}

export default CandidateNameForm;