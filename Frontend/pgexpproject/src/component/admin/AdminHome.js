import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useEffect } from "react";

function AdminHome() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    fetch("http://localhost:8080/getAdmin?uid=" + user.user_id)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("server error");
      })
      .then((obj) => localStorage.setItem("loggedAdmin", JSON.stringify(obj)))
      .catch((error) => console.log(error.toString()));
  }, []);
  return (
    <div>
      <AdminNavbar />

      <Outlet />
    </div>
  );
}

export default AdminHome;
