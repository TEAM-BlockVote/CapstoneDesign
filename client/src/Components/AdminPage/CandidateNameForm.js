import './candidateNameForm.css';

const CandidateNameForm = ({id, onNameChange}) => {
  const handleNameChange = (e) => {
    const newName = e.target.value;
    onNameChange(id, newName);
  };
  return (
    <input className="candidate-name-input" onChange={handleNameChange} placeholder="팀원 이름"></input>
  );
}

export default CandidateNameForm;
