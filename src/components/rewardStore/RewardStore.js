// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import "./RewardStore.css";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import API from "../../api";

function RewardStore() {
  const navigate = useNavigate();

  const [voucherData, setvoucherData] = useState([]);
  const [rewardPoints, setRewardPoints] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [redeemButtomDisabled, setRedeemButtomDisabled] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    if (!user || user?.result?.role !== "normaluser") {
      toast.error("Please login to continue");

      navigate("/login");
    } else {
      getAllVoucherDetailsApiCall();
      getRewardPointsApiCall();
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  //Method to get all voucher details api call
  const getAllVoucherDetailsApiCall = () => {
    API.get("/voucher/allDetails")
      .then((res) => {
        setvoucherData(res.data.voucherData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to get user specific reward points details api call
  const getRewardPointsApiCall = () => {
    API.get("/reward/getPoints", {
      params: {
        customerId: user.result._id,
      },
    })
      .then((res) => {
        if (res.data.rewardData.length != 0) {
          setRewardPoints(res.data.rewardData[0].points);
          setRedeemButtomDisabled(false);
        } else {
          toast.error("You don't have any reward points.");
          setRedeemButtomDisabled(true);
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to handle redeem voucher button click
  const handleRedeem = (voucher) => {
    if (rewardPoints - parseInt(voucher.points) < 0) {
      toast.error("You don't have sufficient points to redeem this voucher");
    } else {
      var leftRewardPoints = rewardPoints - parseInt(voucher.points);
      setRewardPoints(leftRewardPoints);
      updateRewardPointsApiCall(leftRewardPoints);
      createVoucherPurchased(voucher);
    }
  };

  //Method to update reward points on voucher purchase api call
  const updateRewardPointsApiCall = (updatedRewardPoints) => {
    API.post("/reward/updatePoints", {
      customerId: user.result._id,
      points: updatedRewardPoints,
    })
      .then((res) => {
        if (res.data.success) {
          setSubmitSuccess(true);
        } else {
          toast.error("Reward Points not edited");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to create a new voucher purchased record
  const createVoucherPurchased = (voucher) => {
    const refNo = Math.random().toString(36).substr(2, 9).slice(-9);
    var newVoucherObj = {
      companyName: voucher.companyName,
      value: voucher.value,
      points: voucher.points,
      customerId: user.result._id,
      email: user.result.email,
      datePurchased: moment().format("LL"),
      refNumber: refNo,
    };
    API.post("/voucher/purchase", newVoucherObj)
      .then((res) => {
        if (res.data.success) {
          setReferenceNumber(refNo);
          setSubmitSuccess(true);
        } else {
          toast.error("Voucher not purchased");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to go back to home page click
  const handleGoBack = (e) => {
    navigate("/");
  };

  const voucherCard = (card, index) => {
    return (
      <Card
        style={{
          width: "15rem",
          margin: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        key={index}
      >
        <Card.Body>
          <Card.Title className="cardTitle">{card.companyName}</Card.Title>
          <Card.Text className="cardDesc">
            <b>Voucher Value - </b>${card.value} <br />
            <b>Points Required - </b>
            {card.points} <br />
          </Card.Text>
          <div className="col text-center">
            <Button
              className="cardButton"
              variant="success"
              disabled={redeemButtomDisabled}
              onClick={() => handleRedeem(card)}
            >
              Redeem Voucher
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
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
      <h6
        style={{
          textAlign: "right",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Points - {rewardPoints}
      </h6>

      {!submitSuccess && (
        <div>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Voucher Details
          </h4>
          <div className="grid">{voucherData.map(voucherCard)}</div>
        </div>
      )}

      {submitSuccess && (
        <div>
          <h6
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Your voucher redeem request has been successfully submitted with
            reference number - {referenceNumber} and you will receive voucher
            details via registered email within 1 working day.
          </h6>
          <div
            style={{ marginTop: "1%", justifyContent: "center" }}
            className="text-center d flex"
          >
            <Button variant="primary" type="submit" onClick={handleGoBack}>
              Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardStore;
