import { Link, Outlet,useNavigate,useLocation } from "react-router-dom";
import { useEffect, } from "react";
import OwnerNavbar from "./OwnerNavbar";
import CarouselComponent from "../Carousel";

function OwnerHome() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    fetch("http://localhost:8080/getOwner?uid=" + user.user_id)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("server error");
      })
      .then((obj) => 
      {
      localStorage.setItem("loggedOwner", JSON.stringify(obj))
    }
      )
      .catch((error) => console.log(error.toString()));
  }, []);

  return (
    <>
      <OwnerNavbar />
      {location.pathname.split("/").length===2 &&
      <CarouselComponent/>
      }
      <Outlet />
    </>
  );
}

export default OwnerHome;
