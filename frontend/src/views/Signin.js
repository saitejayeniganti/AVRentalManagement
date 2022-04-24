import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { post } from "../utils/serverCall";
import { actionCreators } from "../reducers/actionCreators";
import { REDUCER } from "../utils/consts";
import { Form, Button } from "react-bootstrap";
import carLogin from "./../images/carLogin.jpeg";

function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("0");
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCarOwner, setIsCarOwner] = useState(false);

  const dispatch = useDispatch();
  const { adminLogin, customerLogin, carOwnerLogin } = bindActionCreators(
    actionCreators,
    dispatch
  );

  Axios.defaults.withCredentials = true;
  const login = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
      role,
    };
    post("/signinData", data)
      .then((response) => {
        localStorage.setItem(REDUCER.TOKEN, response.token);
        localStorage.setItem(REDUCER.SIGNEDIN, true);
        localStorage.setItem(REDUCER.ROLE, response.user.role);
        if (response.user.role === "0") {
          adminLogin();
          setIsCustomer(true);
        } else if (response.user.role === "1") {
          adminLogin();
          setIsCarOwner(true);
        } else {
          customerLogin();
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  };

  if (isCustomer) {
    return <Navigate to="/home" />;
  }
  if (isAdmin) {
    return <Navigate to="/adminHome" />;
  }
  if (isCarOwner) {
    return <Navigate to="/carOwnerHome" />;
  }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(90deg, #FFFFFF 70%, #0A2FB6 30%)",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <div className="col-md-5">
            <div
              style={{
                fontFamily: "unset",
                fontSize: "45px",
                fontWeight: "300",
              }}
            >
              AV Cloud
            </div>
            <div style={{ width: "75%" }}>
              <form className="flight-book-form">
                <div className="login-form-box">
                  <div className="login-form">
                    <div
                      style={{
                        marginBottom: "30px",
                        marginTop: "20px",
                        fontSize: "25px",
                      }}
                    >
                      Login to the account
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <br />
                    <Form.Group className="col">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select"
                        default="0"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option value="0" defaultChecked>
                          Customer
                        </option>
                        <option value="1">Car Owner</option>
                        <option value="2">Admin</option>
                      </Form.Control>
                    </Form.Group>
                    <br />

                    <Button
                      type="submit"
                      onClick={login}
                      variant="dark"
                      style={{
                        marginBottom: "8px",
                        padding: "10px",
                        width: "100%",
                      }}
                    >
                      Login
                    </Button>
                    <br />
                    <p className="w-100 text-center">
                      &mdash; Haven't registered yet &mdash;
                    </p>
                    <a href="Signup">
                      <h4 style={{ textAlign: "center" }}>SignUp</h4>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <img
              src={carLogin}
              style={{
                width: "800px",
                height: "500px",
                marginTop: "20px",
                borderRadius: "15px",
                position: "relative",
              }}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
