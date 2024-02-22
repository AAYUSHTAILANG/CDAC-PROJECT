import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./Slice";

function Login() {
  const init = {
    useremail: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.fld]: action.val };
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [useremailError, setUseremailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const reduxAction = useDispatch();

  const validateUseremail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(info.useremail)) {
      setUseremailError("Please enter a valid email address.");
    } else {
      setUseremailError("");
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.\W)(?!.* ).{8,16}$/;
    if (!passwordRegex.test(info.password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase letters, special character and numbers."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user_email: info.useremail,
        user_password: info.password,
      }),
    };
    validateUseremail();
    validatePassword();

    fetch("http://localhost:8080/checkLogin", reqOptions)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("Server error");
      })
      .then((obj) => {
        if (obj === null) setMsg("Wrong Email/Password");
        else {
          localStorage.setItem("loggedUser", JSON.stringify(obj));
          if (obj.user_active_status === false)
            setMsg("Your request has not yet been approved");
          else {
            reduxAction(login());
            if (obj.user_role.role_id === 1) {
              navigate("/admin");
            } else if (obj.user_role.role_id === 2) {
              navigate("/ownerhome");
            } else if (obj.user_role.role_id === 3) {
              navigate("/occupanthome");
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setMsg("An error occurred. Please try again later.");
      });

    if (useremailError || passwordError) {
      return;
    }

    dispatch({ type: "update", fld: "useremail", val: "" });
    dispatch({ type: "update", fld: "password", val: "" });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="useremail"
                      className="col-sm-3 col-form-label"
                    >
                      Email:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="useremail"
                        name="useremail"
                        value={info.useremail}
                        onChange={(e) => {
                          dispatch({
                            type: "update",
                            fld: "useremail",
                            val: e.target.value,
                          });
                        }}
                        onBlur={() => info.useremail && validateUseremail()}
                        required
                      />
                      {useremailError && (
                        <div className="text-danger">{useremailError}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="password"
                      className="col-sm-3 col-form-label"
                    >
                      Password :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={info.password}
                        onChange={(e) => {
                          dispatch({
                            type: "update",
                            fld: "password",
                            val: e.target.value,
                          });
                        }}
                        onBlur={() => info.password && validatePassword()}
                        required
                      />
                      {/* {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                      )} */}
                    </div>
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p>{msg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
