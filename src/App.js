import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Faq from "./components/faq/Faq";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PickupHomeUser from "./components/Pickups/User/PickupHomeUser";
import SchedulePickup from "./components/Pickups/User/SchedulePickup";
import ViewPickup from "./components/Pickups/User/ViewPickup";
import EditPickup from "./components/Pickups/User/EditPickup";
import CancelPickup from "./components/Pickups/User/CancelPickup";
import ScheduleConfirm from "./components/Pickups/User/ScheduleConfirm";

import PickupHomeVendor from "./components/Pickups/Vendor/PickupHomeVendor";
import CreateSchedule from "./components/Pickups/Vendor/CreateSchedule";
import ConfirmSchedule from "./components/Pickups/Vendor/ConfirmSchedule";
import ViewSchedule from "./components/Pickups/Vendor/ViewSchedule";
import DeleteSchedule from "./components/Pickups/Vendor/DeleteSchedule";
import EditSchedule from "./components/Pickups/Vendor/EditSchedule";

import ContactUs from "./components/contactUs/ContactUs";
import SubmitQueryForm from "./components/contactUs/SubmitQueryForm";
import AdminDisplayQueries from "./components/contactUs/AdminDisplayQueries";
import AdminModifyVendors from "./components/contactUs/AdminModifyVendors";
import RewardStore from "./components/rewardStore/RewardStore";
import AdminViewPurchVouchers from "./components/rewardStore/AdminViewPurchVouchers";
import AdminModifyVouchers from "./components/rewardStore/AdminModifyVouchers";

import Login from "./components/UserManagement/Login";
import Settings from "./components/UserManagement/Settings";
import Profile from "./components/UserManagement/Profile";
import Signup from "./components/UserManagement/Signup";
import "react-toastify/dist/ReactToastify.css";
import UserListingAdmin from "./components/UserListingAdmin/UserListingAdmin";
import VendorListingAdmin from "./components/VendorListingAdmin/VendorListingAdmin";
import RewardListingAdmin from "./components/RewardListingAdmin/RewardListingAdmin";
import TrackStatus from "./components/TrackStatus/TrackStatus";
import UpdateStatus from "./components/UpdateStatus/UpdateStatus";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Requests from "./components/UserManagement/Requests";
import UserRewards from "./components/Rewards/UserRewards";
import AdminRewards from "./components/Rewards/AdminRewards";

import PickupHistory from "./components/PickupHistory/PickupHistory";
import PastPickups from "./components/PastPickups/PastPickups";
import EventListingAdmin from "./components/EventListingAdmin/EventListingAdmin";
import EventListingUser from "./components/EventListingUser/EventListingUser";
import ViewAnnouncement from "./components/Notification/ViewAnnouncement";
// import AdminHeader from "./components/AdminHeader/AdminHeader";

function App() {
  return (
    <div>
      <Router>
        <div>
          <ToastContainer position="top-center"/>
          <Header />
          <div className="m-4 body-container">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route
                path="/faq"
                exact
                element={<Faq editMode={false} role="user" />}
              ></Route>
              <Route
                path="/faq-vendor"
                element={<Faq editMode={true} role="vendor" />}
              ></Route>
              <Route
                path="/faq-admin"
                exact
                element={<Faq editMode={true} role="admin" />}
              ></Route>
              <Route
                path="/announcements"
                exact
                element={<ViewAnnouncement />}
              ></Route>
              <Route path="/contactus">
                <Route index element={<ContactUs />}></Route>
              </Route>
              <Route
                path="/contactus/submitquery"
                element={<SubmitQueryForm />}
              ></Route>
              <Route
                path="/contactus/viewqueries"
                element={<AdminDisplayQueries />}
              ></Route>
              <Route
                path="/contactus/modifyvendors"
                element={<AdminModifyVendors />}
              ></Route>
              <Route path="/rewardstore" element={<RewardStore />}></Route>
              <Route
                path="/rewardstore/viewvouchers"
                element={<AdminViewPurchVouchers />}
              ></Route>
              <Route
                path="/rewardstore/modifyvouchers"
                element={<AdminModifyVouchers />}
              ></Route>
              <Route path="/user/pickups">
                <Route
                  path="/user/pickups/schedule"
                  element={<SchedulePickup />}
                />
                <Route
                  path="/user/pickups/confirm"
                  element={<ScheduleConfirm />}
                />
                <Route path="/user/pickups/view" element={<ViewPickup />} />
                <Route path="/user/pickups/edit" element={<EditPickup />} />
                <Route path="/user/pickups/cancel" element={<CancelPickup />} />
                <Route path="/user/pickups/track" element={<TrackStatus />} />
                <Route
                  path="/user/pickups/history"
                  element={<PickupHistory />}
                />
                <Route index element={<PickupHomeUser />} />
              </Route>
              <Route path="/vendor/pickups">
                <Route
                  path="/vendor/pickups/schedule"
                  element={<CreateSchedule />}
                />
                <Route
                  path="/vendor/pickups/confirm"
                  element={<ConfirmSchedule />}
                />
                <Route path="/vendor/pickups/view" element={<ViewSchedule />} />
                <Route path="/vendor/pickups/edit" element={<EditSchedule />} />
                <Route
                  path="/vendor/pickups/delete"
                  element={<DeleteSchedule />}
                />
                <Route
                  path="/vendor/pickups/update"
                  element={<UpdateStatus />}
                />
                <Route
                  path="/vendor/pickups/past-pickups"
                  element={<PastPickups />}
                />
                <Route index element={<PickupHomeVendor />} />
              </Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/requests" element={<Requests />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route
                path="/user-dashboard"
                exact
                element={<UserListingAdmin />}
              />
              <Route
                path="/vendor-dashboard"
                exact
                element={<VendorListingAdmin />}
              />
              <Route
                path="/reward-dashboard"
                exact
                element={<RewardListingAdmin />}
              />
              <Route path="/user/rewards" element={<UserRewards />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
              <Route path="/event-dashboard" element={<EventListingAdmin />} />
              <Route path="/events" element={<EventListingUser />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
