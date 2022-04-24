// Author : Prashit Patel - B00896717
import React, { useState, useEffect } from "react";
import DispCard from "../Card/Card";
import schedule from "../../../assets/images/schedule.jpeg";
import view from "../../../assets/images/view.jpeg";
import edit from "../../../assets/images/edit.png";
import cancel from "../../../assets/images/cancel.png";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import track from "../../../assets/images/track.png";
import pastpickup from "../../../assets/images/pastpickup.png";
import { toast } from "react-toastify";

export default function PickupHomeVendor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "vendor") {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Manage your Schedule
      </h2>
      <Row>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Create Schedule"
            desc="You want waste, start scheduling here !"
            img={schedule}
            btnClick={() => navigate("/vendor/pickups/schedule")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="View Schedule"
            desc="You want to view schedule details, go here !"
            img={view}
            btnClick={() => navigate("/vendor/pickups/view")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Edit Schedule"
            desc="You want to make changes to your schedule, here you go !"
            img={edit}
            btnClick={() => navigate("/vendor/pickups/edit")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Cancel Schedule"
            desc="You want to cancel a schedule, not a problem !"
            img={cancel}
            btnClick={() => navigate("/vendor/pickups/delete")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Update Status"
            desc="You want to update where your truck is, go here !"
            img={track}
            btnClick={() => navigate("/vendor/pickups/update")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Past Pickups"
            desc="You want to see history of pickups registered under your organization, go here !"
            img={pastpickup}
            btnClick={() => navigate("/vendor/pickups/past-pickups")}
          />
        </div>
      </Row>
    </div>
  );
}
