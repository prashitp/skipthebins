// Author : Aabhaas Jain
import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function UpdateModal(props) {
  const [question, setQuestion] = useState(props.data.question);
  const [answer, setAnswer] = useState(props.data.answer);
  
  const [questionToggled, setQuestionToggled] = useState(false);
  const [answerToggled, setAnswerToggled] = useState(false);
  const [questionValid, setQuestionValid] = useState(true);
  const [answerValid, setAnswerValid] = useState(true);
  const initialMount = useRef(true);
  const validate = () => {
    question.trim() != "" ? setQuestionValid(true) : setQuestionValid(false);
    answer.trim() != "" ? setAnswerValid(true) : setAnswerValid(false);
  }
  useEffect(() => {
    if (initialMount.current) {
      setQuestion(props.data.question);
      setAnswer(props.data.answer);
      initialMount.current = false;
    }
    else {
      validate();
    }

  });
  const initialize = () => {
    // initializing question and answers
    setQuestion(props.data.question);
    setAnswer(props.data.answer);
  }
  const update = () => {
    // updating new question and answers
    if (questionValid && answerValid) {
      props.update({ question, answer,oldAnswer:props.data.answer,oldQuestion:props.data.question, id: props.data._id });
      props.close();
    }
  }
  return (
    <Modal show={props.show} onHide={props.close} onEnter={initialize}>
      <Modal.Header closeButton>
        <Modal.Title>Edit FAQ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="mt-4">

          <div className="form-group mt-2 form-inline">
            <label >Question</label>
            <input type="text" className="form-control" value={question} name="question"
              onChange={(e) => { setQuestionToggled(true); setQuestion(e.target.value) }}
              id="question" placeholder="Enter Question" />
            {!questionValid && questionToggled && <span className="text-danger">Question cant be empty</span>}
          </div>
          <div className="form-group mt-2">
            <label>Answer</label>
            <input type="text-area" className="form-control" value={answer} name="answer" id="answer"
              onChange={(e) => { setAnswerToggled(true); setAnswer(e.target.value) }}
              placeholder="Enter Answer" />
            {!answerValid && answerToggled && <span className="text-danger">Answer cant be empty</span>}
          </div>

        </form>
      </Modal.Body>

      <Modal.Footer>
        {/* Conditional rendering on the bases of authorization */}
        {props.role == 'admin' && <Button variant="danger" onClick={(e) => { props.delete(props.data); props.close() }}>Delete</Button>}
        {props.role == 'vendor' && <Button variant="danger" onClick={(e) => { props.delete(props.data); props.close() }}>Request Deletion</Button>}
        {props.role == 'admin' && <Button variant="primary" onClick={update}>Update</Button>}
        {props.role == 'vendor' && <Button variant="primary" onClick={update}>Request Updation</Button>}

      </Modal.Footer>
    </Modal>

  );
}

export default UpdateModal;

