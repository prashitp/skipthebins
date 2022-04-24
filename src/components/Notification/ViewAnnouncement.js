// Author : Aabhaas Jain
import { Accordion, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faQ } from "@fortawesome/free-solid-svg-icons";
import PostAnnouncementModal from "./PostAnnouncementModal";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function ViewAnnouncement(props) {
  const [announcements, setAnnouncements] = useState([]);
  const [addModal, setAdd] = useState(false);
  const handleAddClose = () => setAdd(false);
  const handleAddShow = () => setAdd(true);

  const initialMount = useRef(true);
  const getData = () => {
    API.get("/notification/announcements")
      .then((res) => {
        setAnnouncements(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    // Checking whether the user is loggen in or not
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (!(user?.result?.role == "admin" || user?.result?.role == "vendor")) {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      if (initialMount.current) {
        getData();
        initialMount.current = false;
      }
    }
  }, [localStorage.getItem("profile")]);

  const postAnnouncement = (data) => {
    // posting the announcement
    let notification = {
      ...data,
      "authorRole": user.result.role,
      type: "announcement",
      authorId: user.result._id,
      user:"all"
    };
    API.post("/notification", notification)
      .then((_) => {
        getData();
        toast.success("Notification posted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };

  const deleteNotification = (id) => {
    // deleting the announcement
    API.delete("/notification/" + id)
      .then((_) => {
        getData();
        toast.success("Announcement Deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };
  return (
    <>
      <div className="faqContainer">
        <span className="faq-heading">Announcements</span>
        <div className="btn-position">
          <Button
            variant="success"
            className="announcement-button mb-3"
            onClick={handleAddShow}
          >
            Post Announcement
          </Button>
        </div>
        <PostAnnouncementModal
          show={addModal}
          close={handleAddClose}
          add={postAnnouncement}
        />
{/* list view of announcement */}
        <ListGroup>
          {announcements?.map((_, index) => {
            return (
              (user?.result?.role=="admin"||_.authorId==user?.result?._id)?<ListGroup.Item key={index}>
                <div className="announcement-style">
                  <div>
                    <b>Title:</b> {_.title}
                  </div>
                  <div>
                    <b>Content:</b> {_.content}{" "}
                  </div>
                  <div>
                    <b>Author Role:</b> {_.authorRole}
                  </div>
                  <div>
                    <b>Author ID :</b> {_.authorId}
                  </div>
                </div>
                <div className="delete-button">
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteNotification(_._id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>:""
            );
          })}
        </ListGroup>
      </div>
    </>
  );
}

export default ViewAnnouncement;
