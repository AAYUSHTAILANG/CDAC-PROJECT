import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainHome from "./component/MainHome";
import Login from "./component/Login";
import OwnerRegistration from "./component/owner/OwnerRegistration";
import OccupantRegistration from "./component/occupant/OccupantRegistrtion";
import AdminHome from "./component/admin/AdminHome";
import OwnerHome from "./component/owner/OwnerHome";
import OccupantHome from "./component/occupant/OccupantHome";
import { useSelector } from "react-redux";
import MainNavbar from "./component/MainNavbar";
import Logout from "./component/Logout";
import OccupantRequest from "./component/owner/OccupantRequest";
import AdminRequest from "./component/admin/AdminRequest";
import RemoveOwner from "./component/admin/RemoveOwner";
import AddProperty from "./component/owner/AddProperty";
import PropertySearch from "./component/occupant/PropertySearch";
import AddFacility from "./component/owner/AddFacility";
import ShowProperties from "./component/owner/ShowProperties"; // Import the ShowProperties component
import AdminMain from "./component/admin/AdminMain";
import UpdateOwnerProfile from "./component/owner/UpdateOwnerProfile";
import UpdateOccupantProfile from "./component/occupant/UpdateOccupantProfile";
import ShowFacility from "./component/occupant/ShowFacility";
import PropertyRequested from "./component/occupant/PropertyRequested";
import Booking from "./component/occupant/Booking";
import ViewOwners from "./component/admin/ViewOwner";
import ViewProperties from "./component/admin/ViewProperties";
import ViewOccupants from "./component/admin/ViewOccupant";

function App() {
  const mystate = useSelector((state) => state.logged);

  return (
    <div>
      <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
        <MainNavbar />
      </div>

      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupowner" element={<OwnerRegistration />} />
        <Route path="/signupuser" element={<OccupantRegistration />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route path="admin_main" element={<AdminMain />} />
          <Route path="accept_request" element={<AdminRequest />} />
          <Route path="view_owner" element={<ViewOwners />} />
          <Route path="view_properties" element={<ViewProperties />} />
          <Route path="view_occupants" element={<ViewOccupants />} />
        </Route>

        <Route path="/ownerhome" element={<OwnerHome />}>
          <Route path="/ownerhome/" element={<ShowProperties />} />
          <Route path="occupant_request" element={<OccupantRequest />} />
          <Route path="add_facility/:propertyId" element={<AddFacility />} />
          <Route path="add_property" element={<AddProperty />} />
          <Route path="updateOwner" element={<UpdateOwnerProfile />} />
          <Route path="properties" element={<ShowProperties />} />
        </Route>

        <Route path="/occupanthome" element={<OccupantHome />}>
          <Route path="property_search" element={<PropertySearch />}>
            <Route path="propertyFacility" element={<ShowFacility />} />
          </Route>
          <Route path="property_requested" element={<PropertyRequested />} />
          <Route path="updateOccupant" element={<UpdateOccupantProfile />} />
          <Route path="booking/:propertyId" element={<Booking />} />
        </Route>

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
