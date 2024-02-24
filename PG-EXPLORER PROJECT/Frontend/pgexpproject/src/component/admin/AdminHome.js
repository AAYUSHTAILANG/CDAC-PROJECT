import { Outlet,useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import CarouselComponent from "../Carousel";
// import { useEffect } from "react";

function AdminHome() {
  const location = useLocation();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedUser"));
  //   fetch("http://localhost:8080/getAdmin?uid=" + user.user_id)
  //     .then((resp) => {
  //       if (resp.ok) return resp.json();
  //       else throw new Error("server error");
  //     })
  //     .then((obj) => localStorage.setItem("loggedAdmin", JSON.stringify(obj)))
  //     .catch((error) => console.log(error.toString()));
  // }, []);
  return (
    <div>
      <AdminNavbar />
      {location.pathname.split("/").length===2 &&
      <CarouselComponent/>
      }
      <Outlet />
    </div>
  );
}

export default AdminHome;
