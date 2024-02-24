import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Slice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(logout());
  localStorage.clear();
  navigate("/");
}
