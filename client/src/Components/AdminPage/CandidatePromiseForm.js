
import './candidatePromiseForm.css';

const CandidatePromiseForm = ({id, promise, onPromiseChange}) => {
  const handleNameChange = (e) => {
    const newName = e.target.value;
    onPromiseChange(id, newName);
  };
  return (
    <input className="candidate-promise-input" value={promise[id] || ''} onChange={handleNameChange}  placeholder="공약을 적어주세요"></input>
  );
}

export default CandidatePromiseForm;