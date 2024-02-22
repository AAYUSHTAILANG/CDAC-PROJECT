import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import OccupantNavbar from "./OccupantNavbar";

function OccupantHome() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    fetch("http://localhost:8080/getOccupant?uid=" + user.user_id)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("server error");
      })
      .then((obj) => {
        localStorage.setItem("loggedOccupant", JSON.stringify(obj));
        console.log(obj.occupant_id);
      })
      .catch((error) => console.log(error.toString()));
  }, []);
  return (
    <>
      <OccupantNavbar />

      <Outlet />
    </>
  );
}

export default OccupantHome;
