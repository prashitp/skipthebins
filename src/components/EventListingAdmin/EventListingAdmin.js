/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./EventListingAdmin.css"
import {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import API from "../../api";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {Button} from "react-bootstrap";
import AddEventModal from "./AddEventModel";

const {SearchBar} = Search;
const EventListingAdmin = () => {
    const [addEventModal, setAddEventModel] = useState(false);
    const handleAddModelClose = () => setAddEventModel(false);
    const handleAddModelShow = () => setAddEventModel(true);
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [eventData, setEventData] = useState([]);

    // fetching all events details and displaying
    const getEventData = async () => {
        API.get('/admin/get-all-events')
            .then(function (response) {
                setEventData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // add event by an admin api call
    const addEvent = (event) => {
        API.post("/admin/add-event", event)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Event Added");
                    getEventData();
                    handleAddModelClose();
                } else {
                    toast.error("Event not added");
                }
            })
            .catch((error) => {
                toast.error("Internal Server Error");
            });
    };

    // delete event by an admin api call
    const deleteEvent = (eventId) => {
        API.delete("/admin/delete-event/" + eventId)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Event Deleted");
                    getEventData();
                } else {
                    toast.error("Event not deleted");
                }
            })
            .catch((error) => {
                toast.error("Internal Server Error");
            });
    };

    const columns = [
        {dataField: "eventName", text: "Event Name"},
        {dataField: "eventLocation", text: "Event Location"},
        {dataField: "eventDate", text: "Event Date"},
        {
            dataField: "delete",
            text: "Action",
            formatter: (cellContent, row) => <Button className="cardButton" variant="danger" onClick={()=>deleteEvent(row._id)}>
                Delete
            </Button>
        },
    ]

    const CaptionElement = () => <h3 style={{textAlign: 'center', color: '#495057', padding: '10px'}}>Event
        Dashboard</h3>;


    useEffect(() => {
        if (!user || user?.result?.role !== "admin") {
            toast.error("Please login as an admin to continue");
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [localStorage.getItem("profile")]);

    useEffect(() => {
        getEventData();
    }, []);
    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
                marginBottom: 10,
            }}>
                <Button className="cardButton" variant="success" onClick={handleAddModelShow}>
                    Add Event
                </Button>
            </div>
            <ToolkitProvider
                keyField="name"
                data={eventData}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <SearchBar srText {...props.searchProps} />
                            <BootstrapTable
                                classes="table"
                                caption={<CaptionElement/>}
                                pagination={paginationFactory()}
                                noDataIndication="No Event Available"
                                striped
                                hover
                                condensed
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <AddEventModal show={addEventModal} close={handleAddModelClose} add={addEvent}/>

        </>

    );
}

export default EventListingAdmin;
