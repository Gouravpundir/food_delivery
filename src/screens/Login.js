import '../style/login.css'
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credential, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://vast-teal-clam-toga.cyclic.app/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.status) {
      alert("Enter valid credentials");
    }
    if (data.status) {
      localStorage.setItem("data", data.token);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <h1 className="text-center mt-3 mb-4 p-2 fs-2 fw-bold">Login Page</h1>
      <div className="login d-flex justify-content-center">
        <div className="w-50">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credential.email}
                onChange={onChange}
                required
              />
              <label htmlFor="exampleInputEmail1">Email address</label>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credential.password}
                onChange={onChange}
                minLength="8"
                required
              />
              <label htmlFor="exampleInputPassword1">Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
            <Link to="/createUser" className="btn btn-danger btn-sm ms-3">
              I'm a new user
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
