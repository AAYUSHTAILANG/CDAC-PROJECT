import { useEffect } from "react";
import { Link, Outlet,useLocation } from "react-router-dom";
import OccupantNavbar from "./OccupantNavbar";
import CarouselComponent from "../Carousel";

function OccupantHome() {
  const location = useLocation();
  console.log(location.pathname)
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
      {location.pathname.split("/").length===2 &&
      <CarouselComponent/>
      }
      <Outlet />
    </>
  );
}

export default OccupantHome;
