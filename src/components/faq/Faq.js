// Author : Aabhaas Jain
import { Accordion, Button } from "react-bootstrap";
import "./Faq.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faQ } from "@fortawesome/free-solid-svg-icons";
import UpdateModal from "./UpdateModal";
import AddModal from "./AddModal";
import { useEffect, useRef, useState } from "react";
import ViewRequestsModal from "./ViewRequestModal";
import axios from "axios";
import { toast } from "react-toastify";
import { WEB_API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Faq(props) {
  const [faqData, setFaq] = useState([]);
  const [updateModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [addModal, setAdd] = useState(false);
  const handleAddClose = () => setAdd(false);
  const handleAddShow = () => setAdd(true);
  const [viewModal, setView] = useState(false);
  const handleViewClose = () => {
    getData();
    setView(false);
  };
  const handleViewShow = () => setView(true);
  const initialMount = useRef(true);
  const getData = () => {
    // get all faqs
    API.get("/faq")
      .then((res) => {
        setFaq(res.data.data);
      })
      .catch((err) => {
        console.log(111, err);
        toast.error("Some error occured");
      });
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    // checking authorization and authentication
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (!(props.role == user?.result?.role || props.role == "user")) {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      if (initialMount.current) {
        getData();
        initialMount.current = false;
      }
    }
  }, [localStorage.getItem("profile")]);

  const [data, setdata] = useState({
    question: "",
    answer: "",
  });
  const editFAQ = (_) => {
    setdata(_);
    handleShow();
  };

  const modifyData = (faq) => {
    // Updationg the faqs
    let modifiedFaq = { question: faq.question, answer: faq.answer };
    if (props.role == "admin") {
      API.put("/faq/" + faq.id, modifiedFaq)
        .then((_) => {
          getData();
          toast.success("FAQ Updated");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    } else {
      let newFaq = {
        oldAnswer: faq.oldAnswer,
        newAnswer: faq.answer,
        newQuestion: faq.question,
        oldQuestion: faq.oldQuestion,
        faqId: faq.id,
        type: "update",
      };
      API.post("/faq/create-request", newFaq)
        .then((_) => {
          toast.success("Request Raised");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    }
  };

  const addData = (faq) => {
    // adding the faqs
    if (props.role == "admin") {
      API.post("/faq", faq)
        .then((_) => {
          getData();
          toast.success("FAQ Added");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    } else {
      let newFaq = {
        newQuestion: faq.question,
        newAnswer: faq.answer,
        type: "add",
      };
      API.post("/faq/create-request", newFaq)
        .then((_) => {
          toast.success("Request Raised");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    }
  };

  const deleteData = (faq) => {
    // deleting the faqs
    if (props.role == "admin") {
      API.delete("/faq/" + faq._id)
        .then((_) => {
          getData();
          toast.success("FAQ Deleted");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    } else {
      let delFaq = {
        oldQuestion: faq.question,
        oldAnswer: faq.answer,
        type: "delete",
        faqId: faq._id,
      };
      API.post("/faq/create-request", delFaq)
        .then((_) => {
          toast.success("Request Raised");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured");
        });
    }
  };
  return (
    <>
      <div className="faqContainer">
        <span className="faq-heading">Frequenly asked questions</span>
        {props.editMode && props.role == "admin" && (
          <div className="btn-position">
            <Button
              variant="secondary"
              className="btn-position-button"
              onClick={handleViewShow}
            >
              View Requests
            </Button>
          </div>
        )}
        {/* Add Update and Delete Modals */}
        <UpdateModal
          show={updateModal}
          close={handleClose}
          data={data}
          role={props.role}
          delete={deleteData}
          update={modifyData}
        />
        <AddModal
          show={addModal}
          close={handleAddClose}
          role={props.role}
          add={addData}
        />
        <ViewRequestsModal
          show={viewModal}
          close={handleViewClose}
          role={props.role}
        />
        <Accordion defaultActiveKey="0">
          {faqData.map((_, index) => {
            return (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  {props.editMode && (
                    <span
                      className="edit-icon"
                      title="Edit"
                      onClick={() => editFAQ(_)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                  )}{" "}
                  <span>
                    Q {index + 1}. {_.question}
                  </span>
                </Accordion.Header>
                <Accordion.Body>{_.answer}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
        {props.editMode && (
          <div className="btn-position mt-3">
            <Button
              variant="primary"
              className="btn-position-mt-3"
              onClick={handleAddShow}
            >
              {" "}
              Add FAQ
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Faq;
