// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import "./RewardStore.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

function AdminViewPurchVouchers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [purchasedVouchers, setpurchasedVouchers] = useState([]);

  useEffect(() => {
    if (!user || user?.result?.role !== "admin") {
      toast.error("Please login as admin to continue");

      navigate("/login");
    } else {
      getAllPurchasedVouchersApiCall();
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  //Method to get voucher details api call
  const getAllPurchasedVouchersApiCall = () => {
    API.get("/voucher/getPurchaseVouchers")
      .then((res) => {
        console.log(JSON.stringify(res));
        setpurchasedVouchers(res.data.voucherData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to show row data
  const renderRowData = (query, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{query.refNumber}</td>
        <td>{query.companyName}</td>
        <td>{query.value}</td>
        <td>{query.points}</td>
        <td>{query.customerId}</td>
        <td>{query.email}</td>
        <td>{query.datePurchased}</td>
      </tr>
    );
  };

  //Method to handle modify vocuher button click
  const handleModifyVouchers = (e) => {
    navigate("/rewardstore/modifyvouchers");
  };

  return (
    <div className="rewardContainer">
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Reward Store
      </h1>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Purchased Voucher List
      </h4>
      <Table
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
        responsive="sm"
        bordered="true"
        size="sm"
        striped="true"
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Reference No.</th>
            <th>Company Name</th>
            <th>Value</th>
            <th>Points</th>
            <th>Customer Id</th>
            <th>Email</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>{purchasedVouchers.map(renderRowData)}</tbody>
      </Table>
      <div
        style={{ marginTop: "1%", justifyContent: "center" }}
        className="text-center d flex"
      >
        <Button variant="primary" onClick={handleModifyVouchers}>
          Modify Voucher Details
        </Button>
      </div>
    </div>
  );
}

export default AdminViewPurchVouchers;
