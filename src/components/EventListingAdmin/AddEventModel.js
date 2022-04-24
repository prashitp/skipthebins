/*Author: Jaimi Maheshbhai Sheta (B00886563)*/
import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AddEventModal(props) {
    const [eventName, setEventName] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [eventNameToggled, setEventNameToggled] = useState(false);
    const [eventLocationToggled, setEventLocationToggled] = useState(false);
    const [eventDateToggled, setEventDateToggled] = useState(false);

    const [eventNameValid, setEventNameValid] = useState(true);
    const [eventLocationValid, setEventLocationValid] = useState(true);
    const [eventDateValid, setEventDateValid] = useState(true);

    const initialMount = useRef(true);
    const validate = () => {
        eventName.trim() != "" ? setEventNameValid(true) : setEventNameValid(false);
        eventLocation.trim() != "" ? setEventLocationValid(true) : setEventLocationValid(false);
        eventDate.trim() != "" ? setEventDateValid(true) : setEventDateValid(false);
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
        setEventNameToggled(true);
        setEventLocationToggled(true);
        setEventDateToggled(true);
        validate();
        if (eventName && eventLocation && eventDate) {
            props.add({ eventName, eventLocation, eventDate });
            props.close();
        }
    }
    const initialize = () => {
        setEventName("");
        setEventLocation("");
        setEventDate("");
        setEventNameToggled(false);
        setEventLocationToggled(false);
        setEventDateToggled(false);
    }
    return (
        <Modal show={props.show} onHide={props.close} onEnter={initialize}>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className="mt-4">
                    <div className="form-group mt-2 form-inline">
                        <label>Event Name</label>
                        <input type="text" className="form-control" value={eventName} name="eventName"
                               onChange={(e) => { setEventNameToggled(true); setEventName(e.target.value) }}
                               id="eventName" placeholder="Enter Event Name" />
                        {!eventNameValid && eventNameToggled && <span className="text-danger">Event name cant be empty</span>}
                    </div>
                    <div className="form-group mt-2">
                        <label>Event Location</label>
                        <input type="text-area" className="form-control" value={eventLocation} name="eventLocation" id="eventLocation"
                               onChange={(e) => { setEventLocationToggled(true); setEventLocation(e.target.value) }}
                               placeholder="Enter Event Location" />
                        {!eventLocationValid && eventLocationToggled && <span className="text-danger">Location cant be empty</span>}
                    </div>
                    <div className="form-group mt-2">
                        <label>Event Date</label>
                        <input type="text-area" className="form-control" value={eventDate} name="eventDate" id="eventDate"
                               onChange={(e) => { setEventDateToggled(true); setEventDate(e.target.value) }}
                               placeholder="Enter Event Date" />
                        {!eventDateValid && eventDateToggled && <span className="text-danger">Date cant be empty</span>}
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={addData} variant="primary">Add</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default AddEventModal;

