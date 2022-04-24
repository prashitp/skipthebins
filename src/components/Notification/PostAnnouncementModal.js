// Author : Aabhaas Jain
import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function PostAnnouncementModal(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleToggled, setTitleToggled] = useState(false);
  const [contentToggled, setContentToggled] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const initialMount = useRef(true);
  const validate = () => {
  // validating inputs
    title.trim() != "" ? setTitleValid(true) : setTitleValid(false);
    content.trim() != "" ? setContentValid(true) : setContentValid(false);
  };
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      validate();
    }
  });
  const addData = () => {
    // calling add function post validation
    setTitleToggled(true);
    setContentToggled(true);
    validate();
    if (titleValid && contentValid) {
      props.add({ title, content });
      props.close();
    }
  };
  const initialize = () => {
    setTitle("");
    setContent("");
    setTitleToggled(false);
    setContentToggled(false);
  };
  return (
    <Modal show={props.show} onHide={props.close} onEnter={initialize}>
      <Modal.Header closeButton>
        <Modal.Title>Post Announcement</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="mt-4">
          <div className="form-group mt-2 form-inline">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              name="title"
              onChange={(e) => {
                setTitleToggled(true);
                setTitle(e.target.value);
              }}
              id="title"
              placeholder="Enter Title"
            />
            {!titleValid && titleToggled && (
              <span className="text-danger">Title cant be empty</span>
            )}
          </div>
          <div className="form-group mt-2">
            <label>Content</label>
            <input
              type="text-area"
              className="form-control"
              value={content}
              name="content"
              id="content"
              onChange={(e) => {
                setContentToggled(true);
                setContent(e.target.value);
              }}
              placeholder="Enter Content"
            />
            {!contentValid && contentToggled && (
              <span className="text-danger">Content cant be empty</span>
            )}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={addData} variant="primary">
          Post Announcement
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostAnnouncementModal;
