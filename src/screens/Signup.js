import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

export default function Signup() {
  const [credential, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://vast-teal-clam-toga.cyclic.app/createUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.geoLocation,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.status) {
      alert("Enter valid credentials");
    }
    if (data.status) {
      navigate('/login');
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-signup">
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="name"
            value={credential.name}
            onChange={onChange}
            placeholder="Name"
            required
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={onChange}
            placeholder="Email address"
            required
          />
          <label htmlFor="exampleInputEmail1">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credential.password}
            onChange={onChange}
            minLength="8"
            placeholder="Password"
            required
          />
          <label htmlFor="exampleInputPassword1">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="geoLocation"
            value={credential.geoLocation}
            onChange={onChange}
            placeholder="Address"
            required
          />
          <label htmlFor="exampleInputPassword1">Address</label>
        </div>
        <button type="submit" className="w-100 btn btn-lg btn-primary">
          Sign up
        </button>
        <p className="mt-3 mb-3">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
