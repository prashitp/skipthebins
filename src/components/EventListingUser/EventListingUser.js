/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./EventListingUser.css"
import {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import API from "../../api";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const {SearchBar} = Search;
const EventListingUser = () => {

    const [eventData, setEventData] = useState([]);

    const getEventData = async () => {
        API.get('/event/get-all-events')
            .then(function (response) {
                console.log(response.data.data);
                setEventData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const columns = [
        {dataField: "eventName", text: "Event Name"},
        {dataField: "eventLocation", text: "Event Location"},
        {dataField: "eventDate", text: "Event Date"},
    ]

    const CaptionElement = () => <h3 style={{textAlign: 'center', color: '#495057', padding: '10px'}}>Events </h3>;

    useEffect(() => {
        getEventData();
    }, []);
    return (
        <>
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
        </>

    );
}

export default EventListingUser;
