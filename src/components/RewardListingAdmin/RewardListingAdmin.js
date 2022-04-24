/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./RewardListingAdmin.css"
import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const {SearchBar} = Search;
const RewardListingAdmin = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [rewardData, setRewardData] = useState([]);

    // fetching all rewards data and displaying
    const getRewardData = async () => {
        API.get('/admin/get-all-rewards')
            .then(function (response) {
                console.log(response.data.data)
                setRewardData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const columns = [
        { dataField: "companyName", text: "Reward" },
        { dataField: "points", text: "Points Required" },
        { dataField: "value", text: "Value($)" },
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Reward Dashboard</h3>;


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
        getRewardData();
    }, []);
    return (
        <ToolkitProvider
            keyField="name"
            data={rewardData}
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
                            noDataIndication="No Reward Available"
                            striped
                            hover
                            condensed
                            {...props.baseProps}
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    );
}

export default RewardListingAdmin;
