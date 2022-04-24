// Author : Aabhaas Jain
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { WEB_API_URL } from "../../constants";
import "./ViewRequestModal.css";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";

function ViewRequestsModal(props) {
  const [requestCount, setCount] = useState(0);
  const [requests, setrequests] = useState([]);
  const initialMount = useRef(true);

  const getData = () => {
    // fetching the requests
    API.get("/faq/requests")
      .then((res) => {
        setCount(res.data.data.length);
        setrequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };
  const approve = (req) => {
    // aprooving the requests
    API.post("/faq/approve-request", req)
      .then((_) => {
        getData();
        toast.success("Request Approved");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };
  const deny = (id) => {
    //denying the requests
    API.delete("/faq/deny-request/" + id)
      .then((_) => {
        getData();
        toast.success("Request Denied");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    // checking authentication and authorization
    if (props.role == user?.result?.role || props.role == "user") {
      if (initialMount.current) {
        getData();
        initialMount.current = false;
      }
    }
  });

  return (
    <Modal show={props.show} onHide={props.close} onEnter={getData}>
      <Modal.Header closeButton>
        <Modal.Title>FAQ Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requestCount == 0 && <span> No Requests found!!</span>}
        {requestCount != 0 && (
          <ul className="list-group">
            {requests.map((req, index) => (
              <li className="list-group-item" key={index}>
                <div className="row">
                  <div className="col-7">
                    <div>
                      <b>Author : {req.author}</b>
                    </div>
                    <div>
                      <b>Type : {req.type}</b>
                    </div>
                  </div>
                  <div className="col-5 btn-position">
                    <Button
                      variant="primary"
                      className="mx-2 btn-sm"
                      onClick={() => approve(req)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2 btn-sm"
                      onClick={() => deny(req._id)}
                    >
                      Deny
                    </Button>
                  </div>
                </div>
                {req.type == "update" && (
                  <>
                    <div>
                      <b>Old Question :</b> {req.oldQuestion}
                    </div>
                    <div>
                      <b>New Question :</b> {req.newQuestion}
                    </div>
                    <div>
                      <b>Old Answer :</b> {req.oldAnswer}
                    </div>
                    <div>
                      <b>New Answer :</b> {req.newAnswer}
                    </div>
                  </>
                )}
                {req.type == "add" && (
                  <>
                    <div>
                      <b>Question :</b> {req.newQuestion}
                    </div>
                    <div>
                      <b>Answer :</b> {req.newAnswer}
                    </div>
                  </>
                )}
                {req.type == "delete" && (
                  <>
                    <div>
                      <b>Question :</b> {req.oldQuestion}
                    </div>
                    <div>
                      <b>Answer :</b> {req.oldAnswer}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewRequestsModal;
