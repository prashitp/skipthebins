// Author : Aabhaas Jain
import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AddModal(props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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
      initialMount.current = false;
    }
    else {
      validate();
    }

  });
  const addData = () => {
    // Adding FAQ
    setQuestionToggled(true);
    setAnswerToggled(true);
    validate();
    if (questionValid && answerValid) {
      props.add({ question, answer });
      props.close();
    }
  }
  const initialize = () => {
    setQuestion("");
    setAnswer("");
    setQuestionToggled(false);
    setAnswerToggled(false);
  }
  return (
    <Modal show={props.show} onHide={props.close} onEnter={initialize}>
      <Modal.Header closeButton>
        <Modal.Title>Add FAQ</Modal.Title>
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
        {props.role=='admin'&&<Button onClick={addData} variant="primary">Add</Button>}

        {props.role=='vendor'&&<Button onClick={addData} variant="primary">Request Addition</Button>}
      </Modal.Footer>
    </Modal>

  );
}

export default AddModal;

