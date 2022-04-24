// Author : Aabhaas Jain
import { Accordion, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./notification.css";
import { useEffect } from "react";
function ViewNotification(props) {
  const dateDifference = (_) => {
    // For showcasing the incoming date of notification/announcement
    let day = Math.ceil((new Date() - new Date(_)) / (1000 * 60 * 60 * 24));
    if (day <= 1) return "Today";
    else if (1 < day <= 2) return `${day} day ago`;
    else if (2 < day <= 3) return `${day} days ago`;
    else return `Expired`;
  };
  return (
    <div className="notifications-allignment">
      <span className="triangleIcon">
        <FontAwesomeIcon icon={faCaretUp} />
      </span>
       {/* List view of notifications/announcements */}
      <ListGroup>
        {props.newNotifications && props.newNotifications.length > 0 ? (
          props.newNotifications.map((_, index) => {
            return (
              <ListGroup.Item key={index}>
                <div className="announcement-style">
                  <div className="time-diff mt-2">
                    <span>{dateDifference(_.timeStamp)}</span>
                  </div>
                  <div className="title">
                    <b>{_.title}</b>
                  </div>
                  <div className="content">{_.content}</div>
                </div>
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item>
            <div>No new notifications</div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}
export default ViewNotification;
